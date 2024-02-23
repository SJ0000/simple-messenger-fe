// Singleton
import { Client } from "@stomp/stompjs";
import {
  ChatRoom,
  ReceivedMessage,
  SentMessage,
} from "@/modules/chat/interface";

import {
  ReceivedDirectMessage,
  SentDirectMessage,
} from "../directchat/interface";
import { directChatStore } from "@/store/directChat";
import { useChatRoomStore } from "@/store/chatRoom";
import { User } from "../user/interface";
import { ApiClient } from "./api-client";

export class MessageClient {
  private static instance: MessageClient;

  private client: Client;

  private constructor() {
    this.client = new Client();
  }

  public static getInstance(): MessageClient {
    if (this.instance === null || this.instance === undefined)
      this.instance = new MessageClient();
    return this.instance;
  }

  start(authorization: string, user: User, chatRooms: ChatRoom[]): void {
    this.client.configure({
      brokerURL: `${import.meta.env.VITE_WS_URL}/message-broker`,
      connectHeaders: {
        Authorization: authorization,
      },
    });

    this.client.onConnect = (frame) => {
      console.log(`WS Connected. ${frame}`);
      chatRooms.forEach((chatRoom) => {
        this.subscribeChat(chatRoom);
      });
      this.subscribeDirectChat(user.id);
    };

    this.client.onWebSocketError = (error) => {
      console.error("Error with websocket", error);
    };

    this.client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.client.activate();
  }

  stop(): void {
    this.client.deactivate();
  }

  send(message: SentMessage) {
    this.client.publish({
      destination: "/app/chat-message",
      body: JSON.stringify(message),
    });
  }

  sendDirect(to: number, message: SentDirectMessage) {
    this.client.publish({
      destination: `/app/direct-message`,
      body: JSON.stringify(message),
    });
  }

  subscribeChat(chatRoom: ChatRoom) {
    this.client.subscribe(`/topic/chat/${chatRoom.id}`, (message) => {
      const received: ReceivedMessage = JSON.parse(message.body);
      useChatRoomStore().addMessage(chatRoom.id, received);
    });
  }

  private subscribeDirectChat(userId: number) {
    this.client.subscribe(`/topic/direct-chat/${userId}`, async (message) => {
      const received: ReceivedDirectMessage = JSON.parse(message.body);
      console.log(received);
      switch (received.messageType) {
        case "MESSAGE": {
          if (!directChatStore().exists(received.senderId)) {
            const directChat = await ApiClient.getInstance().getDirectChat(
              received.directChatId
            );
            directChatStore().join(directChat);
          }
          directChatStore().addMessage(received);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

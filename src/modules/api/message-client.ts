// Singleton
import { Client } from "@stomp/stompjs";
import {
  ChatRoom,
  ReceivedMessage,
  SentMessage,
} from "@/modules/chat/interface";

import { ReceivedDirectMessage } from "../directchat/interface";
import { directChatStore } from "@/store/directChat";
import { friendStore } from "@/store/friendStore";
import { chatRoomStore } from "@/store/chatroom";

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

  start(authorization: string, chatRooms: ChatRoom[]): void {
    this.client.configure({
      brokerURL: `${import.meta.env.VITE_APP_WS_URL}/message-broker`,
      connectHeaders: {
        Authorization: authorization,
      },
    });

    this.client.onConnect = (frame) => {
      console.log(`WS Connected. ${frame}`);
      chatRooms.forEach((chatRoom) => {
        this.subscribeChat(chatRoom);
      });
      this.subscribeDirectChat();
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

  subscribeChat(chatRoom: ChatRoom) {
    this.client.subscribe(`/topic/chat/${chatRoom.id}`, (message) => {
      const received: ReceivedMessage = JSON.parse(message.body);
      chatRoomStore().addMessage(chatRoom.id, received);
    });
  }

  private subscribeDirectChat() {
    this.client.subscribe("/topic/direct-chat", (message) => {
      const received: ReceivedDirectMessage = JSON.parse(message.body);
      switch (received.messageType) {
        case "MESSAGE": {
          directChatStore().addMessage(received.senderId, received);
          break;
        }
        case "CHAT_START": {
          const otherUser = friendStore().find(received.senderId);
          directChatStore().join({
            id: received.directChatId,
            otherUser: otherUser,
            messages: [],
          });
          directChatStore().addMessage(received.senderId, received);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

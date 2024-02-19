// Singleton
import { Client } from "@stomp/stompjs";
import {
  ChatRoom,
  ReceivedDirectMessage,
  ReceivedMessage,
  SentMessage,
} from "@/modules/chat/interface";
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
      // TODO : directChatStore() ...
      console.log(received);
    });
  }
}

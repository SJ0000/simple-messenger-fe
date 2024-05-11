// Singleton
import {Client} from "@stomp/stompjs";
import {GroupChat, ReceivedMessage, SentMessage,} from "@/modules/groupchat/interface";

import {ReceivedDirectMessage, SentDirectMessage,} from "../directchat/interface";
import {useDirectChatStore} from "@/store/DirectChatStore";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {User} from "../user/interface";
import {ApiClient} from "./ApiClient";
import {MessageClientConfig} from "./Configurations";

export class MessageClient {
  private static instance: MessageClient;

  private client: Client;
  private connectionUrl: string;

  private constructor(config: MessageClientConfig) {
    this.client = new Client();
    this.connectionUrl = config.url;
  }

  public static initialize(config: MessageClientConfig) {
    this.instance = new MessageClient(config);
  }

  public static getInstance(): MessageClient {
    if (this.instance === null || this.instance === undefined)
      throw Error("MessageClient not initialized");
    return this.instance;
  }

  start(authorization: string, user: User, groupChats: GroupChat[]): void {
    this.client.configure({
      brokerURL: `${this.connectionUrl}/message-broker`,
      connectHeaders: {
        Authorization: authorization,
      },
    });

    this.client.onConnect = (frame) => {
      console.log(`WS Connected. ${frame}`);
      groupChats.forEach((groupChat) => {
        this.subscribeChat(groupChat);
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
      destination: "/app/group-message",
      body: JSON.stringify(message),
    });
  }

  sendDirect(to: number, message: SentDirectMessage) {
    this.client.publish({
      destination: `/app/direct-message`,
      body: JSON.stringify(message),
    });
  }

  subscribeChat(groupChat: GroupChat) {
    this.client.subscribe(`/topic/group-chat/${groupChat.id}`, (message) => {
      const received: ReceivedMessage = JSON.parse(message.body);
      useGroupChatStore().addMessage(groupChat.id, received);
    });
  }

  private subscribeDirectChat(userId: number) {
    this.client.subscribe(`/topic/direct-chat/${userId}`, async (message) => {
      const received: ReceivedDirectMessage = JSON.parse(message.body);
      console.log(received);
      switch (received.messageType) {
        case "MESSAGE": {
          if (!useDirectChatStore().exists(received.senderId)) {
            const directChat = await ApiClient.getInstance().getDirectChat(
              received.directChatId
            );
            useDirectChatStore().join(directChat);
          }
          useDirectChatStore().addMessage(received);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

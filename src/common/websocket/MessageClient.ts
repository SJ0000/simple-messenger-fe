import {Client} from "@stomp/stompjs";
import {ReceivedGroupMessage, SentGroupMessage,} from "@/domain/groupchat/interface";

import {ReceivedDirectMessage, SentDirectMessage,} from "@/domain/directchat/interface";
import User from "@/domain/user/User";
import MessageClientConfig from "./MessageClientConfig";
import {IGroupChat} from "@/domain/groupchat/GroupChat";
import {MessageEventBus, MessageHandler} from "@/common/websocket/MessageEventBus";


export default class MessageClient {
  private static instance: MessageClient;
  private readonly client: Client;
  private readonly connectionUrl: string;
  private messageEventBus : MessageEventBus = new MessageEventBus()

  private constructor(config: MessageClientConfig) {
    this.client = new Client();
    this.connectionUrl = config.url;
  }

  public static initialize(config: MessageClientConfig) {
    this.instance = new MessageClient(config);
  }

  public static getInstance(): MessageClient {
    if (this.instance === null || this.instance === undefined)
      throw new Error("MessageClient not initialized");
    return this.instance;
  }

  public addGroupMessageHandler(handler: MessageHandler<ReceivedGroupMessage>){
    this.messageEventBus.addGroupMessageEventListener(handler)
  }

  public addDirectMessageHandler(handler: MessageHandler<ReceivedDirectMessage>){
    this.messageEventBus.addDirectMessageEventListener(handler)
  }

  start(authorization: string, user: User, groupChats: IGroupChat[]): void {
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

  send(message: SentGroupMessage) {
    this.client.publish({
      destination: "/app/group-message",
      body: JSON.stringify(message),
    });
  }

  sendDirect(message: SentDirectMessage) {
    this.client.publish({
      destination: `/app/direct-message`,
      body: JSON.stringify(message),
    });
  }

  subscribeChat(groupChat: IGroupChat) {
    this.client.subscribe(`/topic/group-chat/${groupChat.id}`, (message) => {
      const received: ReceivedGroupMessage = JSON.parse(message.body);
      this.messageEventBus.dispatchGroupMessageEvent(received)
    });
  }

  private subscribeDirectChat(userId: number) {
    this.client.subscribe(`/topic/direct-chat/${userId}`, async (message) => {
      const received: ReceivedDirectMessage = JSON.parse(message.body);
      switch (received.messageType) {
        case "MESSAGE": {
          this.messageEventBus.dispatchDirectMessageEvent(received)
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

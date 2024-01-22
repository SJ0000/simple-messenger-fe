// Singleton
import {Client, messageCallbackType} from "@stomp/stompjs";

export class MessageClient {

  private static instance: MessageClient;

  private client: Client;

  private constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/message-broker',
    })
  }


  public static getInstance(): MessageClient {
    if (this.instance === null || this.instance === undefined)
      this.instance = new MessageClient()
    return this.instance
  }

  start(callback: messageCallbackType): void {
    this.client.activate()
    this.client.subscribe("/topic/chat",callback)
  }
}

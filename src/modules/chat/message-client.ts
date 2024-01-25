// Singleton
import {Client, messageCallbackType} from "@stomp/stompjs";
import {messageStore} from "@/store/message";
import {ReceivedMessage, SentMessage} from "@/modules/chat/interface";

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

  start(): void {
    this.client.onConnect = (frame) => {
      console.log(`WS Connected. ${frame}`)
      this.client.subscribe('/topic/chat', message => {
        const received = JSON.parse(message.body);
        messageStore().addMessage(1, received)
        console.log(`Received: ${message.body}`)
      })
    }

    this.client.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate()
  }

  send(message: SentMessage) {
    this.client.publish(
      {
        destination: "/app/chat-message",
        body: JSON.stringify(message)
      })
  }
}

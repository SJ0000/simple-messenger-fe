export interface ReceivedDirectMessage {
  directChatId: number;
  messageType: string;
  senderId: number;
  receiverId: number;
  content: string;
  receivedAt: Date;
}

export interface SentDirectMessage {
  directChatId: number;
  messageType: string;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: Date;
}

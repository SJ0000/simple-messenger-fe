export interface ReceivedMessage {
  groupChatId: number;
  senderId: number;
  content: string;
  receivedAt: Date;
}

export interface SentMessage {
  groupChatId: number;
  senderId: number;
  content: string;
  sentAt: Date;
}

export interface Invitation {
  id: string;
  groupChatId: number;
  groupChatName: string;
  inviterName: string;
  expiredAt: Date;
}

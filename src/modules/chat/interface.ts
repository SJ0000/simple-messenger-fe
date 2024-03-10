import { User } from "@/modules/user/interface";

export interface ChatRoom {
  id: number;
  name: string;
  avatarUrl: string;
  users: User[];
  messages: ReceivedMessage[];
}

export interface ReceivedMessage {
  id: string;
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
  chatRoomId: number;
  chatRoomName: string;
  inviterName: string;
  expiredAt: Date;
}

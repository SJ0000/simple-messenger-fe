import {User} from "@/modules/user/interface";

export interface GroupChat {
  id: number;
  name: string;
  avatarUrl: string;
  users: User[];
  messages: ReceivedMessage[];
}

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

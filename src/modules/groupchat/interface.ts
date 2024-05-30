import {UserDto} from "@/modules/user/dto";

export interface ReceivedGroupMessage {
  groupChatId: number;
  senderId: number;
  content: string;
  receivedAt: Date;
}

export interface SentGroupMessage {
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

export interface GroupChatCreateDto {
  name: string;
}

export interface GroupChatDto{
  id: number;
  name: string;
  avatarUrl: string;
  users: UserDto[]
}

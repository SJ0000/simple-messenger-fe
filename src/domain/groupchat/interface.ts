import {UserDto} from "@/domain/user/dto";

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
  participants: ParticipantDto[];
}

export interface ParticipantDto{
  user: UserDto;
  role: string;
}

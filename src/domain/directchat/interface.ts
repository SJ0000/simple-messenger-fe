import {UserDto} from "@/domain/user/dto";

export interface DirectChatDto{
  id: number;
  otherUser: UserDto;
}

export interface ReceivedDirectMessage {
  directChatId: number;
  messageType: string;
  senderId: number;
  content: string;
  receivedAt: Date;
}

export interface SentDirectMessage {
  directChatId: number;
  messageType: string;
  senderId: number;
  receiverId: number;
  content: string;
}

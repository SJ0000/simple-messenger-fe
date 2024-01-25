import {types} from "sass";
import List = types.List;
import {User} from "@/modules/user/interface";

export interface ChatRoom{
  id: number,
  name: string,
  avatarUrl: string,
  users: User[],
}

export interface ChatRoomCreate{
  name: string,
}

export interface ReceivedMessage {
  id: number,
  chatRoomId: number,
  senderId: number,
  content: string,
  receivedAt: Date,
}

export interface SentMessage{
  chatRoomId: number,
  senderId: number,
  content: string,
  sentAt: Date,
}

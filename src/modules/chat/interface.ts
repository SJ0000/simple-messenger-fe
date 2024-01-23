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

export interface Message{
  id: number,
  senderId: number,
  content: string,
  sentAt: Date,
}

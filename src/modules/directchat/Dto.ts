import {UserDto} from "@/modules/user/dto";

export interface DirectChatDto{
  id: number;
  otherUser: UserDto;
}

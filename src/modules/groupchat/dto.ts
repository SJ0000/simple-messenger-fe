import {UserDto} from "@/modules/user/dto";

export class GroupChatCreateDto {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export interface GroupChatDto{
  id: number;
  name: string;
  avatarUrl: string;
  users: UserDto[]
}

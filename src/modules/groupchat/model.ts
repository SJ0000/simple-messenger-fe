import { GroupChatCreateDto } from "@/modules/groupchat/dto";

export class GroupChatCreateModel {
  name: string = "";

  toDto(): GroupChatCreateDto {
    return new GroupChatCreateDto(this.name);
  }

  clear() {
    this.name = "";
  }
}

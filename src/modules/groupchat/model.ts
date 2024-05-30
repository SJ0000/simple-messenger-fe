import {GroupChatCreateDto} from "@/modules/groupchat/interface";

export class GroupChatCreateModel {
  name: string = "";

  toDto(): GroupChatCreateDto {
    return {
      name: this.name
    }
  }

  clear() {
    this.name = "";
  }
}

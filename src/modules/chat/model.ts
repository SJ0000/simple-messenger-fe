import {ChatRoomCreateDto} from "@/modules/chat/dto";

export class ChatRoomCreateModel{
  name: string = "";

  toDto() : ChatRoomCreateDto{
    return new ChatRoomCreateDto(this.name)
  }

  clear(){
    this.name = ""
  }
}

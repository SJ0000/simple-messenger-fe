import {ReceivedGroupMessage} from "@/domain/groupchat/interface";
import {IGroupChat} from "@/domain/groupchat/GroupChat";

export default class GroupChatModel {
  id: number = 0;
  name: string = "";
  avatarUrl: string = "";
  messages: ReceivedGroupMessage[] = [];

  public assign(groupChat: IGroupChat){
    this.id = groupChat.id
    this.name = groupChat.name
    this.avatarUrl = groupChat.avatarUrl
    this.messages.splice(0)
    groupChat.messages.forEach((message) => {
      this.messages.push(message)
    })
  }
}



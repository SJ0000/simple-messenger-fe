import {ReceivedDirectMessage} from "@/domain/directchat/interface";
import {IDirectChat} from "@/domain/directchat/DirectChat";

export default class DirectChatModel {
  id: number = 0;
  otherUserId: number = 0;
  messages: ReceivedDirectMessage[] = []

  public assign(directChat: IDirectChat){
    this.id = directChat.id;
    this.otherUserId = directChat.otherUserId;
    this.messages.splice(0);
    directChat.messages.forEach((message) => {
      this.messages.push(message);
    });
  }
}

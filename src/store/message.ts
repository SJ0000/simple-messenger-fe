import {defineStore} from "pinia";
import {Message} from "@/modules/chat/interface";


export const messageStore = defineStore('message', {
  state: ()  => {
    return {
      chatroomMessagesMap: new Map<number,Array<Message>>()
    }
  },
  actions:{
    initialize(){
      this.chatroomMessagesMap.set(1,[])
    },
    getMessages(chatRoomId: number): Array<Message>{
      const messages = this.chatroomMessagesMap.get(chatRoomId);
      if(messages === undefined)
        throw new Error("12345")
      return messages
    },
    addMessage(chatRoomId: number, message: Message){
      const messages = this.getMessages(chatRoomId)
      messages.push(message)
    }
  },
  persist: false
})

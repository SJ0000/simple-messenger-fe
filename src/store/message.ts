import {defineStore} from "pinia";
import {ReceivedMessage} from "@/modules/chat/interface";


export const messageStore = defineStore('message', {
  state: ()  => {
    return {
      chatroomMessagesMap: new Map<number,Array<ReceivedMessage>>()
    }
  },
  actions:{
    initialize(){
      this.chatroomMessagesMap.set(1,[])
    },
    getMessages(chatRoomId: number): Array<ReceivedMessage>{
      const messages = this.chatroomMessagesMap.get(chatRoomId);
      if(messages === undefined)
        throw new Error("12345")
      return messages
    },
    addMessage(chatRoomId: number, message: ReceivedMessage){
      const messages = this.getMessages(chatRoomId)
      messages.push(message)
    }
  },
  persist: false
})

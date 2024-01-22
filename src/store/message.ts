import {defineStore} from "pinia";
import {Message} from "@/modules/chat/interface";


export const messageStore = defineStore('message', {
  state: () : Map<number, Array<Message>>  => {
    return new Map<number, Array<Message>>()
  },
  actions:{
    initialize(){

    },
    addMessage(chatRoomId: number, message: string){


    }
  },
  persist: false
})

import {defineStore} from "pinia";
import {ChatRoom} from "@/modules/chat/interface";


export const chatRoomStore = defineStore('chatRoom', {
  state: (): Map<number, ChatRoom> => {
    return new Map<number, ChatRoom>()
  },
  actions: {
    initialize(chatRooms: Array<ChatRoom>) {
      chatRooms.forEach(chatRoom => {
        this.set(chatRoom.id, chatRoom)
      })
    },

    join() {

    },

    exit() {

    }

  },
  persist: false
})

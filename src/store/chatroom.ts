import {defineStore} from "pinia";
import {ChatRoom} from "@/modules/chat/interface";


export const chatRoomStore = defineStore('chatRoom', {
  state: () => {
    return {
      chatRooms: new Array<ChatRoom>
    }
  },
  actions: {
    initialize(chatRooms: Array<ChatRoom>) {
      this.chatRooms = chatRooms
    },

    join(chatRoom: ChatRoom) {
      this.chatRooms.push(chatRoom)
    },

    exit() {

    }

  },
  persist: false
})

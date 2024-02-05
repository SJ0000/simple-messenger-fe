import {defineStore} from "pinia";
import {ChatRoom, ReceivedMessage} from "@/modules/chat/interface";

interface chatRoomState {
  selected: ChatRoom,
  chatRooms: Map<number, ChatRoom>
}

export const chatRoomStore = defineStore('chatRoom', {
  state: (): chatRoomState => {
    return {
      selected: {
        id: 0,
        name: "",
        avatarUrl: "",
        users: [],
        messages: []
      },
      chatRooms: new Map<number, ChatRoom>()
    }
  },

  actions: {
    initialize(chatRooms: Array<ChatRoom>) {
      chatRooms.forEach(chatRoom => {
        if(chatRoom.avatarUrl.length === 0){
          chatRoom.avatarUrl = "/src/assets/default-avatar.jpg"
        }

        chatRoom.messages = []
        this.chatRooms.set(chatRoom.id, chatRoom)
      })
    },

    join(chatRoom: ChatRoom) {
      chatRoom.messages = []
      this.chatRooms.set(chatRoom.id, chatRoom)
    },

    find(chatRoomId: number): ChatRoom {
      const findChatRoom = this.chatRooms.get(chatRoomId)
      if (findChatRoom === undefined)
        throw Error(`Chat Room id ${chatRoomId} not found`)

      return findChatRoom
    },

    select(chatRoomId: number) {
      const chatRoom = this.find(chatRoomId)
      this.selected.id = chatRoom.id;
      this.selected.name = chatRoom.name;
      this.selected.avatarUrl = chatRoom.avatarUrl;
      this.selected.users = chatRoom.users;

      this.selected.messages.splice(0)
      chatRoom.messages.forEach(message => {
        this.selected.messages.push(message)
      })
    },

    addMessage(chatRoomId: number, message: ReceivedMessage) {
      const findChatRoom = this.find(chatRoomId)
      findChatRoom.messages.push(message)
      this.selected.messages.push(message)
    }
  },
  persist: false
})


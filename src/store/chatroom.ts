import { defineStore } from "pinia";
import { ChatRoom, ReceivedMessage } from "@/modules/chat/interface";
import { Ref, ref } from "vue";

const dummyChatRoom = {
  id: 0,
  name: "",
  avatarUrl: "",
  users: [],
  messages: [],
};

export const useChatRoomStore = defineStore(
  "chatRoom",
  () => {
    const selected: Ref<ChatRoom> = ref(dummyChatRoom);
    const chatRooms: Ref<Map<number, ChatRoom>> = ref(
      new Map<number, ChatRoom>()
    );

    function initialize(chatRoomArray: Array<ChatRoom>) {
      chatRoomArray.forEach((chatRoom) => {
        if (chatRoom.avatarUrl.length === 0) {
          chatRoom.avatarUrl = "/src/assets/default-avatar.jpg";
        }
        chatRoom.messages = [];
        chatRooms.value.set(chatRoom.id, chatRoom);
      });
    }

    function join(chatRoom: ChatRoom) {
      chatRoom.messages = [];
      if (chatRoom.avatarUrl.length === 0) {
        chatRoom.avatarUrl = "/src/assets/default-avatar.jpg";
      }
      chatRooms.value.set(chatRoom.id, chatRoom);
    }

    function find(chatRoomId: number): ChatRoom {
      const findChatRoom = chatRooms.value.get(chatRoomId);
      if (findChatRoom === undefined)
        throw Error(`Chat Room id ${chatRoomId} not found`);

      return findChatRoom;
    }

    function select(chatRoomId: number) {
      const chatRoom = find(chatRoomId);
      selected.value.id = chatRoom.id;
      selected.value.name = chatRoom.name;
      selected.value.avatarUrl = chatRoom.avatarUrl;
      selected.value.users = chatRoom.users;
      selected.value.messages.splice(0);
      chatRoom.messages.forEach((message) => {
        selected.value.messages.push(message);
      });
    }

    function addMessage(chatRoomId: number, message: ReceivedMessage) {
      const findChatRoom = find(chatRoomId);
      findChatRoom.messages.push(message);
      selected.value.messages.push(message);
    }

    return { selected, chatRooms, initialize, join, find, select, addMessage };
  },
  { persist: false }
);

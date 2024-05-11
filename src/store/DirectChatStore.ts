import {defineStore} from "pinia";
import {DirectChat, ReceivedDirectMessage,} from "@/modules/directchat/interface";
import {useAuthenticationStore} from "./AuthenticationStore";
import {Ref, ref} from "vue";

const dummyDirectChat: DirectChat = {
  id: 0,
  otherUser: {
    id: 0,
    name: "",
    email: "",
    avatarUrl: "",
    statusMessage: "",
    publicIdentifier: "",
  },
  messages: [],
};

export const useDirectChatStore = defineStore(
  "directChat",
  () => {
    const selected: Ref<DirectChat> = ref(dummyDirectChat);
    const directChats: Map<number, DirectChat> = new Map<number, DirectChat>();

    function initialize(directChatArr: Array<DirectChat>) {
      directChatArr.forEach((directChat) => {
        directChat.messages = [];
        directChats.set(directChat.otherUser.id, directChat);
      });
    }

    function join(directChat: DirectChat) {
      directChat.messages = [];
      directChats.set(directChat.otherUser.id, directChat);
    }

    function find(otherUserId: number): DirectChat {
      const directChat = directChats.get(otherUserId);
      if (directChat === undefined)
        throw Error(`DirectChat(otherUserId = ${otherUserId}) not found`);
      return directChat;
    }

    function select(otherUserId: number) {
      const directChat = find(otherUserId);
      selected.value.id = directChat.id;
      selected.value.otherUser = directChat.otherUser;
      selected.value.messages.splice(0);

      directChat.messages.forEach((message) => {
        selected.value.messages.push(message);
      });
    }

    function exists(otherUserId: number): boolean {
      return directChats.get(otherUserId) !== undefined;
    }

    function addMessage(message: ReceivedDirectMessage) {
      // 보낸 메시지
      const authentication = useAuthenticationStore();
      if (message.senderId === authentication.getUser().id) {
        const directChat = find(message.receiverId);
        directChat.messages.push(message);
        selected.value.messages.push(message);
      } else {
        // 받은 메시지
        const directChat = find(message.senderId);
        directChat.messages.push(message);
        selected.value.messages.push(message);
      }
    }
    return { selected, initialize, join, select, exists, addMessage };
  },
  { persist: false }
);

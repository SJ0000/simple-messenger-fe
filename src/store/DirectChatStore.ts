import {defineStore} from "pinia";
import {DirectChat, ReceivedDirectMessage,} from "@/modules/directchat/interface";
import {useAuthenticationStore} from "./AuthenticationStore";
import {Ref, ref, UnwrapRef} from "vue";
import User from "@/modules/user/User";

const dummyDirectChat: DirectChat = {
  id: 0,
  otherUser: new User(0,"","","","",""),
  messages: [],
};

export const useDirectChatStore = defineStore(
  "directChat",
  () => {
    const selected : DirectChat  = dummyDirectChat;
    const directChats: Map<number, DirectChat> = new Map<number, DirectChat>();

    function getSelected() : DirectChat{
      return selected
    }

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
      selected.id = directChat.id;
      selected.otherUser = directChat.otherUser;
      selected.messages.splice(0);

      directChat.messages.forEach((message) => {
        selected.messages.push(message);
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
        selected.messages.push(message);
      } else {
        // 받은 메시지
        const directChat = find(message.senderId);
        directChat.messages.push(message);
        selected.messages.push(message);
      }
    }
    return { getSelected, initialize, join, select, exists, addMessage };
  },
  { persist: false }
);

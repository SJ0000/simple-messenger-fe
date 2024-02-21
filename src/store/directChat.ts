import { defineStore } from "pinia";
import {
  DirectChat,
  ReceivedDirectMessage,
} from "@/modules/directchat/interface";
import { authenticationStore } from "./authentication";

interface directChatState {
  selected: DirectChat;
  directChats: Map<number, DirectChat>;
}

export const directChatStore = defineStore("directChat", {
  state: (): directChatState => {
    return {
      selected: {
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
      },
      directChats: new Map<number, DirectChat>(),
    };
  },

  actions: {
    initialize(directChats: Array<DirectChat>) {
      directChats.forEach((directChat) => {
        directChat.messages = [];
        this.directChats.set(directChat.otherUser.id, directChat);
      });
    },

    join(directChat: DirectChat) {
      directChat.messages = [];
      this.directChats.set(directChat.otherUser.id, directChat);
    },

    find(otherUserId: number): DirectChat {
      const directChat = this.directChats.get(otherUserId);
      if (directChat === undefined)
        throw Error(`DirectChat(otherUserId = ${otherUserId}) not found`);

      return directChat;
    },

    select(otherUserId: number) {
      const directChat = this.find(otherUserId);
      this.selected.id = directChat.id;
      this.selected.otherUser = directChat.otherUser;
      this.selected.messages.splice(0);

      directChat.messages.forEach((message) => {
        this.selected.messages.push(message);
      });
    },

    exists(otherUserId: number): boolean {
      return this.directChats.get(otherUserId) !== undefined;
    },

    addMessage(message: ReceivedDirectMessage) {
      // 보낸 메시지
      if (message.senderId === authenticationStore().user?.id) {
        const directChat = this.find(message.receiverId);
        directChat.messages.push(message);
        this.selected.messages.push(message);
      } else {
        // 받은 메시지
        const directChat = this.find(message.senderId);
        directChat.messages.push(message);
        this.selected.messages.push(message);
      }
    },
  },
  persist: false,
});
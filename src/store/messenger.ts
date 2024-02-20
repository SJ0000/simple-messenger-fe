import { defineStore } from "pinia";

interface MessengerState {
  mode: string; // CHATROOM, DIRECTCHAT
}

export const messengerStore = defineStore("messenger", {
  state: (): MessengerState => {
    return {
      mode: "CHATROOM",
    };
  },
  actions: {
    activateChatRoom() {
      this.mode = "CHATROOM";
    },
    activateDirectChat() {
      this.mode = "DIRECTCHAT";
    },
  },
  persist: true,
});

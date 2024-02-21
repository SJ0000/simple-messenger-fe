import { defineStore } from "pinia";
import { ref } from "vue";

export const messengerStore = defineStore(
  "messenger",
  () => {
    const mode = ref("CHATROOM");

    function activateChatRoom() {
      mode.value = "CHATROOM";
    }

    function activateDirectChat() {
      mode.value = "DIRECTCHAT";
    }

    return { mode, activateChatRoom, activateDirectChat };
  },
  { persist: false }
);

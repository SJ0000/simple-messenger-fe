import { defineStore } from "pinia";
import { ref } from "vue";

export const messengerStore = defineStore(
  "messenger",
  () => {
    const mode = ref("GROUPCHAT");

    function activateGroupChat() {
      mode.value = "GROUPCHAT";
    }

    function activateDirectChat() {
      mode.value = "DIRECTCHAT";
    }

    return { mode, activateGroupChat, activateDirectChat };
  },
  { persist: false }
);

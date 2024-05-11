import {defineStore} from "pinia";
import {ref} from "vue";

export enum ChattingMode{
  GroupChat  ,
  DirectChat
}

export const messengerStore = defineStore(
  "messenger",
  () => {
    const mode = ref(ChattingMode.DirectChat);

    function activateGroupChat() {
      mode.value = ChattingMode.GroupChat;
    }

    function activateDirectChat() {
      mode.value = ChattingMode.DirectChat;
    }

    return { mode, activateGroupChat, activateDirectChat };
  },
  { persist: false }
);

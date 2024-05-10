import {defineStore} from "pinia";
import {ref} from "vue";

/*
  TODO : messengerStore를 사용하지 않고 깔끔하게 처리하도록 변경하기
 */
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

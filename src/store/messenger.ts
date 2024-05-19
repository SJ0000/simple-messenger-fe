import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import GroupChat from "@/modules/groupchat/GroupChat";
import {ReceivedMessage} from "@/modules/groupchat/interface";

interface GroupChatModel {
  id: number;
  name: string;
  avatarUrl: string;
  messages: ReceivedMessage[];
}

export enum ChattingMode {
  GroupChat,
  DirectChat
}

export const useMessengerStore = defineStore(
  "messenger",
  () => {
    const mode = ref(ChattingMode.DirectChat);
    const selectedGroupChatRef: Ref<GroupChatModel> = ref({
        id : 0,
        name : "",
        avatarUrl : "",
        messages : [],
    })

    function activateGroupChat() {
      mode.value = ChattingMode.GroupChat;
    }

    function activateDirectChat() {
      mode.value = ChattingMode.DirectChat;
    }

    // GroupChat Select
    function selectGroupChat(groupChat: GroupChat) {
      selectedGroupChatRef.value.id = groupChat.id;
      selectedGroupChatRef.value.name = groupChat.name;
      selectedGroupChatRef.value.avatarUrl = groupChat.avatarUrl;
      selectedGroupChatRef.value.messages.splice(0);
      groupChat.messages.forEach((message) => {
        selectedGroupChatRef.value.messages.push(message);
      });
    }

    // function addMessage(groupChatId: number, message: ReceivedMessage) {
    //   const findGroupChat = find(groupChatId);
    //   findGroupChat.messages.push(message);
    //   selected.value.messages.push(message);
    // }

    return {
      mode,
      selectedGroupChatRef,
      activateGroupChat,
      activateDirectChat,
      selectGroupChat
    };
  },
  {persist: false}
);

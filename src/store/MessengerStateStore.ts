import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import GroupChat, {IGroupChat} from "@/modules/groupchat/GroupChat";
import {ReceivedMessage} from "@/modules/groupchat/interface";
import {GroupChatDto} from "@/modules/groupchat/dto";

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

export const useMessengerStateStore = defineStore(
  "messenger",
  () => {
    const mode = ref(ChattingMode.DirectChat);

    const selectedGroupChat: Ref<GroupChatModel> = ref({
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
    function selectGroupChat(groupChat: IGroupChat) {
      selectedGroupChat.value.id = groupChat.id
      selectedGroupChat.value.name = groupChat.name
      selectedGroupChat.value.avatarUrl = groupChat.avatarUrl
      selectedGroupChat.value.messages.splice(0)
      groupChat.messages.forEach((message) => {
        selectedGroupChat.value.messages.push(message)
      })
    }

    // function addMessage(groupChatId: number, message: ReceivedMessage) {
    //   const findGroupChat = find(groupChatId);
    //   findGroupChat.messages.push(message);
    //   selected.value.messages.push(message);
    // }

    return {
      mode,
      selectedGroupChat,
      activateGroupChat,
      activateDirectChat,
      selectGroupChat,
    };
  },
  {persist: false}
);

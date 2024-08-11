import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {IGroupChat} from "@/domain/groupchat/GroupChat";
import {IDirectChat} from "@/domain/directchat/DirectChat";
import MessageClient from "@/common/websocket/MessageClient";
import GroupChatModel from "@/domain/messenger/GroupChatModel";
import DirectChatModel from "@/domain/messenger/DirectChatModel";

export enum ChattingMode {
  None,
  GroupChat,
  DirectChat
}

export const useMessengerStateStore = defineStore(
  "messenger",
  () => {
    const messageClient = MessageClient.getInstance()
    const mode = ref(ChattingMode.None);

    const selectedGroupChat: Ref<GroupChatModel> = ref(new GroupChatModel())
    const selectedDirectChat: Ref<DirectChatModel> = ref(new DirectChatModel())

    messageClient.addGroupMessageHandler(message => {
      if (selectedGroupChat.value.id === message.groupChatId) {
        selectedGroupChat.value.messages.push(message)
      }
    })

    messageClient.addDirectMessageHandler(message => {
      if (selectedDirectChat.value.id === message.directChatId) {
        selectedDirectChat.value.messages.push(message)
      }
    })

    function activateGroupChat(groupChat: IGroupChat) {
      mode.value = ChattingMode.GroupChat;
      selectedGroupChat.value.assign(groupChat)
    }

    function activateDirectChat(directChat: IDirectChat) {
      mode.value = ChattingMode.DirectChat;
      selectedDirectChat.value.assign(directChat)
    }

    return {
      mode,
      selectedGroupChat,
      activateGroupChat,
      activateDirectChat,
      selectedDirectChat,
    };
  },
  {persist: false}
);

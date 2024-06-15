import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {IGroupChat} from "@/modules/groupchat/GroupChat";
import {ReceivedGroupMessage} from "@/modules/groupchat/interface";
import {ReceivedDirectMessage} from "@/modules/directchat/interface";
import {IDirectChat} from "@/modules/directchat/DirectChat";

interface GroupChatModel {
  id: number;
  name: string;
  avatarUrl: string;
  messages: ReceivedGroupMessage[];
}

interface DirectChatModel {
  id: number
  otherUserId: number
  messages: ReceivedDirectMessage[];
}

export enum ChattingMode {
  None,
  GroupChat,
  DirectChat
}

export const useMessengerStateStore = defineStore(
  "messenger",
  () => {
    const mode = ref(ChattingMode.None);

    const selectedGroupChat: Ref<GroupChatModel> = ref({
        id : 0,
        name : "",
        avatarUrl : "",
        messages : [],
    })

    const selectedDirectChat: Ref<DirectChatModel> = ref({
      id : 0,
      otherUserId : 0,
      name : "",
      messages : [],
    })

    function activateGroupChat() {
      mode.value = ChattingMode.GroupChat;
    }

    function activateDirectChat(directChat: IDirectChat) {
      mode.value = ChattingMode.DirectChat;
      selectDirectChat(directChat)
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

    function selectDirectChat(directChat : IDirectChat) {
      selectedDirectChat.value.id = directChat.id;
      selectedDirectChat.value.otherUserId = directChat.otherUserId;
      selectedDirectChat.value.messages.splice(0);
      directChat.messages.forEach((message) => {
        selectedDirectChat.value.messages.push(message);
      });
    }

    // function addMessage(groupChatId: number, message: ReceivedMessage) {
    //   const findGroupChat = find(groupChatId);
    //   findGroupChat.messages.push(message);
    //   selected.value.messages.push(message);
    // }

    // DirectChat Legacy
    // const selected : DirectChat  = dummyDirectChat;
    // function getSelected() : DirectChat{
    //   return selected
    // }

    // function addMessage(message: ReceivedDirectMessage) {
    //   // 보낸 메시지
    //   const authentication = useAuthenticationStore();
    //   if (message.senderId === authentication.getUser().id) {
    //     const directChat = find(message.directChatId);
    //     directChat.messages.push(message);
    //     selected.messages.push(message);
    //   } else {
    //     // 받은 메시지
    //     const directChat = find(message.directChatId);
    //     directChat.messages.push(message);
    //     selected.messages.push(message);
    //   }
    // }

    return {
      mode,
      selectedGroupChat,
      activateGroupChat,
      activateDirectChat,
      selectGroupChat,
      selectedDirectChat,
      selectDirectChat,
    };
  },
  {persist: false}
);

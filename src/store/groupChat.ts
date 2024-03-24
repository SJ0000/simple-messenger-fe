import { defineStore } from "pinia";
import { GroupChat, ReceivedMessage } from "@/modules/groupchat/interface";
import { Ref, ref } from "vue";

const dummyGroupChat = {
  id: 0,
  name: "",
  avatarUrl: "",
  users: [],
  messages: [],
};

export const useGroupChatStore = defineStore(
  "groupChat",
  () => {
    const selected: Ref<GroupChat> = ref(dummyGroupChat);
    const groupChats: Ref<Map<number, GroupChat>> = ref(
      new Map<number, GroupChat>()
    );

    function initialize(groupChatArray: Array<GroupChat>) {
      groupChatArray.forEach((groupChat) => {
        if (groupChat.avatarUrl.length === 0) {
          groupChat.avatarUrl = "/src/assets/default-avatar.jpg";
        }
        groupChat.messages = [];
        groupChats.value.set(groupChat.id, groupChat);
      });
    }

    function join(groupChat: GroupChat) {
      groupChat.messages = [];
      if (groupChat.avatarUrl.length === 0) {
        groupChat.avatarUrl = "/src/assets/default-avatar.jpg";
      }
      groupChats.value.set(groupChat.id, groupChat);
    }

    function find(groupChatId: number): GroupChat {
      const findGroupChat = groupChats.value.get(groupChatId);
      if (findGroupChat === undefined)
        throw Error(`Chat Room id ${groupChatId} not found`);

      return findGroupChat;
    }

    function select(groupChatId: number) {
      const groupChat = find(groupChatId);
      selected.value.id = groupChat.id;
      selected.value.name = groupChat.name;
      selected.value.avatarUrl = groupChat.avatarUrl;
      selected.value.users = groupChat.users;
      selected.value.messages.splice(0);
      groupChat.messages.forEach((message) => {
        selected.value.messages.push(message);
      });
    }

    function addMessage(groupChatId: number, message: ReceivedMessage) {
      const findGroupChat = find(groupChatId);
      findGroupChat.messages.push(message);
      selected.value.messages.push(message);
    }

    return {
      selected,
      groupChats: groupChats,
      initialize,
      join,
      find,
      select,
      addMessage,
    };
  },
  { persist: false }
);

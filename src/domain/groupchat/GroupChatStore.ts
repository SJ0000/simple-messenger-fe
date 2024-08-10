import {defineStore} from "pinia"
import {ReceivedGroupMessage, GroupChatDto} from "@/domain/groupchat/interface"
import GroupChat, {IGroupChat} from "@/domain/groupchat/GroupChat"
import {ref} from "vue";

export const useGroupChatStore = defineStore(
  "groupChat",
  () => {

    const groupChats = ref(new Map<number, GroupChat>());

    function initialize(groupChatDtos: GroupChatDto[]) {
      groupChats.value.clear()
      groupChatDtos.forEach((groupChatDto) => {
        join(groupChatDto)
      });
    }

    function join(groupChatDto: GroupChatDto) {
      if (groupChatDto.avatarUrl === "")
        groupChatDto.avatarUrl = "/src/assets/default-avatar.jpg"
      groupChats.value.set(groupChatDto.id, new GroupChat(groupChatDto.id, groupChatDto.name, groupChatDto.avatarUrl));
    }

    function findAll() : IGroupChat[]{
      return Array.from(groupChats.value.values())
    }

    function find(groupChatId: number) {
      const findGroupChat = groupChats.value.get(groupChatId);
      if (findGroupChat === undefined)
        throw Error(`Chat Room id ${groupChatId} not found`);
      return findGroupChat;
    }

    function exists(groupChatId: number): boolean {
      return groupChats.value.has(groupChatId)
    }

    function addMessage(groupChatId: number, message: ReceivedGroupMessage) {
      const findGroupChat = find(groupChatId);
      findGroupChat.addMessage(message)
    }

    return {
      groupChats,
      initialize,
      join,
      find,
      findAll,
      addMessage,
      exists
    };
  },
  {persist: false}
);

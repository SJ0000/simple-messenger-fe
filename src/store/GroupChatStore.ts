import {defineStore} from "pinia";
import {ReceivedMessage} from "@/modules/groupchat/interface";
import GroupChat from "@/modules/groupchat/GroupChat"
import {GroupChatDto} from "@/modules/groupchat/dto";


export const useGroupChatStore = defineStore(
  "groupChat",
  () => {

    const groupChatMap: Map<number, GroupChat> = new Map<number, GroupChat>();

    function getGroupChats(): Map<number, GroupChat> {
      return groupChatMap
    }

    function initialize(groupChatDtos: GroupChatDto[]) {
      groupChatMap.clear()
      groupChatDtos.forEach((groupChatDto) => {
        join(groupChatDto)
      });
    }

    function join(groupChatDto: GroupChatDto) {
      if (groupChatDto.avatarUrl === "")
        groupChatDto.avatarUrl = "/src/assets/default-avatar.jpg"
      groupChatMap.set(groupChatDto.id, new GroupChat(groupChatDto.id, groupChatDto.name, groupChatDto.avatarUrl));
    }

    function find(groupChatId: number): GroupChat {
      const findGroupChat = groupChatMap.get(groupChatId);
      if (findGroupChat === undefined)
        throw Error(`Chat Room id ${groupChatId} not found`);
      return findGroupChat;
    }

    function findAll(): GroupChat[] {
      return Array.from(groupChatMap.values())
    }

    function addMessage(groupChatId: number, message: ReceivedMessage) {
      const findGroupChat = find(groupChatId);
      findGroupChat.addMessage(message)
      // selected에도
    }

    return {
      getGroupChats,
      initialize,
      join,
      find,
      findAll,
      addMessage,
    };
  },
  {persist: false}
);

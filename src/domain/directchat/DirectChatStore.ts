import {defineStore} from "pinia";
import {ReceivedDirectMessage, DirectChatDto} from "@/domain/directchat/interface";
import DirectChat, {IDirectChat} from "@/domain/directchat/DirectChat";
import {ref} from "vue";


export const useDirectChatStore = defineStore(
  "directChat",
  () => {
    const directChats = ref(new Map<number, DirectChat>())

    function initialize(directChatDtos: DirectChatDto[]) {
      directChats.value.clear()
      directChatDtos.forEach((directChatDto) => {
        join(directChatDto)
      });
    }

    function join(dto: DirectChatDto) {
      const directChat = new DirectChat(dto.id, dto.otherUser.id);
      directChats.value.set(directChat.id, directChat);
    }

    function find(directChatId: number) {
      const directChat = directChats.value.get(directChatId);
      if (directChat === undefined){
        throw Error(`DirectChat(id = ${directChatId}) not found`)
      }
      return directChat
    }

    function findByOtherUserId(otherUserId: number): IDirectChat | undefined{
      return Array.from(directChats.value.values()).find(directChat => {
        return directChat.otherUserId === otherUserId
      })
    }

    function exists(directChatId: number): boolean {
      return directChats.value.has(directChatId)
    }

    function existsByOtherUserId(otherUserId: number): boolean {
      const result = Array.from(directChats.value.values()).find(directChat => {
        return directChat.otherUserId === otherUserId
      })
      return result !== undefined
    }

    function addMessage(message: ReceivedDirectMessage) {
      const directChat = find(message.directChatId);
      directChat.messages.push(message);
    }

    return {initialize, find, join, exists, addMessage, findByOtherUserId, existsByOtherUserId};
  },
  {persist: false}
);

import {defineStore} from "pinia";
import {DirectChatDto, ReceivedDirectMessage} from "@/domain/directchat/interface";
import DirectChat, {IDirectChat} from "@/domain/directchat/DirectChat";
import {ref} from "vue";
import {ApiClient} from "@/common/api/ApiClient";
import {useUserStore} from "@/domain/user/UserStore";


export const useDirectChatStore = defineStore(
  "directChat",
  () => {
    const apiClient = ApiClient.getInstance()
    const userStore = useUserStore()
    const directChats = ref(new Map<number, DirectChat>())

    async function initialize() {
      const directChatDtos = await apiClient.getDirectChats()
      directChats.value.clear()
      directChatDtos.forEach((directChatDto) => {
        join(directChatDto)
      });
    }

    async function create(otherUserId: number) {
      const otherUser = userStore.find(otherUserId)
      const directChatId = await apiClient.createDirectChats(otherUserId)
      join({
        id: directChatId,
        otherUser: otherUser,
      })
    }

    function join(dto: DirectChatDto) {
      const directChat = new DirectChat(dto.id, dto.otherUser.id);
      directChats.value.set(directChat.id, directChat);
    }

    function find(directChatId: number) {
      const directChat = directChats.value.get(directChatId);
      if (directChat === undefined) {
        throw Error(`DirectChat(id = ${directChatId}) not found`)
      }
      return directChat
    }

    function findByOtherUserId(otherUserId: number): IDirectChat | undefined {
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

    async function loadPreviousMessages(directChatId: number): Promise<ReceivedDirectMessage[]> {
      const previousMessages = await apiClient.getPreviousDirectMessages(directChatId);
      previousMessages.forEach(message => {
        addMessage(message)
      })
      return previousMessages
    }

    return {initialize, find, join, exists, addMessage, findByOtherUserId,
      existsByOtherUserId, create, loadPreviousMessages};
  },
  {persist: false}
);

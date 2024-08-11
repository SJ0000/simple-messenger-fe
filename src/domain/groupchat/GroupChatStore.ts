import {defineStore} from "pinia"
import {GroupChatCreateDto, GroupChatDto, ParticipantDto, ReceivedGroupMessage} from "@/domain/groupchat/interface"
import GroupChat, {IGroupChat} from "@/domain/groupchat/GroupChat"
import {ref} from "vue";
import ApiClient from "@/common/api/ApiClient";
import MessageClient from "@/common/websocket/MessageClient";
import useUserStore from "@/domain/user/UserStore";
import User from "@/domain/user/User";

const useGroupChatStore = defineStore(
  "groupChat",
  () => {
    const apiClient = ApiClient.getInstance()
    const userStore = useUserStore()
    const groupChats = ref(new Map<number, GroupChat>())

    async function initialize(){
      groupChats.value.clear()
      const myGroupChats = await apiClient.getMyGroupChats()

      for (const groupChat of myGroupChats) {
        addGroupChat(groupChat)
        const groupChatWithUsers = await apiClient.getGroupChat(groupChat.id)
        const users = extractUsers(...groupChatWithUsers.participants)
        userStore.addIfAbsent(...users)
      }
    }

    function extractUsers(...participants : ParticipantDto[]) : User[]{
      return participants.map((dto) => {
        return new User(dto.user)
      })
    }

    async function create(dto: GroupChatCreateDto): Promise<number> {
      const createdGroupChat = await apiClient.createGroupChat(dto)
      await join(createdGroupChat.id)
      MessageClient.getInstance().subscribeChat(find(createdGroupChat.id))
      return createdGroupChat.id
    }

    async function join(groupChatId: number) {
      const joinedGroupChat = await apiClient.joinGroupChat(groupChatId)
      addGroupChat(joinedGroupChat)
    }

    function addGroupChat(dto : GroupChatDto){
      if (dto.avatarUrl === "")
        dto.avatarUrl = "/src/assets/default-avatar.jpg"
      groupChats.value.set(dto.id, new GroupChat(dto.id, dto.name, dto.avatarUrl));
    }

    function findAll(): IGroupChat[] {
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

    async function loadPreviousMessages(groupChatId: number) :Promise<ReceivedGroupMessage[]>{
      const previousMessages = await apiClient.getPreviousGroupMessages(groupChatId);
      previousMessages.forEach(message => {
        addMessage(message.groupChatId, message)
      })
      return previousMessages
    }

    return {
      groupChats,
      initialize,
      create,
      join,
      find,
      findAll,
      addMessage,
      exists,
      loadPreviousMessages
    };
  },
  {persist: false}
);

export default useGroupChatStore

<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="2">
        <Friends/>
      </v-col>
      <v-col cols="3">
        <GroupChatList/>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div v-if="mode === ChattingMode.GroupChat">
          <GroupChat/>
        </div>
        <div v-if="mode === ChattingMode.DirectChat">
          <DirectChat/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import GroupChatList from "@/components/messenger/GroupChatList.vue";
import GroupChat from "@/components/messenger/GroupChat.vue";
import DirectChat from "@/components/messenger/DirectChat.vue";
import Friends from "@/components/messenger/Friends.vue";
import {MessageClient} from "@/modules/api/MessageClient";
import {ApiClient} from "@/modules/api/ApiClient";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import {useDirectChatStore} from "@/store/DirectChatStore";
import {ChattingMode, useMessengerStateStore} from "@/store/MessengerStateStore";
import User from "@/modules/user/User";
import {useFriendStore} from "@/store/FriendStore";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/UserStore";
import {UserDto} from "@/modules/user/dto";

const authentication = useAuthenticationStore()
const groupChatStore = useGroupChatStore()
const messengerStore = useMessengerStateStore()
const friendStore = useFriendStore()
const userStore = useUserStore()

const {mode} = storeToRefs(messengerStore)

const friends: Array<UserDto> = await ApiClient.getInstance().getMyFriends()
friendStore.initialize(friends)

friends.forEach((dto) => {
  userStore.addIfAbsent(new User(dto.id, dto.name, dto.email, dto.avatarUrl, dto.statusMessage, dto.publicIdentifier))
})

const groupChats = await ApiClient.getInstance().getMyGroupChats();
for (let groupChat of groupChats) {
  const groupChatWithUsers = await ApiClient.getInstance().getGroupChat(groupChat.id)
  const users = groupChatWithUsers.users.map((dto) => {
    return new User(dto.id, dto.name, dto.email, dto.avatarUrl, dto.statusMessage, dto.publicIdentifier)
  })
  userStore.addIfAbsent(...users)
}

if (groupChats.length > 0) {
  groupChatStore.initialize(groupChats)
  messengerStore.selectGroupChat(groupChatStore.find(groupChats[0].id))
  useMessengerStateStore().activateGroupChat()
}

const directChats = await ApiClient.getInstance().getDirectChats();
useDirectChatStore().initialize(directChats)

const authorization = authentication.getAccessToken()
const user = authentication.getUser()
MessageClient.getInstance().onGroupMessageReceived = message => {
  if (messengerStore.mode === ChattingMode.GroupChat && messengerStore.selectedGroupChat.id === message.groupChatId) {
    messengerStore.selectedGroupChat.messages.push(message)
  }
}

MessageClient.getInstance().onDirectMessageReceived = message => {
  if (messengerStore.mode === ChattingMode.DirectChat && messengerStore.selectedDirectChat.id === message.directChatId) {
    messengerStore.selectedDirectChat.messages.push(message)
  }
}

MessageClient.getInstance().start(authorization, user, groupChatStore.findAll())

</script>

<style scoped></style>@/store/groupChat

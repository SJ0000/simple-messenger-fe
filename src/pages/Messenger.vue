<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="2">
        <Friends />
      </v-col>
      <v-col cols="3">
        <ChatRoomList />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div v-show="mode === `CHATROOM`">
          <Chat />
        </div>
        <div v-show="mode === `DIRECTCHAT`">
          <DirectChat />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ChatRoomList from "@/components/messenger/ChatRoomList.vue";
import Chat from "@/components/messenger/Chat.vue";
import DirectChat from "@/components/messenger/DirectChat.vue";
import Friends from "@/components/messenger/Friends.vue";
import { MessageClient } from "@/modules/api/message-client";
import { ApiClient } from "@/modules/api/api-client";
import { useChatRoomStore } from "@/store/chatRoom";
import { useAuthenticationStore } from "@/store/authentication";
import router from "@/router";
import { directChatStore } from "@/store/directChat";
import { messengerStore } from "@/store/messenger";
import { User } from "@/modules/user/interface";
import { friendStore } from "@/store/friendStore";
import { storeToRefs } from "pinia";

const authentication = useAuthenticationStore()
const chatRoomStore = useChatRoomStore()

if (!authentication.isLoggedIn)
  router.push("/")

const friends: Array<User> = await ApiClient.getInstance().getMyFriends()
friendStore().initialize(friends)

const chatRooms = await ApiClient.getInstance().getMyChatRooms();
chatRooms.forEach(async chatRoom => {
  const chatRoomWithUsers = await ApiClient.getInstance().getChatRoom(chatRoom.id)
  chatRoom.users = chatRoomWithUsers.users
})

if (chatRooms.length > 0) {
  chatRoomStore.initialize(chatRooms)
  chatRoomStore.select(chatRooms[0].id)
}

const directChats = await ApiClient.getInstance().getDirectChats();
directChatStore().initialize(directChats)

const authoritzation = authentication.getAccessToken()
const user = authentication.getUser()
MessageClient.getInstance().start(authoritzation, user, chatRooms)

const { mode } = storeToRefs(messengerStore())


</script>

<style scoped></style>
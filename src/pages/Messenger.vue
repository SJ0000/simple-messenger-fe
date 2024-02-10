<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="4">
        <ChatRoomList />
      </v-col>
      <v-divider vertical="true"></v-divider>
      <v-col cols="8">
        <Chat />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ChatRoomList from "@/components/ChatRoomList.vue";
import Chat from "@/components/Chat.vue";
import { MessageClient } from "@/modules/chat/message-client";
import { ApiClient } from "@/modules/common/api-client";
import { chatRoomStore } from "@/store/chatroom";
import { authenticationStore } from "@/store/authentication";
import router from "@/router";

if (!authenticationStore().isLoggedIn)
  router.push("/")


const chatRooms = await ApiClient.getInstance().getMyChatRooms();
if (chatRooms.length > 0) {
  chatRoomStore().initialize(chatRooms)
  chatRoomStore().select(chatRooms[0].id)
}

const authoritzation = authenticationStore().getAccessToken()
MessageClient.getInstance().start(authoritzation)


</script>
<style scoped></style>

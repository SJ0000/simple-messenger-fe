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
        <Chat />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ChatRoomList from "@/components/messenger/ChatRoomList.vue";
import Chat from "@/components/messenger/Chat.vue";
import Friends from "@/components/messenger/Friends.vue";
import { MessageClient } from "@/modules/api/message-client";
import { ApiClient } from "@/modules/api/api-client";
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
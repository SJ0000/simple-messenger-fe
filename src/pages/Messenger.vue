<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="bg-red" cols="4">
        <ChatRoomList/>
      </v-col>
      <v-col class="bg-blue" cols="8">
        <Chat></Chat>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ChatRoomList from "@/components/ChatRoomList.vue";
import Chat from "@/components/Chat.vue";
import {MessageClient} from "@/modules/chat/message-client";
import {ApiClient} from "@/modules/common/api-client";
import {ChatRoom} from "@/modules/chat/interface";
import {chatRoomStore} from "@/store/chatroom";
import {messageStore} from "@/store/message";

ApiClient.getInstance().getMyChatrooms().then(
  (chatRooms) => {
    chatRoomStore().initialize(chatRooms)
    console.log(chatRooms)
  }
)

messageStore().initialize()

// MessageClient.getInstance().start(message => {
//   // message store에 저장
// })

</script>

<style scoped>

</style>

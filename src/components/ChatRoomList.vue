<template>
  <div class="d-flex justify-end mb-1">
    <v-btn @click="addChatRoom">ADD Chat Room</v-btn>
  </div>
  <v-list item-props lines="three">
    <v-list-subheader title="Chat rooms"/>
    <template v-for="(room, index) in chatRooms" :key="index">
      <v-list-item
        v-if="room.avatarUrl"
        :prepend-avatar="room.avatarUrl"
        :title="room.name">
        <span class="mr-1 text-blue text-subtitle-2"> Last Message Sender - </span>
        <span class="text-subtitle-2"> Last Message Content. Not yet implemented </span>
      </v-list-item>
      <v-list-item
        v-else
        prepend-avatar="@/assets/default-avatar.jpg"
        :title="room.name">
        <span class="mr-1 text-blue text-subtitle-2"> Last Message Sender - </span>
        <span class="text-subtitle-2"> Last Message Content. Not yet implemented </span>
      </v-list-item>
      <v-divider/>
    </template>
  </v-list>
</template>
<script setup lang="ts">

import {ChatRoom} from "@/modules/chat/interface";
import {ApiClient} from "@/modules/common/api-client";
import {chatRoomStore} from "@/store/chatroom";
import {reactive} from "vue";


const chatRooms = reactive(chatRoomStore().chatRooms)

async function addChatRoom() {
  const chatRoom = await ApiClient.getInstance().createChatRoom({name: "TEST"});
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(chatRoom.id);
  chatRoomStore().join(joinedChatRoom)
}

</script>


<style scoped>
</style>

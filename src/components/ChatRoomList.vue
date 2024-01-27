<template>
  <div class="d-flex justify-end mb-1">
    <v-btn @click="addChatRoom">ADD Chat Room</v-btn>
  </div>
  <v-list item-props lines="three" style="height: 600px">
    <v-list-subheader title="Chat rooms"/>
    <template v-for="[chatRoomId, chatRoom] in chatRooms" :key="chatRoomId">
      <v-list-item
        v-if="chatRoom.avatarUrl"
        :prepend-avatar="chatRoom.avatarUrl"
        :title="chatRoom.name"
        :active="selected.id === chatRoomId"
        @click="onChatRoomSelected(chatRoomId)"
      >
        <span class="mr-1 text-blue text-subtitle-2"> Last Message Sender - </span>
        <span class="text-subtitle-2"> Last Message Content. Not yet implemented </span>
      </v-list-item>
      <v-list-item
        v-else
        prepend-avatar="@/assets/default-avatar.jpg"
        :active="selected.id === chatRoomId"
        @click="onChatRoomSelected(chatRoomId)"
        :title="chatRoom.name">
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
import {reactive, ref} from "vue";

const chatRooms = ref(chatRoomStore().chatRooms)
const selected = reactive(chatRoomStore().selected)

async function addChatRoom() {
  // todo name 설정
  const chatRoom = await ApiClient.getInstance().createChatRoom({name: "TEST"});
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(chatRoom.id);
  chatRoomStore().join(joinedChatRoom)
}

function onChatRoomSelected(chatRoomId : number){
  chatRoomStore().select(chatRoomId)
}

</script>

<style scoped>
</style>

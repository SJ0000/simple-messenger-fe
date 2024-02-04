<template>
  <div class="d-flex justify-end mb-1">
    <v-btn color="primary" @click="onAddChatRoomClick"> add chat room </v-btn>
    <CreateChatRoomDialog ref="dialog"/>
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

import {chatRoomStore} from "@/store/chatroom";
import {reactive, ref} from "vue";
import CreateChatRoomDialog from "@/components/dialog/CreateChatRoomDialog.vue";

const chatRooms = ref(chatRoomStore().chatRooms)
const selected = reactive(chatRoomStore().selected)

const dialog = ref<InstanceType<typeof CreateChatRoomDialog> | null>(null)

function onChatRoomSelected(chatRoomId : number){
  chatRoomStore().select(chatRoomId)
}

function onAddChatRoomClick(){
  dialog.value?.open()
}

</script>

<style scoped>
</style>

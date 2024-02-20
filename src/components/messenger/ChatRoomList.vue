<template>
  <div class="d-flex justify-end mb-2">
    <v-btn :icon="mdiChatPlus" @click="onAddChatRoomClick" />
  </div>
  <v-list item-props lines="three" style="height: 600px">
    <v-list-subheader title="대화방 목록" />
    <template v-for="[chatRoomId, chatRoom] in chatRooms" :key="chatRoomId">
      <v-list-item :prepend-avatar="chatRoom.avatarUrl" :title="chatRoom.name" :active="selected.id === chatRoomId"
        @click="onChatRoomSelected(chatRoomId)">
        <span class="mr-1 text-blue text-subtitle-2"> {{ getLastMessageSender(chatRoom) }} </span>
        <span class="text-subtitle-2"> {{ getLastMessageContent(chatRoom) }} </span>
      </v-list-item>
      <v-divider />
    </template>
  </v-list>
  <CreateChatRoomDialog ref="dialog" />
</template>
<script setup lang="ts">

import { mdiChatPlus } from "@mdi/js";
import { chatRoomStore } from "@/store/chatroom";
import { reactive, ref } from "vue";
import CreateChatRoomDialog from "@/components/dialog/CreateChatRoomDialog.vue";
import { ChatRoom } from "@/modules/chat/interface"

const chatRooms = ref(chatRoomStore().chatRooms)
const selected = reactive(chatRoomStore().selected)

const dialog = ref<InstanceType<typeof CreateChatRoomDialog> | null>(null);


function onChatRoomSelected(chatRoomId: number) {
  chatRoomStore().select(chatRoomId)
}

function onAddChatRoomClick() {
  dialog.value?.open()
}


function getLastMessageSender(chatRoom: ChatRoom): string {
  if (chatRoom.messages.length === 0)
    return ""
  const lastMessage = chatRoom.messages[chatRoom.messages.length - 1]
  const sender = chatRoom.users.find(user => user.id === lastMessage.senderId)
  return sender ? sender.name : "unknown"
}

function getLastMessageContent(chatRoom: ChatRoom): string {
  if (chatRoom.messages.length === 0)
    return ""
  return chatRoom.messages[chatRoom.messages.length - 1].content
}

</script>

<style scoped></style>@/store/chatRoom
<template>
  <div class="d-flex justify-end mb-2">
    <v-btn :icon="mdiChatPlus" @click="onAddGroupChatClick" />
  </div>
  <v-list item-props lines="three" style="height: 600px">
    <v-list-subheader title="대화방 목록" />
    <template v-for="[id, groupChat] in groupChatStore.groupChats" :key="id">
      <v-list-item :prepend-avatar="groupChat.avatarUrl" :title="groupChat.name" :active="selectedGroupChat.id === id"
        @click="onGroupChatSelected(groupChat.id)">
        <span class="mr-1 text-blue text-subtitle-2"> {{ getLastMessageSender(id) }} </span>
        <span class="text-subtitle-2"> {{ getLastMessageContent(id) }} </span>
      </v-list-item>
      <v-divider />
    </template>
  </v-list>
  <CreateGroupChatDialog ref="dialog" />
</template>
<script setup lang="ts">

import {mdiChatPlus} from "@mdi/js";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {ref} from "vue";
import CreateGroupChatDialog from "@/components/dialog/CreateGroupChatDialog.vue";
import {useMessengerStateStore} from "@/store/MessengerStateStore";
import {useUserStore} from "@/store/UserStore";
import {storeToRefs} from "pinia";

const groupChatStore = useGroupChatStore()
const messengerStateStore = useMessengerStateStore()
const userStore = useUserStore()

const { selectedGroupChat } = storeToRefs(messengerStateStore)

const dialog = ref<InstanceType<typeof CreateGroupChatDialog> | null>(null);

function onGroupChatSelected(groupChatId: number) {
  const groupChat = groupChatStore.find(groupChatId)
  messengerStateStore.activateGroupChat(groupChat)
}

function onAddGroupChatClick() {
  dialog.value?.open()
}

function getLastMessageSender(groupChatId: number): string {
  const groupChat = groupChatStore.find(groupChatId)
  if (groupChat.messages.length === 0)
    return ""

  const lastMessage = groupChat.messages[groupChat.messages.length - 1]
  if(!userStore.exists(lastMessage.senderId))
    return "unknown"

  return userStore.find(lastMessage.senderId).name
}

function getLastMessageContent(groupChatId: number): string {
  const groupChat = groupChatStore.find(groupChatId)
  if (groupChat.messages.length === 0)
    return ""
  return groupChat.messages[groupChat.messages.length - 1].content
}

</script>

<style scoped></style>

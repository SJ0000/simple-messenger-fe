<template>
  <div class="d-flex justify-end mb-2">
    <v-btn :icon="mdiChatPlus" @click="onAddGroupChatClick" />
  </div>
  <v-list item-props lines="three" style="height: 600px">
    <v-list-subheader title="대화방 목록" />
    <template v-for="[groupChatId, groupChat] in groupChats" :key="groupChatId">
      <v-list-item :prepend-avatar="groupChat.avatarUrl" :title="groupChat.name" :active="selected.id === groupChatId"
        @click="onGroupChatSelected(groupChatId)">
        <span class="mr-1 text-blue text-subtitle-2"> {{ getLastMessageSender(groupChat) }} </span>
        <span class="text-subtitle-2"> {{ getLastMessageContent(groupChat) }} </span>
      </v-list-item>
      <v-divider />
    </template>
  </v-list>
  <CreateGroupChatDialog ref="dialog" />
</template>
<script setup lang="ts">

import {mdiChatPlus} from "@mdi/js";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {reactive, ref} from "vue";
import CreateGroupChatDialog from "@/components/dialog/CreateGroupChatDialog.vue";
import {GroupChat} from "@/modules/groupchat/interface"
import {messengerStore} from "@/store/messenger";

const groupChatStore = useGroupChatStore()

const groupChats = groupChatStore.getGroupChats()
const selected = reactive(groupChatStore.getSelected())

const dialog = ref<InstanceType<typeof CreateGroupChatDialog> | null>(null);


function onGroupChatSelected(groupChatId: number) {
  groupChatStore.select(groupChatId)
  messengerStore().activateGroupChat()
}

function onAddGroupChatClick() {
  dialog.value?.open()
}

function getLastMessageSender(groupChat: GroupChat): string {
  if (groupChat.messages.length === 0)
    return ""
  const lastMessage = groupChat.messages[groupChat.messages.length - 1]
  const sender = groupChat.users.find(user => user.id === lastMessage.senderId)
  return sender ? sender.name : "unknown"
}

function getLastMessageContent(groupChat: GroupChat): string {
  if (groupChat.messages.length === 0)
    return ""
  return groupChat.messages[groupChat.messages.length - 1].content
}

</script>

<style scoped></style>

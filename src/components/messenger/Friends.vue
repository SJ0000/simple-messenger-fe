<template>
  <div class="d-flex justify-space-between">
    <div class="text-h6 ml-2">친구</div>
    <div class="mr-1">
      <v-btn class="mr-1" @click="onFriendRequestClick" :icon="mdiAccountBox" size="small"/>
      <v-btn @click="onAddFriendClick" :icon="mdiAccountPlus" size="small"/>
    </div>
  </div>
  <v-virtual-scroll :items="friends" height="650" item-height="50">
    <template v-slot:default="{ item }">
      <v-list-item :title="item.name" :subtitle="item.statusMessage" class="mt-4">
        <template v-slot:prepend>
          <v-avatar :image="item.avatarUrl"></v-avatar>
        </template>
        <template v-slot:append>
          <v-btn :icon="mdiChat" size="x-small" variant="tonal" @click="onFriendDirectChatClick(item.id)"/>
        </template>
      </v-list-item>
    </template>
  </v-virtual-scroll>
  <AddFriendDialog ref="addFriendDialog"/>
  <FriendRequestDialog ref="friendRequestDialog"/>
</template>

<script setup lang=ts>
import {mdiAccountBox, mdiAccountPlus, mdiChat} from '@mdi/js';
import FriendRequestDialog from '@/components/dialog/FriendRequestDialog.vue'
import AddFriendDialog from '@/components/dialog/AddFriendDialog.vue'
import {ref} from 'vue';
import {useDirectChatStore} from '@/domain/directchat/DirectChatStore';
import {ChattingMode, useMessengerStateStore} from '@/domain/messenger/MessengerStateStore';
import {useFriendStore} from '@/domain/friend/FriendStore';
import {ApiClient} from '@/common/api/ApiClient';
import Utility from "@/common/Utility";
import {useUserStore} from "@/domain/user/UserStore";

const directChatStore = useDirectChatStore()
const messengerStateStore = useMessengerStateStore()
const userStore = useUserStore()

const addFriendDialog = ref<InstanceType<typeof AddFriendDialog> | null>(null);
const friendRequestDialog = ref<InstanceType<typeof FriendRequestDialog> | null>(null);

const friends = useFriendStore().getFriends()

function onAddFriendClick() {
  addFriendDialog.value?.open()

}

function onFriendRequestClick() {
  friendRequestDialog.value?.open()
}

async function onFriendDirectChatClick(otherUserId: number) {
  if (messengerStateStore.mode === ChattingMode.DirectChat && messengerStateStore.selectedDirectChat.otherUserId === otherUserId)
    return;

  if (!directChatStore.existsByOtherUserId(otherUserId)) {
    await createDirectChat(otherUserId)
  }

  const directChat = Utility.validateUndefined(
    directChatStore.findByOtherUserId(otherUserId),
    `DirectChat(otherUserId = ${otherUserId}) not found`
  )

  messengerStateStore.activateDirectChat(directChat)
}

async function createDirectChat(otherUserId: number) {
  const directChatId = await ApiClient.getInstance().createDirectChats(otherUserId)
  const otherUser = userStore.find(otherUserId)
  directChatStore.join({
    id: directChatId,
    otherUser: otherUser,
  })
}

</script>

<style scoped></style>

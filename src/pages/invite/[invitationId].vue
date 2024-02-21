<template>
  <div class="d-flex justify-center align-center h-100">
    <v-card min-width="350">
      <v-card-item>
        <div class="text-overline">invitation</div>
      </v-card-item>
      <v-card-title>{{ invitation.inviterName }}</v-card-title>
      <v-card-subtitle class="mb-1">{{ invitation.inviterName }} invites you to join</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="w-100" @click="onJoinButtonClick">Join</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ApiClient } from "@/modules/api/api-client";
import { useChatRoomStore } from "@/store/chatroom";
import { useAuthenticationStore } from "@/store/authentication";
import router from "@/router";
import { useRoute } from "vue-router";

const authentication = useAuthenticationStore()
const chatRoomStore = useChatRoomStore()

const route = useRoute()

// Case 1: 비로그인 접근
if (!authentication.isLoggedIn)
  router.push("/")

if (typeof route.params.invitationId !== 'string')
  router.push("/")

const invitationId = route.params.invitationId as string
const invitation = await ApiClient.getInstance().getInvitation(invitationId)

// Case 2: 이미 대화방에 참여한 경우
if (chatRoomStore.chatRooms.has(invitation.chatRoomId)) {
  router.push("/messenger")
}

async function onJoinButtonClick() {
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(invitation.chatRoomId)
  chatRoomStore.join(joinedChatRoom)
  await router.push("/messenger")
}

</script>

<style scoped>
.mwh-500 {
  max-width: 500px;
  max-height: 500px;
}
</style>
@/modules/api/api-client@/store/chatRoom
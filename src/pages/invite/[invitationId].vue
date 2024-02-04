<template>
  <h2>{{invitation.inviterName}} invites you to the {{invitation.chatRoomName}} chat room</h2>
  <v-btn @click="onJoinButtonClick">Join</v-btn>
</template>

<script setup lang="ts">
import {ApiClient} from "@/modules/common/api-client";
import {chatRoomStore} from "@/store/chatroom";
import {authenticationStore} from "@/store/authentication";
import router from "@/router";

// Case 1: 비로그인 접근
if (!authenticationStore().isLoggedIn)
  router.push("/")

const invitationId = this.$route.params.invitationId
const invitation = await ApiClient.getInstance().getInvitation(invitationId)

// Case 2: 이미 대화방에 참여한 경우
if(chatRoomStore().chatRooms.has(invitation.chatRoomId)){
  router.push("/messenger")
}

async function onJoinButtonClick(){
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(invitation.chatRoomId)
  chatRoomStore().join(joinedChatRoom)
  await router.push("/messenger")
}

</script>

<style scoped>

</style>

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
import {ApiClient} from "@/modules/api/ApiClient";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import router from "@/plugins/unplugin-vue-router";
import {useRoute} from "vue-router";

const authentication = useAuthenticationStore()
const groupChatStore = useGroupChatStore()

const route = useRoute()

// Case 1: 비로그인 접근
if (!authentication.isLoggedIn)
  router.push("/")

const { invitationId } = route.params as { invitationId: string; }
const invitation = await ApiClient.getInstance().getInvitation(invitationId)

// Case 2: 이미 대화방에 참여한 경우
if (groupChatStore.exists(invitation.groupChatId)) {
  router.push("/messenger")
}

async function onJoinButtonClick() {
  const joinedGroupChat = await ApiClient.getInstance().joinGroupChat(invitation.groupChatId)
  groupChatStore.join(joinedGroupChat)
  await router.push("/messenger")
}

</script>

<style scoped>
.mwh-500 {
  max-width: 500px;
  max-height: 500px;
}
</style>@/store/groupChat

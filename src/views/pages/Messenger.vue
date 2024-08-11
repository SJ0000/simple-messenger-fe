<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="2">
        <Friends/>
      </v-col>
      <v-col cols="3">
        <GroupChatList/>
      </v-col>
      <v-col cols="6">
        <div v-if="mode === ChattingMode.GroupChat">
          <GroupChat/>
        </div>
        <div v-if="mode === ChattingMode.DirectChat">
          <DirectChat/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import GroupChatList from "@/components/messenger/GroupChatList.vue";
import GroupChat from "@/components/messenger/GroupChat.vue";
import DirectChat from "@/components/messenger/DirectChat.vue";
import Friends from "@/components/messenger/Friends.vue";
import MessageClient from "@/common/websocket/MessageClient";
import useGroupChatStore from "@/domain/groupchat/GroupChatStore";
import useAuthenticationStore from "@/domain/auth/AuthenticationStore";
import useDirectChatStore from "@/domain/directchat/DirectChatStore";
import {ChattingMode, useMessengerStateStore} from "@/domain/messenger/MessengerStateStore";
import useFriendStore from "@/domain/friend/FriendStore";
import {storeToRefs} from "pinia";
import useUserStore from "@/domain/user/UserStore";
import {useNotificationStore} from "@/domain/notification/NotificationStore";

const authentication = useAuthenticationStore()
const groupChatStore = useGroupChatStore()
const messengerStore = useMessengerStateStore()
const friendStore = useFriendStore()
const userStore = useUserStore()

const {mode} = storeToRefs(messengerStore)



await friendStore.initialize()

// groupChat Initialize
await groupChatStore.initialize()
const groupChats = groupChatStore.findAll();
if (groupChatStore.groupChats.size > 0) {
  messengerStore.activateGroupChat(groupChats[0])
}
// directChat Initialize
useDirectChatStore().initialize()

const authorization = authentication.getAccessToken()
const user = authentication.getUser()

messengerStore.initialize()

MessageClient.getInstance().start(authorization, user, groupChatStore.findAll())

useNotificationStore().initialize()


</script>

<style scoped></style>@/store/groupChat

<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="2">
        <Friends />
      </v-col>
      <v-col cols="3">
        <GroupChatList />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <div v-show="mode === `GROUPCHAT`">
          <GroupChat />
        </div>
        <div v-show="mode === `DIRECTCHAT`">
          <DirectChat />
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
import { MessageClient } from "@/modules/api/message-client";
import { ApiClient } from "@/modules/api/api-client";
import { useGroupChatStore } from "@/store/groupChat";
import { useAuthenticationStore } from "@/store/authentication";
import { directChatStore } from "@/store/directChat";
import { messengerStore } from "@/store/messenger";
import { User } from "@/modules/user/interface";
import { friendStore } from "@/store/friendStore";
import { storeToRefs } from "pinia";

const authentication = useAuthenticationStore()
const groupChatStore = useGroupChatStore()

const friends: Array<User> = await ApiClient.getInstance().getMyFriends()
friendStore().initialize(friends)

const groupChats = await ApiClient.getInstance().getMyGroupChats();
for (let groupChat of groupChats) {
  const groupChatWithUsers = await ApiClient.getInstance().getGroupChat(groupChat.id)
  groupChat.users = groupChatWithUsers.users
}

if (groupChats.length > 0) {
  groupChatStore.initialize(groupChats)
  groupChatStore.select(groupChats[0].id)
  messengerStore().activateGroupChat()
}

const directChats = await ApiClient.getInstance().getDirectChats();
directChatStore().initialize(directChats)

const authoritzation = authentication.getAccessToken()
const user = authentication.getUser()
MessageClient.getInstance().start(authoritzation, user, groupChats)

const { mode } = storeToRefs(messengerStore())


</script>

<style scoped></style>@/store/groupChat
<template>
  <div class="d-flex flex-column w-100 h-100">
    <header class="d-flex">
      <v-avatar class="mr-3">
        <v-img :src="directChat.otherUser.avatarUrl" />
      </v-avatar>
      <div class="text-h4"> {{ directChat.otherUser.name }}</div>
    </header>
    <v-virtual-scroll id="virtual-scroll" class="ma-1" :items="messages" height="600" item-height="50">
      <template v-slot:default="{ item }">
        <v-list-item v-if="item.senderId === user.id" :append-avatar="findUser(item.senderId).avatarUrl" class="ma-2">
          <div class="text-right">
            <div class="text-subtitle-2 font-weight-bold">{{ findUser(item.senderId).name }}</div>
            <div class="text-body-2">{{ item.content }}</div>
            <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
          </div>
        </v-list-item>
        <v-list-item v-else :prepend-avatar="findUser(item.senderId).avatarUrl" class="ma-2">
          <div>
            <div class="text-subtitle-2 font-weight-bold">{{ findUser(item.senderId).name }}</div>
            <div class="text-body-2">{{ item.content }}</div>
            <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
          </div>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <div class="d-flex">
      <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
      <v-textarea variant="outlined" rows="1" row-height="15" label="메시지" v-model="content"
        @keydown.enter.exact.prevent="pressEnterHandler" />
      <v-btn class="ml-2 mt-3" @click="sendMessageAndTextResetIfContentNotEmpty">
        보내기
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {reactive, ref} from "vue";
import {MessageClient} from "@/modules/api/MessageClient";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import {VVirtualScroll} from "vuetify/components";
import {User} from "@/modules/user/interface";
import {DirectChat, SentDirectMessage} from "@/modules/directchat/interface";
import {useDirectChatStore} from "@/store/DirectChatStore";
import Utility from "@/common/Utility";
import {ApiClient} from "@/modules/api/ApiClient";

const authentication = useAuthenticationStore()

const directChat: DirectChat = useDirectChatStore().selected
const messages = reactive(useDirectChatStore().selected.messages)
const content = ref("")
const user = authentication.getUser()

if(directChat.id !== 0 && messages.length === 0){
  loadPreviousMessage()
}

function createMessage(): SentDirectMessage {
  return {
    directChatId: directChat.id,
    messageType: "MESSAGE",
    senderId: user.id,
    receiverId: directChat.otherUser.id,
    content: content.value,
    sentAt: new Date()
  }
}

function findUser(userId: number): User {
  if (user.id == userId)
    return user;
  return directChat.otherUser;
}

function sendMessageAndTextResetIfContentNotEmpty() {
  if (content.value === "")
    return
  const message = createMessage()
  MessageClient.getInstance().sendDirect(directChat.otherUser.id, message)
  content.value = ""
}

function pressEnterHandler(event: KeyboardEvent) {
  if (event.isComposing)
    return;
  sendMessageAndTextResetIfContentNotEmpty()
}

async function loadPreviousMessage(){
  const previousMessages = await ApiClient.getInstance().getPreviousDirectMessages(directChat.id);
  directChat.messages.unshift(...previousMessages)
}

</script>
<style scoped></style>

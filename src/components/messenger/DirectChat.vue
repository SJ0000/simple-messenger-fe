<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="align-self-center" v-if="selectedDirectChat.id === 0">
      <div class="text-h6">대화방을 선택해주세요.</div>
    </div>
    <div v-show="selectedDirectChat.id !== 0">
      <header class="d-flex">
        <v-avatar class="mr-3">
          <v-img :src="otherUser.avatarUrl"/>
        </v-avatar>
        <div class="text-h4"> {{ otherUser.name }}</div>
      </header>
      <v-virtual-scroll id="virtual-scroll" class="ma-1" :items="messages" height="600" item-height="50">
        <template v-slot:default="{ item }">
          <v-list-item v-if="item.senderId === user.id" :append-avatar="user.avatarUrl" class="ma-2">
            <div class="text-right">
              <div class="text-subtitle-2 font-weight-bold">{{ user.name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
          <v-list-item v-else :prepend-avatar="otherUser.avatarUrl" class="ma-2">
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ otherUser.name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <div class="d-flex">
        <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
        <v-textarea variant="outlined" rows="1" row-height="15" label="메시지" v-model="content"
                    @keydown.enter.exact.prevent="pressEnterHandler"/>
        <v-btn class="ml-2 mt-3" @click="sendMessageAndTextResetIfContentNotEmpty">
          보내기
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {reactive, ref} from "vue";
import MessageClient from "@/common/websocket/MessageClient";
import useAuthenticationStore from "@/domain/auth/AuthenticationStore";
import {VVirtualScroll} from "vuetify/components";
import {SentDirectMessage} from "@/domain/directchat/interface";
import useDirectChatStore from "@/domain/directchat/DirectChatStore";
import Utility from "@/common/Utility";
import {useMessengerStateStore} from "@/domain/messenger/MessengerStateStore";
import useUserStore from "@/domain/user/UserStore";

const authentication = useAuthenticationStore()
const messengerStateStore = useMessengerStateStore()
const directChatStore = useDirectChatStore()
const selectedDirectChat = messengerStateStore.selectedDirectChat

const messages = reactive(selectedDirectChat.messages)
const content = ref("")

const user = authentication.getUser()
const otherUser = useUserStore().find(selectedDirectChat.otherUserId)

if (selectedDirectChat.id !== 0 && messages.length === 0) {
  const previousMessages = await directChatStore.loadPreviousMessages(selectedDirectChat.id);
  selectedDirectChat.messages.unshift(...previousMessages)
}

function createMessage(): SentDirectMessage {
  return {
    directChatId: selectedDirectChat.id,
    messageType: "MESSAGE",
    senderId: user.id,
    receiverId: selectedDirectChat.otherUserId,
    content: content.value
  }
}

function sendMessageAndTextResetIfContentNotEmpty() {
  if (content.value === "")
    return
  const message = createMessage()
  MessageClient.getInstance().sendDirect(message)
  content.value = ""
}

function pressEnterHandler(event: KeyboardEvent) {
  if (event.isComposing)
    return;
  sendMessageAndTextResetIfContentNotEmpty()
}

</script>
<style scoped></style>

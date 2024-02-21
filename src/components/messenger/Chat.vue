<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="align-self-center" v-if="chatRoom.id === 0">
      <div class="text-h6">대화방을 선택해주세요.</div>
    </div>
    <div v-show="chatRoom.id !== 0">
      <header class="d-flex justify-space-between">
        <span class="text-h4">{{ chatRoom.name }}</span>
        <v-btn @click="onInvitationLinkClick">초대 링크</v-btn>
        <InvitationLinkDialog ref="dialog" />
      </header>
      <v-virtual-scroll id="virtual-scroll" class="ma-1" :items="messages" height="600" item-height="50">
        <template v-slot:default="{ item }">
          <v-list-item v-if="item.senderId === user.id" :id="item.id" :append-avatar="findUser(item.senderId).avatarUrl"
            class="ma-2">
            <div class="text-right">
              <div class="text-subtitle-2 font-weight-bold">{{ findUser(item.senderId).name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
          <v-list-item v-else :id="item.id" :prepend-avatar="findUser(item.senderId).avatarUrl" class="ma-2">
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ findUser(item.senderId).name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <div class="d-flex">
        <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
        <v-textarea variant="outlined" rows="1" row-height="15" label="메시지" v-model="content"
          @keydown.enter.exact.prevent="pressEnterHandler" />
        <v-btn class="ml-2 mt-3" @click="onSendButtonClick">
          보내기
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiMessage } from "@mdi/js"
import { ChatRoom, SentMessage } from "@/modules/chat/interface";
import { reactive, Ref, ref } from "vue";
import { MessageClient } from "@/modules/api/message-client";
import { useAuthenticationStore } from "@/store/authentication";
import { useChatRoomStore } from "@/store/chatRoom";
import { ApiClient } from "@/modules/api/api-client";
import InvitationLinkDialog from "@/components/dialog/InvitationLinkDialog.vue";
import { VVirtualScroll } from "vuetify/components";
import { User } from "@/modules/user/interface";

const authentication = useAuthenticationStore()
const chatRoomStore = useChatRoomStore()

const chatRoom: Ref<ChatRoom> = ref(chatRoomStore.selected)
const messages = reactive(chatRoomStore.selected.messages)
const content = ref("")
const user = authentication.getUser()

const dialog = ref<InstanceType<typeof InvitationLinkDialog> | null>(null)

function createMessage(): SentMessage {
  return {
    chatRoomId: chatRoom.value.id,
    senderId: user.id,
    content: content.value,
    sentAt: new Date()
  }
}

function findUser(userId: number): User {
  const users = chatRoomStore.selected.users
  return users.find(user => user.id === userId) ?? { id: -1, name: "Unknown", email: "", avatarUrl: "", statusMessage: "", publicIdentifier: "" }
}

function sendMessageAndTextResetIfContentNotEmpty() {
  if (content.value === "")
    return
  const message = createMessage()
  MessageClient.getInstance().send(message)
  content.value = ""
}

async function onInvitationLinkClick() {
  const chatRoomId = chatRoom.value.id
  const invitation = await ApiClient.getInstance().createInvitation(chatRoomId)
  dialog.value?.open(`${import.meta.env.VITE_API_URL}/invite/${invitation.id}`)
}

function onSendButtonClick() {
  sendMessageAndTextResetIfContentNotEmpty()
}

function pressEnterHandler(event: KeyboardEvent) {
  if (event.isComposing)
    return;
  sendMessageAndTextResetIfContentNotEmpty()
}



function getFormattedDate(date: Date): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = add0IfLessThan10(d.getMonth())
  const day = add0IfLessThan10(d.getDay())
  const hour = add0IfLessThan10(d.getHours())
  const minutes = add0IfLessThan10(d.getMinutes())
  return `${year}-${month}-${day} ${hour}:${minutes}`
}

function add0IfLessThan10(num: number): string {
  if (num <= 9)
    return `0${num}`
  return `${num}`
}

</script>
<style scoped></style>
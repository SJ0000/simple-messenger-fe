<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="align-self-center" v-if="chatRoom.id === 0">
      <h2>Please choose a chat room</h2>
    </div>
    <div v-show="chatRoom.id !== 0">
      <header class="d-flex justify-space-between">
        <span class="text-h4">{{ chatRoom.name }}</span>
        <v-btn @click="onInvitationLinkClick">invitation link</v-btn>
        <InvitationLinkDialog ref="dialog"/>
      </header>
      <v-virtual-scroll
        class="ma-1"
        :items="messages"
        height="600"
        item-height="50"
      >
        <template v-slot:default="{ item }">
          <v-list-item
            v-if="item.senderId === user.id"
            append-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
            class="ma-2"
          >
            <div class="text-right">
              <h4>{{ findUserName(item.senderId) }}</h4>
              <h4>{{ item.content }}</h4>
              <h4>{{ item.sentAt }}</h4>
            </div>
          </v-list-item>
          <v-list-item
            v-else
            prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
            class="ma-2"
          >
            <div>
              <h4>{{ findUserName(item.senderId) }}</h4>
              <h4>{{ item.content }}</h4>
              <h4>{{ item.sentAt }}</h4>
            </div>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <div class="d-flex">
        <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
        <v-textarea
          variant="outlined"
          rows="1"
          row-height="15"
          label="message"
          v-model="content"
          @keydown.enter.exact.prevent="pressEnterHandler"
        />
        <v-btn class="ml-2 mt-3" @click="onSendButtonClick">
          Send
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {ChatRoom, ReceivedMessage, SentMessage} from "@/modules/chat/interface";
import {reactive, Ref, ref} from "vue";
import {MessageClient} from "@/modules/chat/message-client";
import {authenticationStore} from "@/store/authentication";
import {chatRoomStore} from "@/store/chatroom";
import {ApiClient} from "@/modules/common/api-client";
import InvitationLinkDialog from "@/components/dialog/InvitationLinkDialog.vue";


const chatRoom: Ref<ChatRoom> = ref(chatRoomStore().selected)
const messages = reactive(chatRoomStore().selected.messages)
const content = ref("")
const user = authenticationStore().user!

const dialog = ref<InstanceType<typeof InvitationLinkDialog> | null>(null)

function createMessage(): SentMessage {
  return {
    chatRoomId: chatRoom.value.id,
    senderId: user.id,
    content: content.value,
    sentAt: new Date()
  }
}

function findUserName(userId: number): string {
  return chatRoomStore().selected.users.find(user => user.id === userId)?.name ?? "unknown"
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
  dialog.value?.open(`https://localhost:3000/invite/${invitation.id}`)
}

function onSendButtonClick() {
  sendMessageAndTextResetIfContentNotEmpty()
}

function pressEnterHandler(event: KeyboardEvent) {
  if (event.isComposing)
    return;
  sendMessageAndTextResetIfContentNotEmpty()
}

</script>
<style scoped>
</style>

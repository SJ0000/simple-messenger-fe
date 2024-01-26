<template>
  <div class="d-flex flex-column w-100 h-100">
    <header style="height: 30px">
      <h2>cat</h2>
    </header>
    <v-virtual-scroll
      class="ma-1 bg-amber"
      :items="mr"
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
            <h4>{{ item.senderId }}</h4>
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
            <h4>{{ item.senderId }}</h4>
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
</template>

<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {ChatRoom, ReceivedMessage, SentMessage} from "@/modules/chat/interface";
import {reactive, ref} from "vue";
import {messageStore} from "@/store/message";
import {MessageClient} from "@/modules/chat/message-client";
import {authenticationStore} from "@/store/authentication";

// todo chatRoom id를 Messenger Component로부터 전달받기
const chatRoom: ChatRoom = {id: 1, name: "user", avatarUrl: "", users: []}
const messages: Array<ReceivedMessage> = messageStore().getMessages(chatRoom.id)
const mr = reactive(messages)
const content = ref("")
const user = authenticationStore().user!


function createMessage(): SentMessage {
  return {
    chatRoomId: chatRoom.id,
    senderId: user.id,
    content: content.value,
    sentAt: new Date()
  }
}

function sendMessageAndTextResetIfContentNotEmpty(){
  const message = createMessage()
  MessageClient.getInstance().send(message)
  content.value = ""
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

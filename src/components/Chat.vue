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
          prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          class="ma-2"
        >
          <div>
            <h4>{{ item.senderId }}</h4>
            <h4>{{ item.content }}</h4>
            <h4>{{ item.sentAt }}</h4>
          </div>
        </v-list-item>
        <v-list-item
          append-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          class="ma-2"
        >
          <div class="text-right">
            <h4>{{ item.senderId }}</h4>
            <h4>{{ item.content }}</h4>
            <h4>{{ item.sentAt }}</h4>
          </div>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <div class="d-flex">
      <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
      <v-textarea label="message" rows="1" row-height="15"></v-textarea>
      <v-btn class="ml-2 mt-3" @click="addItemTest">
        Send
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {Message} from "@/modules/chat/interface";
import {reactive} from "vue";
import {messageStore} from "@/store/message";

const messages: Array<Message> = messageStore().getMessages(1)
const mr = reactive(messages)

let messageId = 1
function addItemTest() {
  const message = {
    id: messageId,
    senderId: 2,
    content: "messageN",
    sentAt: new Date(),
  }
  messageStore().addMessage(1, message)
  messageId++
  console.log(mr.length)
}

</script>
<style scoped>
</style>

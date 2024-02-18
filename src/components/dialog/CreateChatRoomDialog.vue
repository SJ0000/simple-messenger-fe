<template>
  <v-dialog v-model="opened" persistent width="400">
    <v-card>
      <v-card-title>Create ChatRoom</v-card-title>
      <v-card-item>
        <v-text-field label="name" v-model="model.name" required></v-text-field>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCloseClick"> Close </v-btn>
        <v-btn @click="onSaveClick"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout"> {{ snackbar.text }} </v-snackbar>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ChatRoomCreateModel } from "@/modules/chat/model";
import { ApiClient } from "@/modules/api/api-client";
import { chatRoomStore } from "@/store/chatroom";
import { SnackbarModel } from "@/modules/common/model";

const opened = ref(false)
const model = ref(new ChatRoomCreateModel())
const snackbar = reactive(new SnackbarModel())

async function onSaveClick() {
  try {
    const chatRoom = await ApiClient.getInstance().createChatRoom(model.value.toDto())
    const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(chatRoom.id);
    chatRoomStore().join(joinedChatRoom)
    opened.value = false
    snackbar.text = `ChatRoom '${chatRoom.name}' created.`
    snackbar.open = true
  } catch (e) {
    snackbar.text = `ChatRoom creation failed.`
    snackbar.open = true
  }
}

function onCloseClick() {
  model.value.clear()
  opened.value = false
}

function open() {
  opened.value = true
}

defineExpose({
  open
})

</script>

<style scoped></style>
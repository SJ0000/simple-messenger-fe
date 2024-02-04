<template>
  <v-dialog v-model="opened" persistent width="400">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field label="name" v-model="model.name" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCloseClick"> Close </v-btn>
        <v-btn @click="onSaveClick"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ChatRoomCreateModel} from "@/modules/chat/model";
import {ApiClient} from "@/modules/common/api-client";
import {chatRoomStore} from "@/store/chatroom";

const opened = ref(false)
const model = ref(new ChatRoomCreateModel())

async function onSaveClick(){
  const chatRoom = await ApiClient.getInstance().createChatRoom(model.value.toDto())
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(chatRoom.id);
  chatRoomStore().join(joinedChatRoom)
  opened.value = false
}

function onCloseClick(){
  model.value.clear()
  opened.value = false
}

function open(){
  opened.value = true
}

defineExpose({
  open
})
</script>

<style scoped>

</style>

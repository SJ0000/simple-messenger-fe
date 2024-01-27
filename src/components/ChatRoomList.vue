<template>
  <div class="d-flex justify-end mb-1">
    <v-dialog v-model="dialog" persistent width="400">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> add chat room </v-btn>
      </template>
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
  </div>
  <v-list item-props lines="three" style="height: 600px">
    <v-list-subheader title="Chat rooms"/>
    <template v-for="[chatRoomId, chatRoom] in chatRooms" :key="chatRoomId">
      <v-list-item
        v-if="chatRoom.avatarUrl"
        :prepend-avatar="chatRoom.avatarUrl"
        :title="chatRoom.name"
        :active="selected.id === chatRoomId"
        @click="onChatRoomSelected(chatRoomId)"
      >
        <span class="mr-1 text-blue text-subtitle-2"> Last Message Sender - </span>
        <span class="text-subtitle-2"> Last Message Content. Not yet implemented </span>
      </v-list-item>
      <v-list-item
        v-else
        prepend-avatar="@/assets/default-avatar.jpg"
        :active="selected.id === chatRoomId"
        @click="onChatRoomSelected(chatRoomId)"
        :title="chatRoom.name">
        <span class="mr-1 text-blue text-subtitle-2"> Last Message Sender - </span>
        <span class="text-subtitle-2"> Last Message Content. Not yet implemented </span>
      </v-list-item>
      <v-divider/>
    </template>
  </v-list>
</template>
<script setup lang="ts">

import {ApiClient} from "@/modules/common/api-client";
import {chatRoomStore} from "@/store/chatroom";
import {reactive, ref} from "vue";
import {ChatRoomCreateModel} from "@/modules/chat/model";

const dialog = ref(false)
const model = ref(new ChatRoomCreateModel())

const chatRooms = ref(chatRoomStore().chatRooms)
const selected = reactive(chatRoomStore().selected)

function onChatRoomSelected(chatRoomId : number){
  chatRoomStore().select(chatRoomId)
}

async function onSaveClick(){
  const chatRoom = await ApiClient.getInstance().createChatRoom(model.value.toDto())
  const joinedChatRoom = await ApiClient.getInstance().joinChatRoom(chatRoom.id);
  chatRoomStore().join(joinedChatRoom)
  dialog.value = false
}

function onCloseClick(){
  model.value.clear()
  dialog.value = false
}

</script>

<style scoped>
</style>

<template>
  <v-dialog v-model="opened" persistent width="400">
    <v-card>
      <v-card-title>받은 친구 요청</v-card-title>
      <v-card-item>
        <v-list height="200">
          <v-list-item v-for="(friend, i) in friends" :key="i" :title="friend.fromUser.name">
            <template v-slot:prepend>
              <v-avatar :image="friend.fromUser.avatarUrl"></v-avatar>
            </template>
            <template v-slot:append>
              <v-btn @click="onAddFriendButtonClick(friend)" :icon="mdiPlus" size="x-small" variant="tonal"/>
            </template>
          </v-list-item>
        </v-list>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCloseClick"> 닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout"> {{ snackbar.text }}</v-snackbar>
</template>

<script setup lang="ts">
import {mdiPlus} from "@mdi/js";
import {reactive, ref} from "vue";
import {Friend} from "@/domain/friend/interface";
import {SnackbarModel} from "@/common/Models";
import useFriendStore from "@/domain/friend/FriendStore";

const friendStore = useFriendStore()

const opened = ref(false)
defineExpose({
  open
})
const snackbar = reactive(new SnackbarModel())

const friends: Array<Friend> = await friendStore.getReceivedRequest()

async function onAddFriendButtonClick(friend: Friend) {
  try {
    await friendStore.approveRequest(friend.id)
    snackbar.text = `${friend.fromUser.name}님과 친구가 되었습니다.`
    snackbar.open = true
  } catch (e) {
    snackbar.text = `친구 추가에 실패하였습니다.`
    snackbar.open = true
  }
}


function onCloseClick() {
  opened.value = false
}

function open() {
  opened.value = true
}


</script>

<style scoped></style>

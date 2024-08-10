<template>
  <v-dialog v-model="opened" persistent width="400">
    <v-card>
      <v-card-title>대화방 생성</v-card-title>
      <v-card-item>
        <v-text-field label="이름" v-model="model.name" required></v-text-field>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCloseClick"> 닫기 </v-btn>
        <v-btn @click="onSaveClick"> 생성 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout"> {{ snackbar.text }} </v-snackbar>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {GroupChatCreateModel} from "@/domain/groupchat/model";
import {ApiClient} from "@/common/api/ApiClient";
import {useGroupChatStore} from "@/domain/groupchat/GroupChatStore";
import {SnackbarModel} from "@/common/Models";
import {MessageClient} from "@/common/api/MessageClient";

const groupChatStore = useGroupChatStore()

const opened = ref(false)
const model = ref(new GroupChatCreateModel())
const snackbar = reactive(new SnackbarModel())


async function onSaveClick() {
  try {
    const groupChatId = await groupChatStore.create(model.value.toDto())
    let createdGroupChat = groupChatStore.find(groupChatId);

    opened.value = false
    snackbar.text = `대화방 '${createdGroupChat}' 이 생성되었습니다.`
    snackbar.open = true
  } catch (e) {
    snackbar.text = `대화방 생성에 실패하였습니다`
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

<style scoped></style>@/modules/groupchat/model@/store/groupChat

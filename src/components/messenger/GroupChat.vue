<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="align-self-center" v-if="groupChat.id === 0">
      <div class="text-h6">대화방을 선택해주세요.</div>
    </div>
    <div v-show="groupChat.id !== 0">
      <header class="d-flex justify-space-between">
        <span class="text-h4">{{ groupChat.name }}</span>
        <v-btn @click="onInvitationLinkClick">초대 링크</v-btn>
        <InvitationLinkDialog ref="dialog" />
      </header>
      <v-virtual-scroll id="virtual-scroll" class="ma-1" :items="messages" height="600" item-height="50">
        <template v-slot:default="{ item }">
          <v-list-item v-if="item.senderId === user.id" :append-avatar="userStore.find(item.senderId).avatarUrl" class="ma-2">
            <div class="text-right">
              <div class="text-subtitle-2 font-weight-bold">{{ userStore.find(item.senderId).name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
          <v-list-item v-else :prepend-avatar="userStore.find(item.senderId).avatarUrl" class="ma-2">
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ userStore.find(item.senderId).name }}</div>
              <div class="text-body-2">{{ item.content }}</div>
              <div class="text-caption font-italic">{{ Utility.getFormattedDate(item.receivedAt) }}</div>
            </div>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <div class="d-flex">
        <v-icon :icon="mdiMessage" size="45" class="mr-2 mt-2"></v-icon>
        <v-textarea variant="outlined" rows="1" row-height="15" label="메시지" v-model="content"
          @keydown.enter.exact.prevent="pressEnterHandler" />
        <v-btn class="ml-2 mt-3" @click="sendMessageAndTextResetIfContentNotEmpty">
          보내기
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
import {SentGroupMessage} from "@/modules/groupchat/interface";
import {reactive, ref} from "vue";
import {MessageClient} from "@/modules/api/MessageClient";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import {useGroupChatStore} from "@/store/GroupChatStore";
import {ApiClient} from "@/modules/api/ApiClient";
import InvitationLinkDialog from "@/components/dialog/InvitationLinkDialog.vue";
import {VVirtualScroll} from "vuetify/components";
import Utility from "../../common/Utility";
import {useMessengerStateStore} from "@/store/MessengerStateStore";
import {useUserStore} from "@/store/UserStore";

const authentication = useAuthenticationStore()
const messengerStore = useMessengerStateStore()
const groupChatStore = useGroupChatStore()
const userStore = useUserStore()

const groupChat = messengerStore.selectedGroupChat
const messages = reactive(groupChat.messages)
const content = ref("")
const user = authentication.getUser()
const dialog = ref<InstanceType<typeof InvitationLinkDialog> | null>(null)

if(groupChat.id !== 0 && messages.length === 0){
  loadPreviousMessage()
}

function createMessage(): SentGroupMessage {
  return {
    groupChatId: groupChat.id,
    senderId: user.id,
    content: content.value,
  }
}

function sendMessageAndTextResetIfContentNotEmpty() {
  if (content.value === "")
    return
  const message = createMessage()
  MessageClient.getInstance().send(message)
  content.value = ""
}

async function onInvitationLinkClick() {
  const groupChatId = groupChat.id
  const invitation = await ApiClient.getInstance().createInvitation(groupChatId)
  const host = `${window.location.protocol}//${window.location.host}`
  dialog.value?.open(`${host}/invite/${invitation.id}`)
}

function pressEnterHandler(event: KeyboardEvent) {
  if (event.isComposing)
    return;
  sendMessageAndTextResetIfContentNotEmpty()
}

async function loadPreviousMessage(){
  const previousMessages = await ApiClient.getInstance().getPreviousGroupMessages(groupChat.id);
  previousMessages.forEach(message => {
    groupChatStore.addMessage(message.groupChatId, message)
  })
  groupChat.messages.unshift(...previousMessages)
}

</script>
<style scoped></style>@/modules/groupchat/interface@/store/groupChat

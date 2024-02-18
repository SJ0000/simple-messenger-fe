<template>
    <v-dialog v-model="opened" persistent width="400">
        <v-card>
            <v-card-title>Received Friends Request</v-card-title>
            <v-card-item>
                <v-list height="200">
                    <v-list-item v-for="(friend, i) in friends" :key="i" :title="friend.fromUser.name">
                        <template v-slot:prepend>
                            <v-avatar :image="friend.fromUser.avatarUrl"></v-avatar>
                        </template>
                        <template v-slot:append>
                            <v-btn @click="onAddFriendButtonClick(friend.id)" :icon="mdiPlus" size="x-small"
                                variant="tonal" />
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCloseClick"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout"> {{ snackbar.text }} </v-snackbar>
</template>
  
<script setup lang="ts">
import { mdiPlus } from "@mdi/js";
import { ref } from "vue";
import { ApiClient } from "@/modules/api/api-client";
import { Friend } from "@/modules/friend/interface";
import { reactive } from "vue";
import { SnackbarModel } from "@/modules/common/model";

const opened = ref(false)
defineExpose({
    open
})
const snackbar = reactive(new SnackbarModel())

const friends: Array<Friend> = await ApiClient.getInstance().getReceivedFriendRequest()
async function onAddFriendButtonClick(id: number) {
    try {
        await ApiClient.getInstance().approveFriendRequest(id)
        snackbar.text = `친구 추가 성공`
        snackbar.open = true
    } catch (e) {
        snackbar.text = `친구 추가 실패`
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
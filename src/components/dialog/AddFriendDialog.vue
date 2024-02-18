<template>
    <v-dialog v-model="opened" persistent width="400">
        <v-card>
            <v-card-title>Add Friends</v-card-title>
            <v-card-item>
                <v-text-field label="Public Identifier" v-model="model.receiverPublicIdentifier" required></v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCloseClick"> Close </v-btn>
                <v-btn @click="onSendClick"> Send </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout"> {{ snackbar.text }} </v-snackbar>
</template>
  
<script setup lang="ts">
import { reactive, ref } from "vue";
import { ApiClient } from "@/modules/api/api-client";
import { FriendRequestModel } from "@/modules/friend/model"
import { SnackbarModel } from "@/modules/common/model";

const opened = ref(false)
const model = ref(new FriendRequestModel())
const snackbar = reactive(new SnackbarModel())

function onSendClick() {
    const dto = model.value.toDto()
    ApiClient.getInstance().requestFriend(dto)
    model.value.clear()
    opened.value = false
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
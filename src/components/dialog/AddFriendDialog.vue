<template>
    <v-dialog v-model="opened" persistent width="400">
        <v-card>
            <v-card-title>친구 추가</v-card-title>
            <v-card-item>
                <v-text-field label="공개 식별자" v-model="model.receiverPublicIdentifier" required></v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCloseClick"> 닫기 </v-btn>
                <v-btn @click="onSendClick"> 친구 요청 </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ApiClient} from "@/modules/api/ApiClient";
import {FriendRequestModel} from "@/modules/friend/model"

const opened = ref(false)
const model = ref(new FriendRequestModel())

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

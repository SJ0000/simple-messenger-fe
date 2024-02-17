<template>
    <v-dialog v-model="opened" persistent width="400">
        <v-card>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field label="Public Identifier" v-model="model.receiverPublicIdentifier"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onCloseClick"> Close </v-btn>
                <v-btn @click="onSendClick"> Send </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { ApiClient } from "@/modules/api/api-client";
import { FriendRequestModel } from "@/modules/friend/model"

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
  @/modules/api/api-client
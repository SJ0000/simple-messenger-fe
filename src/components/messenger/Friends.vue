<template>
    <div class="d-flex justify-space-between">
        <div class="text-h6 ml-2">FRIENDS</div>
        <div class="mr-1">
            <v-btn @click="onAddFriendClick" :icon="mdiAccountPlus" size="small" />
        </div>
    </div>
    <v-virtual-scroll :items="item" height="650" item-height="50">
        <template v-slot:default="{ item }">
            <v-list-item :title="item.name" :subtitle="item.statusMessage" class="mt-4">
                <template v-slot:prepend>
                    <v-avatar :image="item.avatarUrl"></v-avatar>
                </template>
                <template v-slot:append>
                    <v-btn :icon="mdiChat" size="x-small" variant="tonal" />
                </template>
            </v-list-item>
        </template>
    </v-virtual-scroll>
    <FriendRequestDialog ref="dialog"></FriendRequestDialog>
</template>

<script setup lang=ts>
import { mdiChat, mdiAccountPlus } from '@mdi/js';
import { User } from '@/modules/user/interface';
import { authenticationStore } from '@/store/authentication';
import FriendRequestDialog from '@/components/dialog/FriendRequestDialog.vue'
import { ref } from 'vue';

const user = authenticationStore().getUser()

const item: Array<User> = []
for (let i = 0; i < 100; i++) {
    item.push(user)
}


const dialog = ref<InstanceType<typeof FriendRequestDialog> | null>(null);

function onAddFriendClick() {
    dialog.value?.open()
}
</script>

<style scoped></style>

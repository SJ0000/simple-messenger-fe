<template>
    <div class="d-flex justify-space-between">
        <div class="text-h6 ml-2">친구</div>
        <div class="mr-1">
            <v-btn class="mr-1" @click="onFriendRequestClick" :icon="mdiAccountBox" size="small" />
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
                    <v-btn :icon="mdiChat" size="x-small" variant="tonal" @click="onFriendDirectChatClick(item.id)" />
                </template>
            </v-list-item>
        </template>
    </v-virtual-scroll>
    <AddFriendDialog ref="addFriendDialog" />
    <FriendRequestDialog ref="friendRequestDialog" />
</template>

<script setup lang=ts>
import {mdiAccountBox, mdiAccountPlus, mdiChat} from '@mdi/js';
import FriendRequestDialog from '@/components/dialog/FriendRequestDialog.vue'
import AddFriendDialog from '@/components/dialog/AddFriendDialog.vue'
import {ref} from 'vue';
import {useDirectChatStore} from '@/store/DirectChatStore';
import {useMessengerStateStore} from '@/store/MessengerStateStore';
import {useFriendStore} from '@/store/FriendStore';
import {ApiClient} from '@/modules/api/ApiClient';

const addFriendDialog = ref<InstanceType<typeof AddFriendDialog> | null>(null);

const item = useFriendStore().getFriends()

function onAddFriendClick() {
    addFriendDialog.value?.open()
}

const friendRequestDialog = ref<InstanceType<typeof FriendRequestDialog> | null>(null);
function onFriendRequestClick() {
    friendRequestDialog.value?.open()
}

async function onFriendDirectChatClick(otherUserId: number) {
    if (!useDirectChatStore().exists(otherUserId)) {
        const directChatId = await ApiClient.getInstance().createDirectChats(otherUserId)
        useDirectChatStore().join({
            id: directChatId,
            otherUser: useFriendStore().find(otherUserId),
            messages: []
        })
    }
    useDirectChatStore().select(otherUserId)
    useMessengerStateStore().activateDirectChat()
}

</script>

<style scoped></style>

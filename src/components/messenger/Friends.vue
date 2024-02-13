<template>
    <div class="text-h6 ml-2">Friends</div>
    <v-virtual-scroll :items="item" height="650" item-height="50">
        <template v-slot:default="{ item }">
            <v-list-item :title="item.name" :subtitle="`subtitle`" class="mt-4">
                <template v-slot:prepend>
                    <v-avatar :image="item.avatarUrl"></v-avatar>
                </template>
                <template v-slot:append>
                    <v-btn :icon="mdiChat" size="x-small" variant="tonal"></v-btn>
                </template>
            </v-list-item>
        </template>
    </v-virtual-scroll>
</template>

<script setup lang=ts>
import { mdiChat } from '@mdi/js';
import { User } from '@/modules/user/interface';
import { authenticationStore } from '@/store/authentication';

const user = authenticationStore().getUser()

const item: Array<User> = []
for (let i = 0; i < 100; i++) {
    item.push(user)
}


</script>

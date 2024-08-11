<template>
    <v-container class="h-100">
        <v-row class="h-100">
            <v-col class="h-100" cols="3">
                <div>
                    <div class="d-flex justify-center">
                        <v-avatar class="block" :image="user.avatarUrl" size="100"></v-avatar>
                    </div>
                    <div class="mt-3 d-flex justify-center">
                        <div class="text-h4">{{ user.name }}</div>
                    </div>
                </div>
                <v-list class="mt-5" density="comfortable">
                    <v-list-item v-for="(menu, i) in menus" :key="i" :value="menu" min-height="60">
                        <template v-slot:prepend>
                            <v-icon class="text-h5" :icon="menu.icon"></v-icon>
                        </template>
                        <v-list-item-title class="text-h7">{{ menu.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="9">
                <AccountSettings />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import AccountSettings from "@/components/account/AccountSettings.vue"
import {mdiAccountCog, mdiBell} from '@mdi/js';
import useAuthenticationStore from '@/domain/auth/AuthenticationStore';

const authentication = useAuthenticationStore()
const user = authentication.getUser();

const menus = [
    { name: "계정 설정", icon: mdiAccountCog },
    { name: "알림 설정", icon: mdiBell }
]


</script>

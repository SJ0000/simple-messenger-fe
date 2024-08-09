<template>
  <v-app-bar rounded>
    <v-app-bar-nav-icon />
    <v-app-bar-title @click="onTitleClicked" style="cursor: pointer">Simple Messenger</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon>
          <v-icon size="x-large" v-bind="props" :icon="mdiAccountCircle"></v-icon>
        </v-btn>
      </template>
      <v-card min-width="200">
        <v-list v-if="authentication.isLoggedIn">
          <v-list-item :prepend-avatar="authentication.user?.avatarUrl" :title="authentication.user?.name"
            :subtitle="authentication.user?.publicIdentifier" />
          <v-list-item>
            <v-btn class="w-100" @click="router.push('account')">
              <div>내 정보</div>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn class="w-100" @click="logout">
              로그아웃
            </v-btn>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-btn class="w-100" @click="router.push('/login')">
              로그인
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
// user
import {mdiAccountCircle} from '@mdi/js'
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import router from "@/plugins/unplugin-vue-router";

const authentication = useAuthenticationStore();

function logout() {
  authentication.logout()
  router.push("/")
}

function onTitleClicked() {
  router.push("/")
}

</script>

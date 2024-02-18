<template>
  <v-app-bar rounded>
    <v-app-bar-nav-icon />
    <v-app-bar-title @click="onTitleClicked" style="cursor: pointer">Simple Messenger</v-app-bar-title>
    <v-spacer></v-spacer>
    <!--    popover user info? setting?-->
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon>
          <v-icon size="x-large" v-bind="props" :icon="mdiAccountCircle"></v-icon>
        </v-btn>
      </template>
      <v-card min-width="200">
        <v-list v-if="auth.isLoggedIn">
          <v-list-item :prepend-avatar="auth.user?.avatarUrl" :title="auth.user?.name"
            :subtitle="auth.user?.publicIdentifier" />
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
import { mdiAccountCircle } from '@mdi/js'
import { authenticationStore } from "@/store/authentication";
import router from "@/router";

const auth = authenticationStore();

function logout() {
  authenticationStore().logout()
  router.push("/")
}

function onTitleClicked() {
  console.log("title clicked")
  router.push("/")
}

</script>

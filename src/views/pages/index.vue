<template>
  <div class="d-flex justify-center align-center h-100" v-if="!isLoggedIn">
    <v-card class="w-300">
      <v-card-item>
        <v-img src="@/assets/logo.png" />
      </v-card-item>
      <v-card-title>Simple Messenger</v-card-title>
      <v-card-subtitle>simple messenger</v-card-subtitle>
      <v-divider class="mt-5"></v-divider>
      <v-card-item>
        <v-btn class="w-100" @click="routeLogin">로그인</v-btn>
      </v-card-item>
      <v-card-item>
        <v-btn class="w-100" @click="routeSignup">회원가입</v-btn>
      </v-card-item>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
// log in
import useAuthenticationStore from "@/domain/auth/AuthenticationStore";
import router from "@/plugins/unplugin-vue-router";
import MessageClient from "@/common/websocket/MessageClient";

const authentication = useAuthenticationStore()
const isLoggedIn = authentication.isLoggedIn

if (isLoggedIn) {
  router.push("/messenger")
}

if (!isLoggedIn) {
  MessageClient.getInstance().stop()
}

function routeLogin() {
  router.push("/login")
}

function routeSignup() {
  router.push("/signup")
}

</script>

<style scoped>
.w-300 {
  width: 400px;
}
</style>

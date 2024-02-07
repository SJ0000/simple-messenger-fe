<template>
  <div class="d-flex justify-center align-center h-100" v-if="!isLoggedIn">
    <v-card class="w-300">
      <v-card-item>
        <v-img height="300" src="@/assets/logo.svg" />
      </v-card-item>
      <v-card-title>Simple Messenger</v-card-title>
      <v-card-subtitle>simple messenger</v-card-subtitle>
      <v-divider class="mt-5"></v-divider>
      <v-card-item>
        <v-btn class="w-100" @click="routeLogin">login</v-btn>
      </v-card-item>
      <v-card-item>
        <v-btn class="w-100" @click="routeSignup">sign up</v-btn>
      </v-card-item>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
// log in
import { authenticationStore } from "@/store/authentication";
import router from "@/router";

const isLoggedIn = authenticationStore().isLoggedIn

if (isLoggedIn) {
  router.push("/messenger")
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
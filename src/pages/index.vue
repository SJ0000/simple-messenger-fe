<template>
  <v-container>
    <template v-if="!isLoggedIn">
      <v-col>
        <v-card class="mt-3">
          <v-card-item >
            <router-link to="/login">Login</router-link>
          </v-card-item>
        </v-card>
        <v-card class="mt-3">
          <v-card-item>
            <router-link to="/signup">signup</router-link>
          </v-card-item>
        </v-card>
      </v-col>
    </template>
  </v-container>
</template>

<script lang="ts" setup>
  // log in
  import {authenticationStore} from "@/store/authentication";
  import router from "@/router";
  const isLoggedIn = authenticationStore().isLoggedIn

  if(isLoggedIn){
    router.push("/messenger")
  }
</script>

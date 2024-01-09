<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>Sign in to your account</h2>
    </v-row>
    <v-row>
      <v-text-field label="Email" :rules="[notEmpty, email]"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Password" type="password" :rules="[notEmpty, password]"></v-text-field>
    </v-row>
    <v-row>
      <v-btn width="100%">Sign in</v-btn>
    </v-row>
    <v-row class="mt-5 justify-end">
      <p class="mr-2">Don't have an account?</p>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </v-row>
  </v-container>
</template>

<script setup>

import {notEmpty, email, password} from "/src/modules/validation/rules"

</script>

<style scoped>
  .mw-500{
    max-width: 500px;
  }
</style>

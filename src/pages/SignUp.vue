<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>Sign Up</h2>
    </v-row>
    <v-row>
      <v-text-field label="Name" :rules="[notEmpty]"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Email" type="email" :rules="[notEmpty, email]"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Password" type="password" :rules="[notEmpty, password]">{{password1}}</v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Confirm Password" type="password" :rules="[notEmpty, passwordMatch]"></v-text-field>
    </v-row>
    <v-row>
      <v-btn width="100%">Sign Up</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>

import {notEmpty, email, password} from "/src/modules/validation/rules"
import {ref} from "vue";

const password1 = ref("")

const passwordMatch = (value) => value === password1.value || 'min 10 chars'


</script>

<style scoped>
.mw-500{
  max-width: 500px;
}
</style>

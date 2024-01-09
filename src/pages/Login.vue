<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>Sign in to your account</h2>
    </v-row>
    <v-row>
      <v-text-field label="Email" :rules="[notEmpty, validateEmail]"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Password" :rules="[notEmpty, lengthGte10]"></v-text-field>
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
function isEmail(text) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(text);
}

const notEmpty = (value) => !!value || 'Required.';
const validateEmail = (value) => isEmail(value) || 'Invalid Email'
const lengthGte10 = (value) => value.length >= 10 || 'min 10 chars'

</script>

<style scoped>
  .mw-500{
    max-width: 500px;
  }
</style>

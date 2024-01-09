<template>
  <v-container class="align-center">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row>
      <h2>Sign in to your account</h2>
    </v-row>
    <v-row>
      <v-text-field label="Email" :rules="[notEmpty, validateEmail]"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Password" :rules="[notEmpty, lengthGte10]"></v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox/>
        <h3>Remember me</h3>
      </v-col>
      <v-col>
        <h3>Forgot your password?</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-btn width="100%">Sign in</v-btn>
      <h2>Don't have an account? Sign up</h2>
    </v-row>
  </v-container>
</template>

<script setup>

function isEmail(text){
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(text);
}

const notEmpty = (value) => !!value || 'Required.';
const validateEmail = (value) => isEmail(value) || 'Invalid Email'
const lengthGte10 = (value) => value.length >= 10 || 'min 10 chars'

</script>

<style scoped>

</style>

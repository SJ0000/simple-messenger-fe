<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>Sign Up</h2>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="signUpForm">
          <v-text-field label="Name" v-model="model.name" :rules="[notEmpty]"></v-text-field>
          <v-text-field label="Email" type="email" v-model="model.email" :rules="[notEmpty, email]"></v-text-field>
          <v-text-field label="Password" type="password" v-model="model.password"
                        :rules="[notEmpty, password]"></v-text-field>
          <v-text-field label="Confirm Password" type="password" v-model="model.confirmPassword"
                        :rules="[notEmpty, passwordMatch]"></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-btn width="100%" @click="onClick">Sign Up</v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {notEmpty, email, password} from "@/modules/validation/rules"
import {Ref, ref} from "vue";
import {SignUpModel} from "@/modules/auth/model";
import {SignUpDto} from "@/modules/auth/dto"

import {VForm} from "vuetify/components";
import router from "@/router";
import {ApiClient} from "@/modules/common/api-client";

const signUpForm: Ref<VForm> = ref<any>()
const model = ref(new SignUpModel())

const passwordMatch = (value: any) => {
  return value === model.value.password || 'password does not match'
}

async function onClick() {
  const {valid} = await signUpForm.value.validate()
  if (valid) {
    const signUpDto : SignUpDto = model.value.toDto()

    const apiClient = ApiClient.getInstance();
    await apiClient.signUp(model.value.toDto())
      .then(
        router.push("/login")
      ).catch(error =>{
        console.log(error)
      })
  }
}

</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>

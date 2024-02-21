<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg" />
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>로그인</h2>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="loginForm">
          <v-text-field label="이메일" v-model="model.email" :rules="[notEmpty, email]"></v-text-field>
          <v-text-field label="비밀번호" v-model="model.password" type="password"
            :rules="[notEmpty, password]"></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-btn width="100%" @click=onClick>로그인</v-btn>
    </v-row>
    <v-row class="mt-5 justify-end">
      <p class="mr-2">계정이 없으신가요?</p>
      <RouterLink to="/signup">회원가입</RouterLink>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import { email, notEmpty, password } from "@/modules/validation/rules"
import { ApiClient } from "@/modules/api/api-client";
import { Ref, ref } from "vue";
import { LoginModel } from "@/modules/auth/model";
import { VForm } from "vuetify/components";
import { useAuthenticationStore } from "@/store/authentication";
import router from "@/router";

const authentication = useAuthenticationStore()

if (authentication.isLoggedIn)
  router.push("/messenger")

const loginForm: Ref<VForm> = ref<any>();
const model = ref(new LoginModel());

async function onClick() {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    const apiClient = ApiClient.getInstance();
    await apiClient.login(model.value.toDto())
      .then(result => {
        authentication.login(result.data.token, result.data.user);
        router.push("/messenger")
      }
      ).catch(error => {
        console.log(error)
        console.log(`login failed ${error.message}`)
      })
  }
}


</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>
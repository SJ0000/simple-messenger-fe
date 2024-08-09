<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.png"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>로그인</h2>
    </v-row>
    <v-row>
      <v-col>
        <v-alert
          class="ma-1"
          type="error"
          :model-value="alert.show"
        > {{ alert.text }}
        </v-alert>
        <v-form ref="loginForm">
          <v-text-field label="이메일" v-model="loginModel.email" :rules="[notEmpty, email]"></v-text-field>
          <v-text-field label="비밀번호" v-model="loginModel.password" type="password"
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

import {email, notEmpty, password} from "@/modules/validation/rules"
import {ApiClient} from "@/modules/api/ApiClient";
import {Ref, ref} from "vue";
import {LoginModel} from "@/modules/auth/model";
import {VAlert, VForm} from "vuetify/components";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import router from "@/router";
import {AlertModel} from "@/common/Models";
import {AxiosError} from "axios";

const authentication = useAuthenticationStore()

if (authentication.isLoggedIn)
  router.push("/messenger")

const loginForm: Ref<VForm> = ref<any>();
const alert = ref(new AlertModel());
const loginModel = ref(new LoginModel());

async function onClick() {
  const {valid} = await loginForm.value.validate();
  if (valid) {
    const apiClient = ApiClient.getInstance();
    await apiClient.login(loginModel.value.toDto())
      .then(result => {
          authentication.login(result.data.token, result.data.user);
          router.push("/messenger")
        }
      ).catch(error => {
        if (error.response.status === 400) {
          showAlert("이메일 혹은 비밀번호가 일치하지 않습니다.")
        } else {
          showAlert("알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.")
        }
      })
  }
}

function showAlert(message: string) {
  alert.value.show = true;
  alert.value.text = message;
}

</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>

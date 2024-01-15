<template>
  <v-container class="mw-500">
    <v-row>
      <v-img height="300" src="@/assets/logo.svg"/>
    </v-row>
    <v-row class="justify-center mb-1">
      <h2>Sign in to your account</h2>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="loginForm">
          <v-text-field label="Email" v-model="model.email" :rules="[notEmpty, email]"></v-text-field>
          <v-text-field label="Password" v-model="model.password" type="password"
                        :rules="[notEmpty, password]"></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-btn width="100%" @click=onClick>Sign in</v-btn>
    </v-row>
    <v-row class="mt-5 justify-end">
      <p class="mr-2">Don't have an account?</p>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import {notEmpty, email, password} from "@/modules/validation/rules"
import {ApiClient} from "@/modules/common/api-client";
import {LoginDto} from "@/modules/auth/dto";
import {Ref, ref} from "vue";
import {LoginModel} from "@/modules/auth/model";
import {VForm} from "vuetify/components";
import {ACCESS_TOKEN} from "@/modules/common/LocalStorageKeyNames";
import {userStore} from "@/store/user";
import router from "@/router";
import {UserDto} from "@/modules/user/dto";

const loginForm: Ref<VForm> = ref<any>();
const model = ref(new LoginModel());

async function onClick() {
  const {valid} = await loginForm.value.validate();
  if (valid) {
    const loginDto: LoginDto = model.value.toDto();
    console.log(JSON.stringify(loginDto));

    const apiClient = ApiClient.getInstance();
    await apiClient.login(model.value.toDto())
      .then(result => {
          localStorage.setItem(ACCESS_TOKEN, result.data.token);
          const user = userStore();
          user.login(result.data.user);
          console.log(`user.data = ${user.data}`);
          router.push("/")
        }
      ).catch(error => {
        console.log(`login failed ${error}`)
      })
  }
}


</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>

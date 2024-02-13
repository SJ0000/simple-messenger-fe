<template>
    <div class="text-h4">Account Settings</div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <v-form ref="signUpForm">
        <v-text-field label="Name" v-model="model.name" :rules="[notEmpty]"></v-text-field>
        <v-text-field label="Status Message" v-model="model.statusMessage"></v-text-field>
        <v-text-field label="Avatar URL" v-model="model.avatarUrl" :rules="[notEmpty]"></v-text-field>
    </v-form>
    <div class="d-flex justify-end">
        <v-btn @click="onUpdateButtonClick">UPDATE</v-btn>
    </div>
</template>

<script setup lang="ts">

// TODO : Avatar URL text ->Image upload

import { notEmpty } from "@/modules/validation/rules"
import { UpdateUserModel } from '@/modules/auth/model';
import { authenticationStore } from '@/store/authentication';
import { ref } from 'vue';
import { UpdateUserDto } from "@/modules/user/dto";
import { ApiClient } from "@/modules/common/api-client";

const user = authenticationStore().getUser()
const model = ref(new UpdateUserModel(user))


async function onUpdateButtonClick() {
    const dto: UpdateUserDto = model.value.toDto()
    const updatedUser = await ApiClient.getInstance().patchUser(user.id, dto)
    authenticationStore().updateUser(updatedUser)
}

</script>
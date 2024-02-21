<template>
    <div class="text-h4">계정 설정</div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <v-form ref="signUpForm">
        <v-text-field label="이름" v-model="model.name" :rules="[notEmpty]"></v-text-field>
        <v-text-field label="상태 메시지" v-model="model.statusMessage"></v-text-field>
        <v-text-field label="프로필 사진 주소" v-model="model.avatarUrl" :rules="[notEmpty]"></v-text-field>
        <v-text-field label="공개 식별자" v-model="model.publicIdentifier" :rules="[notEmpty]"></v-text-field>
    </v-form>
    <div class="d-flex justify-end">
        <v-btn @click="onUpdateButtonClick">수정</v-btn>
    </div>
</template>

<script setup lang="ts">

// TODO : Avatar URL text ->Image upload

import { notEmpty } from "@/modules/validation/rules"
import { UpdateUserModel } from '@/modules/auth/model';
import { useAuthenticationStore } from '@/store/authentication';
import { ref } from 'vue';
import { UpdateUserDto } from "@/modules/user/dto";
import { ApiClient } from "@/modules/api/api-client";

const authentication = useAuthenticationStore()
const user = authentication.getUser()
const model = ref(new UpdateUserModel(user))


async function onUpdateButtonClick() {
    const dto: UpdateUserDto = model.value.toDto()
    const updatedUser = await ApiClient.getInstance().patchUser(user.id, dto)
    authentication.updateUser(updatedUser)
}

</script>
<template>
    <div class="text-h4">계정 설정</div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <v-form ref="signUpForm">
        <v-text-field label="이름" v-model="model.name" :rules="[notEmpty]"></v-text-field>
        <v-text-field label="상태 메시지" v-model="model.statusMessage"></v-text-field>
        <!-- <v-text-field label="프로필 사진 주소" v-model="model.avatarUrl" :rules="[notEmpty]"></v-text-field> -->
        <v-row>
            <v-col cols="3">
                <v-img :src="profileImagePreviewUrl"></v-img>
            </v-col>
            <v-col>
                <v-file-input accept="image/*" v-model="profileImage" :prepend-icon="mdiAccountCircle"
                    @change="onProfileImageChanged" label="프로필 사진 업로드"></v-file-input>
            </v-col>
        </v-row>
        <v-text-field label="공개 식별자" v-model="model.publicIdentifier" :rules="[notEmpty]"></v-text-field>
    </v-form>
    <div class="d-flex justify-end">
        <v-btn @click="onUpdateButtonClick">수정</v-btn>
    </div>
</template>

<script setup lang="ts">


import { ObjectStorageClient } from '@/modules/api/object-storage';
import { notEmpty } from "@/modules/validation/rules"
import { UpdateUserModel } from '@/modules/auth/model';
import { useAuthenticationStore } from '@/store/authentication';
import { ref } from 'vue';
import { UpdateUserDto } from "@/modules/user/dto";
import { ApiClient } from "@/modules/api/api-client";
import { mdiAccountCircle } from '@mdi/js';

const authentication = useAuthenticationStore()
const user = authentication.getUser()
const model = ref(new UpdateUserModel(user))

const osClient = ObjectStorageClient.getInstance();
const profileImage = ref<File | null>(null)
const profileImagePreviewUrl = ref<string>("")

// TODO : 테스트하기

async function onUpdateButtonClick() {
    const dto: UpdateUserDto = model.value.toDto()

    if (profileImage.value !== null && profileImage.value !== undefined) {
        const savedPath = await osClient.saveProfileImage(user, profileImage.value)
        dto.avatarUrl = savedPath
    }

    const updatedUser = await ApiClient.getInstance().patchUser(user.id, dto)
    authentication.updateUser(updatedUser)
}

function onProfileImageChanged() {
    if (profileImage.value !== null && profileImage.value !== undefined) {
        profileImagePreviewUrl.value = URL.createObjectURL(profileImage.value)
    }
}

</script>
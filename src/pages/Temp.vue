<template>
    <!-- <v-btn width="100%" @click="onClick">전송 S3</v-btn> -->
    <v-btn width="100%" @click="onClickS3Client">전송 S3Client</v-btn>
    <v-btn width="100%" @click="onClickEnv"> process env</v-btn>
</template>

<script setup lang="ts">

import { ObjectStorageClient } from '@/modules/api/object-storage';

const osClient = ObjectStorageClient.getInstance()

async function onClickS3Client() {
    osClient.saveUseS3Client("12345.txt", "1234")
}

async function onClickEnv() {
    console.log(process.env)
}


</script>

<style scoped></style>

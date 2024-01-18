<template>
  <div class="d-flex flex-column w-100 h-100">
    <div style="height: 30px">
      <h2>cat</h2>
    </div>
    <div class="h-100">

    </div>
    <div class="d-flex mb-2" style="height: 50px">
      <v-icon :icon="mdiMessage"></v-icon>
      <v-textarea label="message" rows="1" row-height="15"></v-textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import {mdiMessage} from "@mdi/js"
</script>




<style scoped>
</style>

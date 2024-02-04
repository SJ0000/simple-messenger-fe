<template>
  <v-dialog v-model="opened" width="400">
    <v-card>
      <v-card-title>Invitation Link</v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";

const opened = ref(false)
const text = ref("")

function open(link : string){
  text.value = link
  opened.value = true
}

function close(){
  opened.value = false
}

defineExpose({
  open
})

</script>

<style scoped>

</style>

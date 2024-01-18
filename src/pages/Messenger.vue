<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="bg-red" cols="4">
        <ChatRoomList/>
      </v-col>
      <v-col class="bg-blue" cols="8">
        <Chat></Chat>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ChatRoomList from "@/components/ChatRoomList.vue";
import Chat from "@/components/Chat.vue";



</script>

<style scoped>


</style>

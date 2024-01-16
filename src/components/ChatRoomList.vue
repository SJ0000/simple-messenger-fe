<template>
  <v-list item-props lines="three">
    <v-list-subheader title="Chat rooms"/>
    <template v-for="(room, index) in rooms" :key="index">
      <v-list-item
        :prepend-avatar="room.avatarUrl"
        :title="room.title">
        <span class="mr-1 text-blue"> {{room.lastMessage.senderName}} - </span>
        <span> {{ room.lastMessage.content }} </span>
      </v-list-item>
      <v-divider/>
    </template>
  </v-list>
</template>
<script setup lang="ts">

import {ChatRoom} from "@/modules/chat/interface";

const rooms : Array<ChatRoom> = [
  {
    id: 1,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 2,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 3,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 4,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 5,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 6,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 7,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },
  {
    id: 8,
    avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    lastMessage: {
      senderName: 'Ali Conners',
      content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    }
  },

]
</script>


<style scoped>
</style>

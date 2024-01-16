<template>
  <v-app-bar rounded>
    <v-app-bar-nav-icon/>
    <v-app-bar-title>Simple Messenger</v-app-bar-title>
    <v-spacer></v-spacer>
    <!--    popover user info? setting?-->
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon>
          <v-icon size="x-large" v-bind="props" :icon="mdiAccountCircle"></v-icon>
        </v-btn>
      </template>
      <v-card min-width="250">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
          </v-list-item>
          <v-list-item>
            <v-btn color="primary">
              <v-icon start :icon="mdiCog"></v-icon>
              Settings
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
  // user
  import {mdiAccountCircle, mdiCog} from '@mdi/js'

</script>

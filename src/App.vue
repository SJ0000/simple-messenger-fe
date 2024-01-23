<template>
  <v-app>
    <v-main>
      <Suspense>
        <router-view />
        <template #fallback>
          <v-progress-circular model-value="20" :size="50"></v-progress-circular>
        </template>
      </Suspense>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

</script>

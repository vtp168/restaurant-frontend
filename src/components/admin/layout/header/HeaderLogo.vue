<template>
  <router-link to="/" class="lg:hidden">
    <img class="dark:hidden h-24 w-24" src="/public/images/logo/logo.png" alt="Logo" />
    <img class="hidden dark:block h-24 w-24" src="/public/images/logo/logo.png" alt="Logo" />
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

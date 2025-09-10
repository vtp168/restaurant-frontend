<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-extrabold text-red-600">404</h1>
      <p class="text-2xl mt-4 font-semibold text-gray-800">Page Not Found</p>
      <p class="text-gray-600 mt-2">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <router-link
        to="/"
        class="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
      >
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No JS needed unless adding custom logic
</script>
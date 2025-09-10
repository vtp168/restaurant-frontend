<template>
 <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl container flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo">
      <span class="self-center text-2xl text-black font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </router-link>

    <button @click="toggleMenu" class="md:hidden text-gray-500 hover:text-black dark:text-white focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <div class="hidden md:flex items-center space-x-6">
      <router-link to="/" exact-active-class="nav-link" class="nav-link">ទំព័រដើម</router-link>
      <router-link to="/category/local-news" class="nav-link">ព័ត៌មានជាតិ</router-link>
      <router-link :to="{name:'category',params:{slug:'international-news'}}" class="nav-link">ព័ត៌មានអន្តរជាតិ</router-link>
      <router-link to="/category/politics" class="nav-link">នយោបាយ</router-link>
      <router-link to="/category/sports" class="nav-link">កីឡា</router-link>
      <router-link to="/category/economy" class="nav-link">សេដ្ឋកិច្ច</router-link>
    </div>
  </div>
</nav>


  <!-- Sidebar Overlay -->
  <div v-show="isMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-gray-100 bg-opacity-10 z-30 md:hidden"></div>

  <!-- Sidebar Menu -->
  <div
    class="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 md:hidden"
    :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }"
  >
    <div class="flex items-center justify-between p-4 border-b">
      <!-- <h2 class="text-lg font-bold text-gray-800 dark:text-white">Menu</h2> -->
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </router-link>
      <button @click="toggleMenu" class="text-gray-500 hover:text-black dark:text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <ul class="flex flex-col p-4 space-y-3">
      <li>
        <router-link @click="toggleMenu" to="/" exact-active-class="active-link" class="nav-link">ទំព័រដើម</router-link>
      </li>
      <li>
        <router-link @click="toggleMenu" to="/category/local-news" class="nav-link">ព័ត៌មានជាតិ</router-link>
      </li>
      <li>
        <router-link @click="toggleMenu" to="/category/international-news" class="nav-link">ព័ត៌មានអន្តរជាតិ</router-link>
      </li>
      <li>
        <router-link @click="toggleMenu" to="/category/politics" class="nav-link">នយោបាយ</router-link>
      </li>
      <li>
        <router-link @click="toggleMenu" to="/category/sports" class="nav-link">កីឡា</router-link>
      </li>
      <li>
        <router-link @click="toggleMenu" to="/category/economy" class="nav-link">សេដ្ឋកិច្ច</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
  @reference "tailwindcss";

/* Base styles for all navigation links */
.nav-link {
  @apply text-gray-700 dark:text-white hover:text-blue-500;
}

/* Styles for the active link */
.active-link {
  @apply text-gray-700 font-semibold;
}

/* Fallback for the default class from Vue Router */
.router-link-active {
  @apply text-blue-700 font-semibold;
}
</style>

<template>
  <div v-if="isOpen" class="side-area fixed inset-0 z-50">
    <!-- Backdrop -->
    <div class="back-menu fixed bg-gray-900 bg-opacity-70 inset-0" @click="closeMenu">
      <div class="cursor-pointer text-white absolute right-64 p-2" @click.stop="closeMenu">
        <svg class="bi bi-x" width="2rem" height="2rem" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"/>
          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"/>
        </svg>
      </div>
    </div>

    <!-- Sidebar -->
    <nav class="side-menu fixed right-0 top-0 w-64 h-full bg-white dark:bg-gray-800 z-40 overflow-auto">
      <div class="mb-auto">
        <div class="text-center py-4 w-full font-bold border-b border-gray-100">TAILNEWS</div>
        <ul class="flex flex-col">
          <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Home</a></li>

          <!-- Dropdown -->
          <li>
            <button @click="toggleDropdown('news')" class="w-full text-left py-2 px-5 border-b border-gray-100 hover:bg-gray-50">
              News
            </button>
            <ul v-if="dropdowns.news" class="ml-4 mb-2 bg-white dark:bg-gray-800 rounded py-0.5 text-left">
              <li>
                <button @click="toggleDropdown('dropdownItem')" class="w-full text-left py-2 px-5 border-b border-gray-100 hover:bg-gray-50">
                  Dropdown item
                </button>
                <ul v-if="dropdowns.dropdownItem" class="ml-4 bg-white dark:bg-gray-800">
                  <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown sub item</a></li>
                  <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown sub item</a></li>
                  <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown sub item</a></li>
                  <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown sub item</a></li>
                </ul>
              </li>
              <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown item</a></li>
              <li><a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">Dropdown item</a></li>
            </ul>
          </li>

          <li v-for="item in ['Sport', 'Travel', 'Techno', 'Worklife', 'Future', 'More']" :key="item">
            <a href="#" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-50">{{ item }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = defineModel('open') // Controlled by parent via v-model:open

const dropdowns = ref({
  news: false,
  dropdownItem: false,
})

const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu]
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

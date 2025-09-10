<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
     <CateogryModal
        :isOpen="modalOpen"
        :mode="modalMode"
        :category="selectedCategory"
        @close="modalOpen = false"
        @add="handleAdd"
        @update="handleUpdate"
    />
    <div class="max-w-full overflow-x-auto custom-scrollbar flex flex-auto">
          <Loading :active="isLoading" :can-cancel="false" :is-full-page="true"/>

      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Category Name</p>
            </th>
            <!-- <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Content</p>
            </th> -->
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Category Kh</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Slug </p>
            </th>
            <!-- <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tags</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Publish</p>
            </th> -->
             <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(category, index) in categories"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-2 sm:px-6">
              <div class="flex items-center gap-3">
                
                    {{ index+1 }}
              
            </div>
            </td>
            <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ category.name }}
                  </span>
                </div>
            </td>
             <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ category.name_kh }}
                  </span>
                </div>
            </td>
           
            <td class="px-5 py-2 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ category.slug}}</p>
            </td>
            <td class="px-4 py-2 space-x-2">
            <button
              @click="openEditModal(category)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            >
              Edit
            </button>
            <button
              @click="deleteCate(category.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
            >
              Delete
            </button>
          </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CateogryModal from './CateogryModal.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toastification'


const toast = useToast() // toast noticaion 
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['deleted','refresh']); // to call function in parent component

const modalOpen = ref(false)
const modalMode = ref('add') // or 'edit'
const selectedCategory = ref(null)

function openEditModal(category) {
  modalMode.value = 'edit'
  selectedCategory.value = category
  modalOpen.value = true
}


const handleUpdate = async (data)=> {
  // Use POST with _method=PATCH for Laravel compatibility
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/categories/${data.id}`,
        data
    )

    if(res.status){
       toast.success('✅ Categories successfully!')
       emit('refresh'); // to call function in parent component
    }

  //console.log('Update:', data)
  // Axios PUT/PATCH here
}

defineProps({
  categories: {
    type: Array,
    default: () => []
  }
});

const deleteCate = async (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
   const res=await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
   if(res.status)
   {
      toast.info('✅ Categories deleted successfully!')
      emit('deleted'); // to call function in parent component
   }

  }
}

</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

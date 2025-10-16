<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
     <userModal
        :isOpen="modalOpen"
        :mode="modalMode"
        :user="selecteduser"
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User Name</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Email</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Author Name </p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Author Bio</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Author Phone</p>
            </th>
             <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(user, index) in users"
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
                    {{ user.name }}
                  </span>
                </div>
            </td>
            <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.email }}
                  </span>
                </div>
            </td>
            <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.author_name }}
                  </span>
                </div>
            </td>
            <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.author_bio }}
                  </span>
                </div>
            </td>
            <td class="px-5 py-2 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.author_phone }}
                  </span>
                </div>
            </td>
           
            <td class="px-4 py-2 space-x-2">
            <button
              @click="openEditModal(user)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            >
              Edit
            </button>
            <button
              @click="deleteuser(user._id)"
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
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toastification'
import userModal from './UserModal.vue'

const emit = defineEmits(['refresh','deleted']); // to call function in parent component

const toast = useToast() // toast noticaion 
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()

const modalOpen = ref(false)
const modalMode = ref('add') // or 'edit'
const selecteduser= ref(null)

function openEditModal(user) {
  modalMode.value = 'edit'
  selecteduser.value = user
  modalOpen.value = true
  console.log(selecteduser.value)
}

function handleAdd(data) {
 
}

const handleUpdate = async (data)=> {
  // Use POST with _method=PATCH for Laravel compatibility
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${data._id}`,
        data
    )

    if(res.status){
       toast.success('✅ user successfully!')
       emit('refresh'); // to call function in parent component)
    }

  //console.log('Update:', data)
  // Axios PUT/PATCH here
}

defineProps({
  users: {
    type: Array,
    default: () => [
     
    ]
  }
});

const deleteuser = async (id) => {
 if (confirm('Are you sure you want to delete this post?')) {
   const res=await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
   if(res.status)
   {
      toast.info('✅ user deleted successfully!')
      emit('deleted'); // to call function in parent component
   }

  }
}

</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

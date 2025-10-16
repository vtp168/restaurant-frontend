<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="border-collapse border border-gray-40 table-auto text-left max-w-full w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-center sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">FullName</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Username</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Role</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">CREATED ON</p>
            </th>

            <th class="px-5 py-3 text-left sm:px-6 border border-gray-300">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users.docs"
            :key="index"
            class="border-t border-gray-300 dark:border-gray-800 "
          >
            <td class="px-5 py-4 sm:px-6 border border-gray-300 text-center">
              <div>
                {{ index + 1 }}
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 border border-gray-300">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ user.fullname }}
                </span>
              </div>
            </td>
            <!-- <td class="px-5 py-4 sm:px-6">
              <div>
                    {{ post.body}}
              </div>
            </td> -->

            <td class="px-5 py-4 sm:px-6 border border-gray-300">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ user.username }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 border border-gray-300">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ user.role ? user.role : 'N/A' }}
              </p>
            </td>
             <td class="px-5 py-4 sm:px-6 border border-gray-300">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6 border border-gray-300">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ new Date(user.createdAt).toLocaleDateString() }} {{ new Date(user.createdAt).toTimeString() }}
              </p>
            </td>

            <td class="px-4 py-2 space-x-2 border border-gray-300">
              <button
                @click="editData(user._id)"
                class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-sm"
              >
                <PencilBoxOutlineIcon size="24" />
              </button>
              <button
                @click="deleteData(user._id)"
                class="bg-red-500 text-white rounded hover:bg-red-600 p-1 text-sm"
              >
                <DeleteOutlineIcon />
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
import { useToast } from 'vue-toastification'
import PencilBoxOutlineIcon from 'vue-material-design-icons/PencilBoxOutline.vue'
import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue'

const toast = useToast()

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['refresh']) // to call function in parent component

defineProps({
  users: {
    type: Array,
    default: () => [],
  },
})

function editData(userId) {
  router.push({ name: 'edit-users', params: { id: userId } })
}

const deleteData = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`)
      if (res) {
        toast.success('User deleted successfully!')
        emit('refresh') // Emit refresh event to parent component
      }
    } catch (err) {
      console.error(err)
    }
    console.log(`User with ID ${id} deleted`)
  }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

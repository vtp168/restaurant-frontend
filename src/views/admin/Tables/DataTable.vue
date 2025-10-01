<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Table Name</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Capacity</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Qr Code</p>
            </th>
            <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(table, index) in tables"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                {{ index + 1 }}
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ table.name }}
                </span>
              </div>
            </td>
            <!-- <td class="px-5 py-4 sm:px-6">
              <div>
                    {{ post.body}}
              </div>
            </td> -->

            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ table.capacity }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ table.status }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ table.qrCodeUrl }}
              </p>
            </td>

            <td class="px-4 py-2 space-x-2">
              <button
                @click="editData(table._id)"
                class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-sm"
              >
                <PencilBoxOutlineIcon size="24" />
              </button>
              <button
                @click="deleteData(table._id)"
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
  tables: {
    type: Array,
    default: () => [],
  },
})

function editData(tableId) {
  router.push({ name: 'edit-tables', params: { id: tableId } })
}

const deleteData = async (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/tables/${id}`)
      if (res) {
        toast.success('Post deleted successfully!')
        emit('refresh') // Emit refresh event to parent component
      }
    } catch (err) {
      console.error(err)
    }
    console.log(`Post with ID ${id} deleted`)
  }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

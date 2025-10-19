<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Order No</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Table</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Services By</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total Price</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(order, index) in orders"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                {{ index + 1 }}
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">#{{ order.orderNo }}</div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ order.tableId?.name || 'No Table' }}
                </span>
              </div>
            </td>

            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ order.createdBy.fullname ?? 'No Name' }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                ${{ getTotalPrice(order).toFixed(2) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                <span
                  v-if="order.status == 'pending'"
                  class="rounded-full px-2 py-0.5 text-theme-xs font-medium bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-500"
                  >{{ order.status }}</span
                >
                <span
                  v-if="order.status == 'paid'"
                  class="rounded-full px-2 py-0.5 text-theme-xs font-medium bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500"
                  >{{ order.status }}</span
                >
              </p>
            </td>

            <td class="px-4 py-2 space-x-2">
              <button
                @click="editData(order._id)"
                class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-sm"
              >
                <PencilBoxOutlineIcon size="24" />
              </button>
              <button
                v-if="order.status != 'paid'"
                @click="deleteData(order._id)"
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
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import PencilBoxOutlineIcon from 'vue-material-design-icons/PencilBoxOutline.vue'
import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue'

const toast = useToast()

const router = useRouter()
const emit = defineEmits(['refresh']) // to call function in parent component

defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
})

function editData(orderId) {
  router.push({ name: 'edit-order', params: { id: orderId } })
}

const deleteData = async (id) => {
  if (confirm('Are you sure you want to delete this order?')) {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`)
      if (res) {
        toast.success('Orders deleted successfully!')
        emit('refresh') // Emit refresh event to parent component
      }
    } catch (err) {
      console.error(err)
    }
    //console.log(`Post with ID ${id} deleted`)
  }
}

function getTotalPrice(order) {
  if (!order.items || order.items.length === 0) return 0
  return order.items.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1)
  }, 0)
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

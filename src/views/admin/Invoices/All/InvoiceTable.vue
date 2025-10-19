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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Cashir By</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total Price</p>
            </th>
            <th class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(invoice, index) in invoices"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                {{ index + 1 }}
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">#{{ invoice.invoiceNo }}</div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ invoice.tableId?.name || 'No Table' }}
                </span>
              </div>
            </td>

            <td class="px-5 py-4 sm:px-6">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ new Date(invoice.paidAt).toLocaleDateString() }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ invoice.paidBy.fullname ?? 'No Name' }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">${{ invoice.total }}</p>
            </td>

            <td class="px-4 py-2 space-x-2">
              <button
                @click="printData(invoice._id)"
                class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-sm"
              >
                <PrinterIcon size="24" />
              </button>
              <!-- <button
                @click="deleteData(invoice._id)"
                class="bg-red-500 text-white rounded hover:bg-red-600 p-1 text-sm"
              >
                <DeleteOutlineIcon />
              </button> -->
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
import PrinterIcon from 'vue-material-design-icons/Printer.vue'


const toast = useToast()

const router = useRouter()
const emit = defineEmits(['refresh']) // to call function in parent component

defineProps({
  invoices: {
    type: Array,
    default: () => [],
  },
})

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

const printData = (id) => {
  router.push({ name: 'invoice-print', params: { id } })
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-lg">Invoices</h2>
            <router-link
              to="/admin/orders/#/pos"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              New Order
            </router-link>
          </div>
        </template>

        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

        <div class="flex justify-between items-center mt-4">
          <div>
            <label class="text-sm font-medium mr-2">Items per page:</label>
            <select v-model="limit" @change="onLimitChange" class="border rounded px-2 py-1">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>

          <div class="space-x-2 flex items-center">
            <button
              @click="prevPage"
              :disabled="!pagination.hasPrevPage"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span class="text-sm"> Page {{ pagination.page }} of {{ pagination.totalPages }} </span>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNextPage"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <InvoiceTable :invoices="invoices" @refresh="fetchData" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/admin/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/admin/common/ComponentCard.vue'
import InvoiceTable from './InvoiceTable.vue'

const isLoading = ref(false)
const currentPageTitle = ref('All Invoices')

const invoices = ref([])
const page = ref(1)
const limit = ref(10)

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`, {
      params: { page: page.value, limit: limit.value },
    })

    const data = res.data
    invoices.value = data.invoices

    pagination.value.currentPage = data.currentPage
    pagination.value.totalPages = data.totalPages
    pagination.value.hasNextPage = data.currentPage < data.totalPages
    pagination.value.hasPrevPage = data.currentPage > 1

  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const nextPage = () => {
  if (pagination.value.hasNextPage) {
    page.value++
    fetchData()
  }
}

const prevPage = () => {
  if (pagination.value.hasPrevPage) {
    page.value--
    fetchData()
  }
}

const onLimitChange = () => {
  page.value = 1
  fetchData()
}
</script>


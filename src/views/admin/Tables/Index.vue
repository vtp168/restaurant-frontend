<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard>
        <div class="mb-4 flex">
          <router-link
            to="/admin/tables/create"
            class="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 align-end"
          >
            New Table
          </router-link>
        </div>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
        <div class="flex justify-between items-center">
          <div>
            <label class="text-sm font-medium mr-2">Items per page:</label>
            <select v-model="limit" @change="onLimitChange" class="border rounded px-2 py-1">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>

          <div class="space-x-2">
            <button
              @click="prevPage"
              :disabled="!pagination.hasPrevPage"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span class="text-sm"
              >Page {{ pagination.page[0] }} of {{ pagination.totalPages[0] }}</span
            >
            <button
              @click="nextPage"
              :disabled="!pagination.hasNextPage"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <DataTable :tables="tables" @refresh="fetchData" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/admin/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import ComponentCard from '@/components/admin/common/ComponentCard.vue'
import DataTable from '@admin/Tables/DataTable.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const isLoading = ref(false)
const page = ref(1)
const limit = ref(10)
const pagination = ref({
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 10,
})

const currentPageTitle = ref('All Tables')

const tables = ref([])

// for edit post
onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tables`)
    if (res) {
      tables.value = res.data
      isLoading.value = false
      console.log(res.data)
      //console.log(pagination.value.page)
    }
  } catch (err) {
    isLoading.value = false
    console.error(err)
  }
}

const nextPage = () => {
  if (pagination.value.hasNextPage) {
    pagination.value.page++
    //fetchPosts()
  }
}

const prevPage = () => {
  if (pagination.value.hasPrevPage) {
    pagination.value.page--
    //fetchPosts()
  }
}

const onLimitChange = () => {
  pagination.value.page = 1 // Reset to the first page when the limit changes
 //fetchPosts()
}
</script>

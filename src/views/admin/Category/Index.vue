<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard>
        <div class="mb-4 flex">
          <router-link
            to="/admin/categories/create"
            class="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 align-end"
          >
            New Category
          </router-link>
        </div>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

        <DataTable :categories="categories" @refresh="fetchData" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/admin/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import ComponentCard from '@/components/admin/common/ComponentCard.vue'
import DataTable from '@admin/Category/DataCategory.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const isLoading = ref(false)


const currentPageTitle = ref('All Categories') // page title here

const categories = ref([])

// for edit post
onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    if (res) {
      categories.value = res.data
      isLoading.value = false
      console.log(res.data)
      //console.log(pagination.value.page)
    }
  } catch (err) {
    isLoading.value = false
    console.error(err)
  }
}


</script>

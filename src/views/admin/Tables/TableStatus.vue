<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
        <!-- Legend -->
        <div class="flex space-x-6 mb-6">
          <div class="flex items-center space-x-2">
            <span class="w-4 h-4 rounded bg-orange-300"></span> <span>Check in</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-4 h-4 rounded bg-red-300"></span> <span>Booking</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-4 h-4 rounded bg-gray-200"></span> <span>Available</span>
          </div>
        </div>

        <!-- Tables Grid -->
        <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-4">
          <div
            v-for="table in tables"
            :key="table.id"
            class="flex flex-col items-center justify-center h-40 rounded-lg text-center cursor-pointer transition hover:scale-105"
            :class="statusColor(table.status)"
          >
            <router-link
              v-if="table.status !== 'free'"
              :to="`/admin/order/table/${table._id}`"
              class="w-full h-full flex flex-col items-center justify-center"
            >
              <div class="font-semibold text-lg">{{ table.name }}</div>

              <span class="material-symbols-outlined" style="font-size: 64px">dine_lamp</span>
              <div class="text-md items-center flex space-x-1 mt-2">
                <span class="material-symbols-outlined">groups_2</span>
                <span>
                  {{ table.capacity }}
                </span>
              </div>
            </router-link>
            <router-link
              v-else
              :to="`/admin/pos/table/${table._id}`"
              class="w-full h-full flex flex-col items-center justify-center"
            >
              <div class="font-semibold text-lg">{{ table.name }}</div>

              <span class="material-symbols-outlined" style="font-size: 64px">dine_lamp</span>
              <div class="text-md items-center flex space-x-1 mt-2">
                <span class="material-symbols-outlined">groups_2</span>
                <span>
                  {{ table.capacity }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/admin/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import ComponentCard from '@/components/admin/common/ComponentCard.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const isLoading = ref(false)

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

const statusColor = (status) => {
  switch (status) {
    case 'occupied':
      return 'bg-orange-300'
    case 'reserved':
      return 'bg-red-300'
    case 'free':
      return 'bg-gray-200'
    default:
      return 'bg-gray-200'
  }
}
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <Loading :active="isLoading" :can-cancel="false" :is-full-page="true"/>

    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="">
        <template #header>
          <div class="flex justify-between items-center">
            <h2></h2>
            <button @click="openAddModal" class="bg-blue-500 text-white px-3 py-1 rounded">
              New Categories
            </button>
          </div>
        </template>

        <CategoryTable :categories="categories" @deleted="fetchData" @refresh="fetchData"/> <!--to refresh use emit data from child-->
      </ComponentCard>
    </div>
      <!-- Modal Part -->
    <CateogryModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :category="selectedCategory"
      @close="closeModal"
      @add="handleAdd"
    />
  </AdminLayout>
</template>

<script setup>

import { onMounted, ref } from "vue";
import PageBreadcrumb from "@/components/admin/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/admin/layout/AdminLayout.vue";
import ComponentCard from "@/components/admin/common/ComponentCard.vue";
import CategoryTable from "@admin/Category/CategoryTable.vue";
import axios from "axios";
import 'vue-loading-overlay/dist/css/index.css';
import { useToast } from 'vue-toastification'
import Loading from 'vue-loading-overlay'
import CateogryModal from './CateogryModal.vue'

const currentPageTitle = ref("All Categories");
const isLoading = ref(false)
const categories= ref([]);
const toast = useToast() // toast noticaion 
const isModalOpen = ref(false)
const modalMode = ref('add') // or 'edit'
const selectedCategory = ref(null)

const openAddModal = () => {
  modalMode.value = 'add'
  selectedCategory.value = null
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// When submitted
const handleAdd = async (newCategory) => {
  try {
    let res=await axios.post(`${import.meta.env.VITE_API_URL}/categories`, newCategory)
    if(res.status){
       toast.success('✅ Categories created successfully!')
    }
    fetchData()
  } catch (err) {
    console.error(err)
  }
}

// for edit post
onMounted(() => {
  fetchData()

})

const fetchData = async () => {
  try
  {
    isLoading.value=true
    const res  = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    if(res)
    {
        categories.value=res.data
        isLoading.value=false
       // console.log(res.data)
    }
  }
  catch (err) {
    console.error(err)
    isLoading.value=false
  }
  }

  </script>
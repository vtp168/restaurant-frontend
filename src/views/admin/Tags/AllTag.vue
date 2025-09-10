<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h2></h2>
            <button @click="openAddModal" class="bg-blue-500 text-white px-3 py-1 rounded">
              New Tag
            </button>
          </div>
        </template>

        <TagTable :tags="tags" @refresh="fetchData" @deleted="fetchData"/>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
      </ComponentCard>
    </div>
      <!-- Modal Part -->
    <TagModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :tag="selectedTag"
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
import TagTable from "@admin/Tags/TagTable.vue";
import axios from "axios";
import 'vue-loading-overlay/dist/css/index.css';
import { useToast } from 'vue-toastification'
import Loading from 'vue-loading-overlay'
import TagModal from './TagModal.vue'

const currentPageTitle = ref("All Categories");
const isLoading = ref(false)
const tags= ref([]);
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
const handleAdd = async (newTag) => {
  try {
    let res=await axios.post(`${import.meta.env.VITE_API_URL}/tags`, newTag)
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
    isLoading.value = true
    const res  = await axios.get(`${import.meta.env.VITE_API_URL}/tags`)
    if(res)
    {
        tags.value=res.data
        isLoading.value = false
       // console.log(res.data)
    }
  }
  catch (err) {
    isLoading.value = false
    console.error(err)
  }
}

  </script>
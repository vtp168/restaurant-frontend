<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="">
        <template #header>
          <div class="flex justify-between items-center">
            <h2></h2>
            <button @click="openAddModal" class="bg-blue-500 text-white px-3 py-1 rounded">
              New User
            </button>
          </div>
        </template>

        <UserTable :users="users" @refresh="fetchData" @deleted="fetchData"/>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
      </ComponentCard>
    </div>
      <!-- Modal Part -->
    <UserModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :user="selectedUser"
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
import axios from "axios";
import 'vue-loading-overlay/dist/css/index.css';
import { useToast } from 'vue-toastification'
import Loading from 'vue-loading-overlay'
import UserModal from "./UserModal.vue";
import UserTable from "./UserTable_backup.vue";

const currentPageTitle = ref("All Categories");
const isLoading = ref(false)
const users= ref([]);
const toast = useToast() // toast noticaion
const isModalOpen = ref(false)
const modalMode = ref('add') // or 'edit'
const selectedUser = ref(null)

const openAddModal = () => {
  modalMode.value = 'add'
  selectedUser.value = null
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// When submitted
const handleAdd = async (newUser) => {
  try {
    let res=await axios.post(`${import.meta.env.VITE_API_URL}/users`, newUser)
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
    const res  = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
    if(res)
    {
        users.value=res.data
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

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard>
        <Loading :active="isLoading" :can-cancel="false" :is-full-page="true"/>
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
                <button @click="prevPage" :disabled="!pagination.hasPrevPage"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Prev
                </button>
                <span class="text-sm">Page {{ pagination.page[0] }} of {{ pagination.totalPages[0] }}</span>
                <button @click="nextPage" :disabled="!pagination.hasNextPage"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
        <PostTable :posts="posts" @refresh="fetchPosts" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>

import { onMounted, ref } from "vue";
import PageBreadcrumb from "@/components/admin/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/admin/layout/AdminLayout.vue";
import ComponentCard from "@/components/admin/common/ComponentCard.vue";
import PostTable from "@admin/Posts/PostTable.vue";
import axios from "axios";
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';

const isLoading = ref(false)
const page = ref(1);
const limit= ref(10);
const pagination = ref({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
});

const currentPageTitle = ref("All Post");

const posts= ref([]);

// for edit post
onMounted(() => {
  fetchPosts()
})

const fetchPosts = async (id) => {
  try
  {
    isLoading.value = true
    const res  = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,
    {
      params: {
        page: page.value,
        per_page: limit.value
      }
    });
    if(res)
    {
        posts.value=res.data.data
        const meta = res.data.meta;

        // Update pagination values correctly
        pagination.value.page = meta.current_page[0];
        pagination.value.totalPages = meta.last_page[0]; // Correct property name from API response
        pagination.value.hasPrevPage = meta.current_page[0] > 1;
        pagination.value.hasNextPage = meta.current_page[0] < meta.last_page[0];


        isLoading.value = false
        //console.log(pagination.value.page)
    }
  }
  catch (err) {
    isLoading.value = false
    console.error(err)
  }
}

const nextPage = () => {
    if (pagination.value.hasNextPage) {
        pagination.value.page++;
        fetchPosts();
    }
};

const prevPage = () => {
    if (pagination.value.hasPrevPage) {
        pagination.value.page--;
        fetchPosts();
    }
};

const onLimitChange = () => {
    pagination.value.page = 1; // Reset to the first page when the limit changes
    fetchPosts();
};


  </script>

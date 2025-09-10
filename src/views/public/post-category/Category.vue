<template>
<div class="max-w-screen-xl mx-auto px-4">
  <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" :opacity="0.9" />
  <!-- <div class="flex justify-between mt-20">
    <div class="mx-auto table text-center text-sm">
        <a class="uppercase" href="#">Advertisement</a>
        <a href="#">
          <img src="@/img/ads/ads_728.jpg" alt="advertisement area">
        </a>
    </div>
  </div> -->
<CateogoryNewsCardList :title="title" :posts="posts" @loadMore="loadMore"/>
</div>

</template>


<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useRoute } from 'vue-router'

import CateogoryNewsCardList from '@/views/public/post-category/CategoryNewsCardList.vue';

const isLoading = ref(false)

const posts = ref([]);
const title = ref(''); // Category title
const slug = ref(''); // Default category slug
const route = useRoute();
const currentPage = ref(1);
const lastPage = ref(0);


const fetchPosts = async (page) => {
  try {
    //const res = await axios.get("http://127.0.0.1:8000/api/articles");
   isLoading.value=true;
  //  let slug = ref(route.params.slug || 'local-news'); // Get slug from route params or
  //  console.log("Category Slug:", slug);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/category/${route.params.slug}?page=${page || 1}`);
    if (res?.data) {
      isLoading.value=false;
      //posts.value = res.data.data;
      title.value = res.data.category; // Assuming the API returns category name
      // Check if it's the first page fetch
      if (page === 1) {
        posts.value = res.data.data; // Overwrite for the first page
        lastPage.value = res.data.meta.last_page;
      } else {
        // Append new posts to the existing array for subsequent pages
        posts.value = posts.value.concat(res.data.data);
      }
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    isLoading.value=false;
  }
};

// Function to handle "See More" button click
const loadMore = () => {
  if(currentPage.value >= lastPage.value) {
    console.log("No more posts to load");
    return; // No more pages to load
  }
  currentPage.value++;
  fetchPosts(currentPage.value);
};

onMounted(() => {
  fetchPosts(1);
});

// Use a watcher to listen for changes in the slug
watch(
  () => route.params.slug, // The source to watch
  (newSlug) => {
    // This function will run whenever the slug changes
    slug.value = newSlug; // Update the ref with the new slug
    currentPage.value = 1;
    lastPage.value = 0;
    fetchPosts(1); // Fetch posts for the new slug
  },
  { immediate: true } // Run the watcher immediately on component creation
);



</script>

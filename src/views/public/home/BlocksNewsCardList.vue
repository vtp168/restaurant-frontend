<template>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- Center Content (News Cards) -->
    <div class="flex-1 flex flex-col gap-2 mt-2">
      <div class="container mx-auto px-2 py-2 border-b-red-400 border-b-2 mb-4">
        <h1 class="text-lg">{{title}}</h1>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <!-- 🔳 Featured Blog (Right) -->
        <div class="flex w-full md:w-1/3 flex-shrink-0 gap-3">
          <div class="bg-white shadow overflow-hidden flex flex-col gap-4 p-1" v-for="(p,idx) in firstPost" :key="idx">
            <router-link :to="`article/detail/${p.id}`">
                 <img
                    :src="imgPath+'/'+p.thumbnail"
                    alt="Featured News"
                    class="w-full h-64 object-cover sm:flex-1/2"
                />
            </router-link>
           
             <router-link :to="`article/detail/${p.id}`">
              <div class="sm:flex-1/2">
              <h2 class="text-md font-bold text-gray-800">{{ p.title }}</h2>
              <p class="mt-2 text-gray-600 text-sm" v-html="truncate(p.body,200)"></p>
            </div>
             </router-link>
            
          </div>
        </div>
        <!-- 📋 News List (Left) -->
        <div class="flex-1 space-y-3">
          <div
            v-for="(item, index) in remainingPosts"
            :key="index"
            class="flex flex-row bg-white p-1 border-b-2 border-gray-100 overflow-hidden"
          >
          <router-link :to="`article/detail/${item.id}`">
               <img :src="imgPath+'/'+item.thumbnail" alt="News Image" class="w-24 h-24 object-cover flex-shrink-0"/>
          </router-link>
           
            <div class="p-2 flex-1 ">
               <router-link :to="`article/detail/${item.id}`">
                <h3 class="text-md font-semibold text-gray-800">{{ item.title }}</h3>
               </router-link>
              
              <!-- <p class="text-gray-600 mt-1">{{ item.body }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto rounded-2xl border-gray-100 border-2 mb-4 justify-center">
        <h1 class="text-md mb-1 text-center"><router-link to="/category">More >></router-link></h1>
      </div>
    </div>
    <!-- Right Side (Advertisement) -->
    <div class="md:block md:w-1/5">
      <div class="bg-gray-100 h-full flex items-center justify-center p-4 rounded shadow">
        <span class="text-gray-500 text-center">Advertisement Here</span>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";

let imgPath=import.meta.env.VITE_IMAGE_PATH;

defineProps({
  title: {
    type: String,
    default: 'Latest News'
  },
  firstPost: {
    type: Array,
    default: () => []
  },
  remainingPosts: {
    type: Array,
    default: () => []
  }
});

function truncate(text, length = 200) {
  if (!text) return ''
  const div = document.createElement('div')
  div.innerHTML = text
  const plainText = div.textContent || div.innerText || ''
  return plainText.length > length
    ? plainText.slice(0, length) + '...'
    : plainText
}

</script>
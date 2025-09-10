<template>
 <!-- hero big grid -->
  <div class="bg-white py-2">
    <div class="xl:container mx-auto3 sm:px-4 xl:px-2">
    <!-- big grid 1 -->
    <div class="flex flex-row flex-wrap">
      <!--Start left cover-->
      <div class="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1"  v-for="(p, index) in firstPost" :key="index">
        <div class="relative hover-img max-h-98 overflow-hidden">
          <router-link :to="`article/detail/${p.id}`">
          <img class="max-w-full w-full mx-auto h-full hover:scale-101 hover:opacity-80" :src="imgPath+'/'+p.thumbnail" alt="Image description">
          </router-link>
          <div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
          <router-link :to="`article/detail/${p.id}`">
            <h2 class="text-lg font-bold capitalize text-white mb-3">{{p?.title}}</h2>
          </router-link>
          <!-- <p class="text-gray-100 hidden sm:inline-block">This is a wider card with supporting text below as a natural lead-in to additional content. This very helpfull for generate default content..</p> -->
          <div class="pt-1">
            <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>{{p?.category.name_kh}}</div>
          </div>
          </div>
        </div>
      </div>

      <!--Start box news-->
    <div class="flex-shrink flex-wrap max-w-full w-full lg:w-1/2">
      <div class="box-one flex flex-row flex-wrap">
        <article class="flex-shrink max-w-full w-full sm:w-1/2"  v-for="(post, index) in remainingPosts"
            :key="index">
          <div class="relative hover-img max-h-48 overflow-hidden">
            <router-link :to="`article/detail/${post.id}`">
              <img class="w-full min-h-48 object-cover" :src="imgPath+'/'+post.thumbnail" alt="Image description">
            </router-link>
            <div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <router-link :to="`article/detail/${post.id}`">
              <h2 class="text-sm font-bold capitalize leading-tight text-white mb-1">{{post.title}}</h2>
            </router-link>
            <div class="pt-1">
              <div class="text-gray-100 text-sm text-shadow-2xs"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>{{post.category.name_kh}}</div>
            </div>
            </div>
          </div>
        </article>

      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let imgPath=import.meta.env.VITE_IMAGE_PATH;

defineProps({
  firstPost: {
    type: Array,
    default: () => []
  },
  remainingPosts: {
    type: Array,
    default: () => []
  }
});




</script>


<style scoped>
.box-one > article:nth-child(1) { 
	padding-top: 0;
	padding-bottom: 0.125rem;
	padding-right: 0.125rem;
}
.box-one > article:nth-child(2) {
	padding-top: 0;
	padding-bottom: 0.125rem;
	padding-left: 0.125rem;
}
.box-one > article:nth-child(3) {
	padding-top: 0.25rem;
	/* padding-bottom: 0.125rem; */
	padding-right: 0.125rem;
}
.box-one > article:nth-child(4) {
	padding-top: 0.35rem;
	/* padding-bottom: 0.125rem; */
	padding-left: 0.25rem;
}
/*hover img*/
.hover-img:hover img {
 filter: brightness(103%) contrast(103%);
  opacity:.99;
}
</style>


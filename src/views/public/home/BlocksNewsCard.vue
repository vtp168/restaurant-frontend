<template>
  <section class="bg-white">
    <div class="lg:container mx-auto px-3 sm:px-4 xl:px-2">
      <div class="flex flex-row flex-wrap">
        <!-- Left News List -->
        <div class="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
          <div class="w-full py-3">
            <h2 class="text-gray-800 text-2xl font-bold">
              <span class="inline-block h-5 border-l-4 border-red-600 mr-2"></span>Europe
            </h2>
          </div>

          <div class="flex flex-row flex-wrap" >

            <div class="flex max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100" v-for="(post, index) in newsItems" :key="index">
             <div class="flex flex-row sm:block hover-img">
               <a :href="post.link">
                <img class="max-w-full w-full mx-auto" :src="post.image" :alt="post.alt">
               </a>
               <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                <h3 class="text-lg font-bold leading-tight mb-2">
                  <a :href="post.link">{{ post.title }}</a>
                </h3>
                <p class="hidden md:block text-gray-600 leading-tight mb-1">{{ post.description }}</p>
                <a class="text-gray-500" :href="post.link">
                  <span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{{ post.category }}
                </a>
               </div>
             </div>
            </div>
          
          </div>
        </div>

        <!-- Right Advertisement -->
        <div class="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
          <div class="w-full bg-gray-50 h-full">
            <div class="text-sm py-6 sticky">
              <div class="w-full text-center">
                <a class="uppercase" href="#">Advertisement</a>
                <a href="#">
                  <img class="mx-auto" src="@/img/ads/250.jpg" alt="advertisement area" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import img2 from '@/img/dummy/img2.jpg';
import img3 from '@/img/dummy/img3.jpg';
import img4 from '@/img/dummy/img4.jpg';
import img5 from '@/img/dummy/img5.jpg';

export default {
name: 'BlockNewsCard',
  data() {
    return {

      newsItems: [
      {
        title: 'News magazines are becoming obsolete, replaced by gadgets',
        image: img2,
        alt: 'News gadgets',
        category: 'Techno',
        link: '#',
    },
    {
    title: 'Minimalist designs are starting to be popular with the next generation',
    image: img3,
    alt: 'Minimalist Design',
    category: 'Architecture',
    link: '#',
    },
    {
    title: 'Tips for decorating the interior of the living room',
    image: img4,
    alt: 'Interior Tips',
    category: 'Interior',
    link: '#',
  },
  {
    title: 'Online taxi users are increasing drastically ahead of the new year',
    image: img5,
    alt: 'Online Taxi',
    category: 'Lifestyle',
    link: '#',
  },
]
    }
  }
}

</script>

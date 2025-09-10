<template>
    <div class="flex mx-auto overflow-hidden whitespace-nowrap border-1 mt-2 border-red-300 text-gray-700 py-2">
        <div
            class="inline-block animate-marquee"
            :style="{ animationDuration: `${duration}s` }"
            @mouseenter="isPaused = true"
            @mouseleave="isPaused = false"
            :class="{ 'paused': isPaused }"
        >
            <span class="mx-4 font-semibold" v-for="(item, index) in newsTickers" :key="index">
                🔴
                <router-link
                    :to="'/article/detail/' + item.id"
                    class="text-blue-600 hover:underline"
                >
                    {{ item.title }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  newsTickers: {
    type: Array,
    default: () => []
  },
 
});
// const news = [
//     "Breaking: Market hits all-time high",
//     "Tech: New smartphone launched",
//     "Sports: Team X wins the championship",
//     "Breaking: Market hits all-time high",
//     "Tech: New smartphone launched",
//     "Sports: Team X wins the championship",
//     "Breaking: Market hits all-time high",
//     "Tech: New smartphone launched",
//     "Sports: Team X wins the championship",
// ];
const duration = 40; // speed of scrolling
const isPaused = ref(false)

// Duplicate news to create seamless loop
const loopedNews = computed(() => [...newsTickers, ...newsTickers])
</script>

<style scoped>
@keyframes marquee {
    0%   { transform: translateX(10%); }
    100% { transform: translateX(-100%); }
}
.animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee linear infinite;
}
.paused {
    animation-play-state: paused !important;
}
</style>

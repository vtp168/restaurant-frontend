<template>
  <div class="h-full flex flex-col">
    <!-- No Items -->
    <div
      v-if="menuItems.length === 0"
      class="text-center text-gray-500 py-20 flex-1 overflow-y-auto"
    >
      No items found in this category or matching your search.
    </div>
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 overflow-y-auto p-2"
      style="max-height: calc(100vh - 180px)"
    >
      <div
        v-for="item in menuItems"
        :key="item._id"
        class="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer"
        @click="handleAddToCart(item)"
      >
        <img
          :src="`${apiUrl}/files/${item.image}`"
          alt="menu"
          class="rounded-t-lg w-full h-36 sm:h-40 md:h-48 object-cover"
        />
        <div class="p-3">
          <p class="font-semibold truncate">{{ item.name }}</p>
          <p v-if="item.price" class="text-green-600 font-bold">${{ item.price }}</p>
          <p v-else class="text-gray-400 text-sm italic">Select size for price</p>
        </div>
      </div>
    </div>

    <SizeModal
      :show="showModal"
      :item="selectedItem"
      @close="closeModal"
      @size-selected="handleSizeSelected"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SizeModal from './SizeSelectionModal.vue'

const apiUrl = import.meta.env.VITE_API_URL

defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add'])

const showModal = ref(false)
const selectedItem = ref(null)

const handleAddToCart = (item) => {
  if (!item.price && item.sizes?.length) {
    selectedItem.value = item
    showModal.value = true
  } else if (item.price) {
    emit('add', { ...item, size: null })
    playAddSound()
  }
}

const handleSizeSelected = (size) => {
  if (selectedItem.value) {
    emit('add', {
      _id: selectedItem.value._id,
      name: selectedItem.value.name,
      price: size.price,
      size: size.label, // ✅ បញ្ជូនត្រឹមតែ size ដាច់ដោយឡែក
    })
    playAddSound()
  }
  closeModal()
}

const playAddSound = () => {
  const audio = new Audio('/sounds/add-to-cart.mp3')
  audio.volume = 0.5
  audio.play()
}

const closeModal = () => {
  showModal.value = false
  selectedItem.value = null
}
</script>

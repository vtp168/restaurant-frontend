<template>
  <div
    v-if="show"
    @click.self="close"
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-sm">
      <!-- Header -->
      <div class="p-4 border-b">
        <h3 class="text-lg font-bold text-gray-800">
          Select Size for {{ item?.name }}
        </h3>
        <p class="text-sm text-gray-500">{{ item?.name_kh }}</p>
      </div>

      <!-- Size List -->
      <div class="p-4">
        <div class="space-y-2">
          <button
            v-for="size in item?.sizes || []"
            :key="size.label"
            @click="selectSize(size)"
            class="w-full flex justify-between items-center text-left p-3 rounded-lg hover:bg-gray-100 border"
          >
            <span class="font-semibold text-gray-700">{{ size.label }}</span>
            <span class="font-mono text-green-600 font-bold">
              {{ formatCurrency(size.price) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 bg-gray-50 border-t rounded-b-lg text-right">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  item: Object,
})

const emit = defineEmits(['close', 'size-selected'])

const close = () => emit('close')

// ✅ មិន add ទៅ cart នៅទីនេះទេ
// គ្រាន់តែ emit size ត្រឡប់ទៅ parent
const selectSize = (size) => {
  emit('size-selected', size)
  close()
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
</script>

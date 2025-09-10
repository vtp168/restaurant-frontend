<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue === 1"
      @change="togglePublish"
      class="sr-only peer"
    />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
      dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
      after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
      dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {{ modelValue === 1 ? 'Published' : 'Unpublished' }}
    </span>
  </label>
</template>

<script setup>
import axios from 'axios'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  postId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const togglePublish = async (event) => {
  const newValue = event.target.checked ? 1 : 0
  emit('update:modelValue', newValue)

  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/posts/${props.postId}/publish`, {
      is_publish: newValue,
    })
    // Optional: Show toast or success
    console.log('Publish status updated')
  } catch (error) {
    console.error('Failed to update publish status', error)
    // Optional: Show error toast
  }
}
</script>

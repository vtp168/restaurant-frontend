<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-40 backdrop-blur-sm shadow-2xl">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          {{ mode === 'edit' ? 'Edit Tag' : 'Add New Tag' }}
        </h2>
        <button @click="closeModal" class="text-gray-600 hover:text-red-500">&times;</button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Tag Name</label>
          <input
            type="text"
            v-model="form.name"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

       

        <!-- <div class="mb-4" v-if="mode === 'edit'" >
          <label class="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            v-model="form.slug"
            disabled
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div> -->

        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="mr-3 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {{ mode === 'edit' ? 'Update' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'


const props = defineProps({
  isOpen: Boolean,
  mode: String, // 'add' or 'edit'
  tag: Object // only used in edit
})

const emit = defineEmits(['close', 'add', 'update'])

const form = ref({
  id: '',
  name: '',
  slug: ''
})

// Watch props to populate form
watch(
  () => [props.isOpen, props.mode, props.tag],
  () => {
    if (props.mode === 'edit' && props.tag) {
      form.value = { ...props.tag }
    } else {
      form.value = {
        id: '',
        name: '',
        slug: ''
      }
    }
  },
  { immediate: true }
)

const closeModal = () => {
  emit('close')
}

const submitForm = () => {
  if (props.mode === 'edit') {
    emit('update', { ...form.value })
  } else {
    emit('add', { ...form.value })
  }
  closeModal()
}


</script>

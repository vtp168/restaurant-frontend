<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-40 backdrop-blur-sm shadow-2xl">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          {{ mode === 'edit' ? 'Edit User' : 'Add New User' }}
        </h2>
        <button @click="closeModal" class="text-gray-600 hover:text-red-500">&times;</button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            v-model="form.name"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4" v-if="mode === 'add'">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4" v-if="mode === 'add'">
          <label class="block text-sm font-medium text-gray-700"><span class="text-red-500">* </span>Confirm Password</label>
          <input
            type="password"
            v-model="form.confirmpassword"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"><span class="text-red-500">* </span>Login Email</label>
          <input
            type="text"
            v-model="form.email"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            v-model="form.author_name"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Author Email</label>
          <input
            type="text"
            v-model="form.author_email"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Author Bio</label>
          <input
            type="text"
            v-model="form.author_bio"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

         <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Author Phone</label>
          <input
            type="text"
            v-model="form.author_phone"
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
  user: Object // only used in edit
})

const emit = defineEmits(['close', 'add', 'update'])

const form = ref({
  _id: '',
  name: '',
  user: '',
  email: '',
  author_name: '',
  author_bio: '',
  author_phone: '',
})

// Watch props to populate form
watch(
  () => [props.isOpen, props.mode, props.user],
  () => {
    if (props.mode === 'edit' && props.user) {
      form.value = { ...props.user }
    } else {
      form.value = {
        _id: '',
        name: '',
        user: '',
        email: '',
        author_name: '',
        author_bio: '',
        author_phone: '',
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

<template>
  <div>
    <!-- Profile Card -->
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img src="/images/user/owner.jpg" alt="user" />
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 capitalize">
              {{ userInfo.fullname }}
            </h4>
          </div>
        </div>

        <button @click="openModal" class="edit-button flex items-center gap-2">
          ✎ Edit
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
      <template #body>
        <div class="relative w-full max-w-[500px] rounded-3xl bg-white p-6 dark:bg-gray-900">
          <button
            @click="isProfileInfoModal = false"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <h4 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Profile
          </h4>

          <form @submit.prevent="saveProfile" class="space-y-5">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Full Name
              </label>
              <input
                v-model="form.fullname"
                type="text"
                class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <p v-if="errors.fullname" class="text-sm text-red-500 mt-1">{{ errors.fullname }}</p>
            </div>

            <!-- Old Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Old Password
              </label>
              <input
                v-model="form.oldPassword"
                type="password"
                class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <p v-if="errors.oldPassword" class="text-sm text-red-500 mt-1">{{ errors.oldPassword }}</p>
            </div>

            <!-- New Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                New Password
              </label>
              <input
                v-model="form.password"
                type="password"
                class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Confirm Password
              </label>
              <input
                v-model="form.confirmPassword"
                type="password"
                class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <p v-if="errors.confirmPassword" class="text-sm text-red-500 mt-1">{{ errors.confirmPassword }}</p>
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="isProfileInfoModal = false"
                class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              >
                Close
              </button>
              <button
                type="submit"
                class="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Modal from './Modal.vue'
import axios from 'axios'

const isProfileInfoModal = ref(false)
const userId = ref('')

const props = defineProps({
  userInfo: Object,
})

onMounted(() => {
  userId.value = props.userInfo?._id || ''
})

const form = ref({
  fullname: props.userInfo?.fullname || '',
  oldPassword: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}

  if (!form.value.fullname.trim()) errors.value.fullname = 'Full name is required.'
  if (!form.value.oldPassword.trim()) errors.value.oldPassword = 'Old password is required.'
  if (!form.value.password.trim()) errors.value.password = 'New password is required.'
  else if (form.value.password.length < 6) errors.value.password = 'Password must be at least 6 characters.'
  if (form.value.confirmPassword !== form.value.password)
    errors.value.confirmPassword = 'Passwords do not match.'

  return Object.keys(errors.value).length === 0
}

const openModal = () => {
  form.value.fullname = props.userInfo?.fullname || ''
  form.value.oldPassword = ''
  form.value.password = ''
  form.value.confirmPassword = ''
  errors.value = {}
  isProfileInfoModal.value = true
}

const saveProfile = async () => {
  if (!validateForm()) return

  try {
    const res = await axios.patch('/api/users/update/'+userId.value, form.value)
    console.log('Profile updated:', res.data)
    isProfileInfoModal.value = false
  } catch (err) {
    console.error('Error updating profile:', err)
  }
}
</script>

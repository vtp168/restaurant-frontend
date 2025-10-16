<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6 col-span-12">
        <ComponentCard>
          <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                Full Name
              </label>
              <input
                type="text"
                v-model="form.fullname"
                placeholder="Full Name"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                username
              </label>
              <input
                type="text"
                v-model="form.username"
                placeholder="Username"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
              <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                password
              </label>
              <input
                type="text"
                v-model="form.password"
                placeholder="Password"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div v-if="isEdit">
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
                role
              </label>
              <select
                v-model="form.role"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              >
                <option
                  v-for="role in roles"
                  :key="role"
                  :value="role"
                >
                  {{ role }}
                </option>

              </select>
            </div>
            <!-- Submit -->
            <div>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4 px-6 py-2 rounded-xl"
              >
                {{ isEdit ? 'Update User' : 'Create User' }}
              </button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import PageBreadcrumb from '@/components/admin/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import ComponentCard from '@/components/admin/common/ComponentCard.vue'
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const isLoading = ref(false)

const currentPageTitle = ref('Create Post') // form title here
const toast = useToast() // toast noticaion

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
//const postId = route.params.id

const form = ref({
  fullname: '',
  username: '',
  password: '',
  status: true,
  role: '',
  // image: null,
})

const roles=ref(['admin','waiter','chef','manager'])

const users = ref([]);

const handleSubmit = async () => {
  isLoading.value = true

  // if (form.value.image) {
  //   formData.append('thumbnail', form.value.image)
  // }

  if (isEdit.value) {
    try {
      isLoading.value = true
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${route.params.id}`,
        {
          fullname: form.value.fullname,
          username: form.value.username,
          password: form.value.password,
          isActive: form.value.status,
          role: form.value.role,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      isLoading.value = false
      toast.success('✅ User Updated successfully!')
      router.push('/admin/users')
    } catch (err) {
      toast.error('❌ Failed to create user.')
      isLoading.value = false
      console.error(err)
    }
  } else {
    try {
      isLoading.value = true
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          fullname: form.value.fullname,
          username: form.value.username,
          password: form.value.password,
          role: form.value.role,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      isLoading.value = false
      toast.success('✅ User created successfully!')
      router.push('/admin/users')
    } catch (err) {
      isLoading.value = false
      toast.error('❌ Failed to create table.')
      console.error(err)
    }
  }

  //router.push('/admin/posts')
}

const fetchDataById = async (id) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`)
    form.value.fullname = data.fullname
    form.value.username = data.username
    form.value.status = data.isActive
    form.value.role = data.role
  } catch (error) {
    console.error('Failed to fetch post:', error)
    // Optional: show error toast or message
  }
}

const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
    if (res.data)
    {
      const data = res.data;
      users.value = data.filter(item => item.role === null);

  }


  } catch (error) {
    console.error('Failed to fetch post:', error)
    // Optional: show error toast or message
  }
}


// reset form after success

// for edit post
onMounted(() => {
  if (isEdit.value) {
    currentPageTitle.value = 'Edit User' // change form title
    fetchData()
    fetchDataById(route.params.id)
  } else {
    fetchData()
    currentPageTitle.value = 'Create User' // change form title
  }
})
</script>

<style scoped>
.custom-toast {
  margin-top: 200px;
  z-index: 1000;
}
.Vue-Toastification__toast--success {
  background-color: #d1fae5; /* Tailwind's bg-green-100 */
  color: #065f46; /* Tailwind's text-green-800 */
  z-index: 4000;
}
</style>

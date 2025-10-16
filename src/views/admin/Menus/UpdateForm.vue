<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <Loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-6 col-span-12">
        <ComponentCard>
          <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <!-- Name EN -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Name (EN)</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <!-- Name KH -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Name (KH)</label>
              <input
                v-model="form.name_kh"
                type="text"
                class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <!-- Category Select Component -->
            <div class="mb-4">
              <CategorySelect :categories="categories" v-model="selectedCategory" />
            </div>

            <!-- Description -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea
                v-model="form.description"
                class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              ></textarea>
            </div>

            <!-- Pricing -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Pricing</label>

              <div class="flex gap-6 mb-4">
                <label class="flex items-center gap-2">
                  <input type="radio" value="single" v-model="pricingType" />
                  <span>Single Price</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" value="sizes" v-model="pricingType" />
                  <span>Multiple Sizes</span>
                </label>
              </div>

              <div v-if="pricingType === 'single'">
                <input
                  type="number"
                  v-model.number="form.price"
                  placeholder="Price"
                  class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>

              <div v-else>
                <div v-for="(size, idx) in form.sizes" :key="idx" class="flex gap-2 mb-2">
                  <select
                    v-model="size.label"
                    class="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                  <input
                    type="number"
                    v-model.number="size.price"
                    placeholder="Price"
                    class="flex-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    class="bg-red-500 text-white px-3 rounded-lg py-1"
                    @click="form.sizes.splice(idx, 1)"
                  >
                    ✕
                  </button>
                </div>
                <button
                  type="button"
                  class="bg-blue-600 text-white px-4 py-1 rounded-lg"
                  @click="form.sizes.push({ label: 'Medium', price: 0 })"
                >
                  + Add Size
                </button>
              </div>
            </div>

            <!-- Current Image Preview -->
            <div v-if="form.image && !selectedFile" class="mb-4">
              <p class="text-sm text-gray-500 mb-2">Current Image:</p>
              <img
                :src="`${apiUrl}/files/${form.image}`"
                alt="Current"
                class="h-24 w-24 rounded-lg object-cover"
              />
            </div>

            <!-- Image Upload -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Upload New Image</label>
              <input
                type="file"
                @change="onFileChange"
                class="w-full border rounded-lg px-3 py-2 file:mr-2 file:py-2 file:px-2 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <!-- Available -->
            <div class="mb-4 flex items-center gap-2">
              <input type="checkbox" v-model="form.available" class="w-5 h-5 text-blue-600" />
              <span>Available</span>
            </div>

            <!-- Submit -->
            <div>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4 px-6 py-2 rounded-xl"
              >
                Update Menu
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import CategorySelect from './CategorySelect.vue'

const isLoading = ref(false)
const toast = useToast()

const route = useRoute()
const router = useRouter()
const menuId = route.params.id
const apiUrl = import.meta.env.VITE_API_URL

const currentPageTitle = ref('Edit Menu')
const categories = ref([])
const pricingType = ref('single')
const selectedFile = ref(null)
const selectedCategory = ref('') // For selected category

const form = ref({
  name: '',
  name_kh: '',
  category: '',
  description: '',
  price: null,
  sizes: [],
  file: null,
  available: true,
})

const onFileChange = (e) => {
  selectedFile.value = e.target.files[0]
}

const fectchCategories = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    categories.value = data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const fetchMenu = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/menu/${menuId}`)
    form.value = {
      ...form.value,
      ...data,
    }
    selectedCategory.value = data.category

    if (data.sizes?.length) {
      pricingType.value = 'sizes'
    } else {
      pricingType.value = 'single'
    }

    isLoading.value = false
  } catch (err) {
    isLoading.value = false
    toast.error('Failed to load menu data')
  }
}

const handleSubmit = async () => {
  isLoading.value = true
  const data = new FormData()
  data.append('name', form.value.name)
  data.append('name_kh', form.value.name_kh)
  data.append('category', selectedCategory.value)
  data.append('description', form.value.description)
  data.append('available', form.value.available)

  if (pricingType.value === 'single') {
    data.append('price', form.value.price)
  } else {
    data.append('sizes', JSON.stringify(form.value.sizes))
  }

  if (selectedFile.value) {
    data.append('file', selectedFile.value)
  }

  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/menu/${menuId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    isLoading.value = false
    toast.success('✅ Menu updated successfully!')
    router.push('/admin/menus')
  } catch (err) {
    isLoading.value = false
    toast.error(err.response?.data?.message || '❌ Error updating menu')
  }
}

onMounted(async () => {
  await fectchCategories()
  await fetchMenu()
})
</script>

<style scoped>
.custom-toast {
  margin-top: 200px;
  z-index: 1000;
}
.Vue-Toastification__toast--success {
  background-color: #d1fae5;
  color: #065f46;
  z-index: 4000;
}
</style>

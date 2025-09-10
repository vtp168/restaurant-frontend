<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <Loading :active="isLoading" :can-cancel="false" :is-full-page="true"/>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

      <div class="space-y-6 col-span-12">
        <ComponentCard>
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div>
          
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 mt-2">
               Post Title
            </label>
            <input
                  type="text"
                  v-model="form.title"
                  placeholder="post title"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
               />
          </div>

           <!-- Slug (readonly) -->
      <!-- <div>
        <label class="block text-gray-700 font-medium mb-2 mt-2">Slug</label>
        <input
          v-model="form.slug"
          type="text"
          readonly
          class="w-full bg-gray-100 border rounded-lg px-4 py-2"
        />
      </div> -->

      <!-- Content -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 mt-2">Content</label>
        <!-- <textarea
          v-model="form.body"
          class="w-full border rounded-lg px-4 py-2 h-40 resize-none"
          required
        ></textarea> -->
        <QuillEditor v-model:content="form.body" />
      </div>

      

      <!-- Category -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 mt-2">Category</label>
        <select
          v-model="form.category_id"
          class="w-full border rounded-lg px-4 py-2"
          required
        >
          <option value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Tags -->

      <div>
         <label class="block text-gray-700 font-medium mb-2 mt-2">Tags</label>
        <MultipleSelect :options="tags"  v-model="selectedTags"></MultipleSelect>
      </div>
    
    <div>
      <label class="block text-gray-700 font-medium mb-2 mt-4">Image Thumbnails</label>
      <input
        type="file"
        @change="handleThumbnail"
        class="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
      />
      <div v-if="thumbnailPreview" class="mt-2">
      <img :src="thumbnailPreview" class="w-32 h-32 object-cover rounded" />
    </div>

    </div>

      <label class="block text-gray-700 font-medium mb-2 mt-2">Image</label>
       <input
        type="file"
        multiple
        @change="handleMultipleImageChange"
        class="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
      />
      <div v-if="imagePreview && imagePreview.length" class="mt-4 flex flex-wrap gap-4">
        <div v-for="(img, idx) in imagePreview" :key="idx" class="relative">
          <img :src="img" class="w-40 rounded-xl" />
          <button
        type="button"
        @click="removeImage(idx)"
        class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
        title="Remove image"
          >
        &times;
          </button>
        </div>
      </div>
      <!-- OLD images from DB -->
      <div v-if="oldImages.length" class="mt-4 flex flex-wrap gap-4">
      <div v-for="(img, idx) in oldImages" :key="idx" class="relative">
        <img :src="img.url" class="w-40 rounded-xl" />
        <button
          type="button"
          @click="removeOldImage(img.id)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          title="Remove from server"
        >
          &times;
        </button>
      </div>
</div>

          <!-- NEW uploaded images (not yet saved) -->
          <!-- <div v-if="imagePreview.length" class="mt-4 flex flex-wrap gap-4">
            <div v-for="(img, idx) in imagePreview" :key="'new-' + idx" class="relative">
              <img :src="img" class="w-40 rounded-xl" />
              <button
                type="button"
                @click="removeNewImage(idx)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                title="Remove"
              >
                &times;
              </button>
            </div>
          </div> -->


      <!-- Submit -->
      <div>

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4 px-6 py-2 rounded-xl"
        >
          {{ isEdit ? 'Update Post' : 'Create Post' }}
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
import MultipleSelect from '@/components/admin/forms/FormElements/MultipleSelect.vue'
import { useToast } from 'vue-toastification'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import QuillEditor from '@/components/admin/forms/FormElements/TextEditor.vue'

const quillEditor = ref(null)
const isLoading = ref(false)

const currentPageTitle = ref('Create Post') // form title here
const toast = useToast() // toast noticaion 


const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
//const postId = route.params.id

const images = ref([])
 const thumbnail = ref(null)
// const imagePreviews = ref([])
const thumbnailPreview = ref(null)

const form = ref({
  title: '',
  slug: '',
  body: '',
  category_id: '',
  tags: [],
  selectedTags:[],
})

const categories = ref([])
const tags = ref([])
const imagePreview = ref(null)
const oldImages=ref([])
const selectedTags = ref([])
const tagId = ref([])
const modelValue =ref([]) // get selected tag



const fetchMeta = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles/meta`)
  categories.value = response.data.data.categories
  tags.value=response.data.data.tags
 
  //console.log(response.data)

}


const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`)

    form.value = {
      title: data?.title ?? '',
      // slug: data?.slug ?? '',
      body: data?.body ?? '',
      category_id: parseInt(data?.category?.id) || null,
      image: data?.thumbnail ?? '',
    }

    // Thumbnail preview
    thumbnailPreview.value = data?.thumbnail
      ? `${import.meta.env.VITE_IMAGE_PATH}/${data.thumbnail}`
      : ''

    // Images preview (array of image URLs)
    oldImages.value = Array.isArray(data?.images)
  ? data.images.map(file => ({
      id: file.id,
      image_path: file.image_path,
      url: `${import.meta.env.VITE_IMAGE_PATH}/${file.image_path}`
    }))
  : []

    // Tags selected (for multi-select)
    selectedTags.value = Array.isArray(data?.tags)
      ? data.tags.map(tag => ({
          value: tag?.value ?? tag?.id ?? null,
          label: tag?.label ?? tag?.name ?? '',
        }))
      : []

  } catch (error) {
    console.error('Failed to fetch post:', error)
    // Optional: show error toast or message
  }
}


function handleThumbnail(event) {
  thumbnail.value = event.target.files[0]
  thumbnailPreview.value = URL.createObjectURL(thumbnail.value)
}

const handleMultipleImageChange = (e) => {
    images.value = Array.from(e.target.files)
    const newImages = Array.from(e.target.files)
    const newPreviews = newImages.map(file => URL.createObjectURL(file))
    imagePreview.value = newPreviews
}

const removeImage = (idx) => {
  images.value.splice(idx, 1)
  imagePreview.value.splice(idx, 1)
}

// const removeNewImage = (index) => {
//   images.value.splice(index, 1)
//   imagePreview.value.splice(index, 1)
// }

const removeOldImage = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/post-images/${id}`)

    // Remove from oldImages array
    oldImages.value = oldImages.value.filter(img => img.id !== id)

    toast.success("🗑️ Image removed.")
  } catch (err) {
    toast.error("❌ Failed to remove image.")
    console.error(err)
  }
}


function testTost(){
  toast.success('✅ Post created successfully!')
}


const handleSubmit = async () => {
  const tagIds = selectedTags.value.map(tag => tag.value)

  const formData = new FormData()
  formData.append('title', form.value.title ?? '')
  formData.append('slug', form.value.slug ?? '')
  formData.append('body', form.value.body ?? '')
  formData.append('category_id', form.value.category_id ?? '')

  // Append tag IDs as array (tags[])
  tagIds.forEach(id => {
    formData.append('tags[]', id)
  })

  // Append new thumbnail if changed
  if (thumbnail.value instanceof File) {
    formData.append('thumbnail', thumbnail.value)
  }

  // Append new images if any
  if (images.value.length > 0) {
    images.value.forEach(file => {
      formData.append('images[]', file)
    })
  }

  try {
    isLoading.value = true

    // Use POST with _method=PATCH for Laravel compatibility
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/posts/${route.params.id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { _method: 'PATCH' }
      }
    )

    toast.success('✅ Post updated successfully!')
    router.push({ name: 'posts' }) // Redirect to all posts page
    //resetForm()
  } catch (err) {
    toast.error('❌ Failed to update post.')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    slug: '',
    body: '',
    category_id: null,
    image: ''
  }

  selectedTags.value = []
  thumbnail.value = null
  thumbnailPreview.value = ''
  images.value = []
  imagePreview.value = []

 
}

// for edit post
onMounted(() => {
  fetchMeta()
  //getImgPost()
  if (isEdit.value) {
    fetchPost(route.params.id)
   
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
  color: #065f46;            /* Tailwind's text-green-800 */
  z-index: 4000;
}

</style>
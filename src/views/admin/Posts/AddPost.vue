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
        <MultipleSelect :options="tags"  v-model="selectedTags" :modelValue="modelValue"></MultipleSelect>
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
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`)
  form.value = {
    title: data.title,
    // slug: data.slug,
    body: data.body,
    category_id: parseInt(data.category.id),
    //selectedTags: data.tags.map(t => t.id),
    image: data.thumbnail, // leave empty
  }
  thumbnailPreview.value=`${import.meta.env.VITE_IMAGE_PATH}/`+data.thumbnail;
  imagePreview.value = data.images.map(file => `${import.meta.env.VITE_IMAGE_PATH}`+file.image_path)
  //tags.value = data.tags

      //form.value.category_id= data.category.id || '', // ជាទូទៅ postData មកពី backend
  
  //console.log(form.value.category_id)

  //  form.selectedTags.value = data.tags.value.filter(tag =>
  //   data.tags.some(t => t.id === tag.id)
  // )
  //selectedTags.value=data.tags.map(t => t.id);
  modelValue.value=data.tags;
  selectedTags.value=data.tags;
  //console.log(modelValue.value)
}

const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function handleThumbnail(event) {
  thumbnail.value = event.target.files[0]
  thumbnailPreview.value = URL.createObjectURL(thumbnail.value)
}

const handleMultipleImageChange = (e) => {
    images.value = Array.from(e.target.files)
    imagePreview.value = images.value.map(file => URL.createObjectURL(file))
}

const removeImage = (idx) => {
  images.value.splice(idx, 1)
  imagePreview.value.splice(idx, 1)
}

function testTost(){
  toast.success('✅ Post created successfully!')
}

const handleSubmit = async () => {
  
  const tagIds = selectedTags.value.map(tag => tag.value)
  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('slug', form.value.slug)
  formData.append('body', form.value.body)
  formData.append('category_id', form.value.category_id)
  formData.append('tags',tagIds)
  formData.append('thumbnail',thumbnail.value)

  images.value.forEach(file => {
    formData.append('images[]', file)
  })
  
  // if (form.value.image) {
  //   formData.append('thumbnail', form.value.image)
  // }

  if (isEdit.value) {
    try {
        isLoading.value=true
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/posts/${route.params.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        isLoading.value=false
        toast.success('✅ Post created successfully!')
        resetForm()
      } catch (err) {
        toast.error('❌ Failed to create post.')
        isLoading.value=false
        console.error(err)
      }
  }
  else {

      try {
        isLoading.value=true
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        isLoading.value=false
        toast.success('✅ Post created successfully!')
        resetForm()
      } catch (err) {
         isLoading.value=false
        toast.error('❌ Failed to create post.')
        
        console.error(err)
      }
    }
    
  

  //router.push('/admin/posts')
}

// reset form after success

function resetForm() {
  form.value = { title: '', slug: '', body: '', category_id: '', tags: '' }
  images.value = []
  thumbnail.value = null
  imagePreview.value = []
  thumbnailPreview.value = null
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
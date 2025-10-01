<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">No</p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Title</p>
            </th>
            <!-- <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Content</p>
            </th> -->
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Thumbnails</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Category </p>
            </th>
            <th class="px-5 py-3 text-left w-2/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tags</p>
            </th>
            <th class="px-5 py-3 text-left w-1/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Publish</p>
            </th>
             <th class="px-5 py-3 text-left w-3/12 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Action</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(post, index) in posts"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                
                    {{ index+1 }}
              
            </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ post.title }}
                  </span>
                </div>
            </td>
            <!-- <td class="px-5 py-4 sm:px-6">
              <div>
                    {{ post.body}}
              </div>
            </td> -->

            <td class="px-5 py-4 sm:px-6">
              <div class="rounded-2xl w-24 h-24">
                    <img
                      v-if="post.thumbnail"
                      :src="imgPath+'/'+post.thumbnail"
                      alt="Post Image"
                      class="w-full h-auto"
                    />
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ post.category?.name_kh }}</p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex">
                  <p v-for="(tag, idx) in post.tags" :key="idx" class="text-gray-100 text-sm dark:text-gray-100 bg-sky-900 p-1 rounded-2xl">
                  {{ tag['name'] }}
              </p>
            </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex">
                 <TogglePublish v-model="post.is_publish" :post-id="post.id" />
              </div>
            </td>
            <td class="px-4 py-2 space-x-2">
              <router-link :to="{ name: 'deatail-post', params: { id: post.id } }">
               <button class="bg-blue-500 text-white rounded hover:bg-blue-600 p-1 text-sm">
                    <EyeOutlineIcon title="View" />
               </button>
               </router-link>
                <button
                  @click="editPost(post.id)" class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-sm">
                  <PencilBoxOutlineIcon size="24" />
                </button>
            <button
              @click="deletePost(post.id)"
              class="bg-red-500 text-white rounded hover:bg-red-600 p-1 text-sm"
            >
             <DeleteOutlineIcon />
            </button>
          </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TogglePublish from '@/components/admin/forms/FormElements/TogglePublishSwitch.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import PencilBoxOutlineIcon from 'vue-material-design-icons/PencilBoxOutline.vue';
import DeleteOutlineIcon from 'vue-material-design-icons/DeleteOutline.vue';
import EyeOutlineIcon from 'vue-material-design-icons/EyeOutline.vue';



const toast = useToast()

let imgPath=import.meta.env.VITE_IMAGE_PATH;
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['refresh']); // to call function in parent component


defineProps({
  posts: {
    type: Array,
    default: () => []
  }
});

function editPost(postId) {
  // alert(`Edit post: ${post.title}`)
  // // Open modal or navigate to edit form
  router.push({ name: 'PostEdit', params: { id: postId } })
}

const deletePost = async (id) =>{
  if (confirm('Are you sure you want to delete this post?')) {
    try
    {
      const res  = await axios.delete(`${import.meta.env.VITE_API_URL}/posts/delete_post/${id}`)
      if(res)
      {
        toast.success('Post deleted successfully!')
        emit('refresh') // Emit refresh event to parent component
      }
    }
    catch (err) {
      console.error(err)
    }
    console.log(`Post with ID ${id} deleted`);
  }
}

</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

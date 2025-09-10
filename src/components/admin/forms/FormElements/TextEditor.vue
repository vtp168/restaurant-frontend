<template>
  <QuillEditor v-model:content="inputValue" content-type="html" theme="snow"  toolbar="full" />
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'

export default{
  components: {
    QuillEditor,
  },
//   setup() {
//     const inputValue = ref('<h1>This is header</h1><p>This is paragraph</p>')
//     return { inputValue }
//   },
}
</script>
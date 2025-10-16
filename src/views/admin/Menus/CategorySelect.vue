<template>
  <div>
    <label class="block text-sm font-medium mb-1">ប្រភេទមុខម្ហូប</label>
    <select
      v-model="selectedCategory"
      class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option disabled value="">ជ្រើសរើសប្រភេទ</option>

      <template v-for="group in grouped" :key="group.parentId">
        <optgroup :label="group.parentNameKh">
          <!-- ✅ main category selectable -->
          <option :value="group.parentId">
            {{ group.parentNameKh }}
          </option>

          <!-- ✅ sub categories -->
          <option
            v-for="sub in group.subcategories"
            :key="sub._id"
            :value="sub._id"
          >
            - {{ sub.name_kh }}
          </option>
        </optgroup>
      </template>
    </select>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const selectedCategory = ref(props.modelValue);

// emit to parent whenever selected changes
watch(selectedCategory, (newVal) => {
  emit("update:modelValue", newVal);
});

// update local if parent changes (edit mode)
watch(
  () => props.modelValue,
  (newVal) => {
    selectedCategory.value = newVal;
  }
);

// group categories with children
const grouped = computed(() => {
  const parents = props.categories.filter((cat) => !cat.parent);
  return parents.map((parent) => ({
    parentId: parent._id,
    parentNameKh: parent.name_kh,
    subcategories: props.categories.filter(
      (cat) => cat.parent && cat.parent._id === parent._id
    ),
  }));
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header class="bg-green-600 text-white flex items-center justify-between px-6 py-3">
      <div class="flex items-center space-x-3">
        <div class="font-bold text-2xl">m</div>
        <input
          v-model="search"
          type="text"
          @change="filteredMenu(search)"
          placeholder="Please enter product name or serial no."
          class="rounded-full px-4 py-2 w-72 md:w-96 text-gray-800 focus:outline-none"
        />
      </div>
      <router-link to="/admin/orders/status/pending">
        <button class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      </router-link>

    </header>

    <!-- Category Pills -->
    <div class="bg-white border-b p-3 flex overflow-x-auto space-x-2">
      <button
        @click="selectCategory(null)"
        :class="[
          'px-4 py-1 rounded-full text-sm font-medium flex-shrink-0',
          selectedCategory === null
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ]"
      >
        All
      </button>
      <button
        v-for="cat in categories"
        :key="cat._id"
        @click="selectCategory(cat._id)"
        :class="[
          'px-4 py-1 rounded-full text-sm font-medium flex-shrink-0',
          selectedCategory === cat._id
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ]"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      <!-- Menu List -->
      <div class="flex-1 p-4 overflow-y-auto overflow-x-auto">
        <CartMenu :menuItems="menuItems" @add="addToCart" />
      </div>

      <!-- Cart for Desktop -->
      <aside class="hidden md:flex w-80 bg-white border-l p-4 flex-col">
        <CartSection
          :cart="cart"
          :total="total"
          :selectedTable="tables"
          @remove="removeFromCart"
          @place="placeOrder"
          v-model="selectedTable"
        />
      </aside>
    </div>

    <!-- Cart for Mobile (Bottom Drawer) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <CartSection
        :cart="cart"
        :total="total"
        :selectedTable="tables"
        @remove="removeFromCart"
        @place="placeOrder"
        @increaseQty="increaseQty"
        @decreaseQty="decreaseQty"
        v-model="selectedTable"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import CartSection from './CartSection.vue'
import CartMenu from './CardMenu.vue'
import Swal from 'sweetalert2'

const apiUrl = import.meta.env.VITE_API_URL

const categories = ref([])
const tables = ref([])
const menuItems = ref([])
const selectedCategory = ref(null)
const search = ref('')
const cart = ref([])
const selectedTable = ref('')

// Fetch categories and menu
const fetchCategories = async () => {
  const res = await axios.get(`${apiUrl}/categories`)
  categories.value = res.data
}

// Fetch categories and menu
const fetchTables = async () => {
  const res = await axios.get(`${apiUrl}/tables`)
  tables.value = res.data
}

const fetchMenu = async () => {
  const res = await axios.get(`${apiUrl}/menu`)
  menuItems.value = res.data
}

const fetchMenuByCategory = async (categoryId) => {
  const res = await axios.get(`${apiUrl}/menu/category/${categoryId}`)
  menuItems.value = res.data
}

const selectCategory = async (categoryId) => {
  selectedCategory.value = categoryId
  if (categoryId === null) {
    await fetchMenu()
  } else {
    await fetchMenuByCategory(categoryId)
  }
}

const addToCart = (item) => {
  const sizeLabel = item.size || null
  const existing = cart.value.find((i) => i._id === item._id && i.size === sizeLabel)

  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({
      _id: item._id,
      menuItemId: item._id,
      name: sizeLabel ? `${item.name} (${sizeLabel})` : item.name, // ✅ បង្ហាញ (Small) តែម្ដង
      price: item.price,
      size: sizeLabel,
      quantity: 1,
    })
  }
}

const increaseQty = (index) => {
  console.log('Increase quantity for index:', index)
  cart.value[index].quantity++
}

const decreaseQty = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  } else {
    cart.value.splice(index, 1)
  }
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

const total = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

const filteredMenu = async (search) => {
  return menuItems.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase()),
  )
}

// === 🧾 Place Order with SweetAlert2 ===
const placeOrder = async () => {
  const tableId = selectedTable.value
  const tableObj = tables.value.find((t) => t._id === tableId) // ✅ រក object ពេញ

  if (!tableObj) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Table',
      text: 'Please select a table before placing an order.',
    })
    return
  }

  if (cart.value.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Empty Cart',
      text: 'Please add items to the cart before placing an order.',
    })
    return
  }

  // 🟢 Confirm Dialog បង្ហាញជា table name
  const confirm = await Swal.fire({
    title: 'Confirm Order?',
    html: `<b>Table:</b> ${tableObj.name}<br><b>Total:</b> $${total.value.toFixed(2)}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, place order',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#d33',
  })

  if (confirm.isConfirmed) {
    try {
      const res = await axios.post(`${apiUrl}/orders/${tableId}`, {
        items: cart.value,
      })

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Order placed successfully!',
          showConfirmButton: false,
          timer: 2500,
        })

        cart.value = []
        selectedTable.value = ''
      } else {
        throw new Error('Failed to place order')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to place order. Please try again.',
      })
    }
  }
}

onMounted(() => {
  fetchCategories()
  fetchMenu()
  fetchTables()
})
</script>

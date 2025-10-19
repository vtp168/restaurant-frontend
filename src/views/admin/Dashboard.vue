<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="p-6 bg-white rounded-2xl shadow col-span-12">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <p class="text-gray-500 mb-6">Hi, {{ authStore.user.fullname }}. Welcome back!</p>

        <!-- Summary Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div class="bg-white p-4 rounded-2xl shadow text-center">
            <h3 class="text-3xl font-bold text-green-600">{{ summary.totalOrders }}</h3>
            <p class="text-gray-500 text-sm">Total Orders</p>
          </div>
          <div class="bg-white p-4 rounded-2xl shadow text-center">
            <h3 class="text-3xl font-bold text-blue-600">{{ summary.totalDelivered }}</h3>
            <p class="text-gray-500 text-sm">Total Delivered</p>
          </div>
          <div class="bg-white p-4 rounded-2xl shadow text-center">
            <h3 class="text-3xl font-bold text-red-600">{{ summary.totalCanceled }}</h3>
            <p class="text-gray-500 text-sm">Total Canceled</p>
          </div>
          <div class="bg-white p-4 rounded-2xl shadow text-center">
            <h3 class="text-3xl font-bold text-yellow-600">${{ summary.totalRevenue }}</h3>
            <p class="text-gray-500 text-sm">Total Revenue</p>
          </div>
        </div>

        <!-- Orders List -->
        <div>
          <div
            v-for="order in summary.recentOrders"
            :key="order._id"
            class="flex justify-between items-center bg-white rounded-xl p-4 mb-4 shadow cursor-pointer hover:shadow-lg"
            @click="$router.push(`/admin/orders/${order._id}/edit`)"
          >
            <div class="flex items-center gap-3">
              <img
                src="/images/user/default-avatar.png"
                class="w-12 h-12 rounded-full object-cover"
                alt="User"
              />
              <div>
                <h4 class="font-semibold text-gray-800">
                  Table {{ order.tableId?.name || 'No Table' }}
                  <span class="bg-red text-red-500 text-sm">(#{{ order.orderNo }})</span>
                </h4>
                <p class="text-gray-500 text-sm">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                  {{
                    new Date(order.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}
                </p>
              </div>
            </div>

            <div class="text-right">
              <span
                :class="[
                  'px-3 py-1 text-xs rounded-full font-semibold capitalize',
                  order.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : order.status === 'canceled'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600',
                ]"
              >
                {{ order.status }}
              </span>
              <p class="text-sm mt-1 font-medium text-gray-800">
                Total: ${{ calculateTotal(order.items) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { Table } from 'lucide-vue-next'

const apiUrl = import.meta.env.VITE_API_URL
const authStore = useAuthStore()

// ✅ initialize summary as object (not array)
const summary = ref({
  totalOrders: 0,
  totalDelivered: 0,
  totalCanceled: 0,
  totalRevenue: 0,
  recentOrders: [],
})

// 🧮 Calculate total order price
const calculateTotal = (items = []) => {
  return items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)
}

onMounted(async () => {
  try {
    const res = await axios.get(`${apiUrl}/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    summary.value = res.data
    console.log('Dashboard data:', res.data)
  } catch (error) {
    console.error('Failed to load dashboard:', error)
  }
})
</script>

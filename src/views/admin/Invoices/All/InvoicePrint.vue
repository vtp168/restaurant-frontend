<template>
  <div class="max-w-md mx-auto bg-white shadow p-4 text-sm">
    <!-- Header -->
    <div class="text-center border-b pb-2 mb-3">
      <!-- <img src="/public/logo/logo.svg" alt="Logo" class="mx-auto w-10 h-10 mb-1" /> -->
      <h2 class="text-lg font-bold">My Restaurant</h2>
      <p class="text-xs">Phnom Penh, Cambodia</p>
      <p class="text-xs">Tel: 012-345-678</p>
    </div>

    <!-- Invoice Info -->
    <div v-if="invoice" class="mb-2">
      <div class="flex justify-between text-xs">
        <span>Invoice #{{ invoice.invoiceNo }}</span>
        <span>{{ formatDate(invoice.paidAt) }}</span>
      </div>
      <div class="flex justify-between text-xs text-gray-600">
        <span>Table: {{ invoice.tableId?.name }}</span>
        <span>Cashier: {{ invoice.paidBy?.fullname || invoice.paidBy?.username }}</span>
      </div>
    </div>

    <!-- Orders -->
    <div v-for="(order, oi) in invoice?.orderIds || []" :key="oi" class="mt-3">
      <h3 class="font-semibold text-xs mb-1">Order #{{ order.orderNo }}</h3>
      <table class="w-full text-xs border-t">
        <tbody>
          <tr v-for="(item, ii) in order.items" :key="ii" class="border-b last:border-0">
            <td class="text-left py-1">
              <div>
                <span class="block font-medium">
                  {{ item.menuItemId?.name || 'Unknown Item' }}
                </span>
                <span v-if="item.menuItemId?.name_kh" class="text-[10px] text-gray-500">
                  {{ item.menuItemId.name_kh }}
                </span>
                <span v-if="item.size" class="text-[10px] text-gray-400 ml-1">
                  ({{ item.size }})
                </span>
              </div>
            </td>
            <td class="text-right">{{ item.quantity }}</td>
            <td class="text-right">{{ formatPrice(item.price) }}</td>
            <td class="text-right font-semibold">
              {{ formatPrice(item.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="mt-3 border-t pt-2 text-xs">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>{{ formatPrice(invoice?.subTotal) }}</span>
      </div>
      <div class="flex justify-between">
        <span>Tax</span>
        <span>{{ formatPrice(invoice?.tax) }}</span>
      </div>
      <div class="flex justify-between">
        <span>Discount</span>
        <span>-{{ formatPrice(invoice?.discount) }}</span>
      </div>
      <div class="flex justify-between font-bold text-base border-t border-dashed pt-1">
        <span>Total</span>
        <span>{{ formatPrice(invoice?.total) }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-[10px] text-gray-500 mt-2">
      <p>Thank you for visiting!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const invoice = ref(null)

const formatPrice = (val) => {
  if (!val) return '0.00'
  return parseFloat(val).toFixed(2)
}

const formatDate = (val) => {
  if (!val) return ''
  return new Date(val).toLocaleString()
}

const fetchInvoice = async () => {
  try {
    const id = route.params.id
    const token = localStorage.getItem('token')

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/invoices/print/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    invoice.value = res.data

    // Auto print after data loaded
    setTimeout(() => {
      window.print()
    }, 800)
  } catch (err) {
    console.error('Error fetching invoice:', err)
  }
}

onMounted(fetchInvoice)
</script>

<style>
@media print {
  body {
    background: white;
  }
  .max-w-md {
    box-shadow: none !important;
  }
}
</style>

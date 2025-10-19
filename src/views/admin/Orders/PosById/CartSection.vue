<template>
  <div>
    <h2 class="font-bold text-lg mb-2">Your Order</h2>
    <label class="text-sm mb-1">Select Table</label>
    <select
      :value="modelValue"
      @change="updateTable($event.target.value)"
      class="border rounded-md p-2 mb-4 text-sm w-full"
    >
      <options disabled value="">Select a table</options>
      <option selected v-for="(item, index) in selectedTable" :key="index" :value="item._id">
        {{ item.name }}
      </option>

      <!-- <option v-for="n in 10" :key="n" :value="'Table ' + n">Table {{ n }}</option> -->
    </select>

    <div
      class="flex-1 overflow-y-auto border rounded-md p-3 mb-4 min-h-64 max-h-128 md:max-h-128 sm:min-h-24"
    >
      <div v-if="cart.length === 0" class="text-center text-gray-400">No items in cart</div>

      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex justify-between items-center mb-3"
      >
        <div class="flex-1">
          <p class="font-medium truncate">{{ item.name }}</p>
          <p class="text-sm text-gray-500">${{ item.price.toFixed(2) }}</p>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center space-x-2">
          <button
            @click="$emit('decreaseQty', index)"
            class="px-2 py-1 border rounded hover:bg-gray-100"
          >
            -
          </button>
          <span class="w-6 text-center">{{ item.quantity }}</span>
          <button
            @click="$emit('increaseQty', index)"
            class="px-2 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <!-- Remove -->
        <button
          @click="$emit('remove', index)"
          class="ml-3 text-red-500 hover:text-red-700 text-sm"
        >
          ✕
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center text-lg font-semibold mb-4">
      <span>Total:</span>
      <span>${{ total.toFixed(2) }}</span>
    </div>
    <div>
      <label class="text-sm mb-1">Chose Payment Method</label>
      <select
        :value="paymentMethod"
        class="border rounded-md p-2 mb-4 text-sm w-full"
        @change="updatePaymentMethod($event.target.value)"
      >
        <options disabled value="">Chose Payment Method</options>
        <option selected value="Cash">
          Cash
        </option>
        <option value="Bank">
          Bank Transfer
        </option>
        <!-- <option v-for="n in 10" :key="n" :value="'Table ' + n">Table {{ n }}</option> -->
      </select>
    </div>

    <button
      @click="$emit('place')"
      class="bg-green-600 text-white w-full py-2 rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400"
      :disabled="cart.length === 0 || !modelValue"
    >
      Checkout Order
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartSection',
  props: ['cart', 'total', 'selectedTable', 'modelValue', 'paymentMethod'],
  emits: ['remove', 'place', 'update:modelValue', 'increaseQty', 'decreaseQty'],
  methods: {
    updateTable(value) {
      this.$emit('update:modelValue', value)
    },
    updatePaymentMethod(value) {
      this.$emit('update:paymentMethod', value)
    },
  },
}
</script>

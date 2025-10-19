<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics />
        <monthly-target />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale />
      </div>

      <div class="col-span-12">
        <statistics-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'
import EcommerceMetrics from '@/components/admin/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '@/components/admin/ecommerce/MonthlySale.vue'
import MonthlySale from '@/components/admin/ecommerce/MonthlyTarget.vue'
import CustomerDemographic from '@/components/admin/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '@/components/admin/ecommerce/StatisticsChart.vue'
import RecentOrders from '@/components/admin/ecommerce/RecentOrders.vue'
export default {
  components: {
    AdminLayout,
    EcommerceMetrics,
    MonthlyTarget,
    MonthlySale,
    CustomerDemographic,
    StatisticsChart,
    RecentOrders,
  },
  name: 'Ecommerce',
}
</script>

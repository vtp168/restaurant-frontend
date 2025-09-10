<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script>
import ThemeProvider from '@/components/admin/layout/ThemeProvider.vue'
import SidebarProvider from '@/components/admin/layout/SidebarProvider.vue'

export default{
    components:{
        ThemeProvider,
        SidebarProvider
    }
}
</script>


<style>
@import '@/assets/admin.css';

</style>
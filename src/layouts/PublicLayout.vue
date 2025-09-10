<template>
  <div>
    <header>
      <HeaderNav />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import HeaderNav from '@/views/public/components/HeaderNav.vue';
import Footer from '@/views/public/components/Footer.vue';
export default {
  components:{
    HeaderNav,
    Footer
  },
  data() {
    return {


    }
  }
}
</script>
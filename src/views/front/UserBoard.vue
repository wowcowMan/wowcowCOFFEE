<template>
  <Header></Header>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
  <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  components: {
    Header, Footer, ToastMessages
  },
  provide() {
    return {
      emitter
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
  .navbar{
    position: static;
  }
  .footer{
    margin-top: 150px;
  }
</style>

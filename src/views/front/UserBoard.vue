<template>
  <Header></Header>
  <div class="toast w-100" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" ref="toast">
    <div class="toast-header justify-content-center text-light">
      即日起，結帳時輸入 wowcow 即享9折優惠
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'
import Toast from 'bootstrap/js/dist/toast.js'

provide('emitter', emitter)

const toast = ref(null)
onMounted(() => {
  const toastEl = toast.value
  const toastComponent = new Toast(toastEl)
  toastComponent.show()
})
</script>

<style scoped lang="scss">
.toast-header{
  background: #E13636;
}
.footer {
  margin-top: 150px;
}
</style>

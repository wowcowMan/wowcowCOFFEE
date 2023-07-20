<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0" style="z-index: 1050">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" ref="toastContainer" />
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import Toast from '@/components/Toast.vue'
const messages = ref([])
const emitter = inject('emitter')

onMounted(() => {
  // 接收來自Products的emit並觸發函式
  emitter.on('push-message', (message) => {
    const { style = 'success', title, content } = message
    messages.value.push({ style, title, content })
  })
})
</script>

<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0" style="z-index: 1050">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" ref="toastContainer" />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast },
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted() {
    // 接收來自Products的emit並觸發函式
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>

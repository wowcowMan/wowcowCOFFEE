<template>
  <Navbar></Navbar>

  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <!-- 商品列表顯示區 -->
    <router-view />
  </div>
</template>

<script>
// 引入mitt
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import Navbar from '@/components/BackNavbar.vue'
export default {
  components: {
    Navbar, ToastMessages
  },
  // 讓內層都可以使用mitt
  provide() {
    return {
      emitter
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user).then((res) => {
      // 登入驗證失敗回登入頁面，反之秀出商品列表
      if (!res.data.success) {
        this.$router.push('/login')
      } else {
        this.$router.push('/dashboard/products')
      }
    })
  }
}
</script>

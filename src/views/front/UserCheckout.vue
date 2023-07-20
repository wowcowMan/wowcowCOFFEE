<template>
  <Loading :active="isLoading"></Loading>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品項</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(order.total) }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">訂單編號</th>
            <td>{{ orderId }}</td>
          </tr>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-outline-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
const { getCart } = cartStore

const order = ref({
  user: {}
})
const orderId = ref('')
const isLoading = ref(false)

const getOrder = () => {
  isLoading.value = true
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId.value}`
  axios.get(url)
    .then((res) => {
      if (res.data.success) {
        order.value = res.data.order
        getCart()
        isLoading.value = false
      }
    })
}

const payOrder = () => {
  isLoading.value = true
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId.value}`
  axios.post(url)
    .then((res) => {
      if (res.data.success) {
        getOrder()
      }
    })
}

const route = useRoute()
onMounted(() => {
  orderId.value = route.params.orderId
  getOrder()
})
</script>

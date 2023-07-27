<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link class="text-decoration-none text-secondary"
            to="/user/productlist/all?page=1">商品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">購物車</li>
      </ol>
    </nav>
    <div class="col">
      <div class="sticky-top">
        <table class="table align-middle">
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                    @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }} {{ item.product.unit }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control" v-model.number="item.qty" min='1' @change="updateCart(item)"
                      :disabled="status.loadingItem === item.id">
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr v-if="JSON.stringify(cart)!=='{}'">
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total)|| '' }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="col-md-4 ms-auto">
          <div class="input-group mb-3 input-group-sm w-auto">
            <input type="text" class="form-control text-center" v-model="couponCode" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 訂單表單 -->
    <div class="my-5 row justify-content-center">
      <Form class="col" v-slot="{ errors }" @submit="checkout.showModal()">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></Field>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field id="name" name="name" label="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['name'] }"
                placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
              <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <Field id="tel" name="phone" label="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['phone'] }"
                placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
              <ErrorMessage name="phone" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field id="address" name="address" label="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['address'] }"
                placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
              <ErrorMessage name="address" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message" placeholder="要研磨請備著沖煮器材"></textarea>
            </div>
            <div class="text-center text-md-end">
              <button class="btn btn-dark">下一步</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <CheckoutModal :form="form" @createOrder="createOrder" ref="checkout"></CheckoutModal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import CheckoutModal from '@/components/CheckoutModal.vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import $httpMessageState from '@/methods/pushMessageState'

// 引入cartStore的function、data
const cartStore = useCartStore()
const { getCart, updateCart, removeCartItem } = cartStore
const { isLoading, cart, status } = storeToRefs(cartStore)

const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: ''
  },
  message: ''
})

// 使用優惠券
const couponCode = ref('')
const addCouponCode = () => {
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
  const coupon = {
    code: couponCode.value
  }
  isLoading.value = true
  axios.post(url, { data: coupon }).then((response) => {
    $httpMessageState(response, '加入優惠券')
    getCart()
    isLoading.value = false
  })
}

// 訂單建立
const router = useRouter()
const checkout = ref(null)
const createOrder = () => {
  isLoading.value = true
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
  const order = form.value
  axios.post(url, { data: order })
    .then((res) => {
      checkout.value.hideModal()
      isLoading.value = false
      router.push(`/user/checkout/${res.data.orderId}`)
    })
}

onMounted(() => {
  getCart()
})
</script>

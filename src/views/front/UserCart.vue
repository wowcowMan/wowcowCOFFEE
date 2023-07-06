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
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 15%">數量</th>
              <th>單價</th>
            </tr>
          </thead>
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
                      :disabled="this.status.loadingItem === item.id">
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
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
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
      <Form class="col" v-slot="{ errors }" @submit="this.$refs.checkout.showModal()">
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
              <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
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

<script>
import CheckoutModal from '@/components/CheckoutModal.vue'
import cartMixin from '@/mixins/cartMixin'
// import modalMixin from '@/mixins/modalMixin'
export default {
  components: { CheckoutModal },
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  mixins: [cartMixin],
  methods: {
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        this.isLoading = false
      })
    },
    createOrder() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then((res) => {
          // console.log(res)
          this.$refs.checkout.hideModal()
          this.isLoading = false
          this.$router.push(`/user/checkout/${res.data.orderId}`)
        })
    }
  },
  created() {
    this.getCart()
  }
}
</script>

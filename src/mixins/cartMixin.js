export default {
  data() {
    return {
      cart: {},
      coupon_code: '',
      isLoading: false,
      status: {
        loadingItem: '' // 對應品項 id
      }
    }
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.cartStatus = true
      this.$http.get(url).then((response) => {
        // console.log(response)
        this.cart = response.data.data
        this.cartStatus = false
        this.isLoading = false
        if (this.cart.carts.length === 0) {
          this.cart = {}
          return
        }
        for (let i = 0; i < this.cart.carts.length; i++) {
          this.cart.carts[i].final_total = Math.trunc(this.cart.carts[i].final_total)
        }
      })
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        // console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.cartStatus = true
      this.status.loadingItem = id
      this.$http.delete(url).then((res) => {
        // console.log(res)
        this.isLoading = false
        this.status.loadingItem = ''
        this.getCart()
      })
    }
  }
}

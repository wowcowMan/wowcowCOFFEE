import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
export const useCartStore = defineStore('cartStore', () => {
  const cart = ref({})
  const status = ref({
    loadingItem: '' // 對應品項 id
  })
  const isLoading = ref(false)
  const cartStatus = ref(false)
  const productNum = ref(1)

  // 獲取全部商品
  const getCart = () => {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    isLoading.value = true
    cartStatus.value = true
    axios.get(url).then((response) => {
      cart.value = response.data.data
      cartStatus.value = false
      isLoading.value = false
      if (cart.value.carts.length === 0) {
        cart.value = {}
        return
      }
      for (let i = 0; i < cart.value.carts.length; i++) {
        cart.value.carts[i].final_total = Math.trunc(cart.value.carts[i].final_total)
      }
    })
  }
  const addCart = (id, title, num = 1) => {
    isLoading.value = true
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    status.value.loadingItem = id
    const cart = {
      product_id: id,
      qty: num
    }
    axios.post(url, { data: cart })
      .then((res) => {
        status.value.loadingItem = ''
        productNum.value = 1
        Swal.fire({
          icon: 'success',
          text: title,
          title: '以成功加入購物車'
        })
        isLoading.value = false
        getCart()
      })
  }
  const updateCart = (item) => {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
    status.value.loadingItem = item.id
    const cart = {
      product_id: item.product_id,
      qty: item.qty
    }
    axios.put(url, { data: cart }).then((res) => {
      status.value.loadingItem = ''
      getCart()
    })
  }
  const removeCartItem = (id) => {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
    cartStatus.value = true
    status.value.loadingItem = id
    axios.delete(url).then((res) => {
      status.value.loadingItem = ''
      getCart()
    })
  }
  const removeAllCart = () => {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
    cartStatus.value = true
    axios.delete(url).then((res) => {
      getCart()
    })
  }

  // 購物車商品數量
  const cartNum = computed(() => {
    if (JSON.stringify(cart.value) === '{}') {
      return 0
    } else {
      return cart.value.carts.reduce((accumulator, item) => {
        return accumulator + item.qty
      }, 0)
    }
  })

  /* eslint-disable object-property-newline */
  return {
    isLoading, cart, productNum, status, cartStatus,
    cartNum,
    getCart, addCart, updateCart, removeCartItem, removeAllCart
  }
})

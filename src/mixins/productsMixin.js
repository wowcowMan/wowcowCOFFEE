import handelFavorites from '@/methods/favorite'
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      status: {
        loadingItem: '' // 對應品項 id
      },
      favoriteIdList: handelFavorites.storeFavorite()
    }
  },
  methods: {
    // 取得商品列表
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          // 新增時間排序
          this.products = response.data.products.map((obj, key) => {
            obj.lasting = key
            return obj
          })
        }
      })
    },
    // 商品詳訊資訊
    getProduct(id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart(id, title) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          this.$swal({
            icon: 'success',
            text: title,
            title: '以成功加入購物車'
          })
        })
    },
    updateFavorite(id) {
      handelFavorites.toggleFavorite(id)
      this.favoriteIdList = handelFavorites.storeFavorite()
    }
  },
  mounted() {
    this.getProducts()
  }
}

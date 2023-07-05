export default {
  data() {
    return {
      products: [],
      isLoading: false
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
    }
  },
  mounted() {
    this.getProducts()
  }
}

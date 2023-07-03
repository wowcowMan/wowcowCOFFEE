<template>
  <Loading :active="isLoading"></Loading>
  <!-- 新增商品 -->
  <div class="mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <!-- 新增商品彈跳視窗 -->
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>

  <!-- 商品列表 -->
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th width="200">產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Back-Pagination :pages="pagination" @emit-pages="getProducts"></Back-Pagination>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import BackPagination from '@/components/BackPagination.vue'
export default {
  components: {
    ProductModal, DelModal, BackPagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      // 用來傳送給props和emit更新後，發送更新post請求
      tempProduct: {},
      // 讓updateProduct()時判斷是新增還是修改
      isNew: false,
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    // 獲取產品列表
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },

    // 開啟新增視窗
    openModal(isNew, item) {
      if (isNew) {
        // “新增”產品時清空tempProduct
        this.tempProduct = {}
      } else {
        // “修改”產品時tempProduct等於展開的item（避免直接修改到原始資料）
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      // 開啟新增視窗
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },

    // 開啟刪除視窗
    openDelProductModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },

    // 刪除產品，當DelModal確認emit後觸發
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((response) => {
        console.log(response.data)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getProducts()
      })
    },

    // 新增或修改產品，當productModal確認emit後觸發並帶入參數
    updateProduct(item) {
      // tempProduct等於帶入的參數
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      productComponent.isChecked = true
      // 再將tempProduct帶入post請求更新列表
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response)
        productComponent.isChecked = false
        // post成功後關閉modal
        productComponent.hideModal()
        // 更新畫面
        if (response.data.success) {
          this.getProducts()
          // 傳送emit和參數給ToastMessage
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、')
          })
        }
      })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

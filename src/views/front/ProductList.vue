<template>
  <Loading :active="isLoading"></Loading>

  <div class="container-fluid mt-3 my-auto">
    <div class="row justify-content-between align-items-center my-3">
      <div class="breadcrumb col-12 col-md-9 mb-2">
        <router-link class="me-2" to="/">首頁</router-link>/
        <router-link class="mx-2" to="/user/productlist/all?page=1">所有商品</router-link>/
        <span class="ms-2">{{ $route.params.category }}</span>
      </div>
      <div class="arrange col-12 col-md-3 p-0  mb-2">
        <select v-model="sortList" class="form-select" aria-label="Default select example">
          <option selected>預設</option>
          <option value="latest">最新上架</option>
          <option value="lowhigh">價錢低到高</option>
          <option value="highlow">價錢高到低</option>
        </select>
      </div>
    </div>
    <div class="row justify-content-between align-items-start">
      <Sidebar class="d-none d-md-block col-md-3"></Sidebar>
      <div class="products-list col-12 col-md-9 ps-md-4">
        <product-card v-for="item in productsCategory[currentPage-1]" :key="item.id"
        :product="item"></product-card>
      </div>
    </div>
    <Pagination class="mt-5" :pages="totalPage" @emit-pages="changePage" @emit-prevnext="prevNext"></Pagination>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
import productsMixin from '@/mixins/productsMixin'

export default {
  components: {
    Sidebar, ProductCard, Pagination
  },
  mixins: [productsMixin],
  data() {
    return {
      tempProducts: [],
      pagination: {},
      num: 10, // 一頁顯示的商品數量
      sortList: '預設' // 排列條件
    }
  },
  // 商品分類
  computed: {
    productsCategory() {
      let filterProducts = []
      const productList = []
      if (this.$route.params.category === 'all') {
        filterProducts = this.products
      } else if (this.$route.params.category === 'sale') {
        filterProducts = this.products.filter((item) => {
          return item.price !== item.origin_price
        })
      } else {
        filterProducts = this.products.filter((item) => {
          return item.category.includes(this.$route.params.category)
        })
      }
      for (let i = 0; i < filterProducts.length; i += this.num) {
        const pageData = filterProducts.slice(i, i + this.num)
        productList.push(pageData)
      }
      return productList
    },
    totalPage() {
      return this.productsCategory.length
    },
    currentPage() {
      return Number(this.$route.query.page)
    }
  },
  // 監聽排列條件
  watch: {
    sortList() {
      this.sortProdusts()
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({ query: { page } })
    },
    prevNext(n) {
      const page = Number(this.$route.query.page) + n
      this.$router.push({ query: { page } })
    },
    // 排列商品
    sortProdusts() {
      if (this.sortList === '預設') {
        this.products.sort((a, b) => {
          return a.lasting - b.lasting
        })
      } else if (this.sortList === 'latest') {
        this.products.sort((a, b) => {
          return b.lasting - a.lasting
        })
      } else if (this.sortList === 'lowhigh') {
        this.products.sort((a, b) => {
          return a.price - b.price
        })
      } else {
        this.products.sort((a, b) => {
          return b.price - a.price
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
// @import "@/assets/produc-card.scss";
.container-fluid {
  max-width: 1280px;
}

.breadcrumb {
  color: #aaaa;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #aaaa;

    &:hover {
      color: #000;
    }
  }

  span {
    color: #000;
  }
}

.sidebar {
  position: sticky;
}

.products-list {
  padding: 0;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
</style>
<!-- @media screen and (max-width:768px) -->

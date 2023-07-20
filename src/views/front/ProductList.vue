<template>
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid mt-3 my-auto">
    <div class="row justify-content-between align-items-center my-3">
      <div class="breadcrumb col-12 col-md-9 mb-2">
        <router-link class="me-2" to="/">首頁</router-link>/
        <router-link class="mx-2" to="/user/productlist/all?page=1">所有商品</router-link>/
        <span class="ms-2">{{ route.params.category }}</span>
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
        <product-card v-for="item in productsCategory[currentPage - 1]" :key="item.id" :product="item"></product-card>
      </div>
    </div>
    <Pagination class="mt-5" :pages="totalPage" @emit-pages="changePage" @emit-prevnext="prevNext"></Pagination>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/productsStore'
import Sidebar from '@/components/Sidebar.vue'
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
const route = useRoute()
const router = useRouter()

const productsStore = useProductsStore()
const { getAllDatas } = productsStore
const { isLoading, allDatas, productsCategory } = storeToRefs(productsStore)

const sortList = ref('預設') // 排列條件

// 商品分類
const totalPage = computed(() => {
  return productsCategory.value.length
})
const currentPage = computed(() => {
  return Number(route.query.page)
})

// 換頁
const changePage = (page) => {
  router.push({ query: { page } })
}
const prevNext = (n) => {
  const page = Number(route.query.page) + n
  router.push({ query: { page } })
}

// 排列商品
const sortProdusts = () => {
  if (sortList.value === '預設') {
    allDatas.value.sort((a, b) => {
      return a.lasting - b.lasting
    })
  } else if (sortList.value === 'latest') {
    allDatas.value.sort((a, b) => {
      return b.lasting - a.lasting
    })
  } else if (sortList.value === 'lowhigh') {
    allDatas.value.sort((a, b) => {
      return a.price - b.price
    })
  } else {
    allDatas.value.sort((a, b) => {
      return b.price - a.price
    })
  }
}
watch(() => sortList.value, () => {
  sortProdusts()
})

onMounted(() => {
  getAllDatas()
})
</script>

<style scoped lang="scss">
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

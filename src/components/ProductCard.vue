<template>
  <div class="product-card"
    :class="{ light: product.category.match('淺焙'), medium: product.category.match('中焙'), dark: product.category.match('深焙'), sale: product.price!==product.origin_price }"
    @click="getProduct(product.id)">
    <div class="pic" :style="{ backgroundImage: `url(${product.imageUrl}` }">
    </div>
    <div class="txt">
      <p>{{ product.title }}</p>
      <p class="price">NT${{ product.price }}</p>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-outline-light me-2" :disabled="status.loadingItem === product.id"
        @click.stop="addCart(product.id, product.title)">
        <i class="fa-solid fa-cart-shopping"></i>
        <div v-if="status.loadingItem === product.id" class="spinner-border text-secondary spinner-border-sm"
          role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
      <button type="button" class="btn btn-outline-light"
        :class="{ 'btn-light': favoriteIdList.includes(product.id) }" @click.stop="toggleFavorite(product.id)">
        <i v-if="!favoriteIdList.includes(product.id)" class="fa-regular fa-heart"></i>
        <i v-if="favoriteIdList.includes(product.id)" class="fa-solid fa-heart text-warning"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
const router = useRouter()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  product: Object
})

// 引入cartStore的function、data
const cartStore = useCartStore()
const { addCart } = cartStore
const { status } = storeToRefs(cartStore)

// 引入favoriteStore的function、data
const favoriteStore = useFavoriteStore()
const { toggleFavorite } = favoriteStore
const { favoriteIdList } = storeToRefs(favoriteStore)

// 曾經看過
const saveViewed = (id) => {
  const viewedArray = localStorage.getItem('viewed') ? JSON.parse(localStorage.getItem('viewed')) : []
  if (!viewedArray.includes(id)) {
    viewedArray.unshift(id)
  }
  if (viewedArray.length > 5) {
    viewedArray.pop()
  }
  localStorage.setItem('viewed', JSON.stringify(viewedArray))
}
const getProduct = (id) => {
  saveViewed(id)
  router.push(`/user/product/${id}`)
}
</script>

<style scoped lang="scss">
$light_roast: #FFD74A;
$medium_roast: #92D053;
$dark_roast: #E13636;

.product-card {
  position: relative;
  cursor: pointer;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, .2);
  .pic {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    &:after {
      display: none;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
    }
  }

  .txt {
    background: #fff;
    text-align: center;
    padding: 0.2rem 0;

    p {
      height: 3.4rem;
      font-size: 15px;
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      padding: 5px;
    }

    .price {
      height: auto;
      padding: 0;
      font-size: 22px;
    }
  }

  .btn-group {
    visibility: hidden;
    position: absolute;
    bottom: 5.5rem;
    left: 0.5rem;
    right: 0.5rem;
    margin-bottom: 1rem;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    z-index: 5;
  }

  &:after {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
  }

  &:hover {
    .pic {
      &::after {
        display: block;
      }
    }
    .btn-group {
      visibility: visible;
  }
  }
}

.light {
  &:before {
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, $light_roast 50%);
  }

  &:after {
    background-image: linear-gradient(45deg, $light_roast 50%, rgba(0, 0, 0, 0) 50%);
  }
}

.medium {
  &:before {
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, $medium_roast 50%);
  }

  &:after {
    background-image: linear-gradient(45deg, $medium_roast 50%, rgba(0, 0, 0, 0) 50%);
  }
}

.dark {
  &:before {
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, $dark_roast 50%);
  }

  &:after {
    background-image: linear-gradient(45deg, $dark_roast 50%, rgba(0, 0, 0, 0) 50%);
  }
}
.sale .pic{
  &::before{
    content: 'sale';
    position: absolute;
    top: 0;
    left: 0;
    padding: .25rem;
    background: #e31d1d;
    color: #fff;
  }
}
</style>

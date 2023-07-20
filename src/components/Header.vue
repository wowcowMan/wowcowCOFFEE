<template>
  <nav class="navbar navbar-light navbar-expand-lg bg-light w-100" ref="nav">
    <div class="container justify-content-start" style="width: 100%; max-width: 1280px;">
      <button class="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg"
        aria-controls="navbarOffcanvasLg">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="m-0"><a class="navbar-brand d-block" href="#">WowCow_Coffee</a></h1>
      <div class="offcanvas offcanvas-start p-4 p-lg-0" tabindex="-1" id="navbarOffcanvasLg"
        aria-labelledby="navbarOffcanvasLgLabel" ref="offcanvas">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">WowCow_Coffee</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item my-0 my-lg-2">
              <!-- <a class="nav-link" aria-current="page" href="#" data-content="首頁" @click="closeNav">首頁</a> -->
              <router-link class="nav-link" to="/" data-content="首頁" @click="closeNav">首頁</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/user/productlist/all?page=1" data-content="所有商品" @click="closeNav">所有商品</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2 d-lg-none" ref="roastedCollapse">
              <a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#roastedCollapse" role="button" data-content="焙度"
                aria-expanded="false" aria-controls="roastedCollapse">焙度</a>
              <div class="collapse" id="roastedCollapse">
                <div class="card card-body p-0">
                  <ul class="list-group ps-1">
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/淺焙?page=1">淺焙</router-link></li>
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/中焙?page=1">中焙</router-link></li>
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/深焙?page=1">深焙</router-link></li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item my-0 my-lg-2 d-lg-none" ref="areaCollapse">
              <a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#areaCollapse" role="button" data-content="產區"
                aria-expanded="false" aria-controls="areaCollapse">產區</a>
              <div class="collapse" id="areaCollapse">
                <div class="card card-body p-0">
                  <ul class="list-group ps-1">
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/非洲?page=1">非洲</router-link></li>
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/中南美洲?page=1">中南美洲</router-link></li>
                    <li class="list-group-item px-2 py-3" @click="closeNav"><router-link
                        to="/user/productlist/亞洲?page=1">亞洲</router-link></li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/user/productlist/配方豆?page=1" data-content="配方豆" @click="closeNav">配方豆</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/user/productlist/sale?page=1" data-content="特價專區" @click="closeNav">特價專區</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2 mb-3">
              <router-link class="nav-link" to="/user/productlist/選物?page=1" data-content="哇靠選物" @click="closeNav">哇靠選物</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/policy" data-content="相關政策" @click="closeNav">相關政策</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2" @click="closeNav">
              <router-link class="nav-link" to="/contact" data-content="聯絡我們" @click="closeNav">聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="ms-auto later-buy">
        <!-- 購物車 -->
        <a class="me-3 position-relative" data-bs-toggle="offcanvas" href="#offcanvasCart" role="button"
          aria-controls="offcanvasCart" @click.prevent="getCart">
          <i class="fa-solid fa-cart-shopping text-dark fs-5"></i>
          <span v-if="cartNum !== 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">
            {{ cartNum }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </a>
        <!-- 收藏 -->
        <a class="position-relative" data-bs-toggle="offcanvas" href="#offcanvasFavorite" role="button"
          aria-controls="offcanvasFavorite" @click.prevent="getFavorite">
          <i class="fa-solid fa-heart text-dark fs-5"></i>
          <span v-if="favoriteNum !== 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">
            {{ favoriteNum }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </a>
      </div>
    </div>
  </nav>
  <!-- 購物車清單 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel"
    ref="offcanvasCart">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasCartLabel">購物車</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body favorites-list">
      <div v-if="cartStatus" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="JSON.stringify(cart) === '{}'" class="fs-3 text-center">
        購物車是空的喔
        <i class="fa-solid fa-cart-plus d-block text-center fs-1"></i>
      </div>
      <div class="cart-item" v-for="item in cart.carts" :key="item.id">
        <div class="row">
          <a href="#" role="button" class="btn btn-link d-flex align-items-start col-10 mb-2"
            :class="{ 'disabled': status.loadingItem === item.id }"
            :aria-disabled="status.loadingItem === item.id">
            <div class="cart-pic col-3 me-2 mt-1" :style="{ backgroundImage: `url(${item.product.imageUrl}` }">
            </div>
            <p class="p-0 mb-2">{{ item.product.title }}</p>
          </a>
          <button type="button" class="btn text-reset col-1" @click.stop="removeCartItem(item.id)">
            <i class="fa-solid fa-trash"></i>
          </button>
          <p class="col-10 pt-1 px-2 text-muted">NT$ {{ item.product.price * item.qty }}</p>
        </div>
        <div class="input-group input-group-sm">
          <input type="number" class="form-control" v-model.number="item.qty" min='1' @change="updateCart(item)"
            :disabled="status.loadingItem === item.id">
        </div>
        <hr>
      </div>
      <p v-if="JSON.stringify(cart) !== '{}'" class="text-end">總計：{{ $filters.currency(cart.total) }}</p>
      <router-link v-if="JSON.stringify(cart) !== '{}'" class="btn btn-dark d-block mb-3" to="/user/usercart"
        @click="closeNav">前往結賬</router-link>
      <div v-if="JSON.stringify(cart) !== '{}'" class="text-end">
        <button type="button" class="btn btn-secondary btn-sm" @click.prevent="removeAllCart">刪除全部</button>
      </div>
    </div>
  </div>
  <!-- 收藏清單 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFavorite" aria-labelledby="offcanvasFavoriteLabel"
    ref="offcanvasFavorite">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasFavoriteLabel">收藏清單</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body favorites-list">
      <!-- <div v-if="favoriteStatus" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> -->
      <div v-if="favoriteList.length === 0" class="fs-3 text-center">
        <i class="fa-solid fa-heart-circle-plus"></i>清單是空的喔
      </div>
      <div class="favorite-item" v-for="item in favoriteList" :key="item.id">
        <div class="row">
          <a href="#" class="d-flex align-items-start col-10">
            <div class="favorite-pic col-3 me-2 mt-1" :style="{ backgroundImage: `url(${item.imageUrl}` }">
            </div>
            <p class="p-0 mb-2">{{ item.title }}</p>
          </a>
          <button type="button" class="btn text-reset col-1" @click.stop="toggleFavorite(item.id)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <p class="col-10 text-end pt-1 px-2 text-muted">NT$ {{ item.price }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import Collapse from 'bootstrap/js/dist/collapse'
const route = useRoute()

// 引入cartStore的function、data
const cartStore = useCartStore()
const { getCart, updateCart, removeCartItem, removeAllCart } = cartStore
const { cart, status, cartStatus, cartNum } = storeToRefs(cartStore)

// 引入favoriteStore的function、data
const favoriteStore = useFavoriteStore()
const { getFavorite, toggleFavorite } = favoriteStore
const { favoriteList, favoriteNum } = storeToRefs(favoriteStore)

const closeNav = () => {
  offcanvasList.value[0].hide()// 主導覽關閉
  offcanvasList.value[1].hide()// 購物車關閉
}

// navFixed()為外部畫面捲動觸發
const nav = ref(null)
const roastedCollapse = ref(null)
const areaCollapse = ref(null)
// eslint-disable-next-line no-unused-vars
const navFixed = () => {
  const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  if (scrollTop > (nav.value.offsetTop)) {
    nav.value.classList.add('position-fixed', 'bg-opacity-75')
    nav.value.classList.remove('navbar-expand-lg')
    roastedCollapse.value.classList.remove('d-lg-none')
    areaCollapse.value.classList.remove('d-lg-none')
  } else if (scrollTop < 10) {
    nav.value.classList.remove('position-fixed', 'bg-opacity-75')
    nav.value.classList.add('navbar-expand-lg')
    roastedCollapse.value.classList.add('d-lg-none')
    areaCollapse.value.classList.add('d-lg-none')
  }
}

// bootstrap
const offcanvasList = []
const collapseList = []
onMounted(() => {
  getCart()
  getFavorite()
  if (route.path === '/') {
    window.addEventListener('scroll', navFixed)
  }

  const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
  offcanvasList.value = offcanvasElementList.map(function(offcanvasEl) {
    return new Offcanvas(offcanvasEl)
  })

  const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
  collapseList.value = collapseElementList.map(function(collapseToggleEl) {
    return new Collapse(collapseToggleEl, {
      toggle: false
    })
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', navFixed)
})
</script>

<style scoped lang="scss">
.navbar {
  top: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
  z-index: 15;

  .navbar-brand,
  .offcanvas-title {
    // border: 1px solid red;
    width: 5rem;
    height: 3rem;
    background-image: url('@/assets/wowcow_logo.svg');
    background-repeat: no-repeat;
    background-position: 0 center;
    background-size: contain;
    text-indent: 101%;
    overflow: hidden;
    line-height: 60px;
  }

  .later-buy {
    a {
      color: #565656;
      font-size: 18px;
    }
  }
}

.offcanvas{
  width: 300px;
  .offcanvas-body{
    .nav-item{
      overflow: hidden;
      // border: 1px solid red;
      .nav-link{
        position: relative;
        margin-right: 0.5rem;
        padding: 0.5rem 0.5rem;
        transition: translate .3s ease-out;
        &::before{
          content: attr(data-content);
          position: absolute;
          bottom: -100%;
          left: 0rem;
          width: 100%;
          padding: 0.5rem 0.5rem;
          background: #212529;
          border-radius: 0.3rem;
          color: aliceblue;
        }
        &:hover{
          translate: 0px -100%;
        }
      }
      .nav-link.active{
        translate: 0px -100%;
      }
    }
  }
}

a {
  cursor: pointer;
  text-decoration: none;
}

.list-group-item {
  border: none;

  a {
    color: #000;
  }
}

#policyCollapse {
  position: absolute;
  width: 100px;

  @media screen and (max-width:992px) {
    position: static;
    width: auto;
  }
}

.card {
  border-radius: 0%;
  border: none;
  border-bottom: 1px solid #eeee;
}

.favorite-item,
.cart-item {
  a {
    color: #565656;

    &:hover {
      color: #000;
    }

    .favorite-pic,
    .cart-pic {
      aspect-ratio: 1/1;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>

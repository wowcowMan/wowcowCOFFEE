<template>
  <nav class="navbar navbar-light navbar-expand-lg bg-light w-100" ref="nav">
    <div class="container justify-content-start" style="width: 100%; max-width: 1280px;">
      <button class="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg"
        aria-controls="navbarOffcanvasLg">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#"><strong>WowCow_Coffee</strong></a>
      <div class="offcanvas offcanvas-start p-4 p-lg-0" tabindex="-1" id="navbarOffcanvasLg"
        aria-labelledby="navbarOffcanvasLgLabel" ref="offcanvas">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">WowCow_Coffee</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item my-0 my-lg-2">
              <a class="nav-link active" aria-current="page" href="#" @click="closeNav">首頁</a>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/user/productlist/all?page=1" @click="closeNav">所有商品</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2 d-lg-none">
              <a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#roastedCollapse" role="button"
                aria-expanded="false" aria-controls="roastedCollapse">焙度</a>
              <div class="collapse" id="roastedCollapse">
                <div class="card card-body p-0">
                  <ul class="list-group">
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
            <li class="nav-item my-0 my-lg-2 d-lg-none">
              <a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#areaCollapse" role="button"
                aria-expanded="false" aria-controls="areaCollapse">產區</a>
              <div class="collapse" id="areaCollapse">
                <div class="card card-body p-0">
                  <ul class="list-group">
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
            <li class="nav-item my-0 my-lg-2" @click="closeNav">
              <router-link class="nav-link" to="/user/productlist/配方豆?page=1">配方豆</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2" @click="closeNav">
              <router-link class="nav-link" to="/user/productlist/sale?page=1">特價專區</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2 mb-3" @click="closeNav">
              <router-link class="nav-link" to="/user/productlist/選物?page=1">哇靠選物</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2">
              <router-link class="nav-link" to="/policy" @click="closeNav">相關政策</router-link>
            </li>
            <li class="nav-item my-0 my-lg-2" @click="closeNav">
              <router-link class="nav-link" to="/contact" @click="closeNav">聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="ms-auto later-buy">
        <!-- 購物車 -->
        <a class="me-3" data-bs-toggle="offcanvas" href="#offcanvasCart" role="button" aria-controls="offcanvasCart"
          @click.prevent="getCart">
          <i class="fa-solid fa-cart-shopping"></i>
        </a>
        <!-- 收藏 -->
        <a data-bs-toggle="offcanvas" href="#offcanvasFavorite" role="button" aria-controls="offcanvasFavorite"
          @click.prevent="getFavorite">
          <i class="fa-solid fa-heart"></i>
        </a>
      </div>
    </div>
  </nav>
  <!-- 購物車清單 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel" ref="offcanvasCart">
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
      <div v-if="JSON.stringify(cart)==='{}'" class="fs-3 text-center">
        購物車是空的喔
      </div>
      <div class="cart-item" v-for="item in cart.carts" :key="item.id">
        <div class="row">
          <a href="#" role="button" class="btn btn-link d-flex align-items-start col-10 mb-2" :class="{'disabled':this.status.loadingItem === item.id}" :aria-disabled="this.status.loadingItem === item.id">
            <div class="cart-pic col-3 me-2 mt-1"
            :style="{ backgroundImage: `url(${item.product.imageUrl}` }">
            </div>
            <p class="p-0 mb-2">{{ item.product.title }}</p>
          </a>
          <button type="button" class="btn-close text-reset col-1"
          @click.stop="removeCartItem(item.id)"></button>
          <p class="col-10 pt-1 px-2 text-muted">NT$ {{ item.product.price*item.qty }}</p>
        </div>
        <div class="input-group input-group-sm">
          <input type="number" class="form-control" v-model.number="item.qty" min='1' @change="updateCart(item)"
          :disabled="this.status.loadingItem === item.id">
        </div>
        <hr>
      </div>
      <p v-if="JSON.stringify(cart)!=='{}'" class="text-end">總計：{{ $filters.currency(cart.total) }}</p>
      <router-link v-if="JSON.stringify(cart)!=='{}'" class="btn btn-dark d-block" to="/user/usercart" @click="closeNav">前往結賬</router-link>
    </div>
  </div>
  <!-- 收藏清單 -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFavorite" aria-labelledby="offcanvasFavoriteLabel" ref="offcanvasFavorite">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasFavoriteLabel">收藏清單</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body favorites-list">
      <div v-if="favoriteStatus" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="favoriteList.length===0" class="fs-3 text-center">
        <i class="fa-solid fa-heart-circle-plus"></i>清單是空的喔
      </div>
      <div class="favorite-item" v-for="item in favoriteList" :key="item.id">
        <div class="row">
          <a href="#" class="d-flex align-items-start col-10">
            <div class="favorite-pic col-3 me-2 mt-1"
            :style="{ backgroundImage: `url(${item.imageUrl}` }">
            </div>
            <p class="p-0 mb-2">{{ item.title }}</p>
          </a>
          <button type="button" class="btn-close text-reset col-1"
          @click.stop="removeFavorite(item.id)"></button>
        </div>
        <p class="col-10 text-end pt-1 px-2 text-muted">NT$ {{ item.price }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import Collapse from 'bootstrap/js/dist/collapse'
import handelFavorites from '@/methods/favorite'
import cartMixin from '@/mixins/cartMixin'
export default {
  data() {
    return {
      favoriteList: [],
      isScroll: false,
      offcanvasList: [],
      collapseList: [],
      isShow: false,
      favoriteStatus: false,
      cartStatus: false
    }
  },
  mixins: [cartMixin],
  methods: {
    closeNav() {
      this.offcanvasList[0].hide()// 主導覽關閉
      this.offcanvasList[1].hide()// 購物車關閉
    },
    // 獲取收藏清單
    getFavorite() {
      const storeFavorite = JSON.parse(localStorage.getItem('favorite'))
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.favoriteStatus = true
      this.$http.get(url).then((response) => {
        this.favoriteStatus = false
        if (response.data.success) {
          this.favoriteList = response.data.products.filter((item) => {
            return storeFavorite.includes(item.id)
          })
        }
      })
    },
    // 移除收藏
    removeFavorite(id) {
      handelFavorites.toggleFavorite(id)
      this.getFavorite()
    },
    // 重整當前路徑
    pathReload() {
      this.$router.go(0)
    },
    navFixed() {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop > (this.$refs.nav.offsetTop)) {
        this.$refs.nav.classList.add('position-fixed', 'bg-opacity-75')
        this.$refs.nav.classList.remove('navbar-expand-lg')
      } else if (scrollTop < 10) {
        this.$refs.nav.classList.remove('position-fixed', 'bg-opacity-75')
        this.$refs.nav.classList.add('navbar-expand-lg')
      }
    }
  },
  mounted() {
    const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
    this.offcanvasList = offcanvasElementList.map(function(offcanvasEl) {
      return new Offcanvas(offcanvasEl)
    })

    const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
    this.collapseList = collapseElementList.map(function(collapseToggleEl) {
      return new Collapse(collapseToggleEl, {
        toggle: false
      })
    })
    // favorite offcanvas關閉時重整頁面，以此更新商品卡收藏狀態
    this.$refs.offcanvasFavorite.addEventListener('hidden.bs.offcanvas', this.pathReload)
  }
}
</script>

<style scoped lang="scss">
.navbar {
  top: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
  z-index: 15;

  .later-buy {
    a {
      color: #565656;
      font-size: 18px;
    }
  }
}

.offcanvas {
  width: 300px;
}

a {
  cursor: pointer;
  text-decoration: none;
}
.list-group-item {
  border: none;
  a{
    color: #000;
  }
}

#policyCollapse{
  position: absolute;
  width: 100px;
  @media screen and (max-width:992px){
    position: static;
    width: auto;
  }
}

.card {
  border-radius: 0%;
  border: none;
  border-bottom: 1px solid #eeee;
}

.favorite-item, .cart-item{
  a{
    color: #565656;
    &:hover{
      color: #000;
    }
    .favorite-pic, .cart-pic{
      aspect-ratio: 1/1;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    p{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>

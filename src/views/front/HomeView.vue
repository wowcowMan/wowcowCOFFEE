<template>
  <Loading :active="productsStore.isLoading"></Loading>
  <Header ref="header"></Header>
  <div class="home">
    <!-- banner -->
    <div class="container-fluid banner p-0 mt-0 mb-5">
      <div id="myCarousel" class="carousel carousel-dark slide" data-bs-ride="carousel" ref="bannerCarousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="@/assets/banner01.png" class="d-block w-100" alt="banner">

          </div>
          <div class="carousel-item">
            <img src="@/assets/banner02.png" class="d-block w-100" alt="banner">
          </div>
          <router-link to="/user/productlist/sale?page=1" target="_blank" class="carousel-item">
            <img src="@/assets/banner03.png" class="d-block w-100" alt="banner">
          </router-link>
        </div>
      </div>
    </div>

    <!-- 焙度介紹 -->
    <div class="container mb-5">
      <p class="text-center fw-bold w-75 mx-auto mb-3">品味，來自於每一顆咖啡豆的故事。我們致力於為您帶來最優質、經過挑選的咖啡豆，讓您享受獨特而令人難以忘懷的咖啡體驗。</p>
      <div class="roasted-group d-flex justify-content-between align-item-center mb-3">
        <router-link to="/user/productlist/淺焙?page=1" class="col text-center text-decoration-none me-3"
          style="background-image: url('https://images.unsplash.com/photo-1625189490657-1a49aab48de9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80');"
          href="#">
          <p class="m-0 text-light fs-4 border border-2 border-light rounded-pill px-2 py-1">淺焙</p>
        </router-link>
        <router-link to="/user/productlist/中焙?page=1" class="col text-center text-decoration-none me-3"
          style="background-image: url('https://images.unsplash.com/photo-1627747768819-dd7388156f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');"
          href="#">
          <p class="m-0 text-light fs-4 border border-2 border-light rounded-pill px-2 py-1">中焙</p>
        </router-link>
        <router-link to="/user/productlist/深焙?page=1" class="col text-center text-decoration-none"
          style="background-image: url('https://images.unsplash.com/photo-1599599811214-3d44be99547f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80');"
          href="#">
          <p class="m-0 text-light fs-4 border border-2 border-light rounded-pill px-2 py-1">深焙</p>
        </router-link>
      </div>
      <router-link to="/user/productlist/all?page=1" class="d-block text-center text-decoration-none more-link"
        href="#">查看全部</router-link>
    </div>

    <!-- 產區介紹 -->
    <div class="areas-container p-0 mb-5">
      <p class="text-center w-75 fw-bold mx-auto mb-5">
        我們不只是尋找最好的咖啡豆，更是探索每個產地、每個農民的故事。我們與全球咖啡種植者建立了長期合作關係，確保他們的辛勤耕耘和專業知識在每一杯咖啡中得以體現。</p>
      <div class="areas-wrap mb-3" ref="areasWrap">
        <div v-for="(area, key) in areasData" :key="key" class="area-item d-block d-md-flex"
          :class="{ 'flex-row-reverse': area.name === '中南美洲' }">
          <div class="area-info position-relative d-flex align-items-center col col-md-6 m-0 px-1 py-4"
            :class="{ 'flex-row-reverse': area.name === '中南美洲' }">
            <p class="continent-name text-center text-light fs-5 fw-bold">{{ area.name }}產區</p>
            <p class="continent-info col-9 p-3 bg-light fs-6">{{ area.info }}</p>
          </div>
          <div class="product col col-md-6 p-0 p-md-3 bg-white">
            <card-swiper>
              <swiper-slide v-for="(item) in area.products" :key="item.id">
                <product-card :product="item"></product-card>
              </swiper-slide>
              <swiper-slide class="more"><router-link
                  :to="`/user/productlist/${area.name}?page=1`">查看更多...</router-link></swiper-slide>
            </card-swiper>
          </div>
        </div>
      </div>
      <router-link to="/user/productlist/all?page=1"
        class="container mt-5 d-block text-center text-decoration-none more-link">
        查看全部
      </router-link>
    </div>

    <!-- 沖煮建議 -->
    <div class="container">
      <p class="text-center fw-bold mb-5">我們不僅提供高品質的咖啡豆，還為您提供相關的烘焙建議和沖煮方法，讓您在家中也能沖泡出一杯完美的咖啡。</p>

      <div class="accordion pour-parameter" id="accordionExample" ref="pourParameter">
        <div class="accordion-item border-0">
          <div class="accordion-header d-flex">
            <button class="accordion-button d-flex flex-column text-center text-light rounded-0 fs-4" type="button"
              data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              粒徑
              <span><i class="fa-solid fa-chevron-up"></i></span>
            </button>
            <button class="accordion-button d-flex flex-column text-center text-light rounded-0 fs-4 mx-2" type="button"
              data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              粉量
              <span><i class="fa-solid fa-chevron-up"></i></span>
            </button>
            <button class="accordion-button d-flex flex-column text-center text-light rounded-0 fs-4" type="button"
              data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true"
              aria-controls="collapseThree">
              時間
              <span><i class="fa-solid fa-chevron-up"></i></span>
            </button>
          </div>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body my-3 p-4">
              <p class="m-0">
                咖啡粉的粗細，對沖煮結果有極大的影響，粗細度可以很直接的調整咖啡的酸甜，在適當的萃取率中，粉越粗越酸反之越甜。所以相當建議在調整參數時，與其調整濾杯、水溫、粉水比等，不如先試著調整咖啡粉的粗細，可以最快速的達到其目的。
              </p>
            </div>
          </div>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body my-3 p-4">
              <p class="m-0">咖啡粉的量是繼粗細後，也能大幅度影響咖啡味道到參數，粉越多較容易做出酸值，越少則越容易做出甜感。
                通常粉越多萃取範圍越廣，容錯率高，也更容易做出咖啡的層次，所以也是相當建議新手，可以試著提高粉量，更容易沖出一杯好喝的咖啡喔。
              </p>
            </div>
          </div>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body my-3 p-4">
              <p class="m-0">
                沖煮的時間也是影響一杯咖啡味道的關鍵，跟炒菜一樣，時間太少可能會沒煮熟，也就是萃取不足；時間拉太長會燒焦，也就是過萃，在合適的時間範圍中，時間越短越酸，越長則越甜，但在後面就會苦囉，所以只要拿捏得好就能做出一杯酸甜適中順口的好咖啡。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/productsStore'
import { SwiperSlide } from 'swiper/vue'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Carousel from 'bootstrap/js/dist/carousel'
import CardSwiper from '@/components/CardSwiper.vue'
import ProductCard from '@/components/ProductCard.vue'

const productsStore = useProductsStore()
const { areasData } = storeToRefs(productsStore)

const header = ref(null)
const areasWrap = ref(null)
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  if (scrollTop > (areasWrap.value.offsetTop - 300)) {
    areasWrap.value.classList.add('show')
  }
}

const carousel = {}
const bannerCarousel = ref(null)
onMounted(() => {
  productsStore.getAllDatas()
  window.addEventListener('scroll', handleScroll)
  const myCarousel = bannerCarousel.value
  carousel.value = new Carousel(myCarousel)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.home {
  height: 1280px;

  .banner {
    max-width: 1280px;
  }

  .carousel-item {
    aspect-ratio: 16/9;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .carousel-caption {
    h5 {
      font-size: 3rem;
    }

    p {
      font-size: 1rem;
    }

    a {
      text-decoration: none;
      color: #fff;
    }
  }

  .roasted-group {
    a {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      position: relative;
      aspect-ratio: 1/1;
      display: grid;
      place-content: center;
      z-index: 1;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .1);
        z-index: -1;
        transition: all .3s ease;
      }

      p {
        background: none;
        text-shadow: 2px 2px 1px rgba(10, 10, 10, .7);
      }

      &:hover {
        &:after {
          background: rgba(255, 255, 255, 0);
        }

        &:nth-child(1) {
          p {
            background: #FFD74A;
          }
        }

        &:nth-child(2) {
          p {
            background: #92D053;
          }
        }

        &:nth-child(3) {
          p {
            background: #E13636;
          }
        }
      }
    }
  }

  .more-link {
    position: relative;
    color: #838383;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 60%;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      background: #838383;
    }

    &:after {
      left: 60%;
      right: 0;
    }

    &:hover {
      color: #585858;
    }
  }

  .areas-container {
    width: 100%;
    max-width: 1280px;
    margin: auto;

    .areas-wrap {
      background-image: url('https://images.unsplash.com/photo-1517707711963-adf9078bdf01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
      background-position: 10% center;
      background-size: cover;
      background-attachment: fixed;

      .area-item {
        .area-info {
          background-image: linear-gradient(90deg, rgba(150, 150, 150, .7) 40%, rgba(225, 225, 225, .5) 40%);
          box-shadow: 3px 0 5px rgba(0, 0, 0, .3);
          transform: translateX(50%);
          transition: all .3s ease;
          z-index: 5;

          .continent-name {
            writing-mode: vertical-rl;
            letter-spacing: 0.3rem;
            text-shadow: 1px 1px 1px #000;
          }
        }

        .product {
          opacity: 0;
          transform: translateX(-50%);
          transition: all .3s ease;
        }

        &:nth-child(2) {
          .area-info {
            background-image: linear-gradient(270deg, rgba(150, 150, 150, .7) 40%, rgba(225, 225, 225, .5) 40%);
            box-shadow: -3px 0 5px rgba(0, 0, 0, .3);
            transform: translateX(-50%);
            transition-delay: .1s;
          }

          .product {
            transform: translateX(50%);
            transition-delay: .1s;
          }
        }

        &:nth-child(3) {
          .area-info {
            transition-delay: .2s;
          }

          .product {
            transition-delay: .2s;
          }
        }

        @media screen and (max-width:768px) {
          .area-info {
            box-shadow: 0px 3px 5px rgba(0, 0, 0, .3);
            transform: translateX(0%);
          }

          .product {
            transform: translateX(0%);
            max-height: 0;
            overflow: hidden;
          }

          &:nth-child(2) {
            .area-info {
              box-shadow: 0px 3px 5px rgba(0, 0, 0, .3);
              transform: translateX(0%);
            }

            .product {
              transform: translateX(0%);
            }
          }
        }
      }
    }

    .areas-wrap.show {
      .area-item {
        .area-info {
          transform: translateX(0);
        }

        .product {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media screen and (max-width:768px) {
        .product {
          max-height: 500px;
        }
      }
    }
  }

  .accordion-button {
    text-shadow: 2px 2px 2px #000;

    &::after {
      display: none;
    }

    &:nth-child(1) {
      background-image: url('https://images.unsplash.com/photo-1646346835113-b83a4097983b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    }

    &:nth-child(2) {
      background-image: url('https://images.unsplash.com/photo-1522825180917-a355ef45e880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80');
    }

    &:nth-child(3) {
      background-image: url('https://images.unsplash.com/photo-1558618666-c721241b294e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    }

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    span {
      transition: all .3s ease;
      color: #fff;
      text-shadow: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .accordion-button {
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }

  .accordion-button.collapsed {
    position: relative;

    span {
      transform: rotate(180deg);
    }

    &:before {
      background: rgba(0, 0, 0, .7);
    }
  }

  .accordion-body {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 1rem;
      height: 1rem;
    }

    &::before {
      top: 0;
      left: 0;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
    }

    &::after {
      bottom: 0;
      right: 0;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
}

.footer {
  margin-top: 150px;
}
</style>

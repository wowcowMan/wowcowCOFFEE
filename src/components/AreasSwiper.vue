<template>
  <swiper :slidesPerView="2" :navigation="true" :spaceBetween="0" :mousewheel="{forceToAxis: true}" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <slot></slot>
    <swiper-slide v-if="false" class="more"><a href="#"></a></swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
// import 'swiper/scss/navigation'
import '../assets/swiper-nav.scss'

// import required modules
import { Mousewheel, Navigation } from 'swiper'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Mousewheel, Navigation]
    }
  }
}
</script>

<style lang="scss">
// @import "../assets/produc-card.scss";
.swiper {
  position: relative;
  // border: 1px solid red;
  width: 100%;
  padding: 1.5rem;

  .swiper-wrapper {
    align-items: center;
  }

  .more {
    // border: 1px solid red;
    font-size: 18px;
    background: #fff;
    display: flex;
    align-items: center;

    a {
      color: #666666;
    }
  }

  .swiper-slide {
    padding: 0.5rem;
  }

  &::before,&::after{
    content: '';
    position: absolute;
    top: 0;
    width:30px;
    height: 100%;
    backdrop-filter: blur(3px);
    z-index: 2;
  }
  &::before{
    left: 0;
  }
  &::after{
    right: 0;
  }
}

.swiper-button-prev,
.swiper-button-next {
  height: 80px;
}</style>

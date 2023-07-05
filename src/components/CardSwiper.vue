<template>
  <swiper :slidesPerView="2" :navigation="true" :spaceBetween="0" :mousewheel="{forceToAxis: true}" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <slot></slot>
  </swiper>
</template>
<script>
import { Swiper } from 'swiper/vue'
import 'swiper/scss'
import '../assets/swiper-nav.scss'
import { Mousewheel, Navigation } from 'swiper'

export default {
  components: {
    Swiper
  },
  setup() {
    return {
      modules: [Mousewheel, Navigation]
    }
  }
}
</script>

<style lang="scss">
.swiper {
  position: relative;
  width: 100%;
  padding: 1.5rem;

  .swiper-wrapper {
    align-items: center;
  }

  .more {
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

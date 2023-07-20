<template>
  <swiper :slidesPerView="perViewNum" :navigation="true" :spaceBetween="0" :mousewheel="{forceToAxis: true}" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper"  ref="swiperContainer">
    <slot></slot>
  </swiper>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper } from 'swiper/vue'
import 'swiper/scss'
import '../assets/swiper-nav.scss'
import { Mousewheel, Navigation } from 'swiper'

export default {
  components: {
    Swiper
  },
  setup() {
    const perViewNum = ref(3)
    const updateSlidesPerView = () => {
      const containerWidth = window.innerWidth
      if (containerWidth < 480) {
        perViewNum.value = 1
      } else if (containerWidth < 992 && containerWidth >= 768) {
        perViewNum.value = 3
      }
    }
    onMounted(() => {
      updateSlidesPerView() // Initial setup
      window.addEventListener('resize', updateSlidesPerView)
    })
    onUnmounted(() => {
      window.addEventListener('resize', updateSlidesPerView)
    })
    return {
      perViewNum,
      updateSlidesPerView,
      modules: [Mousewheel, Navigation]
    }
  }
}
</script>

<style lang="scss">
.swiper {
  position: relative;
  // width: 100%;
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

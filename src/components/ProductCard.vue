<template>
  <div class="product-card"
    :class="{ light: productsArr.category.match('淺焙'), medium: productsArr.category.match('中焙'), dark: productsArr.category.match('深焙') }"
    @click="getProduct(productsArr.id)">
    <div class="pic" :style="{ backgroundImage: `url(${productsArr.imageUrl}` }">
    </div>
    <div class="txt">
      <p>{{ productsArr.title }}</p>
      <p class="price">NT${{ productsArr.price }}</p>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-outline-light me-2" :disabled="status.loadingItem === productsArr.id"
        @click.stop="$emit('addCart',productsArr.id, productsArr.title)">
        <i class="fa-solid fa-cart-shopping"></i>
        <div v-if="status.loadingItem === productsArr.id" class="spinner-border text-secondary spinner-border-sm"
          role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
      <button type="button" class="btn btn-outline-light" :disabled="status.loadingItem === productsArr.id"
              :class="{'btn-light':favoriteIdList.includes(productsArr.id)}"
              @click.stop="updateFavorite(productsArr.id)">
        <i v-if="!favoriteIdList.includes(productsArr.id)" class="fa-regular fa-heart"></i>
        <i v-if="favoriteIdList.includes(productsArr.id)" class="fa-solid fa-heart text-warning"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 123
    }
  },
  props: ['productsArr', 'status', 'favoriteIdList'],
  methods: {
    getProduct(id) {
      this.$router.push(`/user/product/${id}`)
    },
    updateFavorite(id) {
      this.$emit('update-favorite', id)
    }
  }
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

  // height: 100%;
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
      // border: 1px solid red;
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
    // border: 1px solid red;
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
</style>

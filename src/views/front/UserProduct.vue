<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/productlist/all?page=1">商品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row align-items-stretch">
      <div class="col-md-4 mb-5 me-5">
        <div class="active-pic">
          <img :src="activePic" alt="" class="img-fluid mb-3">
        </div>
        <ul class="pic-list p-0 d-flex">
          <li class="border border-black me-2 col-2 col-md-3"
          :class="{'border-2': activePic === product.imageUrl}"
          @click.prevent="changePic(product.imageUrl)">
            <img :src="product.imageUrl" alt="">
          </li>
          <li v-for="(i, key) in product.images" :key="key" class="border border-black col-2 col-md-3"
          :class="{'border-2': activePic === i}"
          @click.prevent="changePic(i)">
            <img :src="i" alt="">
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-6">
        <!-- title -->
        <h2>{{ product.title }}</h2>
        <hr>
        <!-- price -->
        <div class="h3" v-if="product.price === product.origin_price">NT$ {{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price !== product.origin_price">NT$ {{ product.origin_price }} 元</del>
        <div class="h3" v-if="product.price !== product.origin_price">特價 {{ product.price }} 元</div>
        <!-- info -->
        <div v-if="product.category !== '選物'" class="accordion accordion-flush mb-3" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button fw-light py-3 px-0 d-flex bg-transparent" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                味道
                <span></span><!-- 展開、收合符號 -->
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
              data-bs-parent="#accordionExample">
              <div class="accordion-body px-0">
                <div class="info-card d-flex">
                  <p class="me-3 p-3 rounded text-light">酸度：{{ this.infoContent.taste.acidity }}/5</p>
                  <p class="p-3 rounded text-light">甜感：{{ this.infoContent.taste.sweetness }}/5</p>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed fw-light py-3 px-0 d-flex bg-transparent" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                風味
                <span></span><!-- 展開、收合符號 -->
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample">
              <div class="accordion-body px-0">
                {{ infoContent.flavor }}
              </div>
            </div>
          </div>
        </div>
        <!-- add to cart -->
        <div class="row px-2 mb-5">
          <div class="col-4 d-flex align-item-center justify-content-between border border-1 border-black rounded-1">
            <button type="button" class="btn border-0 btn-sm" @click.prevent="productNum--" :disabled="atLeast">-</button>
            <input v-model="productNum" type="numbet" class="p-1 border-0 col-6 text-center">
            <button type="button" class="btn btn-sm" @click.prevent="productNum++">+</button>
          </div>
          <div class="col-6 col-md-8">
            <button type="button" class="btn btn-dark" @click="addToCart(product.id, product.title)">
              加到購物車
            </button>
          </div>
          <span class="mt-3 p-0 text-secondary">* 代磨請在留言備註沖煮器材</span>
        </div>
      </div>
    </div>
    <!-- others info -->
    <nav>
      <div class="nav nav-tabs justify-content-around mb-3" id="nav-tab" role="tablist">
        <button class="nav-link" :class="{ active: activeButton === 'description' }" type="button"
        @click.prevent="tabClick('description')">商品描述</button>
        <button v-if="product.category !== '選物'" class="nav-link" :class="{ active: activeButton === 'parameters' }" type="button"
        @click.prevent="tabClick('parameters')">沖煮參數</button>
      </div>
    </nav>
    <div class="tab-content mb-5" id="nav-tabContent">
      <!-- 商品描述 -->
      <div class="tab-pane col-6" :class="{ active: activeButton === 'description' }">
        {{ product.description }}
        <br>
        <br>
        #{{ product.unit }} / #{{ product.category }}
      </div>
      <!-- 沖煮參數 -->
      <div v-if="product.category !== '選物'" class="tab-pane" :class="{ active: activeButton === 'parameters' }" id="parameters">
        <div class="parameters-group col col-md-8 mx-auto">
          <div class="row g-3 mb-3">
            <div class="col-6">
              <div class="parameter-item temperature text-center p-3">
                <i class="fa-solid fa-temperature-half d-block"></i>
                <span>{{ infoContent.strategy.temperature }}°C</span>
              </div>
            </div>
            <div class="col-6">
              <div class="parameter-item dripper text-center p-3">
                <i v-if="infoContent.strategy.dripper === 'v60'" class="fa-solid fa-v d-block"></i>
                <i v-if="infoContent.strategy.dripper === '蛋糕濾杯'" class="fa-solid fa-whiskey-glass d-block"></i>
                <span>{{ infoContent.strategy.dripper }}</span>
              </div>
            </div>
            <div class="col-6">
              <div class="parameter-item fine text-center p-3">
                <i class="fa-solid fa-braille d-block"></i>
                <span>{{ infoContent.strategy.fine }}粗細</span>
              </div>
            </div>
            <div class="col-6">
              <div class="parameter-item amount text-center p-3">
                <i class="fa-solid fa-cubes-stacked d-block"></i>
                <span>{{ infoContent.strategy.amount }}</span>
              </div>
            </div>
          </div>
          <p class="pour bg-dark text-light text-center p-2">
            {{ infoContent.strategy.pour }}
          </p>
          <div class="suggest p-1 text-md-center">
            <p>※ 建議每次分段注水，盡量在目標時間左右要流光</p>
            <p>※ 調整酸甜建議直接調粗細，太酸調細；太苦調粗</p>
            <p>※ 味道微調可調整，粉量、時間、水溫</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      product: {},
      activePic: '',
      infoContent: {
        taste: {
          acidity: '',
          sweetness: ''
        },
        flavor: '',
        strategy: {
          temperature: '',
          dripper: '',
          amount: '',
          fine: '',
          pour: ''
        }
      },
      productNum: 1,
      atLeast: true,
      id: '',
      activeButton: 'description'
    }
  },
  watch: {
    productNum() {
      if (this.productNum <= 1) {
        this.productNum = 1
        this.atLeast = true
      } else {
        this.atLeast = false
      }
    }
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          this.activePic = this.product.imageUrl
          if (this.product.category !== '選物') {
            this.infoContent = JSON.parse(this.product.content)
          }
        }
      })
    },
    addToCart(id, title) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty: this.productNum
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          this.isLoading = false
          this.productNum = 1
          this.$swal({
            icon: 'success',
            text: title,
            title: '以成功加入購物車'
          })
        }
      })
    },
    changePic(url) {
      this.activePic = url
    },
    tabClick(btn) {
      this.activeButton = btn
    }
  },
  created() {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>

<style scoped lang="scss">
* {
  white-space: pre-line;
}

.breadcrumb {
  a {
    color: #aaa;

    &:hover {
      color: #000;
    }
  }
}
.active-pic, .pic-list li{
  aspect-ratio: 1/1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.pic-list {
  list-style: none;
  overflow: hidden;
}

.accordion-button {
  &:focus {
    box-shadow: none;
    outline: none;
  }

  &:after {
    display: none;
  }
  // 展開、收合
  span {
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
    margin-left: auto;
    transform: rotate(180deg);
    transition: all .3s ease;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 1px;
      background: #000;
    }

    &:after {
      transform: rotate(90deg);
      background: transparent;
    }
  }
}

.accordion-button.collapsed {
  span {
    transform: rotate(0deg);

    &:after {
      background: #000;
    }
  }
}

.info-card {
  p {
    &:first-child {
      background: #FFD74A;
    }

    &:last-child {
      background: #E13636;
    }
  }
}

.nav-link {
  color: #8b8b8b;
}
.parameter-item {
  border: 2px solid #aaa;
}

.pour {
  font-size: 24px;

  @media screen and (max-width:768px) {
    font-size: 16px;
  }
}
.suggest {
  color: #aaa;
  font-size: 14px;
}
</style>

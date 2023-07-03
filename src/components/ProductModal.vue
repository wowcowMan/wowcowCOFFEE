<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- 商品資訊新增區域，讓input都同步tempProduct-->
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結" />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile" />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.images">
                <div v-for="(image, key) in tempProduct.images" class="mb-3 input-group" :key="key">
                  <input type="url" class="form-control form-control" v-model="tempProduct.images[key]"
                    placeholder="請輸入連結" />
                  <button type="button" class="btn btn-outline-danger" @click="tempProduct.images.splice(key, 1)">
                    移除
                  </button>
                </div>
                <div v-if="tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length
                  ">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.images.push('')">
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題" />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                    placeholder="請輸入分類" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位" />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price" v-model.number="tempProduct.price"
                    placeholder="請輸入售價" />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                  placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <div class="row align-items-center">
                  <div class="input-group w-auto col-3">
                    <label for="acidity" class="form-label mb-0 me-2 lh-lg">酸度</label>
                    <select v-model="content.taste.acidity" class="form-select d-inline-block w-auto me-1" aria-label="Default select example" id="acidity" @change="addContent">
                      <option selected>請選擇</option>
                      <option v-for="(i, key) in 5" :value="i" :key="key">{{ i }}</option>
                    </select>
                    <span class="lh-lg">/5</span>
                  </div>
                  <div class="input-group w-auto col-3">
                    <label for="sweetness" class="form-label mb-0 me-2 lh-lg">甜感</label>
                    <select v-model="content.taste.sweetness" class="form-select d-inline-block w-auto me-1" aria-label="Default select example" id="sweetness" @change="addContent">
                      <option selected>請選擇</option>
                      <option v-for="(i, key) in 5" :value="i" :key="key">{{ i }}</option>
                    </select>
                    <span class="lh-lg">/5</span>
                  </div>
                </div>
                <br>
                <label for="flavor" class="form-label">風味</label>
                <textarea type="text" class="form-control" id="flavor" v-model="content.flavor" placeholder="請輸入風味內容"
                  @change="addContent"></textarea>

                <label for="strategy" class="form-label">沖煮策略</label><br>
                <label for="temperature">水溫</label>
                <input type="text" v-model="content.strategy.temperature" class="me-2" @change="addContent">
                <label for="dripper">濾杯</label>
                <input type="text" v-model="content.strategy.dripper" @change="addContent"><br>
                <label for="dripper">粉量</label>
                <input type="text" v-model="content.strategy.amount" class="me-2" @change="addContent">
                <label for="fine">粗細</label>
                <input type="text" v-model="content.strategy.fine" @change="addContent"><br>
                <label for="pour">斷水</label>
                <textarea type="text" class="form-control" id="content" v-model="content.strategy.pour"
                  placeholder="請輸入沖煮說明" @change="addContent"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                    :false-value="0" id="is_enabled" />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 確認、取消按鈕 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <!-- 確認後傳送emit並帶出tempProduct -->
          <button type="button" class="btn btn-primary" :disabled="isChecked"
            @click="$emit('update-product', tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  // 接收父層傳來的產品資訊，新增會傳一個空物件，修改會傳該產品資訊物件
  props: {
    product: {
      type: Object,
      // 預設為空物件
      default() { return {} }
    }
  },
  data() {
    return {
      modal: {},
      // 因為傳參考特性，為了新增商品時，不直接改到主要資料而設立
      tempProduct: {
        content: ''
      },
      content: {
        taste: {
          acidity: '請選擇',
          sweetness: '請選擇'
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
      isChecked: false
    }
  },
  watch: {
    // 當props的product改變時，讓tempProduct等於新的props的product
    product() {
      this.tempProduct = this.product
      if (!this.tempProduct.content) {
        this.content = {
          taste: {
            acidity: '請選擇',
            sweetness: '請選擇'
          },
          flavor: '',
          strategy: {
            temperature: '',
            dripper: '',
            amount: '',
            fine: '',
            pour: ''
          }
        }
      } else {
        this.content = JSON.parse(this.tempProduct.content)
      }
      // 多圖範例
      if (!this.tempProduct.images) {
        this.tempProduct.images = []
      }
    }
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0]
      // console.dir(uploadedFile)，可以查看$refs.fileInput的內容
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl
        }
      })
    },
    addContent() {
      this.tempProduct.content = JSON.stringify(this.content)
    }
  },
  mixins: [modalMixin]
}
</script>

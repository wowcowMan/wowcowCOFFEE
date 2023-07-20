import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import axios from 'axios'
export const useProductsStore = defineStore('productsStore', () => {
  const isLoading = ref(false)
  // 獲取全部商品
  const allDatas = ref([])
  const getAllDatas = () => {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
    isLoading.value = true
    axios.get(url).then((response) => {
      if (response.data.success) {
        allDatas.value = response.data.products.map((obj, key) => {
          obj.lasting = key
          return obj
        })
        if (route.path.match('/user/product/')) {
          getViewed()
          randomList(allDatas.value)
        }
        isLoading.value = false
      }
    })
  }
  // 首頁產區商品列
  const filterAreas = (name) => {
    return allDatas.value.filter((item) => {
      return item.category.includes(name)
    }).slice(0, 3).reverse() || []
  }
  const areasData = ref([
    {
      name: '非洲',
      info: '非洲產區風味通常具有明亮的酸度、清新的口感和豐富的水果風味。衣索比亞的咖啡具有花香和柑橘風味，肯亞的咖啡則以複雜的莓果風味著稱。',
      products: computed(() => {
        return filterAreas('非洲')
      })
    },
    {
      name: '中南美洲',
      info: '中南美洲的咖啡豆通常具有平衡的風味和濃郁的口感。哥斯達黎加的咖啡常帶有柔和的酸度和堅果風味，現今哥倫比亞有許多特殊處理法，其咖啡有豐富且濃烈的香氣，巴拿馬則以高品質的藝伎咖啡計聞名。',
      products: computed(() => {
        return filterAreas('中南美洲')
      })
    },
    {
      name: '亞洲',
      info: '亞洲咖啡豆的風味特點較為多樣。常常具有香料和木質的風味或茶感。而台灣咖啡近年發展迅速，提供高品質且改善原本亞洲豆原本不討喜的風味，並有著花香、果香等風味。',
      products: computed(() => {
        return filterAreas('亞洲')
      })
    }
  ])

  // 近期看過
  const viewedList = ref([])
  const getViewed = () => {
    const storeViewed = JSON.parse(localStorage.getItem('viewed'))
    viewedList.value = allDatas.value.filter((item) => storeViewed.includes(item.id)).sort((a, b) => {
      return storeViewed.indexOf(a.id) - storeViewed.indexOf(b.id)
    })
  }

  // 推薦新品
  const recommend = ref([])
  const randomList = (datas) => {
    recommend.value = []
    const randomIndexes = []
    while (randomIndexes.length < 3) {
      const indexNum = Math.floor(Math.random() * datas.length)
      if (!randomIndexes.includes(indexNum)) {
        randomIndexes.push(indexNum)
      }
    }
    recommend.value = randomIndexes.map(index => allDatas.value[index])
  }

  // 商品分類
  const route = useRoute()
  const num = ref(10) // 一頁顯示的商品數量
  const productsCategory = computed(() => {
    let filterProducts = []
    const productList = []
    if (route.params.category === 'all') {
      filterProducts = allDatas.value
    } else if (route.params.category === 'sale') {
      filterProducts = allDatas.value.filter((item) => {
        return item.price !== item.origin_price
      })
    } else {
      filterProducts = allDatas.value.filter((item) => {
        return item.category.includes(route.params.category)
      })
    }
    for (let i = 0; i < filterProducts.length; i += num.value) {
      const pageData = filterProducts.slice(i, i + num.value)
      productList.push(pageData)
    }
    return productList
  })

  return {
    // eslint-disable-next-line object-property-newline
    isLoading, allDatas, viewedList, recommend,
    // eslint-disable-next-line object-property-newline
    areasData, productsCategory,
    // eslint-disable-next-line object-property-newline
    getAllDatas, getViewed, randomList
  }
})

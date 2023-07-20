import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useProductsStore } from './productsStore'
export const useFavoriteStore = defineStore('favoriteStore', () => {
  // 從productsStore取得所有產品
  const productsStore = useProductsStore()
  const { allDatas } = storeToRefs(productsStore)

  const isLoading = ref(false)
  const favoriteStatus = ref(false)
  const favoriteList = ref([])
  const favoriteIdList = ref([])

  // 獲取收藏清單
  const getFavorite = () => {
    // 獲取 localStorage 的 favorite id
    favoriteIdList.value = JSON.parse(localStorage.getItem('favorite')) || []
    // 從 allDatas 篩選出 favorite id
    favoriteList.value = allDatas.value.filter((item) => {
      // return storeFavorite.includes(item.id)
      return favoriteIdList.value.includes(item.id)
    })
  }

  // toggle收藏
  const toggleFavorite = (id) => {
    const favoriteList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : []
    if (favoriteList.includes(id)) {
      const idIndex = favoriteList.indexOf(id)
      favoriteList.splice(idIndex, 1)
    } else {
      favoriteList.unshift(id)
    }
    const str = JSON.stringify(favoriteList)
    localStorage.setItem('favorite', str)
    getFavorite()
  }

  // 顯示收藏數量
  const favoriteNum = computed(() => {
    return favoriteList.value.length
  })

  return {
    // eslint-disable-next-line object-property-newline
    isLoading, favoriteStatus, favoriteList, favoriteIdList,
    favoriteNum,
    // eslint-disable-next-line object-property-newline
    getFavorite, toggleFavorite
  }
})

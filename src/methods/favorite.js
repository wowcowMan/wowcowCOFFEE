export default {
  toggleFavorite(id) {
    const favoriteList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : []
    if (favoriteList.includes(id)) {
      const idIndex = favoriteList.indexOf(id)
      favoriteList.splice(idIndex, 1)
    } else {
      favoriteList.unshift(id)
    }
    const str = JSON.stringify(favoriteList)
    localStorage.setItem('favorite', str)
  },
  storeFavorite() {
    return JSON.parse(localStorage.getItem('favorite')) || []
  }
}

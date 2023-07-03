<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link border-0" href="#" aria-label="Previous" @click.prevent="prevNext(-1)" :class="{ 'd-none': Number(this.$route.query.page) === 1 }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages" :key="page"
      :class="{ 'active': page ===  Number(this.$route.query.page) }">
        <a class="page-link border-0" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link border-0" href="#" aria-label="Next" @click.prevent="prevNext(1)" :class="{ 'd-none': Number(this.$route.query.page) === pages }">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages', 'current_page'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page)
    },
    prevNext(page) {
      this.$emit('emit-prevnext', page)
    }
  }
}
</script>

<style scoped lang="scss">
  .pagination{
    a{
      color: #000;
    }
    li.active{
      a{
        border-color: #000;
        background: #000;
        color: #fff;
      }
    }
  }
</style>

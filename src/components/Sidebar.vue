<template>
  <div class="sidebar">
    <ul class="list-group">
      <li class="list-group-item p-3"><a href="#">首頁</a></li>
      <li class="list-group-item p-3">
        <router-link to="/user/productlist/all?page=1">所有商品</router-link>
      </li>
      <li class="list-group-item p-3">
        <a class="dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false"
          aria-controls="collapseExample1">焙度</a>
        <div class="collapse" id="collapseExample1">
          <div class="card card-body p-0 pt-3">
            <ul class="list-group">
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/淺焙?page=1">淺焙</router-link></li>
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/中焙?page=1">中焙</router-link></li>
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/深焙?page=1">深焙</router-link></li>
            </ul>
          </div>
        </div>
      </li>
      <li class="list-group-item p-3">
        <a class="dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false"
          aria-controls="collapseExample2">產區</a>
        <div class="collapse" id="collapseExample2">
          <div class="card card-body p-0 pt-3">
            <ul class="list-group">
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/非洲?page=1">非洲</router-link></li>
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/中南美洲?page=1">中南美洲</router-link></li>
              <li class="list-group-item px-2 py-3"><router-link to="/user/productlist/亞洲?page=1">亞洲</router-link></li>
            </ul>
          </div>
        </div>
      </li>
      <li class="list-group-item p-3"><router-link to="/user/productlist/配方豆?page=1">配方豆</router-link></li>
      <li class="list-group-item p-3"><router-link to="/user/productlist/sale?page=1">特價專區</router-link></li>
      <li class="list-group-item p-3 mb-3"><router-link to="/user/productlist/選物?page=1">哇靠選物</router-link></li>
      <li class="list-group-item p-3"><router-link to="/policy">相關政策</router-link></li>
      <li class="list-group-item p-3"><router-link to="/contact">聯絡我們</router-link></li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Collapse from 'bootstrap/js/dist/collapse'
const collapseList = []
onMounted(() => {
  const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
  collapseList.value = collapseElementList.map(function(collapseEl) {
    return new Collapse(collapseEl, {
      toggle: false
    })
  })
})

</script>

<style scoped lang="scss">
*{
  background: none;
  a{
    text-decoration: none;
  }
}
.sidebar{
  position: static;
  top: 1rem;
  // border: 1px solid red;
  background: #eeee;
  // width: 200px;
}
.list-group{
  background: none;
  border-radius: 0%;
  .list-group-item{
    border: none;
    a{
      font-size: 16px;
      color: black;
    }
    .card-body{
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #B7B7B7;
    }
  }
}
</style>

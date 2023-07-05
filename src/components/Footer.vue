<template>
  <div class="footer pt-3 bg-dark">
    <div class="container p-4">
      <div class="logo col-2 me-3 fs-3 fw-bolder">WowCow_Coffee</div>
      <span>你覺得好喝的咖啡就是好咖啡</span>
      <hr>
      <div class="row px-1 mb-3 justify-content-between">
        <div class="store-infos col-md-4 mt-3">
          <p>tel: 04-22123456</p>
          <p>email: wowcowcoffee@gmail.com</p>
          <p>地址: 台中市 東東路 33號</p>
        </div>

        <ul class="list-group list-group-flush col-3 px-1 pe-md-5 ps-md-1">
          <li class="list-group-item w-auto px-2 py-3">
            <a href="#">首頁</a>
          </li>
          <li class="list-group-item w-auto px-2 py-3 ">
            <router-link to="/user/productlist/all?page=1">所有商品</router-link>
          </li>
          <li class="list-group-item w-auto px-2 py-3">
            <router-link to="/policy">相關政策</router-link>
          </li>
          <li class="list-group-item w-auto px-2 py-3">
            <router-link to="/contact">聯絡我們</router-link>
          </li>
        </ul>

        <ul class="list-group col-8 col-md-4">
          <li class="list-group-item border-0 w-auto px-2 py-3">
            <a href="#"><i class="fa-brands fs-3 me-2 fa-square-facebook"></i></a>
            WowCow_Coffee
          </li>
          <li class="list-group-item border-0 w-auto px-2 py-3">
            <a href="#"><i class="fa-brands fs-3 me-2 fa-square-instagram"></i></a>
            @WowCow_Coffee
          </li>
          <li class="list-group-item border-0 w-auto px-2 py-3">
            <a href="#"><i class="fa-brands fs-3 me-2 fa-line"></i></a>
            id: WowCow_Coffee
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright text-center py-1 px-3">
      © 2023 WowCow_Coffee All Rights Reserved<br>
      本網頁僅供學習使用 無任何商業用途
    </div>
  </div>
</template>

<style scoped lang="scss">
*{
  color: #eee;
}
.footer {
  // margin-top: 150px;
}

a {
  text-decoration: none;
  &:hover{
    color: #000;
  }
}

.list-group-item{
  background: transparent;
  border-color: #eee;
}

.copyright {
  color: #eee;
  font-size: 12px;
  font-weight: 100;
  background: #171717;
}
</style>

<template>
  <Header></Header>
  <div class="container p-3">
    <div class="policy mt-3 mb-5">
      <div class="title text-center fs-3 fw-bold mb-3">運送政策</div>
      <div class="policy-body">
        <div class="policy-item">
          <p class="text-decoration-underline fs-5">運費說明</p>
          <p>依實際貨物重量計算</p>
        </div>
        <div class="policy-item">
          <p class="text-decoration-underline fs-5">配送地區</p>
          <p>台灣本島、台灣外島、中港澳地區、日本、新加坡、馬來西亞、美國、加拿大...等海外地區</p>
        </div>
        <div class="policy-item">
          <p class="text-decoration-underline fs-5">配送方式</p>
          <ul class="px-4">
            <li class="mb-2">超商取貨：正常約1-3天內收到</li>
            <li class="mb-2">白貓宅急便：正常約2-3天內收到</li>
            <li class="mb-2">飛鴿快遞：正常約3-5天（依各地距離遠近有所 不同）</li>
            <li class="mb-2">ABC國際快捷：正常約4-12天（依各地距離遠近有所不同）</li>
            <li class="mb-2">7-11跨境：正常約7-12天（若品項有購買咖啡豆，建議運送方式選擇飛鴿或ABC）</li>
          </ul>
        </div>
      </div>
    </div>
    <hr>
    <div class="policy my-5">
      <div class="title text-center fs-3 fw-bold mb-3">退換貨政策</div>
      <div class="policy-body">
        <div class="policy-item mb-5">
          <p class="text-decoration-underline fs-5">退換貨說明</p>
          <p>本店購物享有商品七天鑑賞期之權益(限未開封使用)，七天內可申請退換貨，若超過此期間視同驗收完成不得退換貨<br>為求衛生，接觸性商品僅接受瑕疵品退換貨<br>若包裝或配件有毀損、遺失，恕不受理退換貨<br>如您要退換貨，務必在期限內與我們聯繫，以免不必要的誤會與糾紛<br>器材類皆有保固一年服務(不含配件)，他人為造成毀損則不在保固範圍內</p>
        </div>
        <p class="mb-2 text-secondary">▸ 希望買賣能互信互諒，如對商品有任何想表達的意見，我們都非常樂意傾聽，並請留言給我們</p>
        <p class="mb-2 text-secondary">▸ 若商品在運送途中產生瑕疵等狀況，請收到商品後第一時間通知我們，並請將瑕疵品寄回，我們收到並確認瑕疵品後，會盡快將完整新品寄出</p>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

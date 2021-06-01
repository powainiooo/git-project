<style scoped>

</style>

<template>
<div class="container ovh">
  <div class="infos-line">
    <button class="btn">喜茶·深圳宝安大仟里店</button>
    <button class="btn-circle"><img src="@/assets/img/home.png" class="w28" /></button>
  </div>
  <div class="container2 container3 ovh order-detail" style="padding-top: 0;">
    <div class="header between">
      <div>
        <div class="f54 DinB" style="line-height: 27px;">4201</div>
        <div class="f20 c-9e">2021/04/01 13:10:30</div>
      </div>
      <div class="flex">
        <button class="btn btn-style4 mr20">退款</button>
        <button class="btn btn-style1">13728392919</button>
      </div>
    </div>
    <div class="status-frame">
      <div class="tc mt100">
        <button class="btn btn-style1">通知取餐</button>
      </div>
      <div class="mt60" v-if="false">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="order-num">0016659884321</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="@/assets/img/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="@/assets/img/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="borderB mb30 hr" style="margin-top: -20px; height: 1px;"></div>
      <div class="ml10 mr10">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">自带杯子，冰块单独打包。</div>
      </div>
      <div class="borderB mb10 hr mt30"></div>
      <div class="price tr mr10"><span>45</span>元</div>
      <div class="f20 c-c9 mr10 tr">共3件</div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

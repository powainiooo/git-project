<style scoped>

</style>

<template>
<div class="order-item">
  <div class="order-item-box">
    <div class="header between">
      <div class="title">门店自提</div>
<!--      <button class="btn-circle btn-style1 mr30"><img src="/static/images/icon-guide.png" mode="widthFix" class="w26" /></button>-->
      <button class="btn mr30 btn-style3">待发货</button>
    </div>

    <div class="body between">
      <div class="l">
        <h3 class="f24">喜茶·深圳大仟里店</h3>
        <p class="f20 c-9e">2021/04/01 13:10:30</p>
        <div class="flex mt20">
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        </div>
      </div>
      <div class="r">
        <div class="price"><span>45</span>元</div>
        <p class="tr f20 c-c9">共3件</p>
      </div>
    </div>

    <div class="footer between">
      <ul class="steps">
        <li class="active">
          <p>已下单</p>
          <img src="/static/images/order/icon1.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon1-active.png" mode="aspectFit" class="img2" />
        </li>
        <li>
          <p>制作中</p>
          <img src="/static/images/order/icon2.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon2-active.png" mode="aspectFit" class="img2" />
        </li>
        <li>
          <p>待取餐</p>
          <img src="/static/images/order/icon3.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon3-active.png" mode="aspectFit" class="img2" />
        </li>
      </ul>
      <div class="r">
        <p>制作时间</p>
        <div>05:52</div>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>

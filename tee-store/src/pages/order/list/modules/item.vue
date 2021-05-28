<style scoped>

</style>

<template>
<div class="order-item">
  <div class="order-item-box">
    <div class="header between">
      <div class="logos acenter">
        <img src="/static/images/logo@2x.png" mode="widthFix" class="logo1" />
        <img src="/static/images/x.png" mode="widthFix" class="x" />
        <img src="/static/images/logo2.png" mode="heightFix" class="logo2" />
      </div>
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

<style scoped>
.coupon-item { display: flex; height: 200px; }
.coupon-item-l { width: 534px; height: 100%; position: relative; padding: 0 34px; }
.coupon-item-l .bg { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1; }
.coupon-item-r { width: 166px; height: 100%; position: relative; }
.coupon-item-r .bg { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1; }
.coupon-item-l .line1 { padding: 10px 0 12px 0; align-items: baseline; }
.coupon-item-l .line1 .price { color: #F0916C; font-size: 20px; }
.coupon-item-l .line1 .price span { font-size: 54px; }
.coupon-item-l .line1 p { font-size: 24px; margin-left: 6px; }
.coupon-item-l .line2 { margin-top: 15px; position: relative; }
.coupon-item-l .line2 p { font-size: 20px; line-height: 30px; color: #C9C9C9; }
.coupon-item-r .center { width: 100%; height: 100%; font-size: 24px; color: #FFFFFF; }
.coupon-item2 .coupon-item-r .bg { display: none; }
.coupon-item2 .coupon-item-r .center { color: #B9BABB; }
</style>

<template>
<div class="coupon-item">
  <div class="coupon-item-l">
    <img src="/static/images/mask1.png" mode="widthFix" class="bg" />
    <div class="borderB line1 flex">
      <div class="price"><span>5</span>元</div>
      <p> · 代金券</p>
    </div>
    <div class="line2">
      <p>仅可用于周边商品，满200元可用。</p>
      <p>有效期： 2021/04/01 - 2021/05/01</p>
    </div>
  </div>
  <div class="coupon-item-r">
    <img src="/static/images/mask2.png" mode="widthFix" class="bg" />
    <div class="center">立即使用</div>
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

<style scoped>
.footer { width: 100%;
  height: 100px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  box-shadow: 0px 0px 8px 0px rgba(42, 72, 124, 0.19);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.footer a {
  display: block;
  text-align: center;
  font-size: 20px;
}
.footer a img { width: 42px; height: 42px; }
.footer a .img2 { display: none; }
.footer a.active { color: #436CB3; }
.footer a.active .img1 { display: none }
.footer a.active .img2 { display: block; }
</style>

<template>
<div class="footer around">
  <a href="/pages/index/main" open-type="redirect" :class="{'active': current === 1}">
    <img src="/static/images/footer/icon1.png" mode="aspectFill" class="img1" />
    <img src="/static/images/footer/icon1-active.png" mode="aspectFill" class="img2" />
    <div>首页</div>
  </a>
  <a href="/pages/class/main" open-type="redirect" :class="{'active': current === 2}">
    <img src="/static/images/footer/icon2.png" mode="aspectFill" class="img1" />
    <img src="/static/images/footer/icon2-active.png" mode="aspectFill" class="img2" />
    <div>分类</div>
  </a>
  <a href="/pages/mine/main" open-type="redirect" :class="{'active': current === 3}">
    <img src="/static/images/footer/icon3.png" mode="aspectFill" class="img1" />
    <img src="/static/images/footer/icon3-active.png" mode="aspectFill" class="img2" />
    <div>我的</div>
  </a>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  current: {
	    type: Number,
      default: 1
    }
  },
	data() {
		return {}
	},
	methods: {}
}
</script>

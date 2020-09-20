<style scoped>
.c-footer-nav { width: 100%; height: 128px; background-color: #ffffff; box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.15); position: fixed; left: 0; bottom: 0; z-index: 1000; display: flex; justify-content: space-around; align-items: center;}
.c-footer-nav>a { display: flex; flex-direction: column; justify-content: center; align-items: center;}
.c-footer-nav-img { width: 46px; height: 48px;}
.c-footer-nav-name { font-size: 26px; color: #666666; font-weight: bold;}
</style>

<template>
<div class="c-footer-nav">
   <a href="#" v-for="(item, index) in list" :key="index">
      <img :src="item.src + (active === item.key ? '-active' : '') + '.png'" mode="aspectFit" class="c-footer-nav-img"/>
      <h3 class="c-footer-nav-name">{{item.name}}</h3>
   </a>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
   props: {
	   active: {
	      type: String,
         default: 'home'
      }
   },
	data() {
		return {
		   list: [
            { name: '首页', src: '/static/images/footer/icon1', key: 'home' },
            { name: '精选商品', src: '/static/images/footer/icon2', key: 'goods' },
            { name: '购物车', src: '/static/images/footer/icon3', key: 'cart' },
            { name: '个人中心', src: '/static/images/footer/icon4', key: 'personal' },
         ]
      }
	},
	methods: {}
}
</script>

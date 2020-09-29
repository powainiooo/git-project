<style scoped>
.c-footer-nav { width: 100%; height: 128px; background-color: #ffffff; box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.15); position: fixed; left: 0; bottom: 0; z-index: 1000; display: flex; justify-content: space-around; align-items: center;}
.c-footer-nav>a { display: flex; flex-direction: column; justify-content: center; align-items: center;}
.c-footer-nav-img { width: 46px; height: 48px;}
.c-footer-nav-name { font-size: 26px; color: #666666; font-weight: bold;}
.c-footer-nav-name.active { color: #3A3A3A;}
</style>

<template>
<div class="c-footer-nav">
   <a :href="item.url" open-type="redirect" v-for="(item, index) in list" :key="index">
      <img :src="item.src + (active === item.key ? '-active' : '') + '.png'" mode="aspectFit" class="c-footer-nav-img"/>
      <h3 class="c-footer-nav-name" :class="{'active': active === item.key}">{{item.name}}</h3>
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
            { name: '首页', src: '/static/images/footer/icon1', key: 'home', url: '/pages/index/main' },
            { name: '精选商品', src: '/static/images/footer/icon2', key: 'goods', url: '/pages/goods/main' },
            { name: '购物车', src: '/static/images/footer/icon3', key: 'cart', url: '/pages/shoppingCart/main' },
            { name: '个人中心', src: '/static/images/footer/icon4', key: 'personal', url: '/pages/personal/main' },
         ]
      }
	},
	methods: {}
}
</script>

<style scoped>
.c-search { margin-left: 30px; }
.c-search-bar { width: 620px; height: 60px; border-radius: 30px; background-color: #F4F4F4; }
.c-search-icon { width: 28px; margin-left: 20px; margin-right: 15px; }
.c-search-bar input { width: 430px; height: 60px; line-height: 60px; font-size: 26px; margin-right: 40px; }
.c-search-bar button { border: none; background-color: transparent; width: 28px; height: 40px; line-height: 40px; }
.c-search-bar button img { width: 100%; }
.c-search-btn { font-size: 28px; color: #000000; background-color: transparent; }
</style>

<template>
<div class="c-search acenter">
  <div class="c-search-bar acenter">
    <img src="/static/images/sousuo2.png" mode="widthFix" class="c-search-icon" />
    <input placeholder="工具名称" />
    <button><img src="/static/images/yuyin.png" mode="widthFix" /></button>
  </div>
  <button class="c-search-btn">搜索</button>
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

<style scoped>
.c-operates { width: 100%; height: 98px; background: #FFFFFF; border: 1px solid #E5E5E5; box-shadow: 0px 0px 8px 0px rgba(42, 72, 124, 0.19); position: fixed; bottom: 0; left: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-around; }
.c-operates .item { text-align: center; }
.c-operates .item img { width: 42px; height: 42px; display: block; margin-bottom: 2px; margin-left: auto; margin-right: auto; }
.c-operates .item span { font-size: 20px; line-height: 20px; }
.c-operates .item:first-child span { color: #F03C12; }
.c-operates .item:nth-child(2) span { color: #FFA200; }
.c-operates .item:nth-child(3) span { color: #FF005A; }
.c-operates .item:nth-child(4) span { color: #0096FF; }
</style>

<template>
<div class="c-operates">
  <div class="item">
    <img src="/static/images/footer/icon4.png" mode="aspectFit" />
    <span>点赞(1234)</span>
  </div>
  <div class="item">
    <img src="/static/images/footer/icon5.png" mode="aspectFit" />
    <span>收藏(1234)</span>
  </div>
  <div class="item">
    <img src="/static/images/footer/icon6.png" mode="aspectFit" />
    <span>建议(14)</span>
  </div>
  <div class="item">
    <img src="/static/images/footer/icon7.png" mode="aspectFit" />
    <span>打赏(999)</span>
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

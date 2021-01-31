<style>
.c-goods-detail { width: 100%; height: 100vh; overflow-y: auto; position: fixed; top: 0; left: 0; z-index: 2000; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-goods-detail-infos { width: 100%; min-height: calc(100vh - 200px); background-color: rgba(255, 255, 255, .97); padding: 68px 48px 40px 68px; box-sizing: border-box; }
.c-goods-detail-infos h3 { color: var(--textColor2); text-shadow: var(--textShadow); font-size: 46px; line-height: 68px; margin-bottom: 62px; }
.c-goods-detail-infos h3.en { line-height: 56px; margin-bottom: 0; }
.c-goods-detail-infos div { color: var(--textColor); text-shadow: var(--textShadow); font-size: 30px; line-height: 46px; }
.c-goods-detail-infos p { color: var(--textColor); text-shadow: var(--textShadow); font-size: 22px; line-height: 32px; margin-bottom: 40px; }
.c-goods-detail-infos img { width: 265px; display: block; }

.c-goods-detail-logo { width: 100%; height: 200px; background-color: rgba(232, 230, 228, 0.97); display: flex; align-items: center; }
.c-goods-detail-logo img { width: 78px; margin-left: 68px; }

.c-goods-detail .close { width: 56px; height: 56px; position: absolute; top: 68px; right: 66px; }
</style>

<template>
<div class="c-goods-detail" :style="{top: showGoodsDetail ? 0 : '100vh'}">
   <div class="c-goods-detail-infos">
      <h3 class="en">Ziwipeak® </h3>
      <h3>滋益巅峰® </h3>
      <div>种类 / 规格：</div>
      <p>鸡肉味、400g</p>
      <div>适用对象：</div>
      <p>全猫</p>
      <div>营养成分：</div>
      <p>粗蛋白≥36%   粗脂肪≤35%   粗纤维≥2%   水分≤14%   粗灰分≤8%</p>
      <div>主要成分：</div>
      <p>鸡肉、鸡内脏（鸡肝、鸡心）、鸡骨、新西兰青口贝、菊粉、
         矿物质、干海带、海盐、欧芹、维生素（维生素E补充剂、维生素B1
         补充剂、维生素D3补充剂、叶酸）</p>
      <img src="/static/images/img2.png" mode="widthFix" />
   </div>
   <div class="c-goods-detail-logo">
      <img src="/static/images/header/logo@2x.png" mode="widthFix" />
   </div>
   <img src="/static/images/header/close2.png" class="close" @click="closeDetail" />
</div>
</template>

<script type='es6'>
import store from "../store"
export default {
	name: 'app',
	data() {
		return {}
	},
   computed: {
      showGoodsDetail () {
         return store.state.showGoodsDetail
      }
   },
   watch: {
      showGoodsDetail (val) {
         console.log('showGoodsDetail')
      }
   },
	methods: {
      closeDetail () {
         store.commit('SET_GOODSDETAILSTATUS', false)
      }
   }
}
</script>

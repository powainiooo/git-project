<style>
.c-goods-detail { width: 100%; height: 100vh; overflow-y: auto; position: fixed; top: 0; left: 0; z-index: 2000; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-goods-detail-infos { width: 100%; min-height: calc(100vh - 200px); background-color: rgba(255, 255, 255, .97); padding: 68px 48px 40px 68px; box-sizing: border-box; }
.c-goods-detail-infos h3 { color: var(--textColor2); text-shadow: var(--textShadow); font-size: 46px; line-height: 68px; margin-bottom: 62px; margin-right: 90px; }
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
      <h3 class="en">{{detailData.english_name}} </h3>
      <h3>{{detailData.china_name}} </h3>
      <div>种类 / 规格：</div>
      <p>{{detailData.attr_name}}、{{detailData.specs}}</p>
      <div v-if="detailData.apply !== ''">适用对象：</div>
      <p v-if="detailData.apply !== ''"><text>{{detailData.apply}}</text></p>
      <div v-if="detailData.nutritional !== ''">营养成分：</div>
      <p v-if="detailData.nutritional !== ''"><text>{{detailData.nutritional}}</text></p>
      <div v-if="detailData.mainly !== ''">主要成分：</div>
      <p v-if="detailData.mainly !== ''"><text>{{detailData.mainly}}</text></p>
      <img :src="detailData.product_img" mode="widthFix" />
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
      },
      detailData () {
         return store.state.goodsDetail
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

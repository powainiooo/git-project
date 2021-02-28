<style>
.c-order-item { overflow: hidden; padding-top: 20px; position: relative; }
.c-order-item-frame { width: 660px; margin: 0 auto; padding: 0 46px 16px 46px; box-sizing: border-box; background-color: #ffffff; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); border-radius: 15px 15px 0 0; position: relative; overflow: hidden; }
.c-order-item-frame .date { height: 110px; display: flex; align-items: center; font-size: 66px; color: var(--textColor2); text-shadow: var(--textShadow); font-family: HelveThin; margin-bottom: 16px; }
.c-order-item-frame h3 { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow); line-height: 45px; }
.c-order-item-frame h3.en { font-size: 34px; line-height: 40px; margin-bottom: 8px; font-family: HelveThin; }
.c-order-item-frame .nums { font-size: 22px; color: var(--mainColor); line-height: 32px; position: absolute; top: 22px; right: 202px; }
.c-order-item-frame .status { width: 110px; height: 220px; background-color: var(--mainColor); border-radius: 0 0 0 110px; position: absolute; top: -110px; right: 0; box-sizing: border-box; font-size: 20px; color: #ffffff; text-shadow: var(--textShadow); padding-top: 140px; padding-left: 34px; }
.c-order-item .shadow { width: 100%; height: 40px; position: absolute; left: 0; bottom: 0; }
</style>

<template>
<div class="c-order-item">
   <div class="c-order-item-frame" @click="toPage"
        hover-class="hscale"
        hover-stay-time="10">
      <div class="date borderB">{{date}}</div>
      <h3 class="en">{{itemData.english_name}}</h3>
      <h3>{{itemData.title}}</h3>
      <text class="nums">共\n{{itemData.nums}}件</text>
      <div class="status" v-if="itemData.status === '7'">已完成</div>
   </div>
   <img src="/static/images/order/shadow.png" class="shadow" />
</div>
</template>

<script type='es6'>
import { formatDate } from '@/utils'

export default {
	name: 'app',
   props: {
      itemData: Object,
      type: String
   },
   computed: {
	   date () {
	      return formatDate(new Date(this.itemData.order_time * 1000), 'yyyy/MM/dd')
      }
   },
	data() {
		return {}
	},
	methods: {
      toPage () {
         mpvue.navigateTo({
            url: `/pages/order/detail/main?orderNum=${this.itemData.order_num}&source=${this.type}`
         })
      }
   }
}
</script>

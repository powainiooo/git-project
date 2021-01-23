<style>
.c-coupon-item { position: relative;}
.c-coupon-item .bg { width: 690px; height: 200px;}
.c-coupon-item .infos { width: 100%; height: 100%; display: flex; position: absolute; top: 0; left: 0;}
.c-coupon-item .infos .left { width: 220px; height: 200px; display: flex; justify-content: center; align-items: center;}
.c-coupon-item .infos .left h3 { font-size: 86px; color: #ffffff; text-align: center; line-height: 1;}
.c-coupon-item .infos .left h3 span { font-size: 32px;}
.c-coupon-item .infos .right { width: 470px; height: 200px; display: flex; align-items: center;}
.c-coupon-item .infos .right div { margin-left: 40px;}
.c-coupon-item .infos .right div p { font-size: 28px; color: #333333; line-height: 1; margin-bottom: 15px; position: relative;}
.c-coupon-item .infos .right div p:before { content: '.'; color: #333333; position: absolute; top: -25%; left: -15px;}
.c-coupon-item .infos .right div p:first-child { margin-bottom: 28px;}
.c-coupon-item .infos .right div div { font-size: 28px; color: #333333; line-height: 1; margin-left: 0;}
.c-coupon-item .infos .right .btn-round { width: 136px; height: 60px; font-size: 28px; padding: 0;}
.c-coupon-item .infos .right .btn-round-disable { background-color: #CCCCCC; color: #666666;}
</style>

<template>
<div class="c-coupon-item">
   <img src="/static/images/coupon/youhuiquan@2x.png" class="bg" mode="widthFix" v-if="type === '1'"/>
   <img src="/static/images/coupon/youhuiquan-hui@2x.png" class="bg" mode="widthFix" v-else/>
   <div class="infos">
      <div class="left">
         <h3>{{itemData.percentStr}}<span>折</span></h3>
      </div>
      <div class="right">
         <div>
            <p>满{{itemData.conditionStr}}元可用</p>
            <p>有效期至：</p>
            <div>{{itemData.endTime}}</div>
         </div>
         <button class="btn-round" v-if="type === '1'" @click="doUse">去使用</button>
         <button class="btn-round btn-round-disable" v-else-if="type === '2'">已使用</button>
         <button class="btn-round btn-round-disable" v-else-if="type === '3'">已过期</button>
         <button class="btn-round btn-round-disable" v-else-if="type === '4'" @click="doUse">去使用</button>
      </div>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      itemData: {
         type: Object,
         default: () => {}
      },
      type: {
         type: String,
         default: '1'
      }
   },
   data () {
      return {
      }
   },
   methods: {
      doUse () {
         this.$emit('handleUse', this.itemData)
      }
   }
}
</script>

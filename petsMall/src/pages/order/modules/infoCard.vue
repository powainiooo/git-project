<style>
.c-info-card { margin: 42px 28px 32px 28px; padding: 30px 40px 40px 40px; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); border-radius: 15px; background-color: #ffffff; }
.c-info-card h3 { font-size: 22px; color: #A6A5A5; line-height: 1; margin-bottom: 20px; }
.c-info-card-items { margin-bottom: 40px; display: flex; }
.c-info-card-items li { flex: 1; font-size: 36px; line-height: 42px; padding-bottom: 12px; padding-left: 6px; color: var(--textColor2); text-shadow: var(--textShadow); position: relative; }
.c-info-card-items li:before, .c-info-card-items li:after { content: ''; width: 10px; height: 10px; background-color: #D1CECE; border-radius: 50%; position: absolute; bottom: -5px;}
.c-info-card-items li:before { left: -5px; }
.c-info-card-items li:after { right: -5px; }
.c-info-card-items li:last-child:before { width: 0; height: 0;}
.c-info-card .btn-round { width: 138px; margin: 0 auto 40px auto; }
</style>

<template>
<div class="c-info-card">
   <h3>个人信息</h3>
   <ul class="c-info-card-items borderB">
      <li>{{itemData.name}}</li>
      <li>{{itemData.mobile}}</li>
   </ul>
   <h3>收件地址</h3>
   <ul class="c-info-card-items borderB">
      <li>{{itemData.province}}{{itemData.city}}{{itemData.area}}{{itemData.address}}</li>
   </ul>
   <template v-if="itemData.day">
   <h3>配送日期</h3>
   <ul class="c-info-card-items borderB">
      <li>每月{{itemData.day}}号</li>
   </ul>
   </template>
   <template v-if="itemData.orderTime">
   <h3>下单日期</h3>
   <ul class="c-info-card-items borderB">
      <li>{{itemData.orderTime}}</li>
   </ul>
   </template>
   <template v-if="itemData.orderNum">
   <h3>订单编号</h3>
   <ul class="c-info-card-items borderB">
      <li>{{itemData.orderNum}}</li>
   </ul>
   </template>
   <div v-if="edit">
      <button class="btn-round">编辑地址</button>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      edit: {
         type: Boolean,
         default: false
      },
      itemData: Object
   },
   data () {
      return {}
   },
   methods: {}
}
</script>

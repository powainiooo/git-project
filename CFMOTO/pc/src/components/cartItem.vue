<style scoped>
.z-cart-item { width: 700px; height: 150px; border: 1px solid #ffd400; display: flex; align-items: center; position: relative;}
.z-cart-item .img { width: 150px; height: 130px; border-right: 1px solid #ffd400;}
.z-cart-item .img img { width: 100%; display: block;}
.z-cart-item .line2 { margin-left: 20px;}
.z-cart-item .line2 h3 { font-size: 24px; color: #ffffff; font-family: TTHBold; margin-bottom: 10px;}
.z-cart-item .nums { width: 100px; height: 32px; border: 1px solid #ffd400; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; color: #ffffff; padding: 0 8px; margin-top: 6px;}
.z-cart-item .price { font-size: 16px; color: #ffd400; font-family: TTHBold; margin-left: 60px;}
.z-cart-item .price span { font-size: 36px; font-family: TTHBold; margin-left: 10px;}
.z-cart-item .btn-close { width: 60px; height: 60px; position: absolute; right: -60px; top: -1px; color: #ffffff; font-size: 60px;}
.z-cart-item .btn-add { position: absolute; right: -150px; bottom: -1px;}
</style>

<template>
   <div class="z-cart-item">
      <div class="img"><img src="@/assets/images/index/img7.jpg"/></div>
      <div class="line2">
         <h3>ZEEHO</h3>
         <Select class="z-select" style="width:120px;">
            <Option value="1">Basic</Option>
         </Select>
      </div>
      <div style="width: 100px; height: 32px; margin-left: 90px;">
         <div class="nums" v-if="type === 'cart'">
            <Icon type="md-remove" />
            <span>1</span>
            <Icon type="md-add" />
         </div>
      </div>
      <div class="price">RMB<span>6,999</span></div>
      <a href="javascript:;" class="btn2 btn-close" v-if="type === 'wish'"><Icon type="ios-close" /></a>
      <a href="javascript:;" class="btn1 btn-add" v-if="type === 'wish'">Add to Cart</a>
   </div>
</template>

<script type="es6">
   export default {
      name: 'App',
      props: ['type'],
      data() {
         return {}
      }
   }
</script>


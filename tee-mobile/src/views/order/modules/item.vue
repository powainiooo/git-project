<style scoped>
.order-item { padding: 30px 32px 0 32px; position: relative; }
.order-item .sd { width: 100%; position: absolute; left: 0; bottom: 0; }
.order-box { background-color: #F9F9F9; box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.1); border-radius: 35px 35px 0px 0px; overflow: hidden; }
.order-box .header { height: 94px; padding: 0 34px; background-color: #EDECEB; margin-bottom: 20px; }
.order-box .header .nums { font-size: 54px; font-family: DinB; }
.order-box .body { margin: 0 34px; }
.order-box .body .line1 { padding-bottom: 16px; margin-bottom: 18px; }
.order-box .body .line1 h3 { font-size: 24px; font-weight: normal; line-height: 24px; margin-bottom: 6px; }
.order-box .body .line1 p { font-size: 20px; color: #C9C9C9; line-height: 26px; }
.order-box .footer { height: 110px; background-color: #ffffff; }
.order-box .footer .time { transform: scale(.8) }
</style>

<template>
<div class="order-item">
  <div class="order-box">
    <div class="header between">
      <span class="nums">1233</span>
      <div class="acenter">
        <button class="btn btn-style4 mr20">退款</button>
        <button class="btn btn-style1">13728392919</button>
      </div>
    </div>
    <div class="body">
      <div class="line1 borderB between">
        <div>
          <h3>柠檬茶</h3>
          <p>冰、去冰、正常糖</p>
        </div>
        <div class="f24">×1</div>
      </div>
      <div class="line1 borderB between">
        <div>
          <h3>柠檬茶</h3>
          <p>冰、去冰、正常糖</p>
        </div>
        <div class="f24">×1</div>
      </div>
      <div class="line1 borderB">
        <h3 class="c-main">备注</h3>
        <p>冰、自带杯子，冰块单独打包、正常糖</p>
      </div>
      <div class="line1">
        <h3 class="c-main">需提前打包</h3>
      </div>
    </div>
    <div class="footer center borderT">
      <button class="btn btn-style1" v-if="false">开始制作</button>
      <template v-if="false">
      <button class="btn btn-style4 mr30">开始制作</button>
      <button class="btn btn-style1 mr30">通知取餐</button>
      <button class="btn btn-style1">完成订单</button>
      </template>
      <div class="time">
        <timer size="small" />
      </div>
    </div>
  </div>
  <img src="@/assets/img/sd1.png" class="sd" />
</div>
</template>

<script type='es6'>
import timer from '@/components/timer'
export default {
  name: 'app',
  components: {
    timer
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

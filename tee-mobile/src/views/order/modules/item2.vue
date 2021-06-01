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
.order-box .body .c-goods-item { padding-bottom: 16px; }
.order-box .body .c-goods-item .imgs { width: 68px; height: 68px; border-radius: 15px; }
.order-box .body .c-goods-item .infos .title { margin-top: 20px; }
.order-box .body .c-goods-item .infos .intro { height: auto; min-height: auto; }
.order-box .body .c-goods-item .infos .nums2 { top: 20px; font-size: 24px; }
.order-box .footer { height: 110px; background-color: #ffffff; }
.order-box .footer .time { transform: scale(.8) }
</style>

<template>
<div class="order-item">
  <div class="order-box">
    <div class="header between">
      <span class="nums">1232</span>
      <div class="acenter">
        <button class="btn btn-style4 mr20">退款</button>
        <button class="btn btn-style1">13728392919</button>
      </div>
    </div>
    <div class="body">
      <div class="c-goods-item borderB mb20">
        <div class="imgs"><img src="@/assets/img/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="c-goods-item borderB mb20">
        <div class="imgs"><img src="@/assets/img/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="line1">
        <h3 class="c-main">备注</h3>
        <p>冰、自带杯子，冰块单独打包、正常糖</p>
      </div>
    </div>
    <div class="footer center borderT">
      <button class="btn btn-style1">确认提货</button>
    </div>
  </div>
  <img src="@/assets/img/sd1.png" class="sd" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

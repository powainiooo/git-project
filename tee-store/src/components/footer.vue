<style scoped>
.c-footer { width: 100%; height: 146px; background-color: #F2F0ED; box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2); position: fixed; left: 0; bottom: 0; z-index: 500; display: flex; justify-content: space-between; padding: 0 46px; }
.c-footer a { width: 100%; display: flex; flex-direction: column; align-items: center; -webkit-tap-highlight-color: transparent; }
.c-footer a:hover { background-color: transparent; -webkit-tap-highlight-color: transparent; }
.c-footer a:active { background-color: transparent; -webkit-tap-highlight-color: transparent; }
.c-footer a .icon { width: 100%; height: 60px; display: flex; justify-content: center; align-items: flex-end; margin-bottom: 10px; }
.c-footer a .icon .img1 { display: block; }
.c-footer a .icon .img2 { display: none; }
.c-footer a .icon1 img { width: 32px; }
.c-footer a .icon2 img { width: 44px; }
.c-footer a .icon3 img { width: 32px; }
.c-footer a p { font-size: 24px; color: #CECBC6; text-align: center; }
.c-footer a.active .icon .img1 { display: none; }
.c-footer a.active .icon .img2 { display: block; }
.c-footer a.active p { color: #41372D; }
.c-footer .arrow { width: 100px; position: absolute; top: 0; left: 50%; transform: translate(-49%, -90%); z-index: 10; }
</style>

<template>
<div class="c-footer">
  <a href="#" open-type="redirectTo" :class="{'active': current === 'order'}" @click="toStore">
    <div class="icon icon1">
      <img src="/static/images/footer/icon1.png" mode="widthFix" class="img1" />
      <img src="/static/images/footer/icon1-active.png" mode="widthFix" class="img2" />
    </div>
    <p>点餐</p>
  </a>
  <a href="/pages/nearby/list/main" open-type="redirectTo" :class="{'active': current === 'store'}">
    <div class="icon icon2">
      <img src="/static/images/footer/icon2.png" mode="widthFix" class="img1" />
      <img src="/static/images/footer/icon2-active.png" mode="widthFix" class="img2" />
    </div>
    <p>周边商城</p>
  </a>
  <a href="/pages/order/list/main" open-type="redirectTo" :class="{'active': current === 'list'}">
    <div class="icon icon1">
      <img src="/static/images/footer/icon3.png" mode="widthFix" class="img1" />
      <img src="/static/images/footer/icon3-active.png" mode="widthFix" class="img2" />
    </div>
    <p>订单</p>
  </a>
  <img src="/static/images/footer/arrow.png" mode="widthFix" class="arrow" />
</div>
</template>

<script type='es6'>
import store from '../store'
export default {
  name: 'app',
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  computed: {
    storeInfo () {
      return store.state.storeInfo
    }
  },
  data () {
    return {}
  },
  methods: {
    toStore () {
      if (this.storeInfo.shop_id) {
        mpvue.redirectTo({
          url: '/pages/goods/main?id=' + this.storeInfo.shop_id
        })
      } else {
        mpvue.redirectTo({
          url: '/pages/stores/main'
        })
      }
    }
  }
}
</script>

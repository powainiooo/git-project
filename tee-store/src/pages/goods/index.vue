<style>
.goods-container2 { height: calc(100vh - 260px); margin-top: 0; margin-left: 160px; overflow-x: hidden; overflow-y: auto; }
.goods-container2 .list { margin: 34px 32px; }
.goods-container2 .list .c-goods-item { margin-bottom: 60px; }
</style>

<template>
<div class="page">
  <c-header storeLogo="/static/images/logo2.png" />
  <div class="container" style="padding-bottom: 0;">
    <div class="addr-info">
      <div class="between">
        <button class="btn">
          <span>喜茶·深圳宝安大仟里店</span>
          <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
        </button>
        <div class="acenter">
          <button class="btn-circle btn-cart">
            <img src="/static/images/icon-cart.png" mode="widthFix" class="w32" />
            <span class="nums">10</span>
          </button>
          <button class="btn-circle ml20" open-type="share"><img src="/static/images/icon-share.png" mode="widthFix" class="w28" /></button>
        </div>
      </div>
      <div class="dis">距离你1km</div>
    </div>

    <div class="pr">
      <cates :list="list1" :current="current" />
      <div class="container2 goods-container2">
        <div class="list">
          <item />
          <item />
          <item />
          <item />
        </div>
      </div>
    </div>
  </div>
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cates from './modules/cates'
import item from './modules/item'
export default {
  components: {
    cHeader,
    cFooter,
    cates,
    item
  },
  data () {
    return {
      current: 0,
      list1: ['新品推荐', '元气奶茶系列', '柠檬茶', '水果茶', '小吃']
    }
  },

  methods: {
  },
  onShareAppMessage () {
    return {
      title: 'HEYTEA',
      path: `/pages/goods/main`
    }
  },
  created () {
  }
}
</script>

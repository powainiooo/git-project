<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh order-detail">
    <div class="header between">
      <div>
        <div class="f24">喜茶·深圳大仟里店</div>
        <div class="f20 c-9e">2021/04/01 13:10:30</div>
      </div>
      <div class="flex">
        <button class="btn-circle btn-style1 mr20"><img src="/static/images/phone.png" mode="widthFix" class="w26"></button>
        <button class="btn-circle btn-style1"><img src="/static/images/icon-guide.png" mode="widthFix" class="w26"></button>
      </div>
    </div>
    <div class="status-frame">
      <ul class="steps mt20" v-if="false">
        <li class="active">
          <p>已下单</p>
          <img src="/static/images/order/icon1.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon1-active.png" mode="aspectFit" class="img2" />
        </li>
        <li>
          <p>制作中</p>
          <img src="/static/images/order/icon2.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon2-active.png" mode="aspectFit" class="img2" />
        </li>
        <li>
          <p>待取餐</p>
          <img src="/static/images/order/icon3.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon3-active.png" mode="aspectFit" class="img2" />
        </li>
      </ul>
      <div class="mt20 auto" style="width: 400rpx;" v-if="false"><c-timer ref="timer" /></div>
      <div class="mt20" v-if="false">
        <c-codes code="3910" />
      </div>
      <div class="mt60">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="order-num">0016659884321</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="borderB mb30 hr" style="margin-top: -20rpx; height: 1px;"></div>
      <div class="ml10 mr10">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">自带杯子，冰块单独打包。</div>
      </div>
      <div class="borderB mb10 hr mt30"></div>
      <div class="price tr mr10"><span>45</span>元</div>
      <div class="f20 c-c9 mr10 tr">共3件</div>
    </div>
  </div>
  <c-footer current="list" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cTimer from '@/components/timer'
import cCodes from '@/components/codes'
export default {
  components: {
    cHeader,
    cFooter,
    cTimer,
    cCodes
  },
  data () {
    return {
      timer: ''
    }
  },

  methods: {
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

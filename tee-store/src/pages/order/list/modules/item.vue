<style scoped>

</style>

<template>
<div class="order-item">
  <div class="order-item-box" hover-class="hscale" hover-stay-time="10" @click="toDetail">
    <div class="header between">
      <div class="logos acenter">
        <img src="/static/images/logo@2x.png" mode="widthFix" class="logo1" />
        <img src="/static/images/x.png" mode="widthFix" class="x" />
        <img :src="imgSrc + record.shop.shop_logo" mode="heightFix" class="logo2" />
      </div>
    </div>

    <div class="body between">
      <div class="l">
        <h3 class="f24">{{record.shop.shop_name}}</h3>
        <p class="f20 c-9e">{{record.created_at}}</p>
        <div class="flex mt20">
          <div class="imgs mr15" v-for="good in record.goods" :key="index"><img :src="imgSrc + good.goods_cover" mode="aspectFill" /></div>
        </div>
      </div>
      <div class="r">
        <div class="price"><span>{{record.pay_amount}}</span>元</div>
        <p class="tr f20 c-c9">共{{goodsNum}}件</p>
      </div>
    </div>

    <div class="footer between" v-if="showFooter">
      <ul class="steps">
        <li :class="{'active': record.status === 2}">
          <p>已下单</p>
          <img src="/static/images/order/icon1.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon1-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': record.status === 3}">
          <p>制作中</p>
          <img src="/static/images/order/icon2.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon2-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': record.status === 4}">
          <p>待取餐</p>
          <img src="/static/images/order/icon3.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon3-active.png" mode="aspectFit" class="img2" />
        </li>
      </ul>
      <div class="r" v-if="record.status === 3">
        <p>制作时间</p>
        <div><counter :timer="record.remain_make_time" @done="refresh" /></div>
      </div>
      <div class="r" v-if="record.status === 4">
        <p>取餐码</p>
        <div>{{record.fetch_code}}</div>
      </div>
    </div>
    <div class="cover" v-if="record.status === 7"><span>已完成</span></div>
  </div>
  <img src="/static/images/sd1.png" class="sd" mode="widthFix" />
</div>
</template>

<script type='es6'>
import counter from '@/components/counter'
export default {
	name: 'app',
  components: {
    counter
  },
  props: {
	  record: Object
  },
  computed: {
    showFooter () {
      if (this.record.status === 2 || this.record.status === 3 || this.record.status === 4) {
        return true
      }
      return false
    },
    goodsNum () {
      return this.record.goods.reduce((total, i) => total + i.buy_nums, 0)
    }
  },
	data() {
		return {
		  imgSrc: mpvue.imgSrc
    }
	},
	methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/order/detail/tee/main?id=${this.record.id}`
      })
    },
    refresh () {
      console.log('倒计时完成，自动刷新')
      setTimeout(() => {
        this.$emit('refresh', this.record.id)
      }, 1000)
    }
  }
}
</script>

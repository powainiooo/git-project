<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys">
    <view class="tc mt16 mb24">优惠券领取</view>
    <view class="c-coupon-item mb16" v-for="i in list" :key="i.id">
      <view class="price">￥<text>{{i.money}}</text></view>
      <view class="content between">
        <view class="ml16">
          <view class="mb4">满{{i.money}}减{{i.money}}元</view>
          <view class="f12">领劵后{{i.money}}小时内有效</view>
        </view>
        <button class="c-btn mr8" @tap="handleGet(i.id)" v-if="i.has_nums === 0">点击领取</button>
        <button class="c-btn mr8" disabled v-if="i.has_nums === 1">已领取</button>
      </view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'app',
  props: {
    list: Array
  },
  components: {
    Popup,
  },
	data() {
		return {
      visible: false
    }
	},
	methods: {
	  show () {
	    this.visible = true
    },
    handleGet (id) {
	    this.$emit('fetch', id)
    }
  }
}
</script>

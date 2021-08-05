<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys">
    <view class="tc mb24 bold">优惠券领取</view>
    <view class="c-coupon-item mb16" v-for="i in list" :key="i.id">
      <view class="price">￥<text>{{i.money}}</text></view>
      <view class="content between">
        <view class="ml16">
          <view class="mb4 bold">{{i.title}}</view>
          <view class="f12">领劵后{{i.expire_hour}}小时内有效</view>
        </view>
        <button class="c-btn mr8" @tap="handleGet(i.id)" v-if="i.has_nums === 0">点击领取</button>
        <button class="c-btn mr8 c-btn-disabled" disabled v-if="i.has_nums === 1">已领取</button>
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

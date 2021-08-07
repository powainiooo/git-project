<style lang="stylus" type="text/stylus">
.coupon-modal
  height 83vh; padding 16px 12px 0 12px;
  .pl
    height calc(57px + constant(safe-area-inset-bottom));
    height calc(57px + env(safe-area-inset-bottom));
</style>
<template>
<Popup :show.sync="visible" round :closeable="true" @close="handleClose">
  <view class="coupon-modal">
    <view class="tc mb24 bold">优惠券详情</view>
    <view class="c-coupon-item mb16"
          :class="{'c-coupon-item-disabled': i.status === 0}"
          v-for="i in list"
          :key="i.id"
          @tap="select(i)">
      <view class="price">￥<text>{{i.money}}</text></view>
      <view class="content between">
        <view class="ml16">{{i.title}}</view>
        <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr16" v-if="i.id === selectId" />
      </view>
    </view>
    <view class="pl"></view>
    <view class="footer-container">
      <view class="wp100 ml12 mr12">
        <button class="c-btn c-btn-border" style="width: 100%;" @tap="dontUse">不使用优惠券</button>
      </view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'app',
  components: {
    Popup,
  },
  props: {
	  list: Array
  },
	data() {
		return {
      visible: false,
      selectId: ''
    }
	},
	methods: {
	  show () {
	    this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    select (i) {
	    if (i.status === 1) {
        this.selectId = i.id
        this.$emit('change', i)
        this.handleClose()
      }
    },
    dontUse () {
      this.selectId = ''
      this.$emit('change', {
        id: '',
        title: '请选择'
      })
      this.handleClose()
    }
  }
}
</script>

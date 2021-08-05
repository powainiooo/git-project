<style scoped>

</style>

<template>
<view class="Detail-section Detail-stores">
  <view class="between">
    <view class="flex mt8">
      <image :src="imgSrc + record.logo" mode="aspectFit" class="logo" />
      <view class="mt4">
        <view class="acenter">
          <text class="c-tag c-tag-yel mr4" v-if="record.type === 1">个人</text>
          <text class="c-tag c-tag-red mr4" v-if="record.type === 2">企业</text>
          <text class="bold">{{record.shop_name}}</text>
        </view>
        <rate :value="record.pf_avg" />
      </view>
    </view>
    <view class="f12 mt8">
      <view class="mb2">订单数: <text class="c-999">{{record.order_nums > 9999 ? record.order_nums + '+' : record.order_nums}}</text></view>
      <view class="mb2">关注数: <text class="c-999">{{record.attention_nums > 9999 ? record.attention_nums + '+' : record.attention_nums}}</text></view>
      <view class="mb2">访客数: <text class="c-999">{{record.visit_nums > 9999 ? record.visit_nums + '+' : record.visit_nums}}</text></view>
    </view>
  </view>
  <view class="center mb8">
    <button class="c-btn c-btn-border c-btn-24 mr8" @tap="toStore">进店逛逛</button>
    <button class="c-btn c-btn-border c-btn-24" @tap="attention" v-if="status === 0">关注店铺</button>
    <button class="c-btn c-btn-border c-btn-24" @tap="attention" v-else-if="status === 1">取消关注</button>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import Rate from '@/c/common/Rate'
export default {
	name: 'app',
  props: {
	  record: Object,
    status: Number
  },
  components: {
    Rate
  },
	data() {
		return {
      imgSrc: Taro.imgSrc
    }
	},
	methods: {
    toStore () {
      this.$emit('store')
    },
    attention () {
      this.$emit('attention')
    }
  }
}
</script>

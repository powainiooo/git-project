<style scoped>

</style>

<template>
<view class="Attention-item">
  <view class="flex ml12 mr12">
    <image :src="imgSrc + record.logo" mode="aspectFit" class="store-logo" />
    <view class="mt4" style="flex: 1 0 0;">
      <view class="between">
        <view class="acenter">
          <text class="c-tag c-tag-yel mr4" v-if="record.type === 1">个人</text>
          <text class="c-tag c-tag-red mr4" v-if="record.type === 2">企业</text>
          {{record.shop_name}}
        </view>
        <view class="acenter" @tap="toStore">
          <text class="f10 c-999">进店</text>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
        </view>
      </view>
      <view class="acenter">
        <rate :value="record.pf_avg" />
        <view class="f10 c-999 ml4">订单数: {{record.order_nums}}+</view>
        <view class="f10 c-999 ml4">关注数: {{record.attention_nums}}</view>
      </view>
    </view>
  </view>
  <scroll-view :scroll-x="true" class="scrolls">
    <view class="list">
      <view class="item" v-for="i in record.goods" :key="i.id">
        <image :src="imgSrc + i.cover" mode="widthFix" />
        <view>￥<text class="f10">{{i.price_min}}</text>/天</view>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import Rate from '@/c/common/Rate'
export default {
	name: 'app',
  props: {
	  record: Object
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
      Taro.navigateTo({
        url: `/pages/store/index?id=${this.record.shop_id}`
      })
    }
  }
}
</script>

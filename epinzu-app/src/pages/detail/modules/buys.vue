<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys">
    <view class="flex pb16 borderB">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="ml8" v-if="type === 'rent'">
        <view class="c-red f12 mb4">租金：￥<text class="f18">88</text>/天</view>
        <view class="acenter">
          <view class="f12">押金：￥200</view>
          <view class="f12 c-999 ml16">7天起租</view>
        </view>
      </view>
      <view class="ml8" v-if="type === 'buy'">
        <view class="c-red f12">售价：￥<text class="f18">88</text></view>
        <view class="f12 mt42">已选：红色</view>
      </view>
    </view>
    <view class="mt16 mb16">规格</view>
    <view class="flex wrap mb26">
      <view class="cate-item">专业款单机（12寸）</view>
      <view class="cate-item cate-item-active">单机</view>
      <view class="cate-item cate-item-disabled">12.0V单机无刷升龙款往复锯（15节电芯）2电1充（收货电芯）2电1充（收货</view>
    </view>

    <view class="between">
      <view class="acenter">
        <view>数量</view>
        <view class="f12 c-999 ml16">库存66件</view>
      </view>
      <stepper v-model="num" />
    </view>

    <view class="footer-container">
      <view class="c-btn-group ml12 mr12">
        <button class="c-btn" style="background-color: #FC7F1B;">加入购物车</button>
        <button class="c-btn">立即下单</button>
      </view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
import Stepper from '@/c/common/Stepper'
export default {
	name: 'app',
  components: {
    Popup,
    Stepper
  },
	data() {
		return {
      visible: false,
      num: 1,
      type: 'buy'
    }
	},
	methods: {
	  show () {
	    this.visible = true
    }
  }
}
</script>

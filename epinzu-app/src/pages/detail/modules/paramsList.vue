<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys Detail-questions">
    <view class="tc mt16 mb24">商品参数</view>
    <view class="ques-item borderB">
      <view class="l">品牌</view>
      <view class="r">鹰视眼</view>
    </view>
    <view class="ques-item borderB">
      <view class="l">生产许可证编号</view>
      <view class="r">12345679532114437902072721144379020727</view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'paramsList',
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
    }
  }
}
</script>

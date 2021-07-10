<template>
  <view class="Record container">
    <!-- 用户同意账单 -->
    <view class="section">
      <view class="acenter mt8 pb8 borderB">
        <image src="@/img/default.png" mode="aspectFill" class="avatar mr8" />
        <view>
          <view>用户同意账单</view>
          <view class="f12 c-999 mt4">2021-04-13 19:38:52</view>
        </view>
      </view>
      <view class="mt8 mb8 f12 c-666">备注：用户同意了账单</view>
    </view>
    <!-- 用户拒绝账单 -->
    <view class="section">
      <view class="acenter mt8 pb8 borderB">
        <image src="@/img/default.png" mode="aspectFill" class="avatar mr8" />
        <view>
          <view>用户拒绝账单</view>
          <view class="f12 c-999 mt4">2021-04-13 19:38:52</view>
        </view>
      </view>
      <view class="mt8 mb8 f12 c-666">拒绝原因：乱扣钱</view>
      <view class="mb8 f12 c-666">拒绝说明：亲，你这边手机已签收，不支持仅退款，如果你实在不想要麻烦你申请退货退款，有什么问题可以线上联系我们，我们会为你在线解答，感谢你的理解与支持</view>
      <view class="img-list">
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
      </view>
    </view>
    <!-- 商家结算 -->
    <view class="section">
      <view class="acenter mt8 pb8 borderB">
        <image src="@/img/default.png" mode="aspectFill" class="avatar mr8" />
        <view>
          <view>商家结算</view>
          <view class="f12 c-999 mt4">2021-04-13 19:38:52</view>
        </view>
      </view>
      <view class="mt8 mb8 f12 c-666">系统结算租金：￥1390</view>
      <view class="mt8 mb8 f12 c-666">应退押金：￥1390</view>
      <view class="mt8 mb8 f12 c-666">实际退还押金：￥1390</view>
    </view>
    <view class="empty-txt mt40">没有更多协商记录了</view>

    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12 end">
        <button class="c-btn c-btn-border2 c-btn-24 w74">我要留言</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import Form from '@/c/common/Form'

export default {
  name: 'Index',
  components: {
    Form
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

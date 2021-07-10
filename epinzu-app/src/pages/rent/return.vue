<template>
  <view class="Rent container">
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 店铺信息 -->
    <view class="section" v-if="tabKey === 'return'">
      <view class="mt8 acenter">
        <view class="w60 f12 c-999">联系人：</view>
        <view class="f12">五金阿哥 13800138000</view>
      </view>
      <view class="mt8 between mb8">
        <view class="acenter">
          <view class="w60 f12 c-999">商家地址：</view>
          <view class="f12">广东省深圳市宝安区沙井街道中心路10号</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w14" />
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section2 mb8">
      <view class="goods-item-hor mt8 mb8">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="infos">
          <view class="title ellipsis mnb4">无刷电钻充电式手钻无刷电钻充电式手钻</view>
          <view class="c-999 f12 mb4">七天起租</view>
          <view class="f12 mb4">数量：2件</view>
        </view>
      </view>
      <view class="hr"></view>
      <view class="mt8 mb8">订单信息</view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">支付押金:</view>
        <view><text class="f10">￥</text>300</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">单日租金:</view>
        <view><text class="f10">￥</text>300</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">起租天数:</view>
        <view>5天</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">租赁天数:</view>
        <view>6天</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">可退押金:</view>
        <view class="c-red"><text class="f10">￥</text>300</view>
      </view>
    </view>
    <!-- 快递信息 -->
    <template v-if="tabKey === 'post'">
    <view class="section2" style="margin-bottom: 0;">
      <view class="h52 between borderB">
        <view class="c-666">快递公司</view>
        <view class="acenter">
          <view class="c-999">请选择</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
        </view>
      </view>
    </view>
    <Field label="快递单号" placeholder="请输入" textAlign="right" />
    </template>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from '@/c/common/Tabs'
import Field from '@/c/common/Field'

export default {
  name: 'Index',
  components: {
    Tabs,
    Field
  },
  data () {
    return {
      tabs: [
        { key: 'post', label: '快递' },
        { key: 'return', label: '自还' }
      ],
      tabKey: 'post'
    }
  },
  methods: {
    tabChange (e) {
      this.tabKey = e
    }
  },
}
</script>

<template>
  <view class="Refund Refund-detail">
    <!-- 状态栏 -->
    <view class="status-frame acenter">
      <view class="flex ml12 ">
        <image src="@/img/clock.png" mode="widthFix" class="w24" v-if="record.status_icon === 'clock'" />
        <image src="@/img/cancel.png" mode="widthFix" class="w24" v-if="record.status_icon === 'cancel'" />
        <image src="@/img/success.png" mode="widthFix" class="w24" v-if="record.status_icon === 'success'" />
        <view class="ml8 c-fff">
          <view class="mb4" :class="{'f18': record.status !== 9}">{{record.status_title}}</view>
          <view class="time" v-if="record.remain_time !== 0">剩<text>4</text>天<text>23</text>时<text>22</text>分</view>
          <view class="f18 mb4" v-if="record.success_refund_amount">￥{{record.success_refund_amount}}</view>
          <view>{{record.status_msg}}</view>
        </view>
      </view>
    </view>
    <!-- 商家信息 -->
    <view class="section2 pt8" style="margin-top: 0;" v-if="record.tip_msg_list.length > 0">
      <view class="acenter mb8" v-for="(item, index) in record.tip_msg_list" :key="index">
        <image src="@/img/dot3.png" mode="widthFix" class="w6 ml12 mr8" />
        <view class="f12 c-999"><text class="c-666">{{item.name}}：</text>{{item.value}}</view>
      </view>
    </view>
    <!-- 商家留言 -->
    <view class="section2" v-if="record.shop_leave_msg">
      <view class="mt8 mb8">商家留言</view>
      <view class="message">{{record.shop_leave_msg}}</view>
    </view>
    <!-- 协商记录 -->
    <view class="pl12 bg-fff">
      <Cell title="协商记录" isLink />
    </view>
    <!-- 商品详情 -->
    <view class="section2">
      <view class="between mt8 borderB pb8 mb8">
        <view class="acenter">
          <image :src="imgSrc + record.shop.logo" mode="aspectFill" class="avatar20 mr4" />
          <view class="c-tag c-tag-yel mr4" v-if="record.shop.type === 1">个人</view>
          <view class="c-tag c-tag-red mr4" v-if="record.shop.type === 2">企业</view>
          <view class="mr4">{{record.shop.name}}</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10" />
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24" @tap="contact">联系商家</button>
        </view>
      </view>
      <view class="flex mb8 goods pb8 borderB" v-for="item in record.goods" :key="item.id">
        <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
        <view class="content">
          <view class="title">{{item.goods_name}}</view>
          <view class="f12 c-999 mb4">{{item.goods_attr}}</view>
          <view class="between f12" v-if="item.type === 1">
            <view>押金：￥{{item.goods_deposit}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_deposit_count}}</view>
          </view>
          <view class="between f12" v-else>
            <view>售价：￥{{item.goods_price}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_price * item.after_nums}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section2">
      <view class="mt8 mb16">订单信息</view>
      <view class="between mb16" v-for="(item, index) in record.after_list" :key="index">
        <view class="acenter f12">
          <view class="c-999 mr16">{{item.name}}:</view>
          <view>{{item.value}}</view>
        </view>
        <view class="f12 c-red" v-if="item.right_button_display === 1">复制</view>
      </view>
      <view class="flex f12" v-if="record.images.length > 0">
        <view class="c-999 mr16">申请照片：</view>
        <view class="img-list">
          <view class="img-item" v-for="(item, index) in record.images" :key="index">
            <image :src="imgSrc + item" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 end pr20">
        <button class="c-btn c-btn-border c-btn-24 ml4"
                v-for="(item, index) in record.buttons"
                :key="index"
                @tap="btnFunc(item.key)">{{item.name}}</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'
import { getAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Cell
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: '',
      record: {}
    }
  },
  methods: {
    getData () {
      getAction('/userapi/after/show', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          Taro.setNavigationBarTitle({
            title: res.data.title
          })
        }
      })
    },
    contact () {
      Taro.showToast({
        title: '跳聊天界面'
      })
    },
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

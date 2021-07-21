<template>
  <view class="Yue">
    <view class="section2">
      <view class="card">
        <view class="c-fff mt24 ml16 mb16">
          <view class="f12 mb4">账户余额(元）</view>
          <view class="f22">{{record.money}}</view>
        </view>
        <view class="acenter ml16">
          <view class="c-fff mr80">
            <view class="f12 mb4">累计总收入(元）</view>
            <view class="f22">{{record.money_total}}</view>
          </view>
          <view class="c-fff">
            <view class="f12 mb4">提现中(元）</view>
            <view class="f22">{{record.withdraw}}</view>
          </view>
        </view>
        <view class="btn" @tap="toWithdraw">提现</view>
      </view>

      <view class="mt16 mb16">余额明细</view>
      <view class="h52 between" v-for="item in dataSource" :key="item.id">
        <view>
          <view class="f12">{{item.title}}</view>
          <view class="f10 c-999">{{item.created_at}}</view>
        </view>
        <view class="tr">
          <view class="f12 c-red">{{item.money}}</view>
          <view class="f10 c-999"><text class="f8">￥</text>{{item.remain}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction } from "@/utils/api"
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  mixins: [pageMixin],
  data () {
    return {
      record: {},
      url: {
        list: '/userapi/money/logs'
      }
    }
  },
  methods: {
    getMoneys () {
      getAction('/userapi/my').then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    toWithdraw () {
      Taro.navigateTo({
        url: `/pages/mine/yue/tixian?yue=${this.record.money}`
      })
    }
  },
  onLoad () {
    this.getMoneys()
  }
}
</script>

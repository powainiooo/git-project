<template>
  <view class="Yue">
    <view class="section2 mt2">
      <view class="between mt8">
        <view class="f10 c-999">今日可提现<text class="c-red">{{record.remain_nums}}</text>次</view>
        <view class="c-666 f12" @tap="toRecord">提现记录</view>
      </view>
      <view class="tixian-input borderB">
        <text>￥</text>
        <input type="digit" v-model="money" />
      </view>
      <view class="between mb8">
        <view class="f12">可提现金额<text class="c-red">￥{{yue}}</text></view>
        <view class="c-red f12" @tap="setAll">全部提取</view>
      </view>
    </view>
    <view class="section2 acenter h52">
      <view class="c-666 mr16">{{record.name_title}}</view>
      <view class="mr16">{{record.name}}</view>
    </view>
    <view class="ml12 mr12">
      <view class="f12 c-999 mb40">提示：提现费率：{{record.rate}}%，单次最小提现额：{{record.once_min}}元，单次最大提现额：{{record.once_max}}元</view>
      <button class="c-btn"
              :class="{'c-btn-disabled': money === ''}"
              @tap="withdraw">确认提现</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction, postAction } from "@/utils/api"

export default {
  name: 'Index',
  data () {
    return {
      record: {},
      yue: 0,
      money: '',
      isAjax: false
    }
  },
  methods: {
    getData () {
      getAction('/userapi/withdraw/rule').then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    setAll () {
      this.money = this.yue
    },
    withdraw () {
      if (this.money === '') {
        return
      }
      if (Number(this.money) < this.record.once_min) {
        Taro.showToast({
          title: '提现金额小于最低限额'
        })
        return
      }
      if (Number(this.money) > this.record.once_max) {
        Taro.showToast({
          title: '提现金额大于最大限额'
        })
        return
      }
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/withdraw', {
        type: 2,
        money: this.money,
        account: this.$store.state.userId,
        name: this.record.name
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          setTimeout(() => {
            Taro.navigateBack({
              delta: 1
            })
          }, 500)
        } else {
          this.isAjax = false
        }
      })
    },
    toRecord () {
      Taro.navigateTo({
        url: '/pages/mine/yue/record'
      })
    }
  },
  onLoad (options) {
    this.yue = Number(options.yue)
    this.getData()
  }
}
</script>

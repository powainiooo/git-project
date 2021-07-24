<template>
  <view class="Post">
    <!-- 订单信息 -->
    <view class="section2">
      <view class="borderB pb8 mt8">
        <view class="acenter">
          <image src="@/img/post.png" mode="widthFix" class="w24 mr8" />
          <text class="c-red">{{record.kd_company}}</text>
        </view>
        <view class="ml32 between">
          <view>快递单号：{{record.kd_no}}</view>
          <button class="c-btn c-btn-border2 c-btn-20 w46" @tap="copy">复制</button>
        </view>
      </view>
      <view class="borderB pb8 mt8">
        <view class="flex">
          <image src="@/img/dot.png" mode="widthFix" class="w24 mr8" />
          <view style="flex: 1 0 0">
            <view class="c-666" v-for="(item, index) in record.extra" :key="index">{{item.title}}：{{item.content}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 物流信息 -->
    <view class="section2 list" v-if="record.traces.length > 0">
      <view class="item" v-for="(item, i) in record.traces" :key="i">
        <view class="dot">
          <image src="@/img/dot2.png" mode="widthFix" class="w14" v-if="i == 0" />
          <image src="@/img/dot3.png" mode="widthFix" class="w10" v-else />
        </view>
        <view class="content">
          <view>{{item.AcceptStation}}</view>
          <view class="f12">{{item.AcceptTime}}</view>
        </view>
      </view>
    </view>
    <view v-else class="f12 c-666 mt190 tc">暂无数据</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction } from '@/utils/api'

export default {
  name: 'Index',
  data () {
    return {
      id: '',
      record: {}
    }
  },
  methods: {
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      getAction('/userapi/rent/back/express', {
        id: this.id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    copy () {
      Taro.setClipboardData({
        data: this.record.kd_no,
        success (res) {
          console.log('copy succees', res)
          Taro.showToast({
            title: '复制成功'
          })
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

<template>
  <view class="Yue">
    <view class="section2" style=" margin-top: 0;">
      <view class="record-table">
        <view class="thead">
          <view>提现金额</view>
          <view>状态</view>
          <view>时间</view>
        </view>
        <view class="tr borderB" v-for="item in dataSource" :key="item.id">
          <view>￥{{item.money}}</view>
          <view v-if="item.status === 1">申请中</view>
          <view v-else-if="item.status === 2">后台提现中</view>
          <view v-else-if="item.status === 3">提现完成</view>
          <view v-else-if="item.status === -1">提现失败</view>
          <view>{{item.created_at}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  mixins: [pageMixin],
  data () {
    return {
      url: {
        list: '/userapi/withdraw/logs'
      }
    }
  },
  methods: {
  },
}
</script>

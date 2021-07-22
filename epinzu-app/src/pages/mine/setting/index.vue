<template>
  <view class="Setting">
    <view class="section2" style="padding-right: 0">
      <view class="h52 between borderB">
        <view>我的头像</view>
        <view class="acenter">
          <image src="@/img/default.png" mode="widthFix" class="avatar mr8" slot="value" />
          <image src="@/img/ar1.png" mode="widthFix" class="w10 mr12" />
        </view>
      </view>
      <Cell title="我的昵称"
            :value="record.nickname"
            color="#999999"
            isLink
            @tap="toPage('/pages/mine/nickname/index?name=' + record.nickname)" />
      <Cell title="账号与安全"
            isLink
            @tap="toPage('/pages/mine/account/index?')" />
      <Cell title="实名认证"
            :value="record.srrz_status === 0 ? '未认证' : '已认证'"
            color="#999999"
            isLink
            @tap="toPage('/pages/mine/auth/index')" />
    </view>
    <view class="tc f12 mt24">《品租软件隐私政策》</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Cell from '@/c/common/Cell'
import {getAction} from '@/utils/api'

export default {
  name: 'Setting',
  components: {
    Cell
  },
  computed: {
    record () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc
    }
  },
  methods: {
    toPage (url) {
      Taro.navigateTo({
        url
      })
    }
  }
}
</script>

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
      <Cell title="我的昵称" value="哆啦A梦" color="#999999" isLink />
      <Cell title="账号与安全" isLink />
      <Cell title="实名认证" value="未认证" color="#999999" isLink />
      <Cell isLink>
        <text class="c-red" slot="title">退出登录</text>
      </Cell>
    </view>
    <view class="tc f12 mt24">《品租软件隐私政策》</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Cell from '@/c/common/Cell'

export default {
  name: 'Setting',
  components: {
    Cell
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

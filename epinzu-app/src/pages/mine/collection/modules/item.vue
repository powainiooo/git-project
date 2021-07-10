<style scoped>

</style>

<template>
<view class="item-box borderB"
      :class="{'item-box-show': showDel}"
      @touchstart="ts"
      @touchend="te">
  <view class="item borderB">
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title mb4">无刷电钻充电式手钻小手枪钻锂电钻小手枪钻锂电钻</view>
        <view class="c-red f10"><text class="f12">租金：</text>￥<text class="f12">88</text>/天</view>
        <view class="f10"><text class="f12">押金：</text>￥<text class="f12">88</text></view>
        <view class="acenter mt22">
          <view class="c-tag c-tag-yel">个人</view>
          <view class="company">鹰视眼五金工具金工具</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10" />
        </view>
      </view>
    </view>
  </view>
  <view class="btn-del">删除</view>
</view>
</template>

<script type='es6'>
export default {
  name: 'app',
  data() {
    return {
      showDel: false,
      sx: 0
    }
  },
  methods: {
    ts (e) {
      console.log('ts', e)
      this.sx = e.changedTouches[0].clientX
    },
    te (e) {
      const ex = e.changedTouches[0].clientX
      if (this.sx > ex + 50) {
        this.showDel = true
      }
      if (ex > this.sx + 50) {
        this.showDel = false
      }
    }
  }
}
</script>

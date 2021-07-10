<template>
  <view class="Coupon">
    <!-- 标签栏 -->
    <Tabs :list="tabs" />
    <item />
    <view class="empty mt125">
      <image src="@/img/coupon.png" mode="widthFix" class="img" />
      <view class="txt">没有可用的优惠券</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../index.styl'
import Tabs from '@/c/common/Tabs'
import item from './modules/item'

export default {
  name: 'Index',
  components: {
    Tabs,
    item
  },
  computed: {
    tabs () {
      return [
        { key: 'all', label: `未使用（${this.notuse}）` },
        { key: 'sale', label: `已使用（${this.used}）` },
        { key: 'price', label: `已失效（${this.invalid}）` }
      ]
    }
  },
  data () {
    return {
      notuse: 2,
      used: 0,
      invalid: 0
    }
  },
  methods: {
  },
}
</script>

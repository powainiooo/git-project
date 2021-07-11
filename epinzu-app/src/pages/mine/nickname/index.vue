<template>
  <view class="Setting">
    <view class="bg-fff h52 between">
      <input value="品租软件" class="ml12 f14" />
      <image src="@/img/close.png" mode="widthFix" class="w20 mr12" />
    </view>
    <view class="f12 c-999 mt8 ml12">支持1到16个字，可由中英文、数字、“-”，“_”组成</view>
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

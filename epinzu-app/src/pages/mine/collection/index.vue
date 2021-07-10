<template>
  <view class="Collection">
    <!-- 空提示 -->
    <view class="bg-fff ovh h200 center mb32">
      <view class="empty">
        <image src="@/img/collection.png" mode="widthFix" class="img" />
        <view class="txt">您还没有任何收藏</view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="list mb32">
      <item />
    </view>
    <guess-like />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import item from './modules/item'
import GuessLike from '@/c/common/GuessLike'
import '../index.styl'

export default {
  name: 'Index',
  components: {
    item,
    GuessLike
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

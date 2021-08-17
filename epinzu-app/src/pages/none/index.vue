<template>
  <view class="Cart">
    <!-- 空提示 -->
    <view class="bg-fff h200 ovh mb32">
      <view class="empty mt48">
        <image src="@/img/store2.png" mode="widthFix" class="img" />
        <view class="txt">商品过期不存在</view>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <guess-like :list="dataSource" />

  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import GuessLike from '@/c/common/GuessLike'
import { pageMixin } from '@/mixins/pages'
import { getAction } from '@/utils/api'

export default {
  name: 'Cart',
  mixins: [pageMixin],
  components: {
    GuessLike
  },
  data () {
    return {
      url: {
        cart: '/userapi/shopping/index',
        list: '/userapi/goods/shopping/recommend'
      }
    }
  },
  methods: {
  },
  onShow (options) {
    this.getCartData()
  }
}
</script>

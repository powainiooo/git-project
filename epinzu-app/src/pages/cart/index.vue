<template>
  <view class="Cart ml12 mr12 mt8">
    <view class="list">
      <view class="list-item">
        <cart-item />
      </view>
      <view class="list-item">
        <cart-item />
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import cartItem from './modules/cartItem'

export default {
  name: 'Cart',
  components: {
    cartItem
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

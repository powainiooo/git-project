<template>
  <view class="Detail container">
    <!-- 轮播图 -->
    <banner />
    <!-- 商品信息 -->
    <infos />
    <!-- 价格信息 -->
    <view class="Detail-section">
      <price-item />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import banner from './modules/banner'
import infos from './modules/infos'
import priceItem from './modules/prices'

export default {
  name: 'Detail',
  components: {
    banner,
    infos,
    priceItem
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

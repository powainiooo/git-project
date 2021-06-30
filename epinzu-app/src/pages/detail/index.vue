<template>
  <view class="Detail container">
    <!-- 轮播图 -->
    <banner />
    <!-- 商品信息 -->
    <infos />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import banner from './modules/banner'
import infos from './modules/infos'

export default {
  name: 'Detail',
  components: {
    banner,
    infos
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

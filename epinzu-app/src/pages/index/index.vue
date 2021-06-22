<template>
  <view class="index-container">
    <!-- 轮播图 -->
    <banner />
    <!-- 顶部栏 -->
    <view class="i-header">
      <!-- 搜索框 -->
      <view class="ml12 mr12 mb16" :style="{'margin-top': tH + 'px'}">
        <search :disabled="false" placeholder="搜好物，上品租" backgroundColor="#FFFFFF" />
      </view>
      <!-- 导航栏 -->
      <navs />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import banner from './modules/banner'
import navs from './modules/navs'

export default {
  name: 'Index',
  components: {
    banner,
    search,
    navs
  },
  data () {
    return {
      tH: 0
    }
  },
  mounted() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight + res.titleBarHeight
      }
    })
  },
  methods: {
  }
}
</script>

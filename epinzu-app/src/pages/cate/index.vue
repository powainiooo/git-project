<template>
  <view class="cate-container">
    <view class="cate-search">
      <view class="ml40 mr105 pt4 pb4" :style="{'margin-top': tH + 'px'}">
        <search placeholder="搜好物，上品租" />
      </view>
    </view>
    <view class="cate-list" :style="{'top': tH + 'px'}">
      <view class="item" v-for="item in cateList" :key="item.id" :class="{'active': cateId === item.id}">{{item.name}}</view>
    </view>
    <view class="goods-container" :style="{'margin-top': tH + 'px'}">
      <view class="ad"><image src="@/img/ad.png" mode="widthFix" /></view>
      <view class="list">
        <view class="item">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view>翻译器</view>
        </view>
        <view class="item">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view>翻译器翻译器翻译器</view>
        </view>
        <view class="item">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view>翻译器</view>
        </view>
        <view class="item">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view>翻译器</view>
        </view>
        <view class="item">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view>翻译器</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'

export default {
  name: 'Index',
  components: {
    search
  },
  data () {
    return {
      tH: 0,
      cateId: 1,
      cateList: [
        { id: 1, name: '热门爆款' },
        { id: 2, name: '手机' },
        { id: 3, name: '电脑' },
        { id: 4, name: '电焊机' },
        { id: 5, name: '办公设备' },
        { id: 6, name: '医疗设备' },
      ]
    }
  },
  mounted() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight
      }
    })
  },
  methods: {
  },
}
</script>

<template>
  <view class="cate-container">
    <view class="cate-search">
      <view class="ml40 mr120 pt4 pb4" :style="{'margin-top': tH + 'px'}" @tap="toSearch">
        <search placeholder="搜好物，上品租" :disabled="true" />
      </view>
    </view>
    <view class="cate-list" :style="{'top': tH + 'px'}">
      <view class="item"
            v-for="(item, index) in cateList"
            :key="index"
            :class="{'active': selected === item.cname}"
            @tap="change(index)">{{item.cname}}</view>
    </view>
    <view class="goods-container" :style="{'margin-top': tH + 'px'}">
      <view class="ad" @tap="toList(topAD)" v-if="topAD.banner">
        <image :src="imgSrc + topAD.banner" mode="widthFix" />
      </view>
      <view class="list">
        <view class="item" v-for="item in secondList" :key="item.cid" @tap="toList(item)">
          <view class="img">
            <image :src="imgSrc + item.cover" mode="aspectFill" />
          </view>
          <view>{{item.cname}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import { getAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    search
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      tH: 0,
      cateId: 1,
      selected: '',
      cateList: [],
      secondList: [],
      topAD: {}
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
    change (index) {
      this.selected = this.cateList[index].cname
      this.secondList = this.cateList[index].children
    },
    getCate () {
      getAction('/userapi/goods/cate').then(res => {
        if (res.code === 0) {
          this.cateList = res.data
          this.selected = res.data[0].cname
          this.secondList = res.data[0].children
          if (res.data[0].top) {
            this.topAD = res.data[0].top
          }
        }
      })
    },
    toList (cate) {
      Taro.navigateTo({
        url: `/pages/goods/list/index?cid=${cate.cid}&cname=${cate.cname}&from=cate`
      })
    },
    toSearch () {
      Taro.navigateTo({
        url: '/pages/search/index'
      })
    }
  },
  onLoad (options) {
    this.cateId = Number(options.cid)
    this.getCate()
  }
}
</script>

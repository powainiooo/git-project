<template>
  <view class="Record container">
    <!-- 用户拒绝账单 -->
    <view class="section" v-for="item in dataSource" :key="item.id">
      <view class="acenter mt8 mb8 pb8 borderB">
        <image :src="imgSrc + item.avatar" mode="aspectFill" class="avatar mr8" />
        <view>
          <view>{{item.title}}</view>
          <view class="f12 c-999 mt4">{{item.created_at}}</view>
        </view>
      </view>
      <view class="mb8 f12 c-666" v-for="c in item.content" :key="c">{{c}}</view>
      <view class="img-list" v-if="item.images.length > 0">
        <view class="img-item" v-for="src in item.images" :key="src">
          <image :src="imgSrc + src" mode="widthFix" class="aspectFill" />
        </view>
      </view>
    </view>
    <view class="empty-txt mt40" v-if="!loading && ipage.loadOver">没有更多协商记录了</view>

    <!-- 底部按钮 -->
    <view class="footer-container" v-if="btnShow">
      <view class="wp100 pl12 pr12 end">
        <button class="c-btn c-btn-border2 c-btn-24 w74" @tap="toMsg">我要留言</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import { pageMixin } from "@/mixins/pages"

export default {
  name: 'Index',
  mixins: [pageMixin],
  computed: {
    btnShow () {
      if (this.listDataAll.buttons) {
        return this.listDataAll.buttons.leave_msg.display === 1
      } else {
        return false
      }
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      queryParams: {
        id: ''
      },
      url: {
        list: '/userapi/rent/back/logs'
      }
    }
  },
  methods: {
    toMsg () {
      Taro.navigateTo({
        url: `/pages/rent/message?id=${this.queryParams.id}`
      })
    }
  },
  onLoad (options) {
    this.queryParams.id = options.id
  }
}
</script>

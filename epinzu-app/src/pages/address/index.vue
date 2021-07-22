<template>
  <view class="Address">
    <view class="Address-item between borderB"
          v-for="item in dataSource"
          :key="item.id"
          @tap="selectAddr(item.id)"
          >
      <view class="mt8">
        <view class="mb8 f12 acenter">
          <text class="c-tag c-tag-red mr4" v-if="item.status === 1">默认</text>
          {{item.rev_name}} {{item.rev_phone}}
        </view>
        <view class="mb8 f12 c-666">{{item.province}} {{item.city}} {{item.address}}</view>
      </view>
      <image src="@/img/edit.png" mode="widthFix" class="w24 mr12" @tap.stop="toEdit(item)" />
    </view>

    <view class="empty-txt" v-if="!loading && ipage.loadOver && dataSource.length > 0">已经全部加载完毕</view>
    <view class="empty-txt mt195" v-if="!loading && ipage.loadOver && dataSource.length === 0">暂无数据</view>

    <view class="footer-container">
      <view class="wp100 ml12 mr12">
        <button class="c-btn" style="width: 100%;" @tap="toNew">+ 添加地址</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  mixins: [pageMixin],
  data () {
    return {
      disableMixinCreated: true,
      from: '',
      url: {
        list: '/userapi/user/address/index'
      }
    }
  },
  methods: {
    toEdit (item) {
      Taro.navigateTo({
        url: `/pages/address/edit?id=${item.id}`
      })
    },
    toNew (item) {
      Taro.navigateTo({
        url: '/pages/address/edit'
      })
    },
    selectAddr (id) {
      if (this.from === 'order') {
        this.$store.commit('SET_ADDRID', id)
        Taro.navigateBack({
          delta: 1
        })
      }
    }
  },
  onShow () {
    this.resetLoad()
  },
  onLoad (options) {
    this.from = options.from || 'mine'
  }
}
</script>

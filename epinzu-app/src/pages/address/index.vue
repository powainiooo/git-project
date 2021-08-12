<template>
  <view class="Address">

    <view class="borderB"
          v-for="item in dataSource"
          :key="item.id">
      <swiper-cell rightWidth="1.4rem">
        <view class="Address-item between"
              @tap="selectAddr(item)"
        >
          <view class="mt8 infos">
            <view class="mb8 f12 acenter">
              <text class="c-tag c-tag-red mr4" v-if="item.status === 1">默认</text>
              <text class="bold">{{item.rev_name}} {{item.rev_phone}}</text>
            </view>
            <view class="mb8 f12 c-666">{{item.province}} {{item.city}} {{item.address}}</view>
          </view>
          <image src="@/img/edit.png" mode="widthFix" class="w24 mr12 ml24" @tap.stop="toEdit(item)" />
        </view>
        <view slot="right" class="btn-del" @tap="delAddr(item.id)">删除</view>
      </swiper-cell>
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
import swiperCell from '@/c/common/swiperCell.vue'
import { getAction } from "@/utils/api"

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    swiperCell
  },
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
    selectAddr (item) {
      if (this.from === 'order') {
        this.$store.commit('SET_ADDRDATA', item)
        Taro.navigateBack({
          delta: 1
        })
      }
    },
    delAddr (id) {
      getAction(`/userapi/user/address/destroy/${id}`).then(res => {
        if (res.code === 0) {
          this.resetLoad()
        }
      })
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

<template>
  <view class="Message">
    <view class="Message-tabs">
<!--      <view class="item"-->
<!--            :class="{'active': tabKey === 'service'}"-->
<!--            @tap="toggle('service')">聊天<text class="dot-num" v-if="serviceNum > 0">{{serviceNum}}</text></view>-->
      <view class="item"
            :class="{'active': tabKey === 'notice'}"
            @tap="toggle('notice')">通知<text class="dot-num" v-if="noticeNum > 0">{{noticeNum}}</text></view>
      <image src="@/img/ringbell.png" mode="widthFix" class="ringbell" v-if="tabKey === 'notice'" @tap="showModal = true" />
    </view>
    <view class="hr8"></view>
    <!-- 店铺客服 列表 -->
    <service v-show="tabKey === 'service'" />
    <!-- 通知 列表 -->
    <notice ref="notice" v-show="tabKey === 'notice'" />

    <!-- 消息处理 -->
    <view class="Message-modal" v-if="showModal">
      <view class="box">
        <view class="bold tc f16 mt12 mb26">消息处理</view>
        <view class="ml70 acenter mb16" @tap="mesType = 'del'">
          <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr8" v-if="mesType === 'del'" />
          <image src="@/img/radio.png" mode="widthFix" class="w16 mr8" v-else />
          <text>全部删除</text>
        </view>
        <view class="ml70 acenter mb24" @tap="mesType = 'read'">
          <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr8" v-if="mesType === 'read'" />
          <image src="@/img/radio.png" mode="widthFix" class="w16 mr8" v-else />
          <text>全部标为已读</text>
        </view>
        <view class="borderT flex">
          <view class="h42 center wp50 borderR" @tap="showModal = false">取消</view>
          <view class="h42 center wp50 c-red" @tap="confirm">确定</view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <c-footer current="home" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import cFooter from '@/c/common/footer'
import service from './modules/service'
import notice from './modules/notice'
import { postAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    cFooter,
    service,
    notice
  },
  data () {
    return {
      tabKey: 'notice',
      serviceNum: 0,
      noticeNum: 0,
      showModal: false,
      mesType: 'del'
    }
  },
  methods: {
    toggle (key) {
      this.tabKey = key
      this.getData()
    },
    getData () {
      if (this.tabKey === 'service') {

      } else if (this.tabKey === 'notice') {
        this.$refs.notice.getListData()
      }
    },
    confirm () {
      if (this.mesType === 'del') {
        postAction('/userapi/sysmsg/destroy/all').then(res => {
          if (res.code === 0) {
            this.$refs.notice.resetLoad()
            this.showModal = false
          }
        })
      } else if (this.mesType === 'read') {
        postAction('/userapi/sysmsg/read/all').then(res => {
          if (res.code === 0) {
            this.$refs.notice.resetLoad()
            this.showModal = false
          }
        })
      }
    }
  },
  onShow () {
    this.getData()
  }
}
</script>

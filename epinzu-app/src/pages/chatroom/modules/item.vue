<style scoped>

</style>

<template>
<view class="Chat-item" :id="idStr">
  <!-- 时间 -->
  <view class="Chat-item-date" v-if="dateStr">{{dateStr}}</view>
  <!-- 消息 -->
  <view class="Chat-item-container ovh"
        :class="{'Chat-custom': isUser}">
    <!-- 头像 -->
    <view class="Chat-item-head">
      <image :src="avatar" mode="aspectFill" />
    </view>
    <!-- 内容区 -->
    <view class="Chat-item-content">
      <view class="Chat-item-wrapper">
        <view class="Chat-item-message">
          <!-- 状态 -->
          <view class="Chat-item-status" v-if="isUser">{{readStatus}}</view>
          <view class="Chat-item-box">
            <!-- 文本消息 -->
            <view class="Chat-item-text" v-if="type === 'txt'">{{message.content}}</view>
            <!-- 产品消息 -->
            <view class="Chat-item-goods" v-if="type === 'goods'" @tap="toGoods(message.data.goods_id)">
              <image :src="imgSrc + message.data.goods_cover" mode="aspectFill" @load="imgLoad" />
              <view class="title">{{message.data.goods_title}}</view>
              <view class="c-red mt4" v-if="message.data.goods_type === 1">押金：<text class="f10">￥</text>{{message.data.goods_deposit}}</view>
              <view class="c-red mt4" v-else>售价：<text class="f10">￥</text>{{message.data.goods_price}}</view>
            </view>
            <!-- 问题消息 -->
            <view class="Chat-item-problem" v-if="type === 'robot'">
              <view class="pb8 pt8 pl8 pr8 borderB">{{message.data.title}}</view>
              <view class="item borderB"
                    v-for="q in message.data.list"
                    :key="q.id"
                    @tap="sendQues(q)">{{q.question}}</view>
              <view class="pb8 pt8 pl8 pr8 f12 c-999">此消息由机器人发送</view>
            </view>
            <!-- 图片消息 -->
            <view class="Chat-item-img" v-if="type === 'img'" @tap="viewPic">
              <image :src="imgSrc + message.content" mode="widthFix" @load="imgLoad" />
            </view>
            <!-- 音频消息 -->
            <view class="Chat-item-audio"
                  v-if="type === 'audio'"
                  :style="{width: voiceW}"
                  @tap="voicePlay">
              <image src="@/img/voice3.png" mode="widthFix" class="w16" v-show="voiceIndex === 3" />
              <image src="@/img/voice2.png" mode="widthFix" class="w16" v-show="voiceIndex === 2" />
              <image src="@/img/voice1.png" mode="widthFix" class="w16" v-show="voiceIndex === 1" />
              <text>{{mediaData[0]}}''</text>
            </view>
            <!-- 视频消息 -->
            <view class="Chat-item-video" v-if="type === 'video'" @tap="videoPlay">
              <image :src="imgSrc + mediaData[0]" mode="aspectFill" @load="imgLoad" />
              <image src="@/img/play.png" mode="widthFix" class="play" />
            </view>
            <!-- 定位消息 -->
            <view class="Chat-item-loc" v-if="type === 'loc'" @tap="openLocation">
              <view class="mb4 ellipsis">{{message.data.title}}</view>
              <view class="f12 c-999 mb8 ellipsis">{{message.data.address}}</view>
              <image :src="imgSrc + message.data.image" mode="widthFix" @load="imgLoad" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { imgSrc } from '@/config'
import {formatDate} from "../../../utils"

export default {
	name: 'app',
  props: {
	  record: Object,
    info: Object,
    playId: [String, Number]
  },
  watch: {
	  // 监听当前播放id 来执行播放动画
    playId (id) {
      if (id === this.record.message_id) {
        this.t = setInterval(() => {
          this.voiceIndex += 1
          if (this.voiceIndex > 3) {
            this.voiceIndex = 1
          }
        }, 300)
      } else {
        clearInterval(this.t)
        this.voiceIndex = 3
      }
    }
  },
  computed: {
	  // 消息id 用于滚动
    idStr () {
      return `item${this.record.message_id}`
    },
    // 是否为用户数据
    isUser () {
      return this.record.from_account === this.info.myAccount
    },
    // 头像地址
    avatar () {
      return `${imgSrc}${this.isUser ? this.info.myAvatar : this.info.storeAvatar}`
    },
    // 读取状态
    readStatus () {
      return this.record.is_read === 1 ? '已读' : '未读'
    },
    // 消息数据
    message () {
      return this.record.message
    },
    // 消息类型
    type () {
      return this.message.type
      // return 'video'
    },
    // 消息时间
    dateStr () {
      if (this.record.beforeDate) {
        const b = new Date(this.record.beforeDate.replace(/-/g,'/'))
        const time1 = b.getTime()
        const date = new Date(this.record.created_at.replace(/-/g,'/'))
        const time2 = date.getTime()
        if (time2 > time1 + 10 * 60 * 1000) { // 时间相隔十分钟
          return formatDate(date, 'yyyy/MM/dd HH:mm')
        }
      }
      return false
    },
    // 语音或视频消息数据
    mediaData () {
      return this.message.content.split('|')
    },
    // 语音条宽度
    voiceW () {
      return (65 + 162 * this.mediaData[0] / 60) * 2 / 100 + 'rem'
    }
  },
	data() {
		return {
      imgSrc,
      voiceIndex: 3,
      t: 0
    }
	},
	methods: {
    viewPic () {
      Taro.previewImage({
        urls: [this.imgSrc + this.message.content]
      })
    },
    voicePlay () {
      console.log('voicePlay')
      this.$emit('play', {
        type: 'audio',
        id: this.record.message_id,
        url: this.imgSrc + this.mediaData[1]
      })
    },
    videoPlay () {
      console.log('videoPlay')
      this.$emit('play', {
        type: 'video',
        id: this.record.message_id,
        url: this.imgSrc + this.mediaData[1],
        post: this.imgSrc + this.mediaData[0]
      })
    },
    openLocation () {
      Taro.openLocation({
        name: this.message.data.title,
        address: this.message.data.address,
        latitude: Number(this.message.data.lat),
        longitude: Number(this.message.data.lng),
        success (res) {
          console.log('openLocation', res)
        }
      })
    },
    sendQues (q) {
      this.$emit('send', q)
    },
    toGoods (id) {
      Taro.redirectTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    imgLoad () {
      this.$emit('load')
    }
  }
}
</script>

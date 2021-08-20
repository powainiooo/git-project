<style scoped>

</style>

<template>
<view class="Chat-item" :id="idStr">
  <!-- 时间 -->
  <view class="Chat-item-date" v-if="record.beforeDate">{{dateStr}}</view>
  <!-- 消息 -->
  <view class="Chat-item-container clearfix"
        :class="{'Chat-custom': isUser}">
    <!-- 头像 -->
    <view class="Chat-item-head">
      <image :src="avatar" mode="aspectFill" />
    </view>
    <!-- 内容区 -->
    <view class="Chat-item-content clearfix">
      <view class="Chat-item-wrapper">
        <view class="Chat-item-message">
          <!-- 状态 -->
          <view class="Chat-item-status" v-if="isUser">{{readStatus}}</view>
          <view class="Chat-item-box">
            <!-- 文本消息 -->
            <view v-if="type === 'txt'">{{message.content}}</view>
            <!-- 产品消息 -->
            <view class="Chat-item-goods" v-if="type === 'goods'">
              <image :src="imgSrc + message.data.goods_cover" mode="aspectFill" />
              <view>{{message.data.goods_title}}</view>
              <view class="c-red mt4"><text class="f10">￥</text>{{message.data.goods_price}}</view>
            </view>
            <!-- 问题消息 -->
            <view class="Chat-item-problem" v-if="type === 'robot'">
              <view class="pb8 borderB">{{message.data.title}}</view>
              <view class="item borderB"
                    v-for="q in message.data.list"
                    :key="q.id">{{q.question}}</view>
              <view class="mt8 f12 c-999">此消息由机器人发送</view>
            </view>
            <!-- 图片消息 -->
            <view class="Chat-item-problem" v-if="type === 'img'">
              {{imgSrc}}{{message.content}}
            </view>
            <!-- 音频消息 -->
            <view class="Chat-item-problem" v-if="type === 'audio'">
              {{imgSrc}}{{message.content}}
            </view>
            <!-- 视频消息 -->
            <view class="Chat-item-problem" v-if="type === 'video'">
              {{imgSrc}}{{message.content}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import { imgSrc } from '@/config'

export default {
	name: 'app',
  props: {
	  record: Object,
    info: Object
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
    },
    // 消息时间
    dateStr () {
      const date1 = new Date(this.record.beforeDate)
      const date2 = new Date(this.record.created_at)
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      const week = date2.getDay()
      const hour = date2.getHours()
      const min = date2.getMinutes()
      const m = hour < 12 ? '上午' : '下午'
      return `${weeks[week]} ${m}${hour}:${min}`
    }
  },
	data() {
		return {
      imgSrc,
      emoji: '😠'
    }
	},
	methods: {}
}
</script>

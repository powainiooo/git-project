<template>
  <view class="Chat">
    <!--  消息列表  -->
    <view class="Chat-list" @tap="currentTool = ''">
      <item v-for="item in mesList"
            :key="item.id"
            :record="item"
            :info="chartInfo"
            :playId="playId"
            @play="onplay"
            @send="onSend"
            @load="pageScrollTo" />
    </view>
    <view id="msgBottom"
          class="msgBottom"
          :class="{'msgBottom-show': currentTool !== ''}"></view>

    <!--  底部操作栏  -->
    <view class="footer-container footer-chat"
          id="footer"
          :class="{'footer-chat-show': currentTool !== ''}">
      <!--  输入框和按钮  -->
      <view class="acenter Chat-footer">
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="showVoice" @tap="hideVoice" />
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" v-else @tap="tapVoice" />

        <view class="btn"
              v-if="showVoice"
              :style="{'background-color': isRecording ? '#e5e5e5' : '#ffffff'}"
              @touchstart="startRecord"
              @touchmove="tmove"
              @touchend="stopRecord">{{recordBtn}}</view>

        <input v-model="contents"
               ref="input"
               :focus="isFous"
               confirmType="send"
               confirm-type="send"
               @blur="onBlur"
               @focus="onfocus"
               @confirm="sendTxtMsg(null)"
               v-else/>
        <image src="@/img/face.png" mode="widthFix" class="w24 mr8" v-if="currentTool !== 'emoji'" @tap="openEmoji" />
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="currentTool === 'emoji'" @tap="inputFocus" />
        <image src="@/img/add3.png" mode="widthFix" class="w24" @tap="currentTool = 'tools'" />
      </view>

      <view class="tools-container">
        <!--  表情栏  -->
        <emoji :disabled="contents === ''"
               @insert="insertImg"
               @del="delMsg"
               @send="sendTxtMsg(null)" v-show="currentTool !== 'tools'" />
        <!--  工具栏  -->
        <view class="tools" v-show="currentTool === 'tools'">
          <view class="tools-item" @tap="selectImg">
            <view class="center"><image src="@/img/picture.png" mode="widthFix" class="w24" /></view>
            <view class="name">照片</view>
          </view>
          <view class="tools-item" @tap="selectVideo">
            <view class="center"><image src="@/img/camera.png" mode="widthFix" class="w24" /></view>
            <view class="name">视频</view>
          </view>
        </view>
      </view>

      <!--  遮盖底部，兼容刘海屏底部  -->
      <view class="bottom-cover"></view>

      <!--  发送商品  -->
      <view class="Chat-goods" v-if="showChatGoods" @tap="sendGoodsMsg">
        <view class="mb4">点击发送该商品</view>
        <image :src="imgSrc + chatGoods.goods_cover" mode="aspectFill" />
        <view class="c-red mt4"><text class="f10">￥</text>{{chatGoods.goods_price}}</view>
      </view>
    </view>

    <!--  语音录制提示  -->
<!--    <audio-hint ref="audioHint" :cancel="isCancel" />-->
    <view class="video-frame center" v-show="showVideo">
      <video id="video"
             :showPlayBtn="false"
             :showCenterPlayBtn="false"
             :poster="videoPostSrc"
             :src="videoSrc"
             :autoplay="true"
             @play="showVideoBtn = false"
             @pause="showVideoBtn = true"
             @Ended="showVideoBtn = true" />
      <image src="@/img/cancel.png" class="close" mode="widthFix" @tap="hideVideo" />
      <image src="@/img/play.png" class="play" mode="widthFix" @tap="playVideo" v-if="showVideoBtn" />
    </view>

  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'
import emoji from './modules/emoji'
import { chatMixin } from './mixins/chat'
import { audioMixin } from './mixins/media'
import { imgSrc } from '@/config'

export default {
  name: 'Index',
  components: {
    item,
    emoji
  },
  mixins: [chatMixin, audioMixin],
  computed: {
    chatGoods () {
      return this.$store.state.chatGoods
    }
  },
  data () {
    return {
      imgSrc,
      contents: '',
      currentTool: '',
      showVoice: false,
      isFous: false
    }
  },
  watch: {
    currentTool (val) {
      setTimeout(() => {
        console.log('currentTool', val)
        this.pageScrollTo()
      }, 150)
    }
  },
  methods: {
    // 输入框聚焦
    inputFocus () {
      console.log('inputFocus')
      this.isFous = true
    },
    onfocus () {
      console.log('onfocus')
      this.currentTool = ''
      this.isFous = true
    },
    onBlur () {
      console.log('onBlur')
      this.isFous = false
    },
    openEmoji () {
      console.log('openEmoji')
      this.currentTool = 'emoji'
      this.isFous = false
      this.showVoice = false
      Taro.hideKeyboard()
    },
    hideVoice () {
      this.showVoice = false
      this.isFous = true
    },
    tapVoice () {
      this.showVoice = true
      this.currentTool = ''
    },
    // 插入表情
    insertImg (img) {
      this.contents += img
    },
    // 输入框内容回退
    delMsg () {
      let len = 0
      for (const s of this.contents) {
        len = s.length
      }
      this.contents = this.contents.substr(0, this.contents.length - len)
    },
  },
  onReady () {
    console.log('chatroom onReady')
    this.audioInit()
    this.recordInit()
    this.videoInit()
  },
  onShow () {
    console.log('chatroom onShow', this.isConnect)
    if (this.isConnect) return
    this.connect()
  },
  onHide () {
    console.log('chatroom onHide')
  },
  beforeDestroy () {
    console.log('chatroom beforeDestroy')
    this.$store.commit('SET_CHATGOODS', {})
    this.leaveRoom()
  },
  onPullDownRefresh () {
    if (!this.noHistory) {
      this.reqHistory()
    }
  },
  onLoad (options) {
    console.log('chatroom onload')
    this.chartInfo.storeAccount = options.account || 'dev4'
    this.shopId = options.shopId || 'dev4'
    const title = options.title || '客服'
    Taro.setNavigationBarTitle({
      title
    })
  }
}
</script>

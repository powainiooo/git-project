<template>
  <view class="Chat">
    <!--  消息列表  -->
    <view class="Chat-list" @tap="currentTool = ''">
      <item v-for="item in mesList"
            :key="item.id"
            :record="item"
            :info="chartInfo"
            :playId="playId"
            @play="onplay" />
    </view>
    <view id="msgBottom" class="h2"></view>

    <!--  底部操作栏  -->
    <view class="footer-container footer-chat"
          id="footer"
          :class="{'footer-chat-show': currentTool !== ''}">
      <!--  输入框和按钮  -->
      <view class="acenter Chat-footer">
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="showVoice" @tap="showVoice = false" />
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" v-else @tap="showVoice = true" />

        <view class="btn"
              v-if="showVoice"
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
               @confirm="sendTxtMsg"
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
               @send="sendTxtMsg" v-show="currentTool !== 'tools'" />
        <!--  工具栏  -->
        <view class="tools" v-show="currentTool === 'tools'">
          <view class="tools-item" @tap="selectImg">
            <view class="center"><image src="@/img/picture.png" mode="widthFix" class="w24" /></view>
            <view class="name">照片</view>
          </view>
          <view class="tools-item">
            <view class="center"><image src="@/img/camera.png" mode="widthFix" class="w24" /></view>
            <view class="name">照片</view>
          </view>
        </view>
      </view>
      <view class="bottom-cover"></view>
    </view>

    <!--  语音录制提示  -->
<!--    <audio-hint ref="audioHint" :cancel="isCancel" />-->
    <view class="video-frame center" v-show="showVideo">
      <video id="video" :src="videoSrc" />
      <image src="@/img/cancel.png" mode="widthFix" @tap="hideVideo" />
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

export default {
  name: 'Index',
  components: {
    item,
    emoji
  },
  mixins: [chatMixin, audioMixin],
  data () {
    return {
      contents: '',
      currentTool: '',
      showVoice: false,
      isFous: false
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
      Taro.hideKeyboard()
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
    this.audioInit()
    this.recordInit()
    this.videoInit()
  },
  onShow () {
    if (this.isConnect) return
    this.connect()
  },
  onHide () {
    Taro.closeSocket()
  },
  onPullDownRefresh () {
    if (!this.noHistory) {
      this.reqHistory()
    }
  },
  onLoad (options) {
    this.chartInfo.storeAccount = options.account || 'dev4'
  }
}
</script>

<template>
  <view class="Chat">
    <!--  消息列表  -->
    <view class="Chat-list" @tap="showEmoji = false">
      <item v-for="item in mesList"
            :key="item.id"
            :record="item"
            :info="chartInfo"
            :playId="playId"
            @play="onplay" />
    </view>

    <!--  底部操作栏  -->
    <view class="footer-container footer-chat"
          id="footer"
          :class="{'footer-chat-show': showEmoji}">
      <!--  输入框和按钮  -->
      <view class="acenter Chat-footer">
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="showVoice" @tap="showVoice = false" />
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" v-else @tap="showVoice = true" />

        <view class="btn"
              v-if="showVoice"
              @touchstart="startRecord"
              @touchmove="tmove"
              @touchend="stopRecord">按住 说话</view>

        <input v-model="contents"
               ref="input"
               :focus="isFous"
               confirmType="send"
               confirm-type="send"
               @blur="onBlur"
               @focus="onfocus"
               @confirm="sendTxtMsg"
               v-else/>
        <image src="@/img/face.png" mode="widthFix" class="w24 mr8" v-if="!showEmoji" @tap="openEmoji" />
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="showEmoji" @tap="inputFocus" />
        <image src="@/img/add3.png" mode="widthFix" class="w24" />
      </view>
      <!--  表情栏  -->
      <emoji :disabled="contents === ''"
             @insert="insertImg"
             @del="delMsg"
             @send="sendTxtMsg" />
    </view>

    <!--  语音录制提示  -->
    <audio-hint ref="audioHint" :cancel="isCancel" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'
import emoji from './modules/emoji'
import audioHint from './modules/audioHint'
import { chatMixin } from './mixins/chat'
import { audioMixin } from './mixins/audio'

export default {
  name: 'Index',
  components: {
    item,
    emoji,
    audioHint
  },
  mixins: [chatMixin, audioMixin],
  data () {
    return {
      contents: '',
      showEmoji: false,
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
      this.showEmoji = false
      this.isFous = true
    },
    onBlur () {
      console.log('onBlur')
      this.isFous = false
    },
    openEmoji () {
      console.log('openEmoji')
      this.showEmoji = true
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
  },
  onShow () {
    if (this.isConnect) return
    this.connect()
  },
  onHide () {
    Taro.closeSocket()
  },
  onLoad (options) {
    this.chartInfo.storeAccount = options.account || 'dev4'
  }
}
</script>

<template>
  <view class="Chat">
    <view class="Chat-list" @tap="showEmoji = false">
      <item v-for="item in mesList"
            :key="item.id"
            :record="item"
            :info="chartInfo" />
    </view>

    <view class="footer-container footer-chat"
          id="footer"
          :class="{'footer-chat-show': showEmoji}">
      <view class="acenter Chat-footer">
        <image src="@/img/keyboard.png" mode="widthFix" class="w24 mr8" v-if="showVoice" @tap="showVoice = false" />
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" v-else @tap="showVoice = true" />
        <view class="btn" v-if="showVoice">按住 说话</view>
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
      <emoji :disabled="contents === ''"
             @insert="insertImg"
             @del="delMsg"
             @send="sendTxtMsg" />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'
import emoji from './modules/emoji'
import { wsUrl } from '@/config'
import { formatDate } from "@/utils"

export default {
  name: 'Index',
  components: {
    item,
    emoji
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      isConnect: false,
      mesList: [],
      chartInfo: {
        myAccount: '',
        myAvatar: '',
        storeAccount: '',
        storeAvatar: ''
      },
      contents: '',
      showEmoji: false,
      showVoice: false,
      isFous: false
    }
  },
  methods: {
    // 创建连接
    connect () {
      Taro.connectSocket({
        url: wsUrl,
        success: (task) => {
          console.log('connect success', task)
          this.isConnect = true
        }
      })
      Taro.onSocketOpen(res => {
        console.log('onSocketOpen', res)
        this.login()
      })
      this.onMessages()
      Taro.onSocketError(res => {
        console.log('onSocketError', res)
      })
      Taro.onSocketClose(res => {
        console.log('onSocketClose', res)
        this.isConnect = false
      })
    },
    // 统一发送消息
    send (key, data, cb) {
      console.log('----------send------------', key, data)
      Taro.sendSocketMessage({
        data: JSON.stringify(data),
        success: res => {
          console.log(`${key} suc`, res)
          if (typeof cb === 'function') {
            cb()
          }
        },
        fail: err => {
          console.log(`${key} fail`, err)
        }
      })
    },
    // 统一消息接收
    onMessages () {
      Taro.onSocketMessage(result => {
        console.log('onSocketMessage', result)
        const res = JSON.parse(result.data)
        if (res.code === 0) {
          switch (res.query) {
            case 'login': // 登录结果
              this.enter();
              break;
            case 'chats': // 聊天记录结果
              this.getCharts(res.data);
              break;
            case 'sync_read': // 已读状态改变
              this.setAllRead();
              break;
            case 'sync_chat': // 已读状态改变
              this.setAllRead();
              break;
            case 'user_message': // 接受店家消息
              this.getUserMessage(res);
              break;
          }
        } else {
          Taro.showToast({
            title: res.msg
          })
        }
      })
    },
    // 登录
    login () {
      const data = {
        "appid": this.userInfo.chat_appid,
        "query":"login",
        "data":{
          "account": this.userInfo.chat_account,
          "password": this.userInfo.chat_password,
          "source": 3
        }
      }
      this.chartInfo.myAccount = this.userInfo.chat_account
      this.send('login', data)
    },
    // 进入聊天室
    enter () {
      const data = {"query":"enter_chats","data":{"account": this.chartInfo.storeAccount}}
      this.send('enter_chats', data, () => {
        this.reqCharts()
      })
    },
    // 请求聊天记录
    reqCharts () {
      const data = {
        "query": "chats",
        "data":{
          "account": this.chartInfo.storeAccount
        }
      }
      this.send('reqCharts', data)
    },
    // 处理聊天记录
    getCharts (data) {
      // console.log('getCharts', data, JSON.stringify(data))
      this.chartInfo.myAvatar = data.my_avatar
      this.chartInfo.storeAvatar = data.target_avatar
      if (this.mesList.length !==0) {
        const date1 = new Date(this.mesList[this.mesList.length - 1].created_at).getTime()
        const date2 = new Date(data.list[0].created_at).getTime()
        if (date2 > date1 + 10 * 60 * 1000) { // 时间相隔十分钟
          data.list[0].beforeDate = date1
        }
      }
      this.mesList = this.mesList.concat(data.list)
      setTimeout(() => {
        Taro.pageScrollTo({
          selector: `#item${this.mesList[this.mesList.length - 1].message_id}`
        })
      }, 50)
    },
    // 发送文本消息
    sendTxtMsg () {
      const mes = {
        "type": "txt",
        "content": this.contents
      }
      const data = {
        "query":"send",
        "data":{
          "account": this.chartInfo.storeAccount,
          "message": mes
        }
      }
      this.send('send', data, () => {
        this.contents = ''
        this.addMessage('my', mes)
      })
    },
    // 设置已读
    setAllRead () {
      this.mesList.forEach(i => {
        i.is_read = 1
      })
    },
    // 添加消息
    addMessage (status, data, id) {
      if (!id) {
        id = parseInt(Math.random() * 100000)
      }
      let from
      let to
      if (status === 'store') {
        from = this.chartInfo.storeAccount
        to = this.chartInfo.myAccount
      } else if (status === 'my') {
        from = this.chartInfo.myAccount
        to = this.chartInfo.storeAccount
      }
      this.mesList.push({
        message_id: id,
        "from_account": from,
        "to_account": to,
        "message": data,
        "is_read": 0,
        "created_at": formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
      })
    },
    // 接受店家消息
    getUserMessage (res) {
      console.log('getUserMessage', res)
      this.addMessage('store', res.data.message, res.message_id)
    },
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
    }
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

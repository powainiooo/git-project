<template>
  <view class="Chat">
    <view class="Chat-list">
      <item v-for="item in mesList"
            :key="item.id"
            :record="item"
            :info="chartInfo" />
    </view>

    <view class="footer-container" style="background-color: #F5F6F7">
      <view class="acenter Chat-footer">
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" />
        <input v-model="contents" @confirm="sendTxtMsg"/>
        <image src="@/img/face.png" mode="widthFix" class="w24 mr8" />
        <image src="@/img/add3.png" mode="widthFix" class="w24" />
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'
import { wsUrl } from '@/config'
import { formatDate } from "@/utils"

export default {
  name: 'Index',
  components: {
    item
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
      contents: ''
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
          selector: `#item${this.mesList[this.mesList.length - 1].id}`
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
        id,
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

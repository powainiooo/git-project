import Taro from '@tarojs/taro'
import { wsUrl } from '@/config'
import { formatDate } from "@/utils"

export const chatMixin = {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      isConnect: false,
      noHistory: false,
      mesList: [],
      shopId: '',
      showChatGoods: false,
      chartInfo: {
        myAccount: '',
        myAvatar: '',
        storeAccount: '',
        storeAvatar: ''
      },
      needFix: true, // 图片加载完成后会调用滚动方法  但是加载历史消息的时候不需要触发
    }
  },
  methods: {
    // 创建连接
    connect () {
      console.log('connect', wsUrl)
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
        this.onMessages()
      })
      Taro.onSocketError(res => {
        console.log('onSocketError', res)
      })
      Taro.onSocketClose(res => {
        console.log('onSocketClose', res)
        Taro.offSocketMessage();
        Taro.offSocketError();
        Taro.offSocketOpen();
        Taro.offSocketClose();
        this.recordCtx.offStop()
        this.recordCtx.offStart()
        this.recordCtx.offPause()
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
        // console.log('onSocketMessage', result)
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
              this.setAllRead(res.data.is_read);
              break;
            case 'sync_chat': // 已读状态改变
              this.setAllRead();
              break;
            case 'user_message': // 接受店家消息
              this.getUserMessage(res);
              break;
            case 'sync_say': // 多客户端同步
              this.getSyncMessage(res);
              break;
            case 'history_chats': // 接受历史聊天记录
              this.getHistory(res.data);
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
        if (this.chatGoods.goods_id) {
          this.reqRobotMsg()
          this.showChatGoods = true
          setTimeout(() => {
            this.showChatGoods = false
          }, 3000)
        }
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
      console.log('getCharts', data)
      this.chartInfo.myAvatar = data.my_avatar
      this.chartInfo.storeAvatar = data.target_avatar

      data.list.forEach((item, index) => {
        if (index !== 0) {
          item.beforeDate = data.list[index - 1].created_at
        } else {
          item.beforeDate = item.created_at
        }
      })
      this.mesList = data.list
      this.pageScrollTo()
    },
    // 移动滚动条
    pageScrollTo (id) {
      console.log('pageScrollTo', this.needFix)
      if (!this.needFix) return
      setTimeout(() => {
        Taro.pageScrollTo({
          selector: id ? `#item${id}` : '#msgBottom',
          // scrollTop: 10000,
          duration: 100
        })
      }, 10)
    },
    // 发送文本消息
    sendTxtMsg (txt, cb) {
      const mes = {
        "type": "txt",
        "content": txt || this.contents
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
        if (typeof cb === 'function') {
          cb()
        }
      })
    },
    // 发送语音消息
    sendAudioMsg (content) {
      const mes = {
        "type": "audio",
        "content": content
      }
      const data = {
        "query":"send",
        "data":{
          "account": this.chartInfo.storeAccount,
          "message": mes
        }
      }
      this.send('send', data, () => {
        this.addMessage('my', mes)
      })
    },
    // 发送图片消息
    sendImgMsg (content) {
      const mes = {
        "type": "img",
        "content": content
      }
      const data = {
        "query":"send",
        "data":{
          "account": this.chartInfo.storeAccount,
          "message": mes
        }
      }
      this.send('send', data, () => {
        this.addMessage('my', mes)
      })
    },
    // 发送视频消息
    sendVideoMsg (content) {
      const mes = {
        "type": "video",
        "content": content
      }
      const data = {
        "query":"send",
        "data":{
          "account": this.chartInfo.storeAccount,
          "message": mes
        }
      }
      this.send('send', data, () => {
        this.addMessage('my', mes)
      })
    },
    // 发送商品消息
    sendGoodsMsg (content) {
      const mes = {
        "type": "goods",
        "content": '商品',
        data: {...this.chatGoods}
      }
      const data = {
        "query":"send",
        "data":{
          "account": this.chartInfo.storeAccount,
          "message": mes
        }
      }
      this.send('send', data, () => {
        this.showChatGoods = false
        this.addMessage('my', mes)
        this.$store.commit('SET_CHATGOODS', {})
      })
    },
    // 获取机器人消息
    reqRobotMsg (content) {
      const data = {
        "query":"robot",
        "data":{
          "account": this.chartInfo.storeAccount,
          "shop_id": this.shopId,
          "api_token": this.$store.state.token
        }
      }
      this.send('send', data)
    },
    // 发送机器人消息
    sendRobotMsg (content) {
      const data = {
        "query":"robot",
        "data":{
          "account": this.chartInfo.storeAccount,
          "shop_id": this.shopId,
          "content": content
        }
      }
      this.send('send', data)
    },
    // 设置已读
    setAllRead (isRead = 1) {
      if (isRead === 0) return
      this.mesList.forEach(i => {
        i.is_read = isRead
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
      const beforeMsg = this.mesList[this.mesList.length - 1]
      this.mesList.push({
        message_id: id,
        beforeDate: beforeMsg ?  beforeMsg.created_at : '',
        "from_account": from,
        "to_account": to,
        "message": data,
        "is_read": 0,
        "created_at": formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
      })
      this.needFix = true
      this.pageScrollTo()
    },
    // 接受店家消息
    getUserMessage (res) {
      // console.log('getUserMessage', res)
      this.addMessage('store', res.data.message, res.message_id)
    },
    // 接受同步消息
    getSyncMessage (res) {
      // console.log('getSyncMessage', res)
      this.addMessage('my', res.data.message, res.message_id)
    },
    // 请求历史记录
    reqHistory () {
      const data = {
        "query": "history_chats",
        "data":{
          "start_id": this.mesList[0].message_id,
          "limit": 20,
          "account": this.chartInfo.storeAccount
        }
      }
      this.send('reqHistory', data)
    },
    // 处理历史记录
    getHistory (data) {
      // console.log('getHistory', data, JSON.stringify(data))
      Taro.stopPullDownRefresh()
      this.mesList = data.list.concat(this.mesList)
      this.mesList.forEach((item, index) => {
        if (index !== 0) {
          item.beforeDate = this.mesList[index - 1].created_at
        } else {
          item.beforeDate = item.created_at
        }
      })
      this.needFix = false
      this.pageScrollTo(data.list[data.list.length - 1].message_id)
    },
    // 处理机器人消息
    onSend (data) {
      this.sendTxtMsg(data.question, () => {
        this.sendRobotMsg(data.answer)
      })

    },
    // 离开聊天室
    leaveRoom () {
      const data = {
        "query":"leave_chats",
        "data":{
          "account": this.chartInfo.storeAccount
        }
      }
      this.send('leaveRoom', data, () => {
        Taro.closeSocket({
          success (res) {
            console.log('closeSocket success', res)
          },
          fail (res) {
            console.log('closeSocket fail', res)
          },
          complete (res) {
            console.log('closeSocket complete', res)
          }
        })
      })
    }
  }
}

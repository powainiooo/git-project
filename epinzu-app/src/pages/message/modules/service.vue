<style scoped>

</style>

<template>
<scroll-view class="Message-page" :scroll-y="true" @ScrollToLower="reachBottom">
  <!-- 空提示 -->
  <view class="empty mt60" v-if="false">
    <image src="@/img/mes.png" mode="widthFix" class="img" />
    <view class="txt">您还没有聊天消息</view>
  </view>

  <!-- 列表 -->
  <view class="Message-list">
    <view class="item borderB">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="between mb4">
          <view>在线客服1</view>
          <view class="f10 c-999">刚刚</view>
        </view>
        <view class="between">
          <view class="content">亲，打扰您了，看您在我们家买的宝贝收到买的宝贝收到</view>
          <view class="dot-num">2</view>
        </view>
      </view>
    </view>
  </view>
</scroll-view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { wsUrl } from '@/config'
import swiperCell from '@/c/common/swiperCell.vue'

export default {
	name: 'app',
  components: {
    swiperCell
  },
	data() {
		return {
		  isConnect: false,
      page: 1,
      dataSource: []
    }
	},
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
	methods: {
    reachBottom (e) {
      console.log('reachBottom', e)
    },
    connect () {
      if (this.isConnect) return
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
      Taro.onSocketMessage(result => {
        console.log('onSocketMessage', result)
        const res = JSON.parse(result.data)
        if (res.code === 0) {
          switch (res.query) {
            case 'login':
              this.getListData();
              break;
            case 'users':
              this.receive(res.data);
              break;
          }
        } else {
          Taro.showToast({
            title: res.msg
          })
        }
      })
      Taro.onSocketError(res => {
        console.log('onSocketError', res)
      })
      Taro.onSocketClose(res => {
        console.log('onSocketClose', res)
      })
    },
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
      Taro.sendSocketMessage({
        data: JSON.stringify(data),
        success: res => {
          console.log('login suc', res)
        },
        fail: err => {
          console.log('login fail', err)
        }
      })
    },
    getListData () {
      const data = {
        "query": "users",
        "data":{
          "page": this.page,
          "limit": 20
        }
      }
      Taro.sendSocketMessage({
        data: JSON.stringify(data),
        success: res => {
          console.log('getListData suc', res)
        },
        fail: err => {
          console.log('getListData fail', err)
        }
      })
    },
    receive (list) {
      this.dataSource = this.dataSource.concat(list)
    }
  }
}
</script>

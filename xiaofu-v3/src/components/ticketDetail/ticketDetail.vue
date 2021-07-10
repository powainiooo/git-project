<style>
.c-ticket-detail {
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #EEEEEF;
}
.c-ticket-detail .c-ticket-title {
  margin: 48px 0 28px 38px;
  font-size: 24px;
  line-height: 36px;
}
.c-ticket-detail .c-ticket-title span {
  font-size: 26px;
  font-family: HelveB;
  margin-right: 16px;
}

.c-ticket-operates {
  width: 700px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 130px;
  left: 25px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all .5s cubic-bezier(.3,.79,.41,.91);
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) .2s both;
}
.c-ticket-operates-bottom {
  top: calc(100vh - 170px);
  background-color: #ffffff;
}
.c-ticket-operates .price {
  width: 565px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 52px;
  color: #ffffff;
  font-size: 48px;
  font-family: HelveB;
}
.c-ticket-operates-bottom .price {
  color: #000000;
}
.c-ticket-operates .price span {
  font-size: 20px;
  font-family: HelveL;
  margin: 18px 0 0 5px;
}
.c-ticket-operates button {
  width: 135px;
  height: 100px;
  background: linear-gradient(159deg, #0027AF 0%, #2154DA 53%, #003AC3 100%);
  border-radius: 0px 20px 20px 0px;
  font-size: 26px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-ticket-operates button[disabled] {
  background: #DBDCDC;
  color: #ffffff;
}
.c-ticket-operates .hint {
  padding-left: 52px; color: #ffffff; font-size: 26px;
}
.c-ticket-operates .hint div { font-size: 20px; }
.c-ticket-operates .hint div span { font-family: HelveB; }

.form-list li {
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-bottom: 20px;
}
.form-list li .rank {
  width: 80px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
}
.form-list li .rank img {
  width: auto;
  height: 54px;
}
.form-list li .content {
  width: 625px;
  height: 100px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  position: relative;
}
.form-list li .active {
  background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%);
}
.form-list li .disabled {
  background: #DBDCDC;
}
.form-list li .content input {
  flex: 1;
  height: 100%;
  line-height: 100px;
  font-size: 24px;
  padding-left: 20px;
  box-sizing: border-box;
  border: none;
}
.form-list li .active input {
  color: #ffffff;
}
.form-list li .content button {
  width: 100px;
  height: 100px;
  border-radius: 0;
  background-color: transparent;
}
.form-list li .content button img {
  width: 100%;
  height: 100%;
}
.form-list li .content .nums {
  position: absolute;
  top: 10px;
  right: 69px;
  font-size: 16px;
  color: #ffffff;
}
.form-list li .content .nums span {
  font-size: 32px;
  font-family: HelveL;
  margin-right: 4px;
}

.buy-forms { width: 100%; height: 100vh; background-color: #EEEEEF; transition: top .5s cubic-bezier(.3,.79,.41,.91); position: fixed; top: 0; left: 0; z-index: 10; padding-top: 100px; box-sizing: border-box; overflow-y: auto; }
/*.buy-forms .buys-frame { width: 100%; position: absolute; left: 0; bottom: 0; }*/

@keyframes moveUp {
  0% { transform: translateY(140px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>

<template>
<!--scroll-y-->
<!--scroll-with-animation-->
<!--:scroll-top="scrollTop"-->
<!--@touchend="ontend"-->
<!--@scroll="onScroll"-->
<!--:style="{-->
<!--height: (page === 'buy' ? buyHeight : 0) + 'px',-->
<!--'min-height': (showInfos ? 'auto' : 'calc(100vh - 100px)')-->
<!--}"-->
<div
  class="c-ticket-detail">

  <scroll-view scroll-y class="buy-forms" :style="{top: showInfos ? '-100vh' : 0}" @touchmove.stop="tmove">
    <information :needIDcard="record.id_card_flag === 1" :needAddress="record.ticket_type === 2" @change="getValue" />
    <c-select :list="record.price || []" @change="getValue" />
  </scroll-view>

  <div>
  <infos ref="infos" :record="record" move/>

  <artist ref="artist" :list="record.artist_list || []" v-if="record.artist_list.length > 0" />
  <notice ref="notice" :list="record.notice_list || []" v-if="record.notice_list.length > 0" />
  <particulars ref="particulars" :list="record.intro_list || []" v-if="record.intro_list.length > 0" />
  <organizers ref="organizers" :record="record.organizer" />
  <recommend ref="recommend" :list="record.recommend_tickets" v-if="record.recommend_tickets.length > 0" />
  </div>

  <div class="c-ticket-operates" :class="{'c-ticket-operates-bottom': page === 'buy'}">
    <div class="price" v-if="record.sub_state != 6">{{price}}<span>RMB</span></div>
    <div class="hint" v-else>
      <p>未开售</p>
      <div>开票时间: <span>{{saleTime}}</span></div>
    </div>
    <button @click="handleConfirm" :disabled="buyDisabled">{{btnName}}</button>
  </div>
</div>
</template>

<script type='es6'>
import infos from './infos'
import artist from './artist'
import notice from './notice'
import particulars from './particulars'
import organizers from './organizers'
import recommend from './recommend'
import information from './information'
import store from '@/store'
import cSelect from './select'
import { postAction, doLogin } from '@/utils/api'
import { formatDate } from '@/utils'

export default {
  name: 'app',
  components: {
    infos,
    artist,
    notice,
    particulars,
    organizers,
    recommend,
    information,
    cSelect
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    idCardReg () {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return reg.test(this.cardNo)
    },
    mobileReg () {
      const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      return reg.test(this.formData.mobile)
    },
    btnName () {
      const arr = ['审核中', '审核失败', '购买', '已停止', '已售罄', '已结束', '购买']
      return arr[this.record.sub_state]
    },
    buyDisabled () {
      if (this.page === 'detail') {
        return this.record.sub_state !== 2
      }
      if (this.formData.name === '' || !this.mobileReg || this.formData.price_id === '') {
        return true
      }
      if (this.record.id_card_flag === 1 && !this.idCardReg) {
        return true
      }
      if (this.record.ticket_type === 2 && this.formData.address === '') {
        return true
      }
      return false
    },
    price () {
      console.log('this.formData.price_id', this.formData.price_id ,this.formData.num)
      if (this.formData.price_id === '' && this.formData.num === 0) {
        return this.record.price[0].price
      } else {
        const item = this.record.price.find(i => i.id === this.formData.price_id)
        console.log('item', item)
        return Number(item.price) * this.formData.num
      }
    },
    saleTime () {
      const st = this.record.sale_start_time
      return st ? formatDate(new Date(st * 1000), 'yyyy-MM-dd HH:mm') : ''
    },
    hasUserInfo () {
      return store.state.token !== null
    }
  },
  data () {
    return {
      page: 'detail',
      formData: {
        name: '',
        mobile: '',
        identity_type: 1,
        price_id: '',
        address: '',
        num: 0
      },
      scrollTop: '',
      cardNo: '',
      buyHeight: 0,
      showInfos: true
    }
  },
  methods: {
    tmove (e) {},
    handleConfirm () {
      if (this.page === 'detail') {
        this.page = 'buy'
        this.$emit('toggle', this.page)
        this.showInfos = false
      } else if (this.page === 'buy') {
        this.handleBuy()
      }
    },
    handleBuy () {
      if (!this.hasUserInfo) {
        this.handleLogin()
        return false
      }
      const params = {...this.formData}
      if (params.identity_type === 1) {
        params.id_card_no = this.cardNo
      } else {
        params.passport_no = this.cardNo
      }
      params.ticket_id = this.record.id
      if (this.record.id_card_flag === 0) {
        delete params.id_card_no
        delete params.passport_no
        delete params.identity_type
      }
      if (this.record.ticket_type === 1) {
        delete params.address
      }
      console.log('params', params)
      postAction('/api/order/create', params).then(res => {
        const jsapi = res.data
        mpvue.requestPayment({
          'timeStamp': jsapi.timeStamp,
          'nonceStr': jsapi.nonceStr,
          'package': jsapi.package,
          'signType': jsapi.signType,
          'paySign': jsapi.paySign,
          'success': res => {
            mpvue.setStorageSync('nameVal', params.name)
            mpvue.setStorageSync('phoneVal', params.mobile)
            mpvue.setStorageSync('idnum', params.id_card_no)
            this.getMessageAuth()
          },
          'fail': err => {
            console.log('pay fail', err)
            mpvue.reLaunch({
              url: '/pages/result/main?result=fail'
            })
          }
        })
      })
    },
    backDetail () {
      this.showInfos = true
      this.page = 'detail'
    },
    getValue (data) {
      console.log('price_id', data)
      for (const key in data) {
        if (key === 'cardNo') {
          this.cardNo = data[key]
        } else {
          this.formData[key] = data[key]
        }
      }
    },
    onScroll (e) {
      this.scrollTop = ''
    },
    getMessageAuth () {
      console.log('发起订阅消息')
      wx.requestSubscribeMessage({
        tmplIds: [
          'WRge3txz54ZhpQ4md9mG0RHSdLSaMlcuW5TPTWUi_Xk',
          'Qr4BpwVZGPkOYqBHpPDryPuDZkmYoEEDPY-VMBpOGR8',
          'BCUfqqnuvWiwzYjvcQDKEUumjXsMioiEBKzl3chuE_w'
        ],
        success (res) {
          console.log('订阅消息成功')
          console.log(res)
          console.log('--------------------')
          mpvue.reLaunch({
            url: `/pages/result/main?result=success`
          })
        },
        fail (err) {
          console.log('订阅消息失败')
          console.log(err)
          console.log('--------------------')
          mpvue.reLaunch({
            url: `/pages/result/main?result=success`
          })
        }
      })
    },
    handleLogin () {
      mpvue.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          console.log(res)
          doLogin(res).then(res => {
            this.handleBuy()
          })
        }
      })
    },
  }
}
</script>

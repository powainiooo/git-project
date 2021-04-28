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
  justify-content: space-between;;
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
.c-ticket-operates div {
  width: 565px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 52px;
  color: #ffffff;
  font-size: 48px;
  font-family: HelveB;
}
.c-ticket-operates-bottom div {
  color: #000000;
}
.c-ticket-operates div span {
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
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  position: relative;
}
.form-list li .active {
  background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%);
}
.form-list li .content input {
  flex: 1;
  height: 100%;
  line-height: 100px;
  font-size: 24px;
  padding-left: 20px;
  box-sizing: border-box;
}
.form-list li .active input {
  color: #ffffff;
}
.form-list li .content button {
  width: 100px;
  height: 100px;
  border-radius: 0;
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

.buy-forms { width: 100%; height: 0; min-height: calc(100vh - 100px); transition: height .4s cubic-bezier(.3,.79,.41,.91); position: relative; overflow: hidden; }
.buy-forms .buys-frame { width: 100%; position: absolute; left: 0; bottom: 0; }

@keyframes moveUp {
  0% { transform: translateY(140px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>

<template>
<scroll-view
  scroll-y
  scroll-with-animation
  :scroll-top="scrollTop"
  @touchend="ontend"
  @scroll="onScroll"
  class="c-ticket-detail">

  <div class="buy-forms"
       :style="{
        height: (page === 'buy' ? buyHeight : 0) + 'px',
        'min-height': (showInfos ? 'auto' : 'calc(100vh - 100px)')
       }">
    <div class="buys-frame" id="buyFrame">
      <information @change="getValue" />
      <c-select :list="record.price || []" @change="getValue" />
    </div>
  </div>

  <div v-show="showInfos">
  <infos ref="infos" :record="record"/>

  <artist ref="artist" :list="record.artist_list || []" />
  <notice ref="notice" :list="record.notice_list || []" />
  <particulars ref="particulars" :list="record.intro_list || []" />
  <organizers ref="organizers" :record="record.organizer" />
  <recommend ref="recommend" :list="record.recommend_tickets" />
  </div>

  <div class="c-ticket-operates" :class="{'c-ticket-operates-bottom': page === 'buy'}">
    <div>260<span>RMB</span></div>
    <button @click="handleConfirm" :disabled="buyDisabled">购买</button>
  </div>
</scroll-view>
</template>

<script type='es6'>
import infos from './infos'
import artist from './artist'
import notice from './notice'
import particulars from './particulars'
import organizers from './organizers'
import recommend from './recommend'
import information from './information'
import cSelect from './select'
import { postAction } from '@/utils/api'
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
    buyDisabled () {
      if (this.page === 'detail') {
        return false
      }
      if (this.formData.name === '' || this.formData.mobile === '' || this.cardNo === '' || this.formData.price_id === '' || this.formData.num === 0) {
        return true
      }
      return false
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
        num: 0
      },
      scrollTop: '',
      cardNo: '',
      buyHeight: 0,
      showInfos: true
    }
  },
  methods: {
    handleConfirm () {
      if (this.page === 'detail') {
        if (this.buyHeight === 0) {
          const query = wx.createSelectorQuery()
          query.select('#buyFrame').boundingClientRect()
          query.selectViewport().scrollOffset()
          query.exec(res => {
            console.log(res)
            this.buyHeight = res[0].height
            this.page = 'buy'
            this.scrollTop = 0
            this.$emit('toggle', this.page)
          })
        } else {
          this.page = 'buy'
          this.scrollTop = 0
          this.$emit('toggle', this.page)
        }
        setTimeout(() => {
          this.showInfos = false
        }, 400)
      } else if (this.page === 'buy') {
        this.handleBuy()
      }
    },
    handleBuy () {
      const params = {...this.formData}
      if (params.identity_type === 1) {
        params.id_card_no = this.cardNo
      } else {
        params.passport_no = this.cardNo
      }
      params.ticket_id = this.record.id
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
            mpvue.reLaunch({
              url: '/pages/result/main?result=success'
            })
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
      if (data.key === 'cardNo') {
        this.cardNo = data.value
      } else {
        this.formData[data.key] = data.value
      }
    },
    onScroll (e) {
      this.scrollTop = ''
    }
  }
}
</script>

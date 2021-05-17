<style scoped>
.c-operates { width: 100%; height: 98px; background: #FFFFFF; border: 1px solid #E5E5E5; box-shadow: 0px 0px 8px 0px rgba(42, 72, 124, 0.19); position: fixed; bottom: 0; left: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-around; }
.c-operates .item { text-align: center; }
.c-operates .item img { width: 42px; height: 42px; display: block; margin-bottom: 2px; margin-left: auto; margin-right: auto; }
.c-operates .item span { font-size: 20px; line-height: 20px; }
.c-operates .item:first-child span { color: #F03C12; }
.c-operates .item:nth-child(2) span { color: #FFA200; }
.c-operates .item:nth-child(3) span { color: #FF005A; }
.c-operates .item:nth-child(4) span { color: #0096FF; }

.c-coin { width: 100%; height: 100vh; background-color: rgba(18, 18, 18, .4); position: fixed; top: 0; left: 0; z-index: 1000; display: flex; justify-content: center; align-items: center; }
.c-coin-frame { width: 645px; background-color: #FFFFFF; border-radius: 10px; overflow: hidden; }
.c-coin-frame .list { width: 470px; margin: 80px auto 0 auto; display: flex; flex-wrap: wrap; }
.c-coin-frame .list li { width: 138px; height: 70px; border: 1px solid #E15244; font-size: 28px; color: #E15244;  margin: 0 10px 30px 10px; }
.c-coin-frame .list li.active { background-color: #E15244; color: #FFFFFF; }
.c-coin-frame .list li p { font-size: 28px; color: #FEE51F; text-align: center; margin-top: -16px; line-height: 30px; }
.c-coin-frame .list li div { font-size: 24px; color: #FFBCBC; text-align: center; }
.c-coin-frame .ip { width: 560px; margin: 0 auto 80px auto; position: relative; }
.c-coin-frame .ip:after { content: '元';  font-size: 24px; color: #FFFFFF; position: absolute; top: 50%; right: 20px; transform: translateY(-50%); }
.c-coin-frame .ip input { width: 420px; height: 76px; border: 1px solid #D2D2D2; font-size: 24px; color: #333333; padding: 0 20px; }
.c-coin-frame .bt { width: 485px; height: 76px; line-height: 76px; display: block; border-radius: 40px; background: #E15244; margin: 0 auto 90px auto; font-size: 34px; color: #FFFFFF; }
</style>

<template>
<div class="c-operates">
   <div class="item" @click="func(1)">
      <img src="/static/images/footer/icon4.png" mode="aspectFit" v-if="record.dj_bool == '0'" />
      <img src="/static/images/footer/icon4-active.png" mode="aspectFit" v-if="record.dj_bool == '1'" />
      <span>点赞({{record.dj_num}})</span>
   </div>
   <div class="item" @click="func(3)">
      <img src="/static/images/footer/icon5.png" mode="aspectFit" v-if="record.sc_bool == '0'" />
      <img src="/static/images/footer/icon5-active.png" mode="aspectFit" v-if="record.sc_bool == '1'" />
      <span>收藏({{record.sc_num}})</span>
   </div>
   <div class="item" @click="toPage('/pages/feedback/main?id=' + id)">
      <img src="/static/images/footer/icon6.png" mode="aspectFit" />
      <span>建议({{record.fk_num}})</span>
   </div>
   <div class="item" @click="openReward">
      <img src="/static/images/footer/icon7.png" mode="aspectFit" />
      <span>打赏({{record.ds_num}})</span>
   </div>

   <div class="c-coin" v-if="showReward" @click="showReward = false">
      <div class="pr" @click.stop="c">
         <div class="c-coin-frame">
            <ul class="list">
               <li v-for="i in list"
                   :key="index"
                   class="center"
                   :class="{'active': i == price}"
                   @click="price = i">{{i}}元</li>
            </ul>
            <div class="ip acenter">
               <span class="mr10">其它金额</span>
              <input v-model="price" />
            </div>
            <button class="bt" @click="doPay">感谢并打赏</button>
         </div>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import {postAction} from '../utils/api'

export default {
  name: 'app',
  props: {
    id: String
  },
  data() {
    return {
      record: {
        dj_bool: '0',
        sc_bool: '0'
      },
      isAjax: false,
      price: '',
      list: [],
      showReward: false
    }
  },
  watch: {
    id (val) {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    toPage: mpvue.toPage,
    c () {},
    getData () {
      postAction('tj_count', {
        id: this.id
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    },
    func (type) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('tj', {
        id: this.id,
        type
      }).then(res => {
        this.isAjax = false
        if (res.ret === 0) {
          this.getData()
          if (type === 1) {
            mpvue.showToast({
              title: res.data === 1 ? '点赞成功' : '取消成功'
            })
          } else {
            mpvue.showToast({
              title: res.data === 1 ? '收藏成功' : '取消成功'
            })
          }
        }
      })
    },
    openReward () {
      postAction('pre_reward').then(res => {
        if (res.ret === 0) {
          this.list = res.data
          this.showReward = true
        }
      })
    },
    doPay () {
      if (this.price === '') {
        mpvue.showToast({
          title: '请选择金额',
          icon: 'none'
        })
        return
      }
      postAction('creat_order', {
        id: this.id,
        money: this.price
      }).then(res => {
        if (res.ret === 0) {
          this.handlePay(res.data)
        }
      })
    },
    handlePay (num) {
      mpvue.showLoading({
        title: '支付中'
      })
      postAction('pay', {
        order_num: num
      }).then(res => {
        if (res.ret === 0) {
          const jsapi = res.data
          mpvue.requestPayment({
            'timeStamp': jsapi.timeStamp,
            'nonceStr': jsapi.nonceStr,
            'package': jsapi.package,
            'signType': jsapi.signType,
            'paySign': jsapi.paySign,
            'success': res => {
              console.log('pay success', res)
              mpvue.hideLoading()
              this.getData()
              this.showReward = false
              mpvue.showToast({
                title: '支付成功'
              })
            },
            'fail': err => {
              console.log('pay fail', err)
              mpvue.hideLoading()
              mpvue.showToast({
                title: '支付失败',
                icon: 'none'
              })
            }
          })
        }
      })
    }
  },

}
</script>

<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="container">
   <c-header title="确认订单|Order confirmation" />
   <div class="">
      <info-card :itemData="formData" />
      <goods-list
         showDetail
         :source="source"
         :list="goodsList"
         :recommendList="recList"
         :orderType="orderType"
         :shipPrice="shipPrice"
         :title="title"
         :titleEn="titleEn" />
      <div class="hint-content" v-if="source === 'goods'">订单满{{amount}}元免运费（偏远地区除外），不满{{amount}}元则额外加收运费。</div>
      <div class="hint-content" v-else>所订购的猫盒套餐及推荐选购产品，每月将按以上产品清单及数量进行配送。</div>
   </div>

   <catbox-tips ref="tips" @close="tipsClose" />

   <c-footer :price="showTotalPrice" :btnName="btnName" @btnFunc="doSettle" />

   <c-goods-detail />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import infoCard from '../modules/infoCard'
import goodsList from '@/components/goodsList'
import cGoodsDetail from '@/components/goodsDetail'
import store from '../../../store'
import { getAction } from '@/utils/api'
import catboxTips from '../modules/catboxTips'

export default {
   components: {
      cHeader,
      cFooter,
      infoCard,
      goodsList,
      catboxTips,
      cGoodsDetail
   },
   computed: {
      catboxFormData () {
         return store.state.catboxFormData
      },
      totalPrice () {
         if (this.source === 'catbox') {
            const price1 = Number(this.orderType.pay_price) || 0
            const nums = this.orderType.nums || 0
            const price2 = this.recList.reduce((total, i) => total + i.pay_price * nums, 0)
            return price1 + price2
         } else if (this.source === 'goods') {
            const price = this.goodsList.reduce((total, i) => total + Number(i.price) * Number(i.buy_num), 0)
            return parseFloat(price.toFixed(1))
         }
      },
      showTotalPrice () {
         let shipPrice = this.shipPrice || 0
         return this.totalPrice + shipPrice
      }
   },
   data () {
      return {
         btnName: '结算|Settlement',
         source: '',
         title: '',
         titleEn: '',
         formData: {},
         goodsList: [],
         recList: [],
         orderType: {},
         shipPrice: '',
         amount: 0
      }
   },
   methods: {
      getCart () {
         getAction('get_shopping_cart', {
            token: store.state.token
         }).then(res => {
            this.goodsList = res.data
            this.getPostPrice()
         })
      },
      doSettle () {
         if (this.source === 'goods') {
            this.doPayGoods()
         } else if (this.source === 'catbox') {
            if (this.btnName === '付款|Payment') {
               this.doPayCatbox()
            } else {
               this.$refs.tips.show = true
               this.btnName = '付款|Payment'
            }
         }
      },
      tipsClose () {
         this.btnName = '结算|Settlement'
      },
      doPayGoods () {
         mpvue.showLoading({
            title: '支付中',
            mask: true
         })
         const params = { ...this.formData }
         console.log('params', params)
         params.token = store.state.token
         getAction('create_order', params).then(res => {
            mpvue.hideLoading()
            const orderNum = res.data.order_num
            const jsapi = res.data.jsapiparam
            this.pay(jsapi, orderNum)
         })
      },
      doPayCatbox () {
         mpvue.showLoading({
            title: '支付中',
            mask: true
         })
         const params = { ...this.formData, ...this.catboxFormData }
         params.token = store.state.token
         console.log('params', params)
         getAction('create_group_order', params).then(res => {
            mpvue.hideLoading()
            const orderNum = res.data.order_num
            const jsapi = res.data.jsapiparam
            this.pay(jsapi, orderNum)
         })
      },
      pay (jsapi, orderNum) {
         store.commit('SET_PAYPARAMS', {
            jsapi,
            orderNum
         })
         mpvue.requestPayment({
            'timeStamp': jsapi.timeStamp,
            'nonceStr': jsapi.nonceStr,
            'package': jsapi.package,
            'signType': jsapi.signType,
            'paySign': jsapi.paySign,
            'success': res => {
               this.doBuySuccess(orderNum)
               this.$refs.tips.show = false
            },
            'fail': err => {
               console.log('pay fail', err)
               this.$refs.tips.show = false
               mpvue.reLaunch({
                  url: '/pages/result/main?result=fail'
               })
            }
         })
      },
      doBuySuccess (orderNum) {
         this.getMessageAuth(orderNum)
         getAction('buy_success', {
            order_num: orderNum
         }).then(res => {
            mpvue.reLaunch({
               url: `/pages/result/main?result=suc&orderNum=${orderNum}&source=${this.source}`
            })
         })
      },
      doSendMsg (orderNum) {
         getAction('buy_send', {
            order_num: orderNum
         }).then(res => {
            console.log('发送订阅消息成功', res)
         })
      },
      getMessageAuth (orderNum) {
         console.log('发起订阅消息')
         const self = this
         wx.requestSubscribeMessage({
            tmplIds: [
               'gUczF-SZ04idnWNOWJtBOE0vJ0lG10YHc5rKHtDMfMM',
               'jLC6tRlLABE_ucZxioWLvNTa_0zBhZPWe6UqEv9HEC8'
            ],
            success (res) {
               console.log('订阅消息成功')
               console.log(res)
               console.log('--------------------')
               self.doSendMsg(orderNum)
            },
            fail (err) {
               console.log('订阅消息失败')
               console.log(err)
               console.log('--------------------')
            }
         })
      },
      getCatboxData () {
         mpvue.showLoading()
         getAction('group_info', {
            id: this.catboxFormData.group_id
         }).then(res => {
            mpvue.hideLoading()
            this.title = res.data.china_name
            this.titleEn = res.data.english_name
            this.goodsList = res.data.productlist
            this.orderType = res.data.pricelist[this.catboxFormData.price_id]
            this.getPostPrice()
         })
      },
      getRecData () {
         const ids = store.state.catboxFormData.recom_str.split('|').map(i => i.split('-')[0])
         getAction('recommend_product').then(res => {
            this.recList = res.data.filter(i => ids.includes(i.id))
         })
      },
      getPostPrice () {
         getAction('get_free_post').then(res => {
            this.amount = res.data.amount
            // console.log('this.totalPrice', this.totalPrice)
            getAction('get_post_fee', {
               province: this.formData.province
            }).then(res => {
               this.shipPrice = this.totalPrice >= this.amount ? 0 : res.data.fee
            })
         })
      }
   },
   onLoad (options) {
      store.commit('SET_GOODSDETAILSTATUS', false)
      Object.assign(this.$data, this.$options.data())
      this.source = options.source
      const fd = {...store.state.formData}
      if (this.source === 'goods') {
         this.getCart()
         this.title = '购物清单'
         this.titleEn = 'Shopping list'
         delete fd.day
      } else {
         this.getCatboxData()
         this.getRecData()
      }
      this.formData = fd
   }
}
</script>

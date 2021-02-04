<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="container">
   <c-header title="确认订单|Order confirmation" />
   <div class="">
      <info-card :itemData="formData" />
      <goods-list :list="cartList" title="购物清单" titleEn="Shopping list" />
      <div class="hint-content" v-if="source === 'goods'">订单满138元免运费（偏远地区除外），不满138元则额外加收运费。</div>
      <div class="hint-content" v-else>所订购的猫盒套餐及推荐选购产品，每月将按以上产品清单及数量进行配送。</div>
   </div>

   <catbox-tips ref="tips" @close="tipsClose" />

   <c-footer price="1740" :btnName="btnName" @btnFunc="doSettle" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import infoCard from '../modules/infoCard'
import goodsList from '@/components/goodsList'
import store from '../../../store'
import { getAction } from '@/utils/api'
import catboxTips from '../modules/catboxTips'

export default {
   components: {
      cHeader,
      cFooter,
      infoCard,
      goodsList,
      catboxTips
   },

   data () {
      return {
         btnName: '结算|Settlement',
         source: '',
         title: '',
         titleEn: '',
         formData: {},
         cartList: []
      }
   },
   methods: {
      getCart () {
         getAction('get_shopping_cart', {
            token: store.state.token
         }).then(res => {
            this.cartList = res.data
         })
      },
      doSettle () {
         if (this.source === 'goods') {
            this.doPay()
         } else {
            if (this.btnName === '付款|Payment') {
               this.doPay()
            } else {
               this.$refs.tips.show = true
               this.btnName = '付款|Payment'
            }
         }
      },
      tipsClose () {
         this.btnName = '结算|Settlement'
      },
      doPay () {
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
            mpvue.requestPayment({
               'timeStamp': jsapi.timeStamp,
               'nonceStr': jsapi.nonceStr,
               'package': jsapi.package,
               'signType': jsapi.signType,
               'paySign': jsapi.paySign,
               'success': res => {
                  this.doBuySuccess(orderNum)
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
      doBuySuccess (orderNum) {
         getAction('buy_success', {
            order_num: orderNum
         }).then(res => {
            mpvue.reLaunch({
               url: '/pages/result/main?result=suc&orderNum=' + orderNum
            })
         })
      },
      getMessageAuth () {
         console.log('发起订阅消息')
         const self = this
         wx.requestSubscribeMessage({
            tmplIds: [
               'CVJxO6GHDXC5rL4nzcXh63dc9i_DXDiEhBM5G5uyymI',
               'gUczF-SZ04idnWNOWJtBOFoqU-csBAqohK2DWb5WPcg'
            ],
            success (res) {
               console.log('订阅消息成功')
               console.log(res)
               console.log('--------------------')
               self.doSendMsg()
            },
            fail (err) {
               console.log('订阅消息失败')
               console.log(err)
               console.log('--------------------')
            }
         })
      }
   },
   onLoad (options) {
      this.source = options.source || 'catbox'
      this.formData = {...store.state.formData}
      this.getCart()
      if (this.source === 'goods') {
         this.title = '购物清单'
         this.titleEn = 'Shopping list'
      }
   }
}
</script>

<style>
page { background-color: rgb(248, 248, 248)}
h3.title { font-size: 28px; color: #656565; text-align: center; margin: 40px 0 30px 0;}

.hint-empty { width: 100%; height: 750px; background-color: #ffffff; margin: 20px 0 30px 0; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.hint-empty img { width: 505px; height: 325px; margin-bottom: 30px;}
.hint-empty p { font-size: 32px; color: #A5A5A5; line-height: 1; margin-bottom: 60px;}
.hint-empty .btn-round { width: 344px; background-color: #000000;}

.operas { padding: 0 32px 0 40px; height: 120px; background-color: #ffffff; display: flex; align-items: center; justify-content: space-between;}
.operas button { width: 140px; height: 60px; line-height: 60px; background-color: #ffffff; padding: 0; margin: 0; border: 2px solid #999999; border-radius: 30px; font-size: 32px; color: #262626;}

.gift-hint { margin: 30px 0; background-color: #ffffff; padding: 40px 80px 50px 40px;}
.gift-hint h3 { font-size: 32px; line-height: 1; color: #333333; display: flex; align-items: center; margin-bottom: 30px;}
.gift-hint h3 .sw { margin-right: 20px; margin-top: 5px;}
.gift-hint p { font-size: 24px; color: #747474; line-height: 40px;}

.preview-container { margin: 40px; position: relative;}
.preview-container::before { content: '祝福卡预览'; font-size: 32px; color: #333333; position: absolute; top: 22px; right: 30px;}
.preview-container>img { width: 670px; height: 380px; margin-bottom: 30px;}
.preview-container .form-item { padding: 30px; background-color: #ffffff; border: 1px solid #E9E9E9; font-size: 30px; color: #747474; line-height: 50px; margin-bottom: 30px; border-radius: 6px;}
.preview-container .form-item span { color: #353535; margin-right: 40px;}

.footer-operas { width: 100%; height: 120px; background-color: #ffffff; position: fixed; left: 0; bottom: 132px; z-index: 1000; display: flex; align-items: center; justify-content: space-between;}
.footer-operas h3 { color: #3A3A3A; font-size: 32px; margin-left: 50px;}
.footer-operas h3 span { font-size: 36px;}
.footer-operas div { margin-right: 20px; display: flex;}
.footer-operas div button { padding: 0; margin: 0; width: 200px; height: 84px; line-height: 84px; font-size: 32px; color: #ffffff; border-radius: 0; border: none; background-color: #3A3A3A}
.footer-operas div button:first-child { width: 210px; background-color: #F4F4F4; color: #3A3A3A;}
.footer-operas div button:after { border-radius: 0; border: none;}
</style>

<template>
<div style="padding-bottom: 260rpx">
   <template v-if="isEmpty">
   <div class="hint-empty">
      <img src="/static/images/shoppingCart/empty.png" />
      <p>购物车空空如也~</p>
      <a href="#" class="btn-round" @click="toIndex">去逛逛</a>
   </div>
   <div style="background-color: #ffffff; overflow: hidden;">
      <h3 class="title">猜你喜欢</h3>
      <div class="goods-list">
         <c-goods-item v-for="i in goodsList" :key="id" :itemData="i"/>
      </div>
   </div>
   </template>

   <template v-else>
   <div class="operas">
      <van-checkbox :value="checkAll" @change="checkAllChange" checked-color="#333333" icon-size="30rpx">
         全选
      </van-checkbox>
      <button @click="doDel">删除</button>
   </div>

   <van-checkbox-group :value="selected" @change="singleChange">
      <c-cart-item v-for="i in cartsList" :key="id" :itemData="i" :buyNum.sync="i.buy_num"/>
   </van-checkbox-group>

   <div class="gift-hint">
      <h3><van-switch :checked="giftCheck" @change="giftChange" size="28rpx" active-color="#333333" class="sw"/>此订单为礼品</h3>
      <p>这是一份礼品，您可以免费填写祝福语，我们会将祝福语印制在祝福卡上，并与所购商品及礼盒一起寄出。</p>
   </div>

   <div class="preview-container">
      <img src="/static/images/blessing/banner.png" />
      <div class="form-item"><span>To:</span>DENGCHUN</div>
      <div class="form-item" style="padding-bottom: 60rpx;"><span>Message:</span>
         Honey, happy holidays, this is my
         gift for you, do you like it? Looking forward to
         our meeting, love you
      </div>
      <div class="form-item"><span>From:</span>DENGCHUN</div>
   </div>

   <div class="footer-operas">
      <h3>总价：<span>￥{{totalPrice}}</span></h3>
      <div>
         <button>定制祝福卡</button>
         <button>立即购买</button>
      </div>
   </div>
   </template>

   <c-footer-nav active="cart"/>
</div>
</template>

<script>
import cGoodsItem from '@/components/goodsItem'
import cFooterNav from '@/components/footerNav'
import cCartItem from './modules/cartItem'
import { postAction } from '@/utils/api'

export default {
   components: { cGoodsItem, cFooterNav, cCartItem },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         isEmpty: true,
         checkAll: false,
         selected: [],
         cartsList: [],
         goodsList: [],
         giftCheck: true
      }
   },
   computed: {
      totalPrice () {
         let price = 0
         for (let i of this.cartsList) {
            if (this.selected.includes(i.id)) {
               price += parseFloat(i.price) / 100
            }
         }
         return price
      }
   },
   methods: {
      checkAllChange (e) {
         this.checkAll = e.mp.detail
         if (this.checkAll) {
            this.selected = this.cartsList.map(i => i.id)
         } else {
            this.selected = []
         }
      },
      singleChange (e) {
         this.selected = e.mp.detail
         this.checkAll = this.selected.length === this.cartsList.length
      },
      giftChange (e) {
         this.giftCheck = e.mp.detail
      },
      toIndex () {
         mpvue.reLaunch({
            url: '/pages/index/main'
         })
      },
      getData () {
         postAction('cart').then(res => {
            this.cartsList = res.data.list
            this.isEmpty = this.cartsList.length === 0
            this.goodsList = res.data.xg_list
         })
      },
      doDel () {
         if (this.selected.length === 0) {
            mpvue.showToast({title: '请选择商品', icon: 'none'})
            return false
         }
         mpvue.showModal({
            title: '提示',
            content: '是否确定删除',
            success: (res) => {
               if (res.confirm) {
                  postAction('cart_del', {
                     id: this.selected.join('|')
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '删除成功'})
                        this.getData()
                     }
                  })
               }
            }
         })
      }
   },

   onLoad () {
      this.getData()
      // let app = getApp()
   }
}
</script>

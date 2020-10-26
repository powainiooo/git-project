<style>

h2.title { font-size: 40px; color: #333333; font-weight: bold; line-height: 50px; margin: 20px 30px 30px 30px;}
h3.title { font-size: 28px; color: #656565; text-align: center; margin: 40px 0 30px 0;}

.line2 { display: flex; justify-content: space-between; align-items: center; margin: 0 40px 0 30px;}
.line2 .price { font-size: 54px; color: #D1A158; font-weight: bold;}
.line2 .price span { font-size: 40px;}
.line2 .last-price { font-size: 32px; color: #333333; text-decoration: line-through;}
.line2 .jifen { font-size: 32px; color: #333333;}
.line2 .btn-share { position: relative;}
.line2 .btn-share button { width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0;}
.line2 .btn-share img { width: 44px; height: 44px;}
.line2 .btn-share p { font-size: 20px; color: #333333; text-align: center;}

.type-list { border-top: 1px solid #CFCFCF; border-bottom: 1px solid #CFCFCF; overflow: hidden; padding: 0 30px; margin-top: 30px;}
.type-list h3 { font-size: 24px; color: #333333; margin-top: 20px; margin-bottom: 30px;}
.type-list ul { display: flex; flex-wrap: wrap; margin-bottom: 50px;}
.type-list ul li { padding: 0 20px; height: 50px; border: 1px solid #BFBFBF; font-size: 18px; color: #333333; display: flex; justify-content: center; align-items: center; margin-right: 50px; margin-bottom: 30px;}
.type-list ul li.active { border-color: #D1A158; color: #D1A158;}
.type-list ul li img { width: 42px; height: 42px;}

.pro-detail { font-size: 24px; color: #333333; margin: 50px 0;}
.pro-detail .img { width: 100%;}
/*.infos-list { margin: 40px 30px 60px 30px;}*/
/*.infos-list li { font-size: 24px; color: #333333; line-height: 50px;}*/

.footer-nav { width: 100%; height: 120px; display: flex; justify-content: space-between; background-color: #ffffff; position: fixed; left: 0; bottom: 0; z-index: 1000; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);}
.footer-nav button { border-radius: 0; border: none; background-color: transparent; padding: 0; margin: 0;}
.footer-nav button:after { border: none;}
.footer-nav .btn1 { width: 200px; display: flex; justify-content: space-around; align-items: center;}
.footer-nav .btn1 button { width: 52px; height: 52px; overflow: visible;}
.footer-nav .btn1 button img { width: 100%; height: 100%; display: block;}
.footer-nav .btn1 button span { width: 24px; height: 24px; border-radius: 50%; font-size: 18px; color: #ffffff; background-color: #3A3A3A; display: flex; justify-content: center; align-items: center; position: absolute; top: -10px; right: -10px;}
.footer-nav .btns>button { line-height: 120px; font-size: 32px; color: #ffffff;}
.footer-nav .btns { display: flex; position: relative;}
.footer-nav .btns>.btn2 { width: 160px; background-color: #F4F4F4; color: #3A3A3A;}
.footer-nav .btns>.btn3 { width: 190px; background-color: #606060;}
.footer-nav .btns>.btn4 { width: 210px; background-color: #3A3A3A;}
.footer-nav .btns>.auth-btns { width: 100%; height: 100%; position: absolute; top: 0; right: 0; opacity: 0;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <c-banner :list="bannerData"/>

   <h2 class="title">{{goodsInfo.goods_name}}</h2>

   <div class="line2">
      <div class="price"><span>￥</span>{{showPrice}}</div>
      <div class="last-price"><span>￥</span>{{showLastPrice}}</div>
      <div class="jifen">（购买可得{{jf}}积分）</div>
      <div class="btn-share">
         <img src="/static/images/goods/icon-share.png" />
         <p>分享</p>
         <button open-type="share">分享</button>
      </div>
   </div>

   <div class="type-list">
      <h3>请选择规格</h3>
      <ul>
         <li v-for="item in ggList"
             :key="attr_id"
             :class="{'active': attrId === item.attr_id}"
             @click="selectTypes(item)">
            <img :src="imgSrc + item.cover" mode="aspectFill" />
            {{item.attr_name}}
         </li>
      </ul>
   </div>

   <div class="pro-detail">
      <rich-text :nodes="desc"></rich-text>
   </div>

   <div style="background-color: #ffffff; overflow: hidden;">
      <h3 class="title">猜你喜欢</h3>
      <div class="goods-list">
         <c-goods-item v-for="i in goodsList" :key="id" :itemData="i"/>
      </div>
   </div>

   <div class="footer-nav">
      <div class="btn1">
         <button @click="toCart('')">
            <img src="/static/images/goods/icon-cart.png" />
            <span>{{cartNums}}</span>
         </button>
         <button open-type="contact">
            <img src="/static/images/goods/icon-message.png" />
         </button>
      </div>
      <div class="btns">
         <button class="btn2" @click="toCard" v-if="showGiftBtn">祝福卡</button>
         <button class="btn3" @click="addCart('add')">加入购物车</button>
         <button class="btn4" @click="addCart('buy')">立即购买</button>
         <button class="auth-btns" open-type="getUserInfo" @getuserinfo="getuserinfo" v-if="!hasSaveInfo">在线客服</button>
      </div>
   </div>
</div>
</template>

<script>
import cBanner from './modules/banner'
import cGoodsItem from '@/components/goodsItem'
import { postAction } from '@/utils/api'
import store from '../../store'

export default {
   components: { cBanner, cGoodsItem },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         id: 0,
         attrId: 0,
         attrPrice: 0,
         attrLastPrice: 0,
         bannerData: [],
         goodsInfo: {},
         ggList: {},
         goodsList: [],
         desc: '',
         cartNums: 0,
         jf: 0,
         isAjax: false,
         showGiftBtn: false
      }
   },
   computed: {
      showPrice () {
         if (this.attrId === 0) {
            if (this.goodsInfo.min_price === this.goodsInfo.max_price) {
               return parseFloat(this.goodsInfo.min_price) / 100
            } else {
               return `${parseFloat(this.goodsInfo.min_price) / 100}~${parseFloat(this.goodsInfo.max_price) / 100}`
            }
         } else {
            return this.attrPrice
         }
      },
      showLastPrice () {
         if (this.attrId === 0) {
            return parseFloat(this.goodsInfo.pre_price) / 100
         } else {
            return this.attrLastPrice
         }
      },
      hasSaveInfo () {
         return !Array.isArray(store.state.personalInfo)
      }
   },
   methods: {
      getData (id) {
         postAction('get_goods_details', {
            goods_id: id
         }).then(res => {
            this.goodsInfo = res.data.goods_info
            this.bannerData = res.data.goods_info.goods_img.split('|')
            this.ggList = res.data.gg_list
            // this.attrId = this.ggList[0].attr_id
            // this.attrPrice = parseFloat(data.price) / 100
            this.desc = handleImage(this.goodsInfo.goods_desc)
            console.log(this.desc)
            this.goodsList = res.data.xg_goods_list
            this.jf = res.data.jf
            this.cartNums = res.data.cart_nums
            this.showGiftBtn = res.data.is_show_gift !== 0
         })
      },
      selectTypes (data) {
         this.attrId = data.attr_id
         this.attrPrice = parseFloat(data.price) / 100
         this.attrLastPrice = parseFloat(data.pre_price) / 100
      },
      toCard () {
         mpvue.navigateTo({
            url: `/pages/blessing/main`
         })
      },
      toCart (id) {
         mpvue.navigateTo({
            url: `/pages/shoppingCart/main?id=${id}`
         })
      },
      addCart (status = 'add') {
         if (this.attrId === 0) {
            mpvue.showToast({ title: '请选择商品规格', icon: 'none' })
            return false
         }
         if (this.isAjax) return false
         this.isAjax = true
         postAction('cart_add', {
            id: this.id,
            attr_id: this.attrId,
            buy_num: 1
         }).then(res => {
            this.isAjax = false
            if (res.ret === 0) {
               if (status === 'add') {
                  mpvue.showToast({ title: '添加成功！' })
                  this.cartNums = res.data.nums
               } else if (status === 'buy') {
                  this.toCart(res.data.cart_id)
               }
            } else {
               mpvue.showToast({ title: res.msg, icon: 'none' })
            }
         })
      },
      getuserinfo (e) {
         const userInfo = e.mp.detail.userInfo
         postAction('save_userinfo', userInfo).then(res => {
            if (res.ret === 0) {
               store.commit('SET_PERSONINFO', userInfo)
            }
         })
      }
   },
   onShow () {
      // console.log('this.attrId', this.attrId)
      // console.log('this.isAjax', this.isAjax)
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      const id = options.id || '296'
      this.id = id
      this.getData(id)
      // console.log('goods detail onLoad', this)
      // let app = getApp()
   },
   onShareAppMessage () {
      return {
         title: this.goodsInfo.goods_name,
         path: `/pages/goodsDetail/main?id=${this.id}`
      }
   }
}

function handleImage (content) {
   var newStr = content.replace(/<img/ig, '<img class="img"')
   return newStr
}
</script>

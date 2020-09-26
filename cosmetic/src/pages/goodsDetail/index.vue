<style>

h2.title { font-size: 40px; color: #333333; font-weight: bold; line-height: 50px; margin: 20px 30px 30px 30px;}
h3.title { font-size: 28px; color: #656565; text-align: center; margin: 40px 0 30px 0;}

.line2 { display: flex; justify-content: space-between; align-items: center; margin: 0 40px 0 30px;}
.line2 .price { font-size: 54px; color: #D1A158; font-weight: bold;}
.line2 .price span { font-size: 40px;}
.line2 .jifen { font-size: 32px; color: #333333;}
.line2 .btn-share img { width: 44px; height: 44px;}
.line2 .btn-share p { font-size: 20px; color: #333333; text-align: center;}

.type-list { border-top: 1px solid #CFCFCF; border-bottom: 1px solid #CFCFCF; overflow: hidden; padding: 0 30px; margin-top: 30px;}
.type-list h3 { font-size: 24px; color: #333333; margin-top: 20px; margin-bottom: 30px;}
.type-list ul { display: flex; flex-wrap: wrap; margin-bottom: 50px;}
.type-list ul li { padding: 0 20px; height: 50px; border: 1px solid #BFBFBF; font-size: 18px; color: #333333; display: flex; justify-content: center; align-items: center; margin-right: 50px; margin-bottom: 30px;}

.infos-list { margin: 40px 30px 60px 30px;}
.infos-list li { font-size: 24px; color: #333333; line-height: 50px;}

.footer-nav { width: 100%; height: 120px; display: flex; background-color: #ffffff; position: fixed; left: 0; bottom: 0; z-index: 1000; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);}
.footer-nav button { border-radius: 0; border: none; background-color: transparent; padding: 0; margin: 0;}
.footer-nav button:after { border: none;}
.footer-nav .btn1 { width: 200px; display: flex; justify-content: space-around; align-items: center;}
.footer-nav .btn1 button { width: 52px; height: 52px; overflow: visible;}
.footer-nav .btn1 button img { width: 100%; height: 100%; display: block;}
.footer-nav .btn1 button span { width: 24px; height: 24px; border-radius: 50%; font-size: 18px; color: #ffffff; background-color: #3A3A3A; display: flex; justify-content: center; align-items: center; position: absolute; top: -10px; right: -10px;}
.footer-nav>button { line-height: 120px; font-size: 32px; color: #ffffff;}
.footer-nav .btn2 { width: 160px; background-color: #F4F4F4; color: #3A3A3A;}
.footer-nav .btn3 { width: 190px; background-color: #606060;}
.footer-nav .btn4 { width: 210px; background-color: #3A3A3A;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <c-banner :list="bannerData"/>

   <h2 class="title">{{goodsInfo.goods_name}}</h2>

   <div class="line2">
      <div class="price"><span>￥</span>{{goodsInfo.min_price === goodsInfo.max_price ? (goodsInfo.min_price / 100) : (goodsInfo.min_price / 100) + '~' + (goodsInfo.max_price / 100)}}</div>
      <div class="jifen">（购买可得{{jf}}积分）</div>
      <a href="javascript:;" class="btn-share">
         <img src="/static/images/goods/icon-share.png" />
         <p>分享</p>
      </a>
   </div>

   <div class="type-list">
      <h3>请选择规格</h3>
      <ul>
         <li v-for="item in ggList" :key="attr_id" @click="selectTypes(item)">{{item.attr_name}}</li>
      </ul>
   </div>

   <ul class="infos-list">
      <li>产品名称：HomeFacialPro</li>
      <li>品牌: HomeFacialPro</li>
      <li>品名: 低聚糖保湿乳液乳液/面霜</li>
      <li>品类: 乳液</li>
      <li>批准文号: 粤G妆网备字2019061795</li>
      <li>是否进口: 是</li>
      <li>国产功效: 清爽 保湿 滋润</li>
      <li>化妆品净含量: 118g</li>
      <li>规格类型: 正常规格</li>
      <li>是否限期使用日期范围: 2022-06-12至2022-06-12</li>
      <li>化妆品保质期: 36个月</li>
   </ul>

   <img src="/static/images/goods/img2.png" mode="widthFix" class="img_block"/>

   <div style="background-color: #ffffff; overflow: hidden;">
      <h3 class="title">猜你喜欢</h3>
      <div class="goods-list">
         <c-goods-item v-for="i in goodsList" :key="id" :itemData="i"/>
      </div>
   </div>

   <div class="footer-nav">
      <div class="btn1">
         <button>
            <img src="/static/images/goods/icon-cart.png" />
            <span>{{cartNums}}</span>
         </button>
         <button>
            <img src="/static/images/goods/icon-message.png" />
         </button>
      </div>
      <button class="btn2" @click="toCard">祝福卡</button>
      <button class="btn3" @click="addCart">加入购物车</button>
      <button class="btn4">立即购买</button>
   </div>
</div>
</template>

<script>
import cBanner from './modules/banner'
import cGoodsItem from '@/components/goodsItem'
import { postAction } from '@/utils/api'

export default {
   components: { cBanner, cGoodsItem },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         id: 0,
         attrId: '929',
         bannerData: [],
         goodsInfo: {},
         ggList: {},
         goodsList: [],
         cartNums: 0,
         jf: 0,
         isAjax: false
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
            this.goodsList = res.data.xg_goods_list
            this.jf = res.data.jf
            this.cartNums = res.data.cart_nums
         })
      },
      selectTypes (data) {},
      toCard () {
         mpvue.navigateTo({
            url: `/pages/blessing/main`
         })
      },
      addCart () {
         if (this.isAjax) return false
         this.isAjax = true
         postAction('cart_add', {
            id: this.id,
            attr_id: this.attrId,
            buy_num: 1
         }).then(res => {
            this.isAjax = false
            if (res.ret === 0) {
               mpvue.showToast({ title: '添加成功！' })
               this.cartNums = res.data.nums
            } else {
               mpvue.showToast({ title: res.msg, icon: 'none' })
            }
         })
      }
   },

   onLoad (options) {
      const id = options.id || '296'
      this.id = id
      this.getData(id)
      // let app = getApp()
   }
}
</script>

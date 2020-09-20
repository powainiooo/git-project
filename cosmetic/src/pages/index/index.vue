<style>
h2.title { font-size: 36px; color: #333333; text-align: center; margin: 100px 0 60px 0; line-height: 1;}
h3.title { font-size: 40px; color: #333333; font-weight: bold; text-align: center; margin: 44px 0 70px 0; line-height: 1;}

.integral-list { margin-bottom: 120px;}
.integral-list li { font-size: 22px; color: #333333; line-height: 70px; text-align: center;}
.integral-list li span { display: inline-block; width: 86px; height: 36px; border: 1px solid #3a3a3a; line-height: 36px; text-align: center; margin: 0 10px;}

.btns { width: 240px; margin: 100px auto 180px auto;}

.ad-frame { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, .8); z-index: 10000;}
.ad-frame .img { width: 500px; margin-bottom: 60px;}
.ad-frame .close { width: 92px;}
</style>

<template>
<div >
   <c-banner :list="bannerData"/>

   <h2 class="title">明星产品</h2>
   <c-goods-swiper :list="goodsListMX" />

   <h2 class="title">品牌介绍</h2>
   <img src="/static/images/index/img4.png" mode="widthFix" class="img_block"/>

   <h2 class="title">购买获积分</h2>
   <h3 class="title">积分可抵扣消费</h3>
   <ul class="integral-list">
      <li>1、每<span>100</span>积分可抵扣1元</li>
      <li>2、每消费<span>100</span>元可获得1积分</li>
      <li>3、积分抵扣订单金额比例上限为<span>100</span>%</li>
   </ul>
   <img src="/static/images/index/img2.png" mode="widthFix" class="img_block"/>

   <h2 class="title">会员权益</h2>
   <h3 class="title">加入XXXX会员</h3>
   <img src="/static/images/index/img2.png" mode="widthFix" class="img_block"/>
   <div class="btns"><a href="#" class="btn-round">立即注册</a></div>

   <div class="ad-frame" v-if="showAd">
      <img src="/static/images/index/img5.png" mode="widthFix" class="img"/>
      <img src="/static/images/index/guanbi@2x.png" mode="widthFix" class="close"/>
   </div>

   <c-footer-nav />
</div>
</template>

<script>
import cBanner from '@/components/banner'
import cGoodsSwiper from '@/components/goodsSwiper'
import cFooterNav from '@/components/footerNav'

export default {
   components: { cBanner, cGoodsSwiper, cFooterNav },
   data () {
      return {
         showAd: false,
         bannerData: [{}, {}, {}],
         goodsListMX: [{}, {}, {}]
      }
   },

   methods: {
   },

   created () {
      // let app = getApp()
   }
}
</script>

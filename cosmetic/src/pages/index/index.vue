<style>
h2.title { font-size: 36px; color: #333333; text-align: center; margin: 100px 0 60px 0; line-height: 1;}
h3.title { font-size: 40px; color: #333333; font-weight: bold; text-align: center; margin: 44px 0 70px 0; line-height: 1;}

.integral-list { margin-bottom: 120px;}
.integral-list li { font-size: 22px; color: #333333; line-height: 70px; text-align: center;}
.integral-list li span { display: inline-block; width: 86px; height: 36px; border: 1px solid #3a3a3a; line-height: 36px; text-align: center; margin: 0 10px;}

.btns { width: 100%; margin: 100px auto 180px auto;}
.btns a { margin-right: auto; margin-left: auto}

.ad-frame { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, .8); z-index: 10000;}
.ad-frame .img { width: 500px; margin-bottom: 60px;}
.ad-frame .close { width: 92px;}
</style>

<template>
<div style="overflow: hidden;">
   <c-banner :list="bannerData"/>

   <h2 class="title">明星产品</h2>
   <c-goods-swiper :list="goodsListMX" />

   <h2 class="title">品牌介绍</h2>
   <c-banner :list="ppjs" autoHeight/>
<!--   <img :src="imgSrc + item.img"-->
<!--        mode="widthFix"-->
<!--        class="img_block"-->
<!--        v-for="item in ppjs"-->
<!--        :key="index"-->
<!--        @click="toDetail(item.link)"/>-->

   <h2 class="title">购买获积分</h2>
   <h3 class="title">积分可抵扣消费</h3>
   <ul class="integral-list">
      <li>1、{{jfData.jfdk}}</li>
      <li>2、{{jfData.gmhd}}</li>
      <li>3、{{jfData.dksx}}</li>
   </ul>
   <img v-if="bottomAd.val !== '0'" :src="imgSrc + bottomAd.val" mode="widthFix" class="img_block"/>

   <h2 v-if="hyqy.val !== '0'" class="title">会员权益</h2>
<!--   <h3 class="title">加入XXXX会员</h3>-->
   <img v-if="hyqy.val !== '0'" :src="imgSrc + hyqy.val" mode="widthFix" class="img_block"/>
   <div class="btns">
      <a href="" class="btn-round" v-if="hasSaveInfo" style="width: 430rpx">你已经成为了会员，感谢你的支持</a>
<!--      <a href="/pages/register/main?source=index" class="btn-round" v-else style="width: 240rpx">立即注册</a>-->
      <button v-else class="btn-round" open-type="getUserInfo" @getuserinfo="getuserinfo" style="width: 240rpx">立即注册</button>
   </div>

   <div class="ad-frame" v-if="showAd">
      <img :src="imgSrc + adData.tc" mode="widthFix" class="img" @click="toAdDetail"/>
      <img src="/static/images/index/guanbi@2x.png" mode="widthFix" class="close" @click="doCloseAd"/>
   </div>

   <c-footer-nav />
</div>
</template>

<script>
import cBanner from '@/components/banner'
import cGoodsSwiper from '@/components/goodsSwiper'
import cFooterNav from '@/components/footerNav'
import { getAction, postAction } from '@/utils/api'
import store from '@/store'

export default {
   components: { cBanner, cGoodsSwiper, cFooterNav },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         showAd: false,
         adData: {},
         bannerData: [],
         goodsListMX: [],
         ppjs: [],
         jfData: {},
         bottomAd: {},
         hyqy: {}
      }
   },
   computed: {
      hasSaveInfo () {
         if (Array.isArray(store.state.personalInfo)) {
            return false
         } else {
            console.log(store.state.personalInfo)
            return store.state.personalInfo.is_reg === '1'
         }
      }
   },
   methods: {
      getData () {
         getAction('index').then(res => {
            console.log(res)
            this.bannerData = res.data.get_first_page_banner
            this.goodsListMX = res.data.get_first_page_mx_goods
            this.ppjs = res.data.get_first_page_ppjs
            this.jfData = res.data.get_first_page_jf
            this.bottomAd = res.data.get_first_page_bottom_image
            this.hyqy = res.data.get_first_page_hyqy_image
            this.adData = res.data.get_ads_tc
            let adTime = mpvue.getStorageSync('lastShowAdTime')
            if (adTime === '' || adTime === null) {
               adTime = 0
            }
            if (adTime === 0) {
               this.showAd = true
            } else {
               const old = new Date(adTime)
               const oldMonth = old.getMonth()
               const oldDate = old.getDate()
               const now = new Date()
               const nowTime = now.getTime()
               const nowMonth = now.getMonth()
               const nowDate = now.getDate()
               console.log('广告信息是否不为空', this.adData.tc !== '')
               console.log('当前时间:', nowTime, '历史时间:', adTime)
               console.log('当前天', nowDate, '历史天:', oldDate)
               console.log('当前月', nowMonth, '历史月:', oldMonth)
               if (this.adData.tc !== '' && nowTime > adTime && (oldMonth !== nowMonth || oldDate !== nowDate)) {
                  this.showAd = true
               }
            }
         })
      },
      toDetail (id) {
         if (id === '') return
         mpvue.navigateTo({
            url: `/pages/goodsDetail/main?id=${id}`
         })
      },
      doCloseAd () {
         this.showAd = false
         const now = new Date().getTime()
         mpvue.setStorageSync('lastShowAdTime', now)
      },
      toAdDetail () {
         this.doCloseAd()
         mpvue.navigateTo({
            url: `/pages/ad/main`
         })
      },
      getuserinfo (e) {
         const userInfo = e.mp.detail.userInfo
         postAction('save_userinfo', userInfo).then(res => {
            if (res.ret === 0) {
               store.commit('SET_PERSONINFO', userInfo)
               mpvue.navigateTo({
                  url: `/pages/register/main?source=index`
               })
            }
         })
      }
   },

   onLoad () {
      // let app = getApp()
      Object.assign(this.$data, this.$options.data())
      this.getData()
   }
}
</script>

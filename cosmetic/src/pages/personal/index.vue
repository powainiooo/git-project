<style>
.banner { position: relative; height: 460px; background-color: rgb(51, 51, 51)}
.banner img { width: 100%; height: 460px;}
.banner .nav { width: 630px; height: 210px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 5px 12px 1px rgba(51, 51, 51, 0.2); box-sizing: border-box; position: absolute; left: 60px; bottom: -80px; display: flex; justify-content: center; align-items: center;}
.banner .nav ul { width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 120px;}
.banner .nav li { display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 20px;}
.banner .nav li img { width: 50px; height: 50px; margin-bottom: 20px;}
.banner .nav li p { font-size: 22px; color: #333333; line-height: 1;}
.banner .person { width: 100%; position: absolute; top: 126px; left: 0; text-align: center;}
.banner .person h3 { font-size: 32px; color: #ffffff; line-height: 1; margin-bottom: 22px;}
.banner .person p { font-size: 24px; color: #ffffff; line-height: 1; margin-bottom: 22px;}
.banner .person img { width: 172px; height: 172px; border-radius: 50%;}

.list { margin-top: 170px; margin-bottom: 100px;}
.list-item { padding: 0 50px; height: 80px; margin-bottom: 20px; display: flex; align-items: center; position: relative;}
.list-item.link-arrow:after { right: 50px;}
.list-item img { width: 36px; height: 34px; margin-right: 26px;}
.list-item p { font-size: 28px; color: #666666}
.list-item button { width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <div class="banner">
      <img :src="imgSrc + banner" v-if="banner !== ''" />
      <div class="nav">
         <ul v-if="hasUserInfo">
            <li @click="toLink('/pages/order/list/main?status=1')">
               <img src="/static/images/personal/daizhifu-@2x.png" />
               <p>待支付</p>
            </li>
            <li @click="toLink('/pages/order/list/main?status=5')">
               <img src="/static/images/personal/yifahuo@2x.png" />
               <p>已发货</p>
            </li>
            <li @click="toLink('/pages/order/list/main?status=7')">
               <img src="/static/images/personal/dingdanwancheng@2x.png" />
               <p>已完成</p>
            </li>
         </ul>
         <button class="btn-round" v-else style="width: 60%;" open-type="getUserInfo" @getuserinfo="getuserinfo">立即登陆</button>
      </div>

      <div class="person" v-if="hasUserInfo" @click="toLink('/pages/point/main')">
         <h3>{{userInfo.name}}</h3>
         <p>积分：{{userInfo.score}}</p>
         <img :src="userInfo.headimg" />
      </div>
   </div>

   <div class="list">
      <div class="list-item link-arrow" @click="toLink('/pages/coupon/list/main')">
         <img src="/static/images/personal/icon-coupon.png" />
         <p>我的优惠券</p>
      </div>
      <div class="list-item link-arrow" @click="toLink('/pages/order/list/main')">
         <img src="/static/images/personal/icon1.png" />
         <p>订单中心</p>
      </div>
      <div class="list-item link-arrow" @click="viewAgreement('thhzc')">
         <img src="/static/images/personal/icon2.png" />
         <p>退换货政策</p>
      </div>
      <div class="list-item link-arrow" @click="toLink('/pages/register/main')" v-if="userInfo.is_reg === '0'">
         <img src="/static/images/personal/icon3.png" />
         <p>立即注册</p>
         <button open-type="getUserInfo" @getuserinfo="getuserinfo" @click.stop="tap" v-if="!hasUserInfo">在线客服</button>
      </div>
      <div class="list-item link-arrow" @click="viewAgreement('hhqy')">
         <img src="/static/images/personal/icon4.png" />
         <p>会员权益</p>
      </div>
      <div class="list-item link-arrow" @click="doCall">
         <img src="/static/images/personal/icon5.png" />
         <p>客服热线</p>
      </div>
      <div class="list-item link-arrow">
         <img src="/static/images/personal/icon6.png" />
         <p>在线客服</p>
         <button open-type="contact">在线客服</button>
      </div>
   </div>

   <c-footer-nav active="personal"/>
</div>
</template>

<script>
import cFooterNav from '@/components/footerNav'
import { postAction } from '@/utils/api'
import store from '../../store'

export default {
   components: { cFooterNav },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         banner: '',
         userInfo: {},
         phone: ''
      }
   },
   computed: {
      hasUserInfo () {
         return !Array.isArray(this.userInfo)
      }
   },
   methods: {
      getData () {
         postAction('get_preson_info').then(res => {
            this.banner = res.data.get_person_bg_img.val
            store.commit('SET_HHQY', res.data.get_hhqy.content)
            store.commit('SET_THHZC', res.data.get_thhzc.content)
            this.userInfo = res.data.user_info
            this.phone = res.data.get_kf_phone.kf_phone
         })
      },
      viewAgreement (page) {
         mpvue.navigateTo({
            url: `/pages/agreement/main?page=${page}`
         })
      },
      getuserinfo (e) {
         const userInfo = e.mp.detail.userInfo
         postAction('save_userinfo', userInfo).then(res => {
            if (res.ret === 0) {
               store.commit('SET_PERSONINFO', userInfo)
               this.getData()
            }
         })
      },
      doCall () {
         mpvue.makePhoneCall({
            phoneNumber: this.phone
         })
      },
      toLink (url) {
         mpvue.navigateTo({
            url
         })
      },
      tap () {}
   },
   onShow () {
      this.getData()
   },
   onLoad () {
      Object.assign(this.$data, this.$options.data())
      // let app = getApp()
   }
}
</script>

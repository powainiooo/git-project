<style>
page { background-color: rgb(0, 0, 0)}
.frame { width: 690px; margin: 50px 30px 90px 30px;}
.infos { position: absolute; top: 50px; left: 30px; right: 30px;}
.infos .line1 { font-size: 102px; color: #333333; text-align: center; line-height: 1; margin: 70px 0 27px 0;}
.infos .line2 { font-size: 40px; color: #333333; text-align: center; line-height: 1; margin-bottom: 120px;}
.infos .line { font-size: 28px; color: #666666; line-height: 48px; margin: 0 36px 20px 40px;}
.infos .line p { color: #333333; font-weight: bold;}
.infos .btn { text-align: center; margin-top: 30px;}
.infos .btn .btn-round { width: 450px; height: 90px; font-size: 34px; background-color: #1B1B1B;}

.success-modal { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: center; align-items: center;}
.success-modal .frame { width: 445px; height: 400px; background-color: #ffffff; border-radius: 16px; position: relative; display: flex; flex-direction: column; align-items: center;}
.success-modal .frame img { width: 404px; margin-top: -130px;}
.success-modal .frame h3 { color: #333333; font-size: 40px; margin-bottom: 60px; margin-top: 30px; }
.success-modal .frame button { width: 100%; height: 90px; background-color: #1B1B1B; font-size: 34px; color: #ffffff; border-radius: 0 0 16px 16px;}

</style>

<template>
<div>
   <img src="/static/images/coupon/frame.jpg" mode="widthFix" class="frame" />
   <div class="infos">
      <div class="line1">{{percent}}折</div>
      <div class="line2">满{{condition}}元可用</div>
      <div class="line"><p>优惠券:</p>{{couponData.desc1}}</div>
      <div class="line"><p>使用时间:</p>{{startTime}}-{{endTime}}</div>
      <div class="line">
         <p>详细信息:</p>
         <div>{{couponData.desc2}}</div>
         <div>{{couponData.desc3}}</div>
         <div>{{couponData.desc4}}</div>
         <div>{{couponData.desc5}}</div>
      </div>
      <div class="btn">
         <button class="btn-round"v-if="hasSaveInfo" @click="doGet">点击领取</button>
         <button class="btn-round"v-else open-type="getUserInfo" @getuserinfo="getuserinfo">点击领取</button>
      </div>
   </div>

   <div class="success-modal" v-if="show">
      <div class="frame">
         <img src="/static/images/coupon/youhuiquan-tuan@2x.png" mode="widthFix" />
         <h3>领取成功</h3>
         <button @click="toIndex">去使用</button>
      </div>
   </div>
</div>
</template>

<script>
import { postAction } from '@/utils/api'
import { formatDate } from '../../../utils'
import store from '../../../store'

export default {
   data () {
      return {
         show: false,
         id: '',
         isAjax: false,
         percent: '--',
         condition: '--',
         startTime: '--',
         endTime: '--',
         couponId: '',
         couponData: {}
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
      toIndex () {
         mpvue.reLaunch({
            url: `/pages/index/main`
         })
      },
      getData () {
         postAction('get_yhq_info', {
            fxs_id: this.id
         }).then(res => {
            if (res.ret === 0) {
               this.percent = Number(res.data.percent) / 10
               this.condition = Number(res.data.condition) / 100
               this.startTime = formatDate(new Date(Number(res.data.ctime) * 1000), 'yyyy.MM.dd HH:mm')
               this.endTime = formatDate(new Date(Number(res.data.yx_time) * 1000), 'yyyy.MM.dd HH:mm')
               this.couponId = res.data.id
               this.couponData = res.data
            } else {
               setTimeout(() => {
                  mpvue.reLaunch({
                     url: '/pages/index/main'
                  })
               }, 2000)
            }
         })
      },
      doGet () {
         if (this.isAjax) return
         this.isAjax = true
         postAction('lq_yhq', {
            id: this.couponId
         }).then(res => {
            if (res.ret === 0) {
               this.show = true
            }
            this.isAjax = false
         })
      },
      getuserinfo (e) {
         const userInfo = e.mp.detail.userInfo
         postAction('save_userinfo', userInfo).then(res => {
            if (res.ret === 0) {
               store.commit('SET_PERSONINFO', userInfo)
               this.doGet()
            }
         })
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id || '17'
      this.getData()
   }
}
</script>

<style>
page { background-color: rgb(0, 0, 0)}
.frame { width: 690px; margin: 50px 30px 90px 30px;}
.infos { position: absolute; top: 50px; left: 30px; right: 30px;}
.infos .line1 { font-size: 102px; color: #333333; text-align: center; line-height: 1; margin: 70px 0 27px 0;}
.infos .line2 { font-size: 40px; color: #333333; text-align: center; line-height: 1; margin-bottom: 120px;}
.infos .line { font-size: 28px; color: #666666; line-height: 48px; margin: 0 36px 20px 40px;}
.infos .line p { color: #333333; font-weight: bold;}
.infos .btn { text-align: center; margin-top: 40px;}
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
      <div class="line"><p>优惠券:</p>指定商品购满99元可使用，9折优惠，可与积分同时抵扣使用</div>
      <div class="line"><p>使用时间:</p>{{startTime}}-{{endTime}}</div>
      <div class="line">
         <p>详细信息:</p>
         <div>1、特价商品不参与此优惠</div>
         <div>2、购买指定商品满{{condition}}元才可使用此优惠券。</div>
         <div>3、一券只能使用一次, -一次使用一张,过期作废。</div>
         <div>4、最终解释权axx所有。</div>
      </div>
      <div class="btn">
         <button class="btn-round" @click="doGet">点击领取</button>
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
         couponId: ''
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
               this.percent = Number(res.data.percent)
               this.condition = Number(res.data.condition) / 100
               this.startTime = formatDate(new Date(Number(res.data.ctime) * 1000), 'yyyy.MM.dd HH:mm')
               this.endTime = formatDate(new Date(Number(res.data.yx_time) * 1000), 'yyyy.MM.dd HH:mm')
               this.couponId = res.data.id
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
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id || '4'
      this.getData()
   }
}
</script>

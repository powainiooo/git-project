<style>
.form-item { height: 100px; padding: 0 30px; border-bottom: 1px solid #D2D2D2; display: flex; justify-content: space-between; align-items: center;}
.form-item div { font-size: 30px; color: #333333;}
.form-item div span { color: #FF0000; margin-right: 4px}
.form-item .input { width: 400px; height: 80px; line-height: 80px; border: none; background-color: #ffffff; font-size: 30px; color: #333333; text-align: right;}
.form-item .placeholder { color: #999999;}

.hints { margin: 0 0 140px 0;}
.hints .content { font-size: 20px; color: #333333; line-height: 34px; padding: 0 30px; margin-bottom: 10px; display: block;}
.hints .checkbox-content { padding-top: 30px;}
.hints .checkbox { transform: scale(.5)}
.hints .img_block { width: auto; margin: 0 30px;}

.foot-btns { width: 100%; height: 100px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.foot-btns button { height: 100%; line-height: 100px; flex: 1; font-size: 30px; color: #ffffff; background-color: #5f5f5f; border-radius: 0; border: none}
.foot-btns button:last-child { background-color: #393939;}

.success-modal { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: center; align-items: center;}
.success-modal .frame { width: 630px; height: 645px; background-color: #ffffff; border-radius: 16px; position: relative; display: flex; flex-direction: column; align-items: center;}
.success-modal .frame .coupon { width: 590px; margin: 27px auto 55px auto; background-color: #E7E7E7;}
.success-modal .frame .coupon .c-coupon-item { width: 690px; transform: scale(.8); transform-origin: 15% 50%;}
.success-modal .frame .btns { width: 100%; display: flex; padding: 0 50px; box-sizing: border-box; justify-content: space-between;}
.success-modal .frame .btns button { width: 240px;}
.success-modal .frame .btns .btn2 { background-color: #ffffff; color: #3A3A3A; border: 1px solid #3A3A3A;}
</style>

<template>
<div style="overflow: hidden;">
   <img :src="imgSrc + pageData.get_reg_bg.val" mode="widthFix" class="img_block"/>
   <div class="form">
      <div class="form-item">
         <div><span>*</span>微信号</div>
         <input type="text" placeholder="请输入微信号" v-model="formData.wx_id" class="input" placeholder-class="placeholder"/>
      </div>
      <div class="form-item">
         <div><span>*</span>姓名</div>
         <input type="text" placeholder="请输入姓名" v-model="formData.name" class="input" placeholder-class="placeholder"/>
      </div>
      <picker mode="date" @change="dateChange">
      <div class="form-item">
         <div><span>*</span>生日</div>
         <input type="text" placeholder="年     月    日" v-model="formData.age" class="input" placeholder-class="placeholder" disabled/>
      </div>
      </picker>
      <div class="form-item">
         <div>推荐人</div>
         <input type="text" placeholder="请输入推荐人微信号" v-model="formData.from_wx" class="input" placeholder-class="placeholder"/>
      </div>
      <picker @change="sexChange" :range="sexList" range-key="name">
      <div class="form-item">
         <div><span>*</span>性别</div>
         <input type="text" placeholder="性别" v-model="sexName" class="input" placeholder-class="placeholder" disabled/>
      </div>
      </picker>
   </div>

   <div class="hints">
      <div class="content checkbox-content" @click="checked = !checked">
         <van-checkbox :value="checked"
                       @change="onChange"
                       icon-size="20rpx"
                       checked-color="#333333"
                       @click.stop="checked"
                       style="display: inline-block; margin-right: 5px;"></van-checkbox>
         <span>本人已阅读并同意 <a href="/pages/agreement/main?page=sytk" style="display: inline; font-weight: bold;">使用条款</a> 和 <a href="/pages/agreement/main?page=yszc" style="display: inline; font-weight: bold;">隐私政策</a>，并且同意接受通过短信/微信/邮件信息等方式向我发送营销信息。</span>
      </div>
      <div class="content" style="color: #FF0000; margin: 0 0 14px 0" v-if="source !== 'buy'">温馨提示：注册成功会员后，购物可获得积分，购物时积分可以直接抵扣使用</div>
      <img :src="imgSrc + pageData.get_first_page_hyqy_image.val" mode="widthFix" class="img_block"/>
   </div>

   <div class="foot-btns">
      <button v-if="source === 'buy'" @click="skip">暂不注册直接购买</button>
      <button @click="doRegister">立即注册</button>
   </div>

   <div class="success-modal" v-if="showCoupon">
      <div class="frame">
         <img src="/static/images/index/toubu@2x.png" mode="widthFix" />
         <div class="coupon">
            <coupon-item :itemData="couponData" type="1" @handleUse="skip" />
         </div>
         <div class="btns">
            <button class="btn-round" @click="skip">立即使用</button>
            <button class="btn-round btn2" @click="toList">查看详情</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import store from '../../store'
import { getAction, postAction } from '@/utils/api'
import couponItem from '../coupon/list/couponItem'
import { formatDate } from '@/utils'

export default {
   components: {couponItem},
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         source: '',
         pageData: {
            get_reg_bg: {
               val: ''
            },
            get_first_page_hyqy_image: {
               val: ''
            }
         },
         checked: false,
         sexName: '',
         sexList: [
            { name: '男', value: '1' },
            { name: '女', value: '2' }
         ],
         formData: {
            wx_id: '',
            name: '',
            age: '',
            from_wx: '',
            sex: '',
            agree: '0'
         },
         isAjax: false,
         ids: '',
         flag: '',
         showCoupon: false,
         couponData: {}
      }
   },
   watch: {
      checked (val) {
         this.formData.agree = this.checked ? '1' : '0'
      }
   },
   methods: {
      getData () {
         getAction('pre_reg').then(res => {
            this.pageData = res.data
            store.commit('SET_SYTK', res.data.get_sm_1.content)
            store.commit('SET_YSZC', res.data.get_sm_2.content)
         })
      },
      onChange (e) {
         this.checked = e.mp.detail
      },
      dateChange (e) {
         this.formData.age = e.mp.detail.value
      },
      sexChange (e) {
         const item = this.sexList[e.mp.detail.value]
         this.formData.sex = item.value
         this.sexName = item.name
      },
      doRegister () {
         if (this.formData.wx_id === '') {
            mpvue.showToast({ title: '请输入微信号', icon: 'none' })
            return false
         }
         if (this.formData.name === '') {
            mpvue.showToast({ title: '请输入姓名', icon: 'none' })
            return false
         }
         if (this.formData.age === '') {
            mpvue.showToast({ title: '请选择生日', icon: 'none' })
            return false
         }
         if (this.formData.sex === '') {
            mpvue.showToast({ title: '请选择性别', icon: 'none' })
            return false
         }
         // console.log('this.formData.agree', this.formData.agree)
         if (this.formData.agree === '0') {
            mpvue.showToast({ title: '请阅读并同意条款', icon: 'none' })
            return false
         }
         if (this.isAjax) return false
         this.isAjax = true
         postAction('save_regnfo', this.formData).then(res => {
            if (res.ret === 0) {
               this.getPersonData()
               if (Array.isArray(res.data)) {
                  mpvue.showToast({ title: '注册成功！' })
                  this.skip()
               } else {
                  this.showCoupon = true
                  this.couponData = res.data
                  this.couponData.percentStr = Number(this.couponData.percent) / 10
                  this.couponData.conditionStr = Number(this.couponData.condition) / 100
                  this.couponData.endTime = formatDate(new Date(Number(this.couponData.yx_time) * 1000), 'yyyy.MM.dd HH:mm')
               }
            } else {
               mpvue.showToast({ title: res.msg, icon: 'none' })
               this.isAjax = false
            }
         })
      },
      getPersonData () {
         postAction('get_preson_info').then(res => {
            if (res.ret === 0) {
               // store.commit('SET_SAVEINFO', !Array.isArray(res.data.user_info))
               store.commit('SET_PERSONINFO', res.data.user_info)
            }
         })
      },
      skip () {
         if (this.source === 'buy') {
            mpvue.redirectTo({
               url: `/pages/order/confirm/main?id=${this.ids}&flag=${this.flag}`
            })
         } else {
            setTimeout(() => {
               mpvue.navigateBack({
                  delta: 1
               })
            }, 1500)
         }
      },
      toList () {
         mpvue.redirectTo({
            url: '/pages/coupon/list/main?type=1'
         })
      }
   },
   onShow () {
      // console.log('this.checked', this.checked)
      // console.log('this.formData.agree', this.formData.agree)
   },
   onLoad (options) {
      // console.log('register onload')
      Object.assign(this.$data, this.$options.data())
      const source = options.source || 'index'
      this.source = source
      if (source === 'buy') {
         this.ids = options.id
         this.flag = options.flag
      }
      this.getData()
      // let app = getApp()
   }
}
</script>

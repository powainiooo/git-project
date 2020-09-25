<style>
.form-item { height: 100px; padding: 0 30px; border-bottom: 1px solid #D2D2D2; display: flex; justify-content: space-between; align-items: center;}
.form-item div { font-size: 30px; color: #333333;}
.form-item div span { color: #FF0000; margin-right: 4px}
.form-item .input { width: 400px; height: 80px; line-height: 80px; border: none; background-color: #ffffff; font-size: 30px; color: #333333; text-align: right;}
.form-item .placeholder { color: #999999;}

.hints { margin: 30px 30px 140px 30px;}
.hints .content { font-size: 20px; color: #333333; line-height: 34px; margin-bottom: 10px; display: block;}
.hints .checkbox { transform: scale(.5)}

.foot-btns { width: 100%; height: 100px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.foot-btns button { height: 100%; line-height: 100px; flex: 1; font-size: 30px; color: #ffffff; background-color: #5f5f5f; border-radius: 0; border: none}
.foot-btns button:last-child { background-color: #393939;}
</style>

<template>
<div >
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
         <input type="text" placeholder="请输入推荐人微信号" v-model="formData.form_wx" class="input" placeholder-class="placeholder"/>
      </div>
      <picker @change="sexChange" :range="sexList" range-key="name">
      <div class="form-item">
         <div><span>*</span>性别</div>
         <input type="text" placeholder="性别" v-model="sexName" class="input" placeholder-class="placeholder"/>
      </div>
      </picker>
   </div>

   <div class="hints">
      <van-checkbox :value="checked"
                    @change="onChange"
                    shape="square"
                    icon-size="20rpx"
                    class="content">本人已阅读并同意 使用条款 和 隐私政策，并且同意接受通过短信/微信/邮件信息等方式向我发送营销信息。</van-checkbox>
      <div class="content" style="color: #FF0000; margin: 0 0 14px 0" v-if="source === 'buy'">温馨提示：注册成功会员后，购物可活动积分，购物时积分可以直接抵扣使用</div>
      <img :src="imgSrc + pageData.get_first_page_hyqy_image.val" mode="widthFix" class="img_block"/>
   </div>

   <div class="foot-btns">
      <button v-if="source === 'buy'">暂不注册直接购买</button>
      <button @click="doRegister">立即注册</button>
   </div>
</div>
</template>

<script>
import { getAction, postAction } from '@/utils/api'

export default {
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         source: '',
         pageData: {},
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
            form_wx: '',
            sex: '',
            agree: ''
         },
         isAjax: false
      }
   },

   methods: {
      getData () {
         getAction('pre_reg').then(res => {
            console.log(res)
            this.pageData = res.data
         })
      },
      onChange (e) {
         this.checked = e.mp.detail
         this.formData.agree = this.checked ? '1' : '0'
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
         if (this.formData.agree === '') {
            mpvue.showToast({ title: '请阅读并同意条款', icon: 'none' })
            return false
         }
         if (this.isAjax) return false
         this.isAjax = true
         postAction('save_regnfo', this.formData).then(res => {
            if (res.ret === 0) {
               mpvue.showToast({ title: '注册成功！' })
               setTimeout(() => {
                  mpvue.navigateBack({
                     delta: 1
                  })
               }, 1500)
            } else {
               mpvue.showToast({ title: res.msg, icon: 'none' })
               this.isAjax = false
            }
         })
      }
   },

   onLoad (options) {
      const source = options.source || 'index'
      this.source = source
      this.getData()
      // let app = getApp()
   }
}
</script>

<style>
.form-item { height: 100px; padding: 0 30px; border-bottom: 1px solid #D2D2D2; display: flex; justify-content: space-between; align-items: center;}
.form-item div { font-size: 30px; color: #333333;}
.form-item div span { color: #FF0000; margin-right: 4px}
.form-item .input { width: 400px; height: 80px; line-height: 80px; border: none; background-color: #ffffff; font-size: 30px; color: #333333; text-align: right;}
.form-item .placeholder { color: #999999;}

.hints { margin: 30px 30px 140px 30px;}
.hints .content { font-size: 20px; color: #333333; line-height: 34px;}
.hints .checkbox { transform: scale(.5)}

.btns { margin: 100px 60px; display: flex; justify-content: space-between;}
.btns button { width: 304px; height: 90px; font-size: 30px;}
</style>

<template>
<div >
   <img :src="imgSrc + banner" mode="widthFix" class="img_block" v-if="banner !== ''"/>
   <div class="form">
      <div class="form-item">
         <div><span>*</span>TO</div>
         <input type="text" class="input" v-model="formData.to"/>
      </div>
      <div class="form-item">
         <div><span>*</span>Message</div>
         <input type="text" class="input" v-model="formData.message"/>
      </div>
      <div class="form-item">
         <div><span>*</span>From</div>
         <input type="text" class="input" v-model="formData.from"/>
      </div>
   </div>

   <div class="hints">
      <div class="content" style="color: #FF0000;">
         留言须知：
      </div>
      <div class="content">
         <rich-text :nodes="notice"></rich-text>
      </div>
   </div>

   <div class="btns">
      <button class="btn-round" @click="doSave">保 存</button>
      <button class="btn-round" style="background-color: #ADADAD" @click="doCancel">取消定制</button>
   </div>
</div>
</template>

<script>
import { postAction } from '@/utils/api'

export default {
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         banner: '',
         notice: '',
         formData: {
            to: '',
            message: '',
            from: ''
         },
         isAjax: false
      }
   },

   methods: {
      getData () {
         postAction('user_wish_card').then(res => {
            this.banner = res.data.get_wish_bg.val
            this.notice = res.data.get_sm_5.content
         })
      },
      doCancel () {
         mpvue.navigateBack({
            delta: 1
         })
      },
      doSave () {
         if (this.formData.to === '' || this.formData.message === '' || this.formData.from === '') {
            mpvue.showToast({ title: '请填写表单', icon: 'none' })
            return false
         }
         if (this.isAjax) return false
         this.isAjax = true
         postAction('save_usercard', this.formData).then(res => {
            if (res.ret === 0) {
               mpvue.showToast({ title: '保存成功！' })
               setTimeout(() => {
                  this.doCancel()
               }, 1500)
            } else {
               mpvue.showToast({ title: res.msg, icon: 'none' })
               this.isAjax = false
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

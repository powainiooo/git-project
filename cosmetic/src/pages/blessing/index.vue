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
   <img src="/static/images/blessing/banner.png" mode="widthFix" class="img_block"/>
   <div class="form">
      <div class="form-item">
         <div><span>*</span>TO</div>
         <input type="text" class="input"/>
      </div>
      <div class="form-item">
         <div><span>*</span>Message</div>
         <input type="text" class="input"/>
      </div>
      <div class="form-item">
         <div><span>*</span>From</div>
         <input type="text" class="input"/>
      </div>
   </div>

   <div class="hints">
      <div class="content" style="color: #FF0000;">
         留言须知：
      </div>
      <div class="content">
         本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知本人留言须知。
      </div>
   </div>

   <div class="btns">
      <button class="btn-round">保 存</button>
      <button class="btn-round" style="background-color: #ADADAD">取消定制</button>
   </div>
</div>
</template>

<script>

export default {
   data () {
      return {
      }
   },

   methods: {
   },

   created () {
      // let app = getApp()
   }
}
</script>

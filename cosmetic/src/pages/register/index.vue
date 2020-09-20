<style>
.form-item { height: 100px; padding: 0 30px; border-bottom: 1px solid #D2D2D2; display: flex; justify-content: space-between; align-items: center;}
.form-item div { font-size: 30px; color: #333333;}
.form-item div span { color: #FF0000; margin-right: 4px}
.form-item .input { width: 400px; height: 80px; line-height: 80px; border: none; background-color: #ffffff; font-size: 30px; color: #333333; text-align: right;}
.form-item .placeholder { color: #999999;}

.hints { margin: 30px 30px 140px 30px;}
.hints .content { font-size: 20px; color: #333333; line-height: 34px;}
.hints .checkbox { transform: scale(.5)}

.foot-btns { width: 100%; height: 100px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.foot-btns button { height: 100%; line-height: 100px; flex: 1; font-size: 30px; color: #ffffff; background-color: #5f5f5f; border-radius: 0; border: none}
.foot-btns button:last-child { background-color: #393939;}
</style>

<template>
<div >
   <img src="/static/images/register/banner.png" mode="widthFix" class="img_block"/>
   <div class="form">
      <div class="form-item">
         <div><span>*</span>微信号</div>
         <input type="text" placeholder="请输入微信号" class="input" placeholder-class="placeholder"/>
      </div>
      <div class="form-item">
         <div><span>*</span>姓名</div>
         <input type="text" placeholder="请输入姓名" class="input" placeholder-class="placeholder"/>
      </div>
      <div class="form-item">
         <div><span>*</span>生日</div>
         <input type="text" placeholder="年     月    日" class="input" placeholder-class="placeholder" readonly/>
      </div>
      <div class="form-item">
         <div>推荐人</div>
         <input type="text" placeholder="请输入推荐人微信号" class="input" placeholder-class="placeholder"/>
      </div>
      <div class="form-item">
         <div><span>*</span>性别</div>
         <input type="text" placeholder="性别" class="input" placeholder-class="placeholder"/>
      </div>
   </div>

   <div class="hints">
      <label class="content">
         <checkbox value="cb" class="checkbox"/>本人已阅读并同意 使用条款 和 隐私政策，并且同意接受通过短信/微信/邮件信息等方式向我发送营销信息。
      </label>
      <div class="content" style="color: #FF0000; margin: 8px 0 14px 0">温馨提示：注册成功会员后，购物可活动积分，购物时积分可以直接抵扣使用</div>
      <img src="/static/images/register/card.png" mode="widthFix" class="img_block"/>
   </div>

   <div class="foot-btns">
      <button>暂不注册直接购买</button>
      <button>立即注册</button>
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

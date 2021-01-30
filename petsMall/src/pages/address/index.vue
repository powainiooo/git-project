<style>
.container { padding: 300px 0 200px 0;}
.form { margin: 12px 66px;}
.form .form-item { margin-bottom: 12px; height: 120px; display: flex; align-items: flex-end; }
.form .form-item input { width: 100%; color: var(--textColor); text-shadow: var(--textShadow); font-size: 36px; text-align: right; padding: 16px 6px 16px 0; font-family: HelveThin; }
.form .form-item input.phone { font-size: 100px; height: 100px; padding: 0 6px 0 0; line-height: 100px; }
.form .form-item .holder { font-size: 36px; }
.form .form-item .phone-holder { font-size: 36px; padding-top: 16px; }
.form .form-item .dots { width: 100%; position: absolute; left: 0; bottom: 0; }
.form .form-item .dots:before, .form .form-item .dots:after { content: ''; width: 10px; height: 10px; background-color: #D1CECE; border-radius: 50%; position: absolute; bottom: -5px;}
.form .form-item .dots:before { left: -5px; }
.form .form-item .dots:after { right: -5px; }
.form .form-item-select:before { content: ''; width: 24px; height: 16px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAWBAMAAABEVRO+AAAAD1BMVEUAAABAMyE/MiJEMyI/MiH2ZW0jAAAABHRSTlMAc+stHXHGwQAAAFxJREFUGNNdysEJgEAQBMERE/BhBhqAmIEy+cckssc1O/1sSn4vtdbTln30e/u/E0MfeWLoph0M1QKGSmAouFEwFBwUDAVDO4aCoQ0PGjhp4aKJiyaGgqGBiyaGftsOJk6EIvXwAAAAAElFTkSuQmCC) no-repeat; background-size: 100%; position: absolute; bottom: 24px; left: 14px; }
</style>

<template>
<div class="container">
   <c-header title="填写收货地址|Add shipping address" titleColor="#E8E6E4" />
   <div class="form">
      <div class="form-item borderB">
         <input placeholder="姓名" placeholder-class="holder" />
         <div class="dots"></div>
      </div>
      <div class="form-item borderB">
         <input placeholder="手机号码" class="phone" placeholder-class="phone-holder" />
         <div class="dots"></div>
      </div>
      <picker mode="region" @change="areaChange" v-model="areas">
         <div class="form-item borderB form-item-select">
            <input placeholder="省 / 市 / 区" placeholder-class="holder" />
            <div class="dots"></div>
         </div>
      </picker>
      <div class="form-item borderB">
         <input placeholder="详细地址" placeholder-class="holder" />
         <div class="dots"></div>
      </div>
   </div>
   <c-footer btnName="下一步|Next" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'

export default {
   components: {
      cHeader,
      cFooter
   },

   data () {
      return {
         areas: []
      }
   },

   methods: {
      areaChange (e) {
         console.log('areaChange', e)
      }
   }
}
</script>

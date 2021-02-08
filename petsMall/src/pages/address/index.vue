<style>
.container { padding: 300px 0 200px 0;}
.addr-container { min-height: calc(100vh - 500px); display: flex; flex-direction: column; }
.form { padding: 12px 66px 100px; flex: 1;}
.form .form-item { margin-bottom: 12px; height: 120px; display: flex; align-items: flex-end; }
.form .form-item input { width: 100%; color: var(--textColor); text-shadow: var(--textShadow); font-size: 36px; text-align: right; padding: 16px 6px 16px 0; font-family: "HelveThin"; }
.form .form-item input.phone { font-size: 96px; height: 100px; padding: 0 6px 0 0; line-height: 100px; }
.form .form-item .holder { font-size: 36px; }
.form .form-item .phone-holder { font-size: 36px; padding-top: 16px; }
.form .form-item .dots { width: 100%; position: absolute; left: 0; bottom: 0; }
.form .form-item .dots:before, .form .form-item .dots:after { content: ''; width: 10px; height: 10px; background-color: #D1CECE; border-radius: 50%; position: absolute; bottom: -5px;}
.form .form-item .dots:before { left: -5px; }
.form .form-item .dots:after { right: -5px; }
.form .form-item-select:before { content: ''; width: 24px; height: 16px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAWBAMAAABEVRO+AAAAD1BMVEUAAABAMyE/MiJEMyI/MiH2ZW0jAAAABHRSTlMAc+stHXHGwQAAAFxJREFUGNNdysEJgEAQBMERE/BhBhqAmIEy+cckssc1O/1sSn4vtdbTln30e/u/E0MfeWLoph0M1QKGSmAouFEwFBwUDAVDO4aCoQ0PGjhp4aKJiyaGgqGBiyaGftsOJk6EIvXwAAAAAElFTkSuQmCC) no-repeat; background-size: 100%; position: absolute; bottom: 24px; left: 14px; }

.addr-container .frame2 { height: 330px; background-color: #EFEDEC; display: flex; align-items: center; }
</style>

<template>
<div class="container">
   <c-header title="填写收货地址|Add shipping address" titleColor="#E8E6E4" />
   <div class="addr-container">
      <div class="form">
         <div class="form-item borderB">
            <input v-model="formData.name" placeholder="姓名" placeholder-class="holder" />
            <div class="dots"></div>
         </div>
         <div class="form-item borderB">
            <input v-model="formData.mobile" placeholder="手机号码" class="phone" placeholder-class="phone-holder" style="font-family: HelveThin;" />
            <div class="dots"></div>
         </div>
         <picker mode="region" @change="areaChange">
            <div class="form-item borderB form-item-select">
               <input placeholder="省 / 市 / 区" placeholder-class="holder" v-model="address" disabled />
               <div class="dots"></div>
            </div>
         </picker>
         <div class="form-item borderB">
            <input v-model="formData.address" placeholder="详细地址" placeholder-class="holder" />
            <div class="dots"></div>
         </div>
         <picker :range="datesList" @change="dateChange" v-if="source === 'catbox'">
            <div class="form-item borderB">
               <input v-model="timeStr" placeholder="每月配送时间" placeholder-class="holder" disabled />
               <div class="dots"></div>
            </div>
         </picker>
      </div>
      <div class="frame2" v-if="source === 'catbox' || source === 'diy'">
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" />
            <p><text>“每月配送日期”用于多期猫盒订购使用，\n猫盒第一盒48小时发货，剩余猫盒每月将按选定日期送达。</text></p>
         </div>
      </div>

   </div>
   <c-footer :btnName="btnName" @btnFunc="toPage" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import store from '../../store'

export default {
   components: {
      cHeader,
      cFooter
   },
   computed: {
      address () {
         return this.formData.province === '' ? '' : `${this.formData.province} / ${this.formData.city} / ${this.formData.area}`
      },
      timeStr () {
         return this.formData.day === '' ? '' : `每月${this.formData.day}号`
      },
      btnName () {
         return this.status === 'new' ? '下一步|Next' : '保存|Save'
      }
   },
   data () {
      return {
         status: '',
         source: '',
         formData: {
            name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: '',
            day: ''
         },
         datesList: []
      }
   },
   created () {
      for (let i = 1; i < 32; i++) {
         this.datesList.push(i)
      }
   },
   methods: {
      areaChange (e) {
         this.formData.province = e.mp.detail.value[0]
         this.formData.city = e.mp.detail.value[1]
         this.formData.area = e.mp.detail.value[2]
      },
      dateChange (e) {
         this.formData.day = this.datesList[e.mp.detail.value]
         console.log('this.formData.day', this.formData.day)
      },
      toPage () {
         store.commit('SET_FORMDATA', this.formData)
         mpvue.setStorage({
            key: 'PETS_FORMDATA',
            data: {
               ...this.formData
            }
         })
         if (this.status === 'new') {
            mpvue.navigateTo({
               url: `/pages/order/confirm/main?source=${this.source}`
            })
         } else {
            mpvue.navigateBack({
               delta: -1
            })
         }
      }
   },
   onLoad (options) {
      this.status = options.status || 'new'
      this.source = options.source || 'catbox'
      if (this.status === 'edit') {
         this.formData = { ...store.state.formData }
      } else {
         const formData = mpvue.getStorageSync('PETS_FORMDATA')
         if (formData !== undefined && formData !== '' && formData !== null) {
            this.formData = formData
         }
      }
   }
}
</script>

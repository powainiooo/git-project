<style>
page { background-color: rgb(248, 248, 248)}
.form { background-color: #ffffff; margin-top: 24px;}
.form-item { padding: 0 30px; height: 100px; display: flex; align-items: center; justify-content: space-between; position: relative;}
.form-item:after { content: ''; width: 100%; height: 1px; background-color: #D2D2D2; position: absolute; bottom: 0; left: 0; transform: scaleY(.5);}
.form-item p { font-size: 30px; color: #333333;}
.form-item input { width: 550px; font-size: 30px; color: #333333; text-align: right; height: 80px; border: none; background-color: transparent;}
.form-item-addr { height: auto}
.form-item-addr textarea { width: 100%; height: 100px; font-size: 30px; color: #333333; padding: 30px 0;}

.btns { width: 650px; margin: 70px auto;}
.btns .btn-round { height: 80px; font-size: 36px;}
</style>

<template>
<div>
   <div class="form">
      <div class="form-item">
         <p>收件人</p>
         <input v-model="formData.name"/>
      </div>
      <div class="form-item">
         <p>手机号码</p>
         <input v-model="formData.mobile" type="number"/>
      </div>
<!--      <picker mode="region" @change="addrChange">-->
<!--         <div class="form-item">-->
<!--            <p>所在地区</p>-->
<!--            <input disabled v-model="addr"/>-->
<!--         </div>-->
<!--      </picker>-->
<!--      <div class="form-item" @click="openAddr">-->
<!--         <p>所在地区</p>-->
<!--         <input disabled v-model="addr"/>-->
<!--      </div>-->
      <div class="form-item form-item-addr" @click="openAddr">
         <textarea placeholder="详细地址" :disabled="userLocation" v-model="formData.address"/>
      </div>
      <div class="form-item">
         <p>门牌号</p>
         <input  v-model="formData.house_num"/>
      </div>
      <div class="form-item">
         <p>邮政编码</p>
         <input  v-model="formData.yzbm"/>
      </div>
      <div class="form-item">
         <p>设为默认地址</p>
         <van-switch :checked="check" @change="onChange" size="28rpx" active-color="#333333" class="sw"/>
      </div>
   </div>

   <div class="btns"><a href="#" class="btn-round" @click="openAddr">地址测试</a> </div>
   <div class="btns"><a href="#" class="btn-round" @click="doSave">保 存</a> </div>
</div>
</template>

<script>
import { postAction } from '@/utils/api'
import store from '../../../store'

export default {
   data () {
      return {
         page: '',
         check: '',
         url: '',
         addr: '',
         formData: {
            name: '',
            mobile: '',
            // province: '',
            // city: '',
            // area: '',
            house_num: '',
            address: '',
            yzbm: '',
            default: ''
         },
         listData: [],
         isAjax: false
      }
   },
   computed: {
      userLocation () {
         return store.state.settings['scope.userLocation']
      }
   },
   methods: {
      onChange (e) {
         this.check = e.mp.detail
         this.formData.default = this.check ? '1' : '0'
      },
      addrChange (e) {
         this.formData.province = e.mp.detail.value[0]
         this.formData.city = e.mp.detail.value[1]
         this.formData.area = e.mp.detail.value[2]
         this.formData.yzbm = e.mp.detail.postcode
         this.addr = e.mp.detail.value.join('')
      },
      doSave () {
         if (this.isAjax) return false
         this.isAjax = true
         postAction(this.url, this.formData).then(res => {
            if (res.ret === 0) {
               mpvue.showToast({ title: '保存成功！' })
               setTimeout(() => {
                  mpvue.navigateBack({
                     delta: 1
                  })
               }, 1500)
            } else {
               this.isAjax = false
            }
         })
      },
      openAddr (e) {
         wx.chooseLocation({
            success: (res) => {
               console.log(res)
               this.formData.address = `${res.address}${res.name}`
            }
         })
      }
   },

   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.page = options.page || 'new'
      if (this.page === 'new') {
         this.url = 'add_address'
      } else if (this.page === 'edit') {
         this.url = 'edit_address'
         this.formData = {...store.state.addressInfo}
         this.addr = `${this.formData.province}${this.formData.city}${this.formData.area}`
         this.check = this.formData.default === '1'
      }
   }
}
</script>

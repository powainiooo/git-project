<style>
page { background-color: rgb(248, 248, 248)}
.form { background-color: #ffffff; margin-top: 24px;}
.form-item { padding: 0 30px; height: 100px; display: flex; align-items: center; justify-content: space-between; position: relative;}
.form-item:after { content: ''; width: 100%; height: 1px; background-color: #D2D2D2; position: absolute; bottom: 0; left: 0; transform: scaleY(.5);}
.form-item p { font-size: 30px; color: #333333;}
.form-item input { font-size: 30px; color: #333333; text-align: right; height: 80px; border: none; background-color: transparent;}
.form-item-addr { height: auto}
.form-item-addr textarea { width: 100%; font-size: 30px; color: #333333; padding: 30px 0;}

.btns { width: 650px; margin: 70px auto;}
.btns .btn-round { height: 80px; font-size: 36px;}
</style>

<template>
<div>
   <div class="form">
      <div class="form-item">
         <p>抬头类型</p>
         <van-radio-group :value="formData.fp_status" @change="onChange">
            <div style="display: flex">
               <van-radio name="2" icon-size="30rpx" checked-color="#333333" @click="formData.fp_status = '2'">公司</van-radio>
               <van-radio name="1" icon-size="30rpx" checked-color="#333333" @click="formData.fp_status = '1'" style="margin-left: 20rpx;">个人</van-radio>
            </div>
         </van-radio-group>
      </div>
      <div class="form-item">
         <p>发票抬头</p>
         <input v-model="formData.fp_name"/>
      </div>
      <div class="form-item">
         <p>税号（个人不用填）</p>
         <input v-model="formData.fp_sh"/>
      </div>
      <div class="form-item">
         <p>电子邮箱</p>
         <input  v-model="formData.fp_email"/>
      </div>
   </div>

   <div class="btns"><a href="#" class="btn-round" @click="doSave">保 存</a> </div>
</div>
</template>

<script>
import store from '../../store'

export default {
   data () {
      return {
         formData: {
            fp_status: '2',
            fp_name: '',
            fp_sh: '',
            fp_email: ''
         }
      }
   },

   methods: {
      onChange (e) {
         console.log(e)
         this.formData.fp_status = e.mp.detail
      },
      doSave () {
         if (this.formData.fp_status === '') {
            mpvue.showToast({ title: '请选择抬头类型', icon: 'none' })
            return false
         }
         if (this.formData.fp_name === '') {
            mpvue.showToast({ title: '请输入发票抬头', icon: 'none' })
            return false
         }
         if (this.formData.fp_status === '2' && this.formData.fp_sh === '') {
            mpvue.showToast({ title: '请输入税号', icon: 'none' })
            return false
         }
         if (this.formData.fp_email === '') {
            mpvue.showToast({ title: '请输入电子邮箱', icon: 'none' })
            return false
         }
         store.commit('SET_INVOICE', this.formData)
         mpvue.navigateBack({
            delta: 1
         })
      }
   },

   onLoad (options) {
      // Object.assign(this.$data, this.$options.data())
      if (store.state.invoiceInfo !== null) {
         this.formData = {...store.state.invoiceInfo}
      }
   }
}
</script>

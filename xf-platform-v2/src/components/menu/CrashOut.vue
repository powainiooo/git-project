<style>
    .crashout{ width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 410; background-color: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center;}
    .crashout .laws-close{font-size: 40px; color: #ffffff; position: absolute; top: 35px; right: 37px;}
    .crashout .crashout-frame{ width: 1200px; height: 600px; display: flex; justify-content: space-between;}
    .crashout .crashout-frame-left{ width: 400px;}
    .crashout .crashout-frame-right{ width: 270px;}
    .crashout .line{ width: 270px; margin:0 0 20px 0;}
    .crashout .line input{ width: 100%; box-sizing: border-box; border: 1px solid #ffffff; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #ffffff; background-color: transparent;}
    .crashout .line input::-webkit-input-placeholder{ color: #ffffff;}
    .crashout  .code-line{ display: flex; justify-content: space-between; align-items: center;}
    .crashout  .code-line input{ width: 50%;}
    .crashout  .code-line .n-btn{ width: 40%; }
</style>

<template>
    <div class="crashout" id="crashout">
        <a href="javascript:;" class="laws-close" @click="$emit('toggle','recordlist')"><Icon type="md-close" /></a>
        <div class="crashout-frame">
            <div class="crashout-frame-left">
                <div class="info-item">
                    <p class="name">活动名称</p>
                    <p class="info" style="width: 300px;">Disco back</p>
                </div>
                <div class="info-item">
                    <p class="name">提款额</p>
                    <p class="info">{{cash}}元</p>
                </div>
                <div class="mt60 mb60" style="display: flex; align-items: center;">
                    <input type="radio" class="radio2" v-model="isNeed" value="2">
                    <span style="font-size: 16px; color: #ffffff; margin-right: 28px; margin-left: 10px;">不需要发票</span>
                    <input type="radio" class="radio2" v-model="isNeed" value="1">
                    <span style="font-size: 16px; color: #ffffff; margin-left: 10px;">需要发票</span>
                </div>
                <div class="line"><input type="text" placeholder="联系电话" readonly :value="userMobile"></div>
                <div class="line code-line">
                    <input type="text" placeholder="验证码" v-model="vericode">
                    <t-button :isDisabled="veriBtnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
                </div>
                <div class="line"><input type="password" placeholder="密码" v-model="password"></div>
                <div class="line" style="margin-top: 100px;"><t-button :isDisabled="nextDisabled" @dotap="doConfirm">提交申请</t-button></div>
            </div>
            <div class="crashout-frame-right" v-if="isNeed === 1">
                <h3 style="font-size: 14px; color: #ffffff; margin-bottom: 30px; margin-top: 10px;">小夫有票代售服务费发票</h3>
                <div class="info-item">
                    <p class="name">发票名称</p>
                    <p class="info">票务代售服务费</p>
                </div>
                <div class="line"><input type="text" placeholder="公司全称" v-model="company"></div>
                <div class="line"><input type="text" placeholder="纳税人识别号" v-model="ids"></div>
                <div class="line"><input type="text" placeholder="公司地址" v-model="address"></div>
                <div class="line"><input type="text" placeholder="电话" v-model="phone"></div>
                <div class="line"><input type="text" placeholder="银行名称" v-model="bankname"></div>
                <div class="line"><input type="text" placeholder="开户姓名" v-model="bankusername"></div>
                <div class="line"><input type="text" placeholder="银行账号" v-model="banknum"></div>
            </div>
            <div class="crashout-frame-right" v-if="isNeed === 1">
                <h3 style="font-size: 14px; color: #ffffff; margin-bottom: 30px; margin-top: 10px;">发票邮件地址</h3>
                <div class="line"><input type="text" placeholder="发票邮件地址" v-model="kd_address"></div>
                <div class="line"><input type="text" placeholder="收件人" v-model="kd_user"></div>
                <div class="line"><input type="text" placeholder="收件人联系电话" v-model="kd_phone"></div>
                <div style="margin-top: 55px; font-size: 12px; color: #888888;">需收取3.6%税点及快递费，选择需要发票后提款额会自动扣除税点，快递费为到付。</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
import TButton from '@/components/common/TButton.vue'
import vericode from '@/components/mixin/vericode.js'
import qs from 'qs'
export default {
   name: 'App',
   components: { TButton },
   mixins: [vericode],
   props: ['data'],
   data () {
      return {
         isNeed: '2',
         password: '',
         company: '',
         ids: '',
         address: '',
         bankname: '',
         bankusername: '',
         banknum: '',
         phone: '',
         kd_user: '',
         kd_phone: '',
         kd_address: ''
      }
   },
   mounted () {
      this.isNeed = this.data.invoice === '' ? '2' : this.data.invoice
   },
   computed: {
      userMobile () {
         this.mobile = this.$store.state.userData.mobile || ''
         return this.mobile
      },
      nextDisabled () {
         if (this.code === '' || this.password === '') {
            return true
         }
         if (this.isNeed === '1') {
            if (this.company === '' || this.ids === '' || this.address === '' || this.mobile === '' || this.bankname === '' || this.banknum === '' || this.kd_user === '' || this.kd_phone === '' || this.kd_address === '') {
               return true
            }
         }
         return false
      },
      cash () {
         if (this.isNeed === '2') {
            return (this.data.total - this.data.total * (this.data.site / 100)).toFixed(2)
         } else if (this.isNeed === '1') {
            return (this.data.total - this.data.total * (this.data.site / 100) * 1.036).toFixed(2)
         }
         return ''
      }
   },
   methods: {
      doConfirm () {
         let self = this
         self.$tModal.confirm({
            title: '是否确认提交申请？',
            content: '请仔细核查活动信息，确认提交申请之后操作不可返回。<br>若是您填写的发票信息有误，小夫有票将不再重复开票。',
            onOk () {
               self.doSubmit()
            }
         })
      },
      doSubmit () {
         let obj = {}; let self = this
         obj.aid = this.data.id
         obj.phone = this.mobile
         obj.vericode = this.vericode
         obj.password = this.password
         obj.invoice = this.isNeed
         obj.cash = this.cash
         if (this.isNeed === '1') {
            obj.company = this.company
            obj.code = this.ids
            obj.address = this.address
            obj.mobile = this.phone
            obj.bankname = this.bankname
            obj.true_name = this.bankusername
            obj.cardnum = this.banknum
            obj.inv_name = '票务代售服务费'
            obj.kd_user = this.kd_user
            obj.kd_phone = this.kd_phone
            obj.kd_address = this.kd_address
         }
         this.$ajax.post('/client/api/apply_cash', qs.stringify(obj)).then(res => {
            let data = res.data
            if (data.status === 1) {
               self.$tModal.warn({
                  title: '提交成功！',
                  content: '后台将在5个工作日内完成提现审核，结款将<br>若是您填写的发票信息有误，小夫有票将不再重复开票。',
                  btn1Name: '返回首页',
                  onOk () {
                     self.$router.push('list')
                     self.$emit('toggle', 'close')
                  }
               })
            } else {
               self.$tModal.warn({
                  title: data.msg
               })
            }
         }).catch(function (error) {
            console.log(`err:${error}`)
            self.$tModal.warn({
               title: '提交失败！',
               content: '由于网络错误、流量拥挤提交失败，<br>请尝试重新提交。',
               btn1Name: '重新提交',
               onOk () {
                  self.doSubmit()
               }
            })
         })
      }
   }
}

</script>

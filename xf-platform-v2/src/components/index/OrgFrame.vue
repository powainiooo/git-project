<style>
    .organizer-frame{ position: relative;}
    .organizer-frame:before{ content: 'Organizer'; font-size: 157px; color: #fff; position: absolute; left: 0; top: -240px; font-family: 'Helve';}
    .organizer-frame .frame{ width: 900px; height: 710px; box-sizing: border-box; background-color: #ffffff; position: relative; padding: 20px; display: flex;}
    .organizer-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .organizer-frame .frame .step1{ width: 360px;}
    .organizer-frame .frame .step2{ width: 500px; position: relative;}
    .organizer-frame .frame .step2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .organizer-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .organizer-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .organizer-frame .frame .step1 input{ width: 270px; border: 1px solid #a5a5a5; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #000000; font-size: 16px;}
    .organizer-frame .step2 .hint{ font-size: 14px; color: #888888;}
    .organizer-frame .step2 .hint span{ font-size: 16px; font-weight: bold; margin-right: 4px;}
    .organizer-frame .step2 .demo{ display: flex; justify-content: space-between; align-items: center;}
    .organizer-frame .step2 .demo .n-btn{ width: 270px;}
    .organizer-frame .step2 .ids-frame{ display: flex; justify-content: space-between;}
    .organizer-frame .step2 .ids-frame .upload-frame{ flex: 1;}

    .organizer-frame .warn{ width: 130px; position: absolute; top: 270px; left: 345px; background-color: #e73828; padding: 10px 15px; border-radius: 5px; z-index: 50; font-size: 12px; color: #fff;}
    .organizer-frame .warn:before{ content: ''; width: 10px; height: 10px; border: 5px solid rgba(0,0,0,0); border-right-color: #e73828; position: absolute; top: 50%; left: -10px; margin-top: -5px;}
</style>

<template>
    <div class="organizer-frame">
        <div class="frame">
            <div class="step1">
                <h3 class="title"><span>1</span>填写{{registerType === 'company' ? '企业' : '个人'}}基本信息</h3>
                <div class="mt20">
                    <p class="mb20 tc"><input type="text" placeholder="活动方名称" v-model="logoName"></p>
                    <div v-if="registerType === 'company'">
                        <p class="mb20 tc"><input type="text" placeholder="公司名称" v-model="companyName"></p>
                        <p class="mb20 tc"><input type="text" placeholder="公司地址" v-model="address"></p>
                    </div>
                    <p class="mb20 tc"  v-if="registerType === 'personal'"><input type="text" placeholder="联系地址" v-model="address"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人姓名" v-model="name"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人联系电话" v-model="mobile" @blur="inputBlur('phone')"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人身份证号" v-model="idsnum" @blur="inputBlur('ids')"></p>
                </div>

                <div class="warn" :style="{top:warnTop+'px'}" v-if="showWarn">{{warnTxt}}</div>
            </div>
            <div class="step2">
                <h3 class="title"><span>2</span>上传图片</h3>
                <div class="pl50 pt20 pb20" style="border-bottom: 1px solid #e5e5e5;" v-show="registerType === 'company'">
                    <t-upload v-model="companyImgUrl">
                        <template slot="title">
                            <h3>企业营业执照</h3>
                        </template>
                    </t-upload>
                </div>
                <div class="pl50 pt20 pb20 ids-frame" style="border-bottom: 1px solid #e5e5e5;" v-show="registerType === 'personal'">
                    <t-upload simple v-model="idFrontImgUrl">
                        <template slot="title">
                            <h3>身份证正面</h3>
                        </template>
                    </t-upload>
                    <t-upload simple v-model="idBackImgUrl">
                        <template slot="title">
                            <h3>身份证背面</h3>
                        </template>
                    </t-upload>
                </div>
                <div class="pl50 pt20 pb20">
                    <t-upload v-model="logoImgUrl">
                        <template slot="title">
                            <h3>活动方LOGO</h3>
                        </template>
                    </t-upload>
                    <p class="hint mt25 mb25">活动方LOGO我们将严格按照统一标准进行使用<br>请务必满足以下条件。</p>
                    <p class="hint mb5"><span>1</span>上传尺寸在200px*140px的矩形区域内</p>
                    <p class="hint mb25"><span>2</span>图片为透明底黑图案，LOGO统一使用R0 G0 B0 色值的png格式文件</p>
                    <p class="hint mb25"><span>DEMO</span></p>
                    <div class="demo">
                        <img src="../../assets/img/logo.png" />
                        <t-button :isDisabled="btnDisabled" @dotap="$emit('dosubmit')">提交审核</t-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
import TButton from '@/components/common/TButton.vue'
import TUpload from '@/components/common/TUpload.vue'
export default {
   name: 'app',
   components: { TButton, TUpload },
   props: ['registerType'],
   data () {
      return {
         logoName: '',
         companyName: '',
         address: '',
         name: '',
         mobile: '',
         idsnum: '',
         companyImgUrl: '',
         idFrontImgUrl: '',
         idBackImgUrl: '',
         logoImgUrl: '',
         showWarn: false,
         warnTop: 120,
         warnTxt: 'sss'
      }
   },
   computed: {
      phoneDisabled () {
         let reg = /^[1][3,4,5,7,8][0-9]{9}$/
         return reg.test(this.mobile)
      },
      idCheck () {
         let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
         return reg.test(this.idsnum)
      },
      btnDisabled () {
         if (this.logoName !== '' && this.address !== '' && this.name !== '' && this.phoneDisabled && this.idCheck && this.logoImgUrl !== '') {
            if (this.registerType === 'company') {
               if (this.companyName !== '' && this.companyImgUrl !== '') {
                  return false
               }
            } else if (this.registerType === 'personal') {
               if (this.idFrontImgUrl !== '' && this.idBackImgUrl !== '') {
                  return false
               }
            }
         }

         return true
      }
   },
   methods: {
      inputBlur (name) {
         if (name === 'phone') {
            this.showWarn = !this.phoneDisabled
            this.warnTop = 381
            this.warnTxt = '手机号格式不正确'
         } else if (name === 'ids') {
            this.showWarn = !this.idCheck
            if (this.registerType === 'company') {
               this.warnTop = 441
            } else if (this.registerType === 'personal') {
               this.warnTop = 381
            }
            this.warnTxt = '身份证格式不正确'
         }
      }
   }
}

</script>

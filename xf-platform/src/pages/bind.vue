<style>
    .bind-frame{ position: relative; overflow: hidden; width: 100vw; height: 100vh;}
    .org-title{ font-size: 157px; color: #fff; position: absolute; right: -10px; top: 0; font-family: 'Helve';}
    .company-title{ position: absolute; left: 0; bottom: 0;}
    .company-title span{ display: block; font-family: 'Helve'; transform: rotateZ(-90deg) translate(-40px,160px); transform-origin: 0 50%; font-size: 157px; color: #fff;}
    .bind-form{ position: absolute; bottom: 0; left: 400px; z-index: 100;}
    .bind-form .frame{ width: 900px; height: 710px; box-sizing: border-box; background-color: #ffffff; position: relative; padding: 20px; display: flex;}
    .bind-form .frame:before{ content: ''; width: 100%; height: 3px; background: url("../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .bind-form .frame .step1{ width: 360px;}
    .bind-form .frame .step2{ width: 500px; position: relative;}
    .bind-form .frame .step2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .bind-form .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .bind-form .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .bind-form .frame .step1 input{ width: 270px; border: 1px solid #a5a5a5; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #000000; font-size: 16px;}
    .bind-form .frame .step1 .code-line{ width: 270px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center;}
    .bind-form .frame .step1 .code-line input{ width: 50%;}
    .bind-form .frame .step1 .code-line .n-btn{ width: 40%;}
    .bind-form .step2 .demo{ display: flex; justify-content: space-between; align-items: center;}
    .bind-form .step2 .demo .n-btn{ width: 270px;}
    .bind-form .step2 .ids-frame{ display: flex;}
    .bind-form .step2 .ids-frame .upload-frame{ flex: 1;}
    .bind-form .step2 .hint{ padding-left:50px; height: 140px; display: flex; justify-content: space-between; align-items: center;}
    .bind-form .step2 .hint div{ color: #0228af; font-size: 60px; font-family: 'Helve';}
    .bind-form .step2 .hint div span{ font-size: 36px; font-weight: bold;}
    .bind-form .step2 .hint p{ width: 330px; font-size: 16px; font-weight: bold; line-height: 1.8; color: #000000;}
    .bind-form .step2 .hint p span{ font-size: 22px;}
    .bind-form .btns{ position: absolute; bottom: 50px; right: 55px;}
    .bind-frame .anim-item{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97)}
</style>

<template>
    <div class="bind-frame">
        <transition enter-active-class="animated anim-item slideInRight">
        <div class="org-title" v-if="showItems">Organizer</div>
        </transition>
        <transition enter-active-class="animated anim-item slideInDown">
        <div class="company-title" v-if="showItems"><span>Sector</span></div>
        </transition>

        <transition enter-active-class="animated anim-item slideInUp">
        <div class="bind-form" v-if="showItems">
            <div class="frame">
                <div class="step1">
                    <h3 class="title"><span>1</span>填写提款账户信息</h3>
                    <div class="mt20">
                        <p class="mb20 tc"><input type="text" placeholder="开户名" v-model="name"></p>
                        <p class="mb20 tc"><input type="text" placeholder="预留手机号" v-model="mobile"></p>
                        <div class="line code-line">
                            <input type="text" placeholder="验证码" v-model="vericode">
                            <t-button :isDisabled="btnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
                        </div>
                        <p class="mb20 tc"><input type="text" placeholder="身份证号" v-model="idsnum"></p>
                        <p class="mb20 tc"><input type="text" placeholder="银行卡号" v-model="banknum"></p>
                        <p class="mb20 tc"><input type="text" placeholder="开户支行" v-model="bank"></p>
                    </div>
                </div>
                <div class="step2">
                    <h3 class="title"><span>2</span>活动提款须知</h3>
                    <div class="hint" style="border-bottom: 1px solid #e5e5e5;">
                        <div>5<span>%</span></div>
                        <p>小夫有票 会收取每场活动的总费用的<span>5</span>%作为手续费，提款时自动扣取。</p>
                    </div>
                    <div class="hint">
                        <div>5<span style="font-size: 24px;">days</span></div>
                        <p>提款时间在活动结束<span>3</span>个工作日后可以发起申请，审核及大款在<span>2</span>个工作日左右。</p>
                    </div>
                    <p style="font-size: 14px; color: #888888; padding-left: 50px;">如需开发票在提款时选择发票选项，需另收取手续费总额的3.6%作为税点，发票为普票。</p>
                </div>
            </div>
            <div class="btns">
                <div style="width: 270px; margin-bottom: 15px; margin-left: 40px;"><t-button :isDisabled="btnDisabled" @dotap="dobind">确认绑定</t-button></div>
                <p style="font-size: 12px; color: #888888; text-align: right;">*审核时间为工作日10:00am-18:00pm，<br>如有疑问请联系客服130-0000-0000，请于工作时间联系。</p>
            </div>
        </div>
        </transition>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import vericode from '@/components/mixin/vericode.js'
    export default {
        name: 'app',
        components:{TButton},
        mixins: [vericode],
        data(){
            return{
                showItems:false,
                name:'',
                idsnum:'',
                banknum:'',
                bank:''
            }
        },
        mounted(){
            setTimeout(()=>{
                this.showItems = true;
            },500)
        },
        computed:{
            idsnumCheck(){
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return reg.test(this.idsnum)
            },
            btnDisabled(){
                if(this.name != '' && !this.phoneDisabled && this.vericode != '' && this.idsnumCheck && this.banknum != '' && this.bank != ''){
                    return false;
                }
                return true;
            }
        },
        methods:{
            dobind(){
                //this.$router.push('list');
                //this.$store.commit('doShowGlobalMenu')
            }
        }
    }

</script>


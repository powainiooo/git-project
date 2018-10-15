<style>
    .bind-frame{ position: relative; overflow: hidden; width: 100vw; height: 100vh;}
    .org-title{ font-size: 157px; color: #fff; position: absolute; right: -10px; top: 0; font-family: 'Helve';}
    .company-title{ position: absolute; left: 0; bottom: 0;}
    .company-title span{ display: block; font-family: 'Helve',"Hiragino Sans GB"; transform: rotateZ(-90deg) translate(-40px,160px); transform-origin: 0 50%; font-size: 157px; color: #fff;}
    .bind-form{ position: absolute; bottom: 0; left: 400px; z-index: 100;}
    .bind-form .frame{ width: 900px; height: 710px; box-sizing: border-box; background-color: #ffffff; position: relative; padding: 20px; display: flex;}
    .bind-form .frame:before{ content: ''; width: 100%; height: 3px; background: url("../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .bind-form .frame .step1{ width: 360px; position: relative;}
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
    .bind-frame .warn{ width: 130px; position: absolute; top: 270px; left: 330px; background-color: #e73828; padding: 10px 15px; border-radius: 5px; z-index: 50; font-size: 12px; color: #fff;}
    .bind-frame .warn:before{ content: ''; width: 10px; height: 10px; border: 5px solid rgba(0,0,0,0); border-right-color: #e73828; position: absolute; top: 50%; left: -10px; margin-top: -5px;}
</style>

<template>
    <div class="bind-frame">
        <transition enter-active-class="animated anim-item slideInRight">
        <div class="org-title" v-if="showItems">Organizer</div>
        </transition>
        <transition enter-active-class="animated anim-item slideInDown">
        <div class="company-title" v-if="showItems"><span>{{userActivity}}</span></div>
        </transition>

        <transition enter-active-class="animated anim-item slideInUp">
        <div class="bind-form" v-if="showItems">
            <div class="frame">
                <div class="step1">
                    <h3 class="title"><span>1</span>填写提款账户信息</h3>
                    <div class="mt20">
                        <p class="mb20 tc"><input type="text" placeholder="开户名" v-model="name"></p>
                        <p class="mb20 tc"><input type="text" placeholder="预留手机号" v-model="mobile" @keyup="inputBlur('phone')"></p>
                        <div class="line code-line">
                            <input type="text" placeholder="验证码" v-model="vericode">
                            <t-button :isDisabled="veriBtnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
                        </div>
                        <p class="mb20 tc"><input type="text" placeholder="身份证号" v-model="idsnum" @keyup="inputBlur('idsnum')"></p>
                        <p class="mb20 tc"><input type="text" placeholder="银行卡号" v-model="banknum"></p>
                        <p class="mb20 tc"><input type="text" placeholder="开户支行" v-model="bank"></p>
                    </div>

                    <div class="warn" :style="{top:warnTop+'px'}" v-if="showWarn">{{warnTxt}}</div>
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
    import qs from 'qs'
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
                bank:'',
                showWarn:false,
                warnTop:0,
                warnTxt:''
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
            },
            userActivity(){
                return this.$store.state.userData.activity || '';
            }
        },
        methods:{
            doConfirm(){
                let self = this;
                self.$tModal.confirm({
                    title:'是否确认绑定银行卡信息？',
                    content:'请仔细核查银行卡信息，确认修改绑定后所有活动结款都将打款到新修改的银行卡。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。',
                    onOk(){
                        self.dobind();
                    }
                })
            },
            dobind(){
                let obj = {},self = this;
                obj.username = this.name;
                obj.mobile = this.mobile;
                obj.vericode = this.vericode;
                obj.idnums = this.idsnum;
                obj.cardnums = this.banknum;
                obj.bankname = this.bank;
                this.$ajax.post('/client/api/bind_card',qs.stringify(obj)).then(res=>{
                    let data = res.data;
                    if(data.status == 1){
                        self.$tModal.warn({
                            title:'绑定成功！',
                            content:'银行卡信息绑定成功，如若需要修改请在“菜单”-“银行卡管理”中修改',
                            btn1Name:'返回',
                            onOk(){
                                self.$router.push('list');
                            }
                        });
                    }else{
                        self.$tModal.warn({
                            title:data.msg
                        });
                    }
                }).catch(function (error) {
                    self.$tModal.warn({
                        title:'提交失败！',
                        content:'由于网络错误、流量拥挤提交失败，<br>请尝试重新提交。',
                        btn1Name:'重新提交',
                        onOk(){
                            self.dobind();
                        }
                    })
                });
            },
            inputBlur(name){
                if(name == 'phone'){
                    this.showWarn = this.phoneDisabled;
                    this.warnTop = 180;
                    this.warnTxt = '手机号格式不正确';
                }else if(name == 'idsnum'){
                    this.showWarn = !this.idsnumCheck;
                    this.warnTop = 300;
                    this.warnTxt = '身份证格式不正确';
                }
            }
        }
    }

</script>


<style>
    .register-frame{ position: relative;}
    .register-frame>h3{ font-size: 16px; color: #ffffff; margin-left: 30px; margin-bottom: 20px;}
    .register-frame .frame{ background-color: #ffffff; box-shadow: 0 2px 3px rgba(0,0,0,0.2); position: relative; padding: 0 15px; overflow: hidden;}
    .register-frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: 41px;}
    .register-frame .frame .title{ overflow: hidden; font-weight: bold; font-size: 18px; text-align: center; color: #000; transition:all 0.6s cubic-bezier(.15,.61,.42,1.05);}
    .register-frame .frame .title span{ font-size: 66px;}
    .register-frame .frame .more{ overflow: hidden; transition:all 0.6s cubic-bezier(.15,.61,.42,1.05);}
    .register-frame .frame .line{ margin-bottom: 20px;}
    .register-frame .frame .line input{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #000000}
    .register-frame .frame .line input::-webkit-input-placeholder{ color: #888888;}
    .register-frame .frame  .code-line{ display: flex; justify-content: space-between; align-items: center;}
    .register-frame .frame  .code-line input{ width: 50%;}
    .register-frame .frame  .code-line .n-btn{ width: 40%; }
    .register-frame .frame .hint{ font-size: 12px; color: #002aa6; text-align: center;}
    .register-frame .tab{ border-top: 1px solid #e5e5e5; padding-top: 25px; margin-top: 25px;}
    .register-frame .tab h3{ font-size: 18px; color: #000; font-weight: bold; margin-left: 14px;}
    .register-frame .tab ul{ display: flex;margin-top: 15px;}
    .register-frame .tab ul li{flex: 1; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 18px; color: #ffffff;background-color: #c8c9cb; cursor: pointer;}
    .register-frame .tab ul li.active{ background-color: #002aa6;  box-shadow: 0 2px 3px rgba(0,0,0,0.2);}
    .register-frame .tab ul li:first-child{ border-radius: 5px 0 0 5px;}
    .register-frame .tab ul li:nth-child(2){ border-radius: 0 5px 5px 0;}

    .register-frame .warn{ width: 130px; position: absolute; top: 270px; left: 310px; background-color: #e73828; padding: 10px 15px; border-radius: 5px; z-index: 50; font-size: 12px; color: #fff;}
    .register-frame .warn:before{ content: ''; width: 10px; height: 10px; border: 5px solid rgba(0,0,0,0); border-right-color: #e73828; position: absolute; top: 50%; left: -10px; margin-top: -5px;}
    .register-frame .hide{ opacity: 0; cursor: default;}
</style>

<template>
    <div class="register-frame">
        <h3>还没注册？</h3>
        <div class="frame" :style="{'padding-top':showAll ? '25px' : '0px'}">
            <p class="title" :style="{height:showAll ? '0px' : '100px'}"><span>2</span>步轻松创建活动方账户</p>
            <div class="line mt20">
                <input type="text"
                       placeholder="注册邮箱"
                       v-model="email"
                       @blur="checkAccount"
                       :readonly="confirmInfos"></div>
            <div class="more" :style="{height:showAll ? '425px' : '0px','margin-bottom':showAll ? '30px' : '0px'}">
                <div class="line">
                    <input type="text"
                           placeholder="联系电话"
                           v-model="mobile"
                           maxlength="11"
                           :readonly="confirmInfos"
                           @keyup="inputBlur('phone')">
                </div>
                <div class="line code-line">
                    <input type="text" placeholder="验证码" v-model="vericode" :readonly="confirmInfos">
                    <t-button :isDisabled="veriBtnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
                </div>
                <div class="line">
                    <input type="password"
                           placeholder="密码"
                           v-model="password"
                           :readonly="confirmInfos"
                           @keyup="inputBlur('psw')">
                </div>
                <div class="line">
                    <input type="password"
                           placeholder="重复密码"
                           v-model="confirmPSW"
                           :readonly="confirmInfos"
                           @keyup="inputBlur('cpsw')">
                </div>
                <div class="hint" :class="confirmInfos ? 'hide':''">密码必须包含数字、字母，且不少于8个字符。</div>
                <div class="tab">
                    <h3>选择活动方类型</h3>
                    <ul>
                        <li :class="registerType == 'company' ? 'active' : ''" @click="changeType('company')">企业活动方</li>
                        <li :class="registerType == 'personal' ? 'active' : ''" @click="changeType('personal')">个人活动方</li>
                    </ul>
                </div>
            </div>
            <div style="margin-top: 15px; margin-bottom: 40px;" :class="confirmInfos ? 'hide':''">
                <t-button @dotap="doNext" v-if="!showAll" :isDisabled="emailDisabled || hasAccount">下一步</t-button>
                <t-button @dotap="doNext2" v-if="showAll" :isDisabled="nextDisabled">下一步</t-button>
            </div>
            <div style="margin-top: 50px; margin-bottom: 42px;" v-if="showAll">
                <a href="javascript:;" class="hint" @click="doBackLogin" :class="confirmInfos ? 'hide':''">已有账号？</a>
            </div>
        </div>

        <div class="warn" :style="{top:warnTop+'px'}" v-if="showWarn">{{warnTxt}}</div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import vericode from '@/components/mixin/vericode.js'
    export default {
        name: 'app',
        components:{TButton},
        props:['showAll','registerType'],
        mixins: [vericode],
        data(){
            return{
                email:'',
                password:'',
                confirmPSW:'',
                confirmInfos:false,
                showWarn:false,
                warnTop:0,
                warnTxt:'',
                hasAccount:true
            }
        },
        computed:{
            emailDisabled(){
                let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                return !reg.test(this.email)
            },
            pswPass(){
                let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/;
                return reg.test(this.password)
            },
            pswConfirm(){
                if(this.password != this.confirmPSW){
                    return true
                }
                return false
            },
            nextDisabled(){
                if(this.phoneDisabled || this.emailDisabled || this.vericode == '' || !this.pswPass || this.password != this.confirmPSW){
                    return true
                }
                return false
            }
        },
        methods:{
            doNext(){
                if(this.confirmInfos) return;
                this.$emit('doShowRegiterAll')
            },
            doNext2(){
                if(this.confirmInfos) return;
                this.confirmInfos = true;
                this.$emit('doNext2');
            },
            doBackLogin(){
                if(this.confirmInfos) return;
                this.$emit('doBackLogin')
            },
            changeType(type){
                this.$emit('changeType',type)
            },
            inputBlur(name){
                if(name == 'phone'){
                    this.showWarn = this.phoneDisabled;
                    this.warnTop = 150;
                    this.warnTxt = '手机号格式不正确';
                }else if(name == 'psw'){
                    this.showWarn = !this.pswPass;
                    this.warnTop = 270;
                    this.warnTxt = '密码格式不正确';
                }else if(name == 'cpsw'){
                    this.showWarn = this.password != this.confirmPSW;
                    this.warnTop = 330;
                    this.warnTxt = '密码不一致';
                }else if(name == 'email'){
                    this.showWarn = this.hasAccount;
                    this.warnTop = 166;
                    this.warnTxt = '该帐号已存在';
                }
            },
            checkAccount(){
                let self = this;
                self.$ajax.get('/client/api/check_account',{
                    params:{
                        email:this.email
                    }
                }).then(res=>{
                    let data = res.data;
                    if(data.status == 1){
                        self.hasAccount = false;
                    }else{
                        self.hasAccount = true;
                    }
                    self.inputBlur('email');
                })
            }
        }
    }

</script>


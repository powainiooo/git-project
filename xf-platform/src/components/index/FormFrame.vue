<style>
    .form-frame{ width: 400px; height: 100vh; background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9); position: absolute; top: 0; left: 0; z-index: 1600; transition:width 0.8s cubic-bezier(.25,.71,.22,.99);}
    .form-frame .btn-back{ font-size: 30px; color: #ffffff; position: absolute; top: 110px; left: 60px;}
    .log-frame{ width: 270px; position: absolute; left: 65px; top: 50%; margin-top: -230px;}
    .reg-frame{ width: 300px; position: absolute; left: 50px; bottom: 0; z-index: 10;}
    .org-frame{ position: absolute; left: 400px; bottom: 0; z-index: 10;}
    .moveFunc{ animation-timing-function: cubic-bezier(.25,.71,.22,.99);}
</style>

<template>
    <div class="form-frame" :style="{width:showOrganize ? '1350px' : '400px'}">
        <a href="javascript:;" class="btn-back" v-if="showForget" @click="doHideForget"><Icon type="ios-arrow-back" /></a>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <section class="log-frame" v-if="showLogin || showForget">
                <transition enter-active-class="animated fadeIn">
                <login-frame v-if="showLogin" @gotoForget="doShowForget"></login-frame>
                </transition>
                <transition enter-active-class="animated fadeIn">
                    <forget-frame v-if="showForget" @doHideForget="doHideForget"></forget-frame>
                </transition>
            </section>
        </transition>
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <section class="reg-frame" v-if="showRegister">
                <register-frame
                    :showAll="showRegisterAll"
                    :registerType="registerType"
                    ref="register"
                    @changeType="changeRegType"
                    @doShowRegiterAll="doShowRegiterAll"
                    @doNext2="doShowOrg"
                    @doBackLogin="doHideRegiterAll"></register-frame>
            </section>
        </transition>
        <transition enter-active-class="animated slideInUp moveFunc">
            <section class="org-frame" v-if="showOrganize">
                <org-frame ref="organizer" :registerType="registerType" @dosubmit="showLaws = true"></org-frame>
            </section>
        </transition>

        <t-laws v-if="showLaws" @dosubmit="dosubmit" @close="showLaws = false"></t-laws>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import LoginFrame from '@/components/index/LoginFrame.vue'
    import ForgetFrame from '@/components/index/ForgetFrame.vue'
    import RegisterFrame from '@/components/index/RegisterFrame.vue'
    import OrgFrame from '@/components/index/OrgFrame.vue'
    import TLaws from '@/components/common/TLaws.vue'
    import qs from 'qs'
    export default {
        name: 'app',
        components:{TButton,LoginFrame,ForgetFrame,RegisterFrame,OrgFrame,TLaws},
        data(){
            return{
                showLogin:true,
                showForget:false,
                showRegister:true,
                showRegisterAll:false,
                showOrganize:false,
                showLaws:false,
                registerType:'company'
            }
        },
        methods:{
            doShowForget(){
                this.showLogin = false;
                this.showForget = true;
                this.showRegister = false;
            },
            doHideForget(){
                this.showLogin = true;
                this.showForget = false;
                this.showRegister = true;
            },
            doShowRegiterAll(){
                this.showLogin = false;
                this.showRegisterAll = true;
            },
            doHideRegiterAll(){
                this.showLogin = true;
                this.showRegisterAll = false;
            },
            doShowOrg(){
                this.showOrganize = true;
            },
            changeRegType(type){
                this.registerType = type;
            },
            dosubmit(){
                let self = this;
                let register = this.$refs.register;
                let organizer = this.$refs.organizer;
                let obj = {};
                obj.email = register.email;
                obj.mobile = register.mobile;
                obj.vericode = register.vericode;
                if(self.registerType == 'company'){
                    obj.type = 1;
                }else if(self.registerType == 'personal'){
                    obj.type = 2;
                }
                obj.password = register.password;
                obj.repassword = register.confirmPSW;
                obj.activity = organizer.logoName;
                obj.company = organizer.companyName;
                obj.address = organizer.address;
                obj.person = organizer.name;
                obj.phone = organizer.mobile;
                obj.idnum = organizer.idsnum;
                if(this.registerType == 'company'){
                    obj.license = organizer.companyImgUrl;
                }else if(this.registerType == 'personal'){
                    obj.license = organizer.idFrontImgUrl;
                    obj.license2 = organizer.idBackImgUrl;
                }
                obj.logo_img = organizer.logoImgUrl;
                this.$ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                this.$ajax.post('/client/api/register',qs.stringify(obj)).then(res=>{
                    let data = res.data;
                    console.log(data);
                    if(data.status == 1){
                        self.$tModal.warn({
                            title:'提交成功！',
                            content:'后台将在3个工作日内完成帐号审核，<br>帐号审核通过与否，都将以短信形式通知到已注册的手机号上。',
                            btn1Name:'返回首页',
                            onOk(){
                                self.$router.go(0)
                            }
                        })
                    }else if(data.status == -3){
                        self.$tModal.warn({
                            title:'提交失败！',
                            content:'该帐号信息已经存在，请重新填写',
                            btn1Name:'返回首页',
                            onOk(){
                                self.$router.go(0)
                            }
                        })
                    }else{
                        self.$tModal.warn({
                            title:'提交失败！',
                            content:'由于网络错误，流量拥挤提交失败，<br>请尝试重新提交。',
                            btn1Name:'重新提交',
                            onOk(){

                            }
                        })
                    }
                })
            }
        }
    }

</script>


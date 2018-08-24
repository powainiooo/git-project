<style>
    .form-frame{ width: 400px; height: 100vh; background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9); position: absolute; top: 0; left: 0; z-index: 200; transition:width 0.8s cubic-bezier(.25,.71,.22,.99);}
    .log-frame{ width: 270px; position: absolute; left: 65px; top: 50%; margin-top: -230px;}
    .reg-frame{ width: 300px; position: absolute; left: 50px; bottom: 0; z-index: 10;}
    .org-frame{ position: absolute; left: 400px; bottom: 0; z-index: 10;}
    .moveFunc{ animation-timing-function: cubic-bezier(.25,.71,.22,.99);}
</style>

<template>
    <div class="form-frame" :style="{width:showOrganize ? '1350px' : '400px'}">

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <section class="log-frame" v-if="showLogin || showForget">
                <login-frame v-if="showLogin" @gotoForget="doShowForget"></login-frame>
                <transition enter-active-class="animated fadeIn">
                    <forget-frame v-if="showForget"></forget-frame>
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

        <t-laws v-if="showLaws" @dosubmit="dosubmit"></t-laws>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import LoginFrame from '@/components/index/LoginFrame.vue'
    import ForgetFrame from '@/components/index/ForgetFrame.vue'
    import RegisterFrame from '@/components/index/RegisterFrame.vue'
    import OrgFrame from '@/components/index/OrgFrame.vue'
    import TLaws from '@/components/common/TLaws.vue'
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
                console.log('submit');
                let self = this;
                let register = this.$refs.register;
                let organizer = this.$refs.organizer;
                let obj = {};
                obj.email = register.email;
                obj.mobile = register.phone;
                obj.vericode = register.code;
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
                this.$ajax.post('/client/api/register',obj).then(res=>{
                    let data = res.data;
                    if(data.status == 1){
                        self.$router.push('bind');
                    }else if(data.status == -3){
                        self.$router.push('index');
                    }
                })
            }
        }
    }

</script>


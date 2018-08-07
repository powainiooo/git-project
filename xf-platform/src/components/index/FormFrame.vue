<style>
    .form-frame{ width: 400px; height: 100vh; background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9); position: absolute; top: 0; left: 0; z-index: 200; overflow: hidden;}
    .log-frame{ width: 270px; position: absolute; left: 65px; top: 50%; margin-top: -230px;}
    .form-frame .logo{ font-size: 32px; color: #ffffff; position: absolute; top: 60px; left: 60px;}
    .reg-frame{ width: 300px; position: absolute; left: 50px; bottom: 0; z-index: 10;}
</style>

<template>
    <div class="form-frame">
        <div class="logo"><i class="icon-logo"></i></div>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <section class="log-frame" v-if="showLogin || showForget">
                <login-frame v-if="showLogin" @gotoForget="doShowForget"></login-frame>
                <transition enter-active-class="animated fadeIn">
                    <forget-frame v-if="showForget"></forget-frame>
                </transition>
            </section>
        </transition>
        <section class="reg-frame">
            <register-frame
                :showAll="showRegisterAll"
                @doShowRegiterAll="doShowRegiterAll"
                @doBackLogin="doHideRegiterAll"></register-frame>
        </section>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import LoginFrame from '@/components/index/LoginFrame.vue'
    import ForgetFrame from '@/components/index/ForgetFrame.vue'
    import RegisterFrame from '@/components/index/RegisterFrame.vue'
    export default {
        name: 'app',
        components:{TButton,LoginFrame,ForgetFrame,RegisterFrame},
        data(){
            return{
                showLogin:true,
                showForget:false,
                showRegisterAll:true
            }
        },
        methods:{
            doShowForget(){
                this.showLogin = false;
                this.showForget = true;
            },
            doShowRegiterAll(){
                this.showLogin = false;
                this.showRegisterAll = true;
            },
            doHideRegiterAll(){
                this.showLogin = true;
                this.showRegisterAll = false;
            }
        }
    }

</script>


<style>
    .form-frame{ width: 400px; height: 100vh; background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9); position: absolute; top: 0; left: 0; z-index: 200;}
    .log-frame{ width: 270px; position: absolute; left: 65px; top: 50%; margin-top: -230px;}
    .form-frame .logo{ font-size: 32px; color: #ffffff; position: absolute; top: 60px; left: 60px;}
</style>

<template>
    <div class="form-frame">
        <div class="logo"><i class="icon-logo"></i></div>
        <section class="log-frame">
            <login-frame v-if="showLogin" @gotoForget="doShowForget"></login-frame>
            <transition enter-active-class="animated fadeIn">
                <forget-frame v-if="showForget"></forget-frame>
            </transition>

        </section>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import LoginFrame from '@/components/index/LoginFrame.vue'
    import ForgetFrame from '@/components/index/ForgetFrame.vue'
    export default {
        name: 'app',
        components:{TButton,LoginFrame,ForgetFrame},
        data(){
            return{
                showLogin:false,
                showForget:true
            }
        },
        methods:{
            doShowForget(){
                this.showLogin = false;
                this.showForget = true;
            }
        }
    }

</script>


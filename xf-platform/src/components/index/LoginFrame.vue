<style>
    .login-frame h3{ color: #fff; font-size: 18px; margin-bottom: 20px;}
    .login-frame .line{ margin-bottom: 20px;}
    .login-frame input{ width: 100%; box-sizing: border-box; border: 1px solid #ffffff; border-radius: 6px; font-size: 16px; padding: 9px 16px; color: #ffffff}
    .login-frame input::-webkit-input-placeholder{ color: #ffffff;}
    .login-frame .line>a{ font-size: 12px; color: #ffffff;}
</style>

<template>
    <div class="login-frame">
        <h3>登录</h3>
        <div class="line"><input type="text" placeholder="邮箱/手机" v-model="username"></div>
        <div class="line"><input type="password" placeholder="密码" v-model="password"></div>
        <div class="line"><a href="javascript:;" @click="gotoForget">忘记密码？</a> </div>
        <div class="line" style="margin-top: 35px;"><t-button extraClass="white" :isDisabled="isDisabled">确认</t-button></div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        data(){
            return{
                username:'',
                password:''
            }
        },
        computed:{
            isDisabled(){
                if(this.username == '' || this.password == ''){
                    return true
                }
                return false
            }
        },
        methods:{
            gotoForget(){
                this.$emit('gotoForget')
            }
        }
    }

</script>


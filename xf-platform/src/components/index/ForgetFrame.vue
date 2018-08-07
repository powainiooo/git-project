<style>
    .login-frame h3{ color: #fff; font-size: 18px; margin-bottom: 20px;}
    .login-frame .line{ margin-bottom: 20px;}
    .login-frame .code-line{ display: flex; justify-content: space-between;}
    .login-frame .code-line input{ width: 50%;}
    .login-frame .code-line .n-btn{ width: 40%; font-size: 12px;}
    .login-frame .code-line .n-btn a{font-size: 12px;}
    .login-frame input{ width: 100%; box-sizing: border-box; border: 1px solid #ffffff; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #ffffff}
    .login-frame input::-webkit-input-placeholder{ color: #ffffff;}
    .login-frame .line>a{ font-size: 12px; color: #ffffff;}
</style>

<template>
    <div class="login-frame">
        <h3>忘记密码</h3>
        <div class="line"><input type="text" placeholder="联系电话" v-model="phone"></div>
        <div class="line code-line">
            <input type="text" placeholder="验证码">
            <t-button extraClass="white" :isDisabled="phone == ''">获取验证码</t-button>
        </div>
        <div class="line"><input type="password" placeholder="新密码" v-model="password"></div>
        <div class="line"><input type="password" placeholder="确认新密码" v-model="confirmPSW"></div>
        <div class="line" style="margin-top: 35px;"><t-button extraClass="white" :isDisabled="btnDisabled">确认</t-button></div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        data(){
            return{
                phone:'',
                password:'',
                confirmPSW:''
            }
        },
        computed:{
            btnDisabled(){
                if(this.phone == '' || this.password == '' || this.confirmPSW == ''){
                    return true
                }
                return false
            }
        },
        methods:{

        }
    }

</script>


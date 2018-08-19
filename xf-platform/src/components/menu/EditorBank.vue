<style>
    .editor-bank .line{ width: 270px; margin:0 auto 20px auto;}
    .editor-bank .line input{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #888888}
    .editor-bank .line input::-webkit-input-placeholder{ color: #888888;}
    .editor-bank  .code-line{ display: flex; justify-content: space-between; align-items: center;}
    .editor-bank  .code-line input{ width: 50%;}
    .editor-bank  .code-line .n-btn{ width: 40%; }
</style>

<template>
    <div class="editor-bank">
        <div class="line"><input type="text" placeholder="联系电话"></div>
        <div class="line code-line">
            <input type="text" placeholder="验证码">
            <t-button size="min">获取验证码</t-button>
        </div>
        <div class="line"><input type="password" placeholder="密码"></div>
        <h3 style="font-size: 16px; padding-left: 20px;  margin:0 auto 20px auto; width: 270px; color: #000;">新银行卡信息</h3>
        <div class="line"><input type="text" placeholder="开户名"></div>
        <div class="line"><input type="text" placeholder="预留手机"></div>
        <div class="line"><input type="text" placeholder="身份证号"></div>
        <div class="line"><input type="text" placeholder="银行卡号"></div>
        <div class="line"><input type="text" placeholder="开户支行"></div>
        <div class="line" style="margin-top: 100px;"><t-button>确认修改</t-button></div>
    </div>
</template>

<script type="es6">
    import TButton from '@/components/common/TButton.vue'
    export default{
        name: 'App',
        components:{TButton},
        data(){
            return{

            }
        }
    }

</script>


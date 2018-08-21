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
        <div class="line"><input type="text" placeholder="联系电话" readonly value="13812341234"></div>
        <div class="line code-line">
            <input type="text" placeholder="验证码" v-model="code">
            <t-button size="min" :isDisabled="phoneDisabled" @dotap="getCode">{{codeBtnName}}</t-button>
        </div>
        <div class="line"><input type="password" placeholder="密码" v-model="password"></div>
        <h3 style="font-size: 16px; padding-left: 20px;  margin:0 auto 20px auto; width: 270px; color: #000;">新银行卡信息</h3>
        <div class="line"><input type="text" placeholder="开户名" v-model="name"></div>
        <div class="line"><input type="text" placeholder="预留手机" v-model="mobile"></div>
        <div class="line"><input type="text" placeholder="身份证号" v-model="idsnum"></div>
        <div class="line"><input type="text" placeholder="银行卡号" v-model="banknum"></div>
        <div class="line"><input type="text" placeholder="开户支行" v-model="bankname"></div>
        <div class="line" style="margin-top: 100px;"><t-button :isDisabled="nextDisabled" @dotap="doEditor">确认修改</t-button></div>
    </div>
</template>

<script type="es6">
    import TButton from '@/components/common/TButton.vue'
    export default{
        name: 'App',
        components:{TButton},
        computed:{
            phoneDisabled(){
                if(this.codeIndex != 0){
                    return true
                }
                return false
            },
            nextDisabled(){
                if(this.code == '' || this.password == '' || this.name == '' || this.mobile == '' || this.idsnum == '' || this.banknum == '' || this.bankname == ''){
                    return true
                }
                return false
            }
        },
        data(){
            return{
                code:'',
                codeBtnName:'获取验证码',
                codeIndex:0,
                password:'',
                name:'',
                mobile:'',
                idsnum:'',
                banknum:'',
                bankname:''
            }
        },
        methods:{
            getCode(){
                this.codeCount();
            },
            codeCount(){
                this.codeIndex = 60;
                this.codeBtnName = `请${this.codeIndex}秒以后再尝试`;
                let t = setInterval(()=>{
                    if(this.codeIndex == 0){
                        clearInterval(t);
                        this.codeBtnName = `获取验证码`;
                    }else{
                        this.codeIndex -- ;
                        this.codeBtnName = `请${this.codeIndex}秒以后再尝试`;
                    }
                },1000)
            },
            doEditor(){
                //this.$tModal.confirm({
                //
                //})
            }
        }
    }

</script>


<style>
    .register-frame>h3{ font-size: 16px; color: #ffffff; margin-left: 30px; margin-bottom: 20px;}
    .register-frame .frame{ background-color: #ffffff; box-shadow: 0 2px 3px rgba(0,0,0,0.2); position: relative; padding: 0 15px; overflow: hidden;}
    .register-frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: 41px;}
    .register-frame .frame .title{ overflow: hidden; font-weight: bold; font-size: 18px; text-align: center; color: #000; transition:all 0.6s cubic-bezier(.15,.61,.42,1.05);}
    .register-frame .frame .title span{ font-size: 66px;}
    .register-frame .frame .more{ overflow: hidden; transition:all 0.6s cubic-bezier(.15,.61,.42,1.05);}
    .register-frame .frame .line{ margin-bottom: 20px;}
    .register-frame .frame .line input{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #888888}
    .register-frame .frame .line input::-webkit-input-placeholder{ color: #888888;}
    .register-frame .frame  .code-line{ display: flex; justify-content: space-between;}
    .register-frame .frame  .code-line input{ width: 50%;}
    .register-frame .frame  .code-line .n-btn{ width: 40%; font-size: 12px;}
    .register-frame .frame  .code-line .n-btn a{font-size: 12px;}
    .register-frame .frame .hint{ font-size: 12px; color: #002aa6; text-align: center;}
    .register-frame .tab{ border-top: 1px solid #e5e5e5; padding-top: 25px; margin-top: 25px;}
    .register-frame .tab h3{ font-size: 18px; color: #000; font-weight: bold; margin-left: 14px;}
    .register-frame .tab ul{ display: flex;margin-top: 15px;}
    .register-frame .tab ul li{flex: 1; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 18px; color: #ffffff;background-color: #c8c9cb; }
    .register-frame .tab ul li.active{ background-color: #002aa6;  box-shadow: 0 2px 3px rgba(0,0,0,0.2);}
    .register-frame .tab ul li:first-child{ border-radius: 5px 0 0 5px;}
    .register-frame .tab ul li:nth-child(2){ border-radius: 0 5px 5px 0;}
</style>

<template>
    <div class="register-frame">
        <h3>还没注册？</h3>
        <div class="frame" :style="{'padding-top':showAll ? '25px' : '0px'}">
            <p class="title" :style="{height:showAll ? '0px' : '100px'}"><span>2</span>步轻松创建活动方账户</p>
            <div class="line"><input type="text" placeholder="注册邮箱" v-model="email"></div>
            <div class="more" :style="{height:showAll ? '425px' : '0px','margin-bottom':showAll ? '30px' : '0px'}">
                <div class="line"><input type="text" placeholder="联系电话" v-model="phone"></div>
                <div class="line code-line">
                    <input type="text" placeholder="验证码" v-model="code">
                    <t-button :isDisabled="phoneDisabled">获取验证码</t-button>
                </div>
                <div class="line"><input type="text" placeholder="密码" v-model="password"></div>
                <div class="line"><input type="text" placeholder="重复密码" v-model="confirmPSW"></div>
                <div class="hint">密码必须包含数字、字母，且不少于8个字符。</div>
                <div class="tab">
                    <h3>选择活动方类型</h3>
                    <ul>
                        <li class="active">企业活动方</li>
                        <li>个人活动方</li>
                    </ul>
                </div>
            </div>
            <div style="margin-top: 15px; margin-bottom: 40px;">
                <t-button @dotap="doNext" v-if="!showAll" :isDisabled="emailDisabled">下一步</t-button>
                <t-button v-if="showAll" :isDisabled="nextDisabled">下一步</t-button>
            </div>
            <div style="margin-top: 50px; margin-bottom: 25px;" v-if="showAll">
                <a href="javascript:;" class="hint" @click="doBackLogin">已有账号？</a>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        props:['showAll'],
        data(){
            return{
                email:'',
                phone:'',
                code:'',
                password:'',
                confirmPSW:''
            }
        },
        mounted(){
            let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/;
            let str = '123412a34112';
            console.log(reg.test(str));
        },
        computed:{
            emailDisabled(){
                let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                return !reg.test(this.email)
            },
            phoneDisabled(){
                let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(!reg.test(this.phone)){
                    return true
                }
                return false
            },
            pswPass(){
                let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/;
                return reg.test(this.password)
            },
            nextDisabled(){
                if(this.phoneDisabled || this.emailDisabled || this.code == ''){
                    return true
                }
                return false
            }
        },
        methods:{
            doNext(){
                if(this.showAll){//显示上传资料

                }else{//显示完整注册框
                    this.$emit('doShowRegiterAll')
                }
            },
            doBackLogin(){
                this.$emit('doBackLogin')
            }
        }
    }

</script>


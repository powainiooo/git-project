<style>
    .editor-bank .line{ width: 270px; margin:0 auto 20px auto;}
    .editor-bank .line input{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #000000}
    .editor-bank .line input::-webkit-input-placeholder{ color: #888888;}
    .editor-bank  .code-line{ display: flex; justify-content: space-between; align-items: center;}
    .editor-bank  .code-line input{ width: 50%;}
    .editor-bank  .code-line .n-btn{ width: 40%; }
</style>

<template>
    <div class="editor-bank">
        <div class="line"><input type="text" placeholder="联系电话" readonly :value="userMobile"></div>
        <div class="line code-line">
            <input type="text" placeholder="验证码" v-model="vericode">
            <t-button :isDisabled="veriBtnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
        </div>
        <div class="line"><input type="password" placeholder="密码" v-model="password"></div>
        <h3 style="font-size: 16px; padding-left: 20px;  margin:0 auto 20px auto; width: 270px; color: #000;">新银行卡信息</h3>
        <div class="line"><input type="text" placeholder="开户名" v-model="name"></div>
        <div class="line"><input type="text" placeholder="预留手机" v-model="phone"></div>
        <div class="line"><input type="text" placeholder="身份证号" v-model="idsnum"></div>
        <div class="line"><input type="text" placeholder="银行卡号" v-model="banknum"></div>
        <div class="line"><input type="text" placeholder="开户支行" v-model="bankname"></div>
        <div class="line" style="margin-top: 100px;"><t-button :isDisabled="nextDisabled" @dotap="doEditor">确认修改</t-button></div>
        <span v-show="false">{{userMobile}}</span>
    </div>
</template>

<script type="es6">
    import TButton from '@/components/common/TButton.vue'
    import vericode from '@/components/mixin/vericode.js'
    import qs from 'qs'
    export default{
        name: 'App',
        components:{TButton},
        mixins: [vericode],
        computed:{
            nextDisabled(){
                if(this.code == '' || this.password == '' || this.name == '' || this.mobile == '' || this.idsnum == '' || this.banknum == '' || this.bankname == ''){
                    return true
                }
                return false
            },
            userMobile(){
                this.mobile = this.$store.state.userData.mobile || '';
                return this.mobile
            }
        },
        data(){
            return{
                password:'',
                name:'',
                phone:'',
                idsnum:'',
                banknum:'',
                bankname:''
            }
        },
        methods:{
            doEditor(){
                let obj = {},self = this;
                obj.username = this.name;
                obj.mobile = this.phone;
                obj.phone = this.mobile;
                obj.password = this.password;
                obj.vericode = this.vericode;
                obj.idnums = this.idsnum;
                obj.cardnums = this.banknum;
                obj.bankname = this.bankname;
                this.$ajax.post('/client/api/bind_card',qs.stringify(obj)).then(res=>{
                    let data = res.data;
                    if(data.status == 1){
                        self.$Message.success('绑定成功！');
                        self.$store.dispatch('getUserData');
                        self.$emit('toggle','bankinfo');
                    }
                })
            }
        }
    }

</script>


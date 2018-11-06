export default {
    data(){
        return{
            mobile:'',
            vericode:'',
            codeBtnName:'获取验证码',
            codeIndex:0
        }
    },
    computed:{
        phoneDisabled(){
            let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
            if(!reg.test(this.mobile)){
                return true
            }
            return false
        },
        veriBtnDisabled(){
            if(this.phoneDisabled || this.codeIndex != 0){
                return true
            }
            return false
        }
    },
    methods:{
        getCode(){
            if(this.veriBtnDisabled) return;
            this.codeCount();
            this.$ajax.get('/client/api/sms_send',{
                params:{
                    mobile:this.mobile
                }
            }).then(res=>{
                console.log(res.data)
            })
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
        }
    }
}

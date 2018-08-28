<style>
    .publish{ position: relative;}
    .publish .top-line{ width: 1400px; position: absolute; left:60px; top: 60px; display: flex; justify-content: space-between; align-items: center;}
    .publish .top-line .name{ font-size: 157px; color: #fff; font-family: 'Helve';}
    .publish .top-line .n-btn{ width: 270px;}
    .publish .anim05{ animation-duration: 1s; animation-timing-function: cubic-bezier(.25,.76,.36,.97);}
</style>

<template>
    <div class="publish">
        <div class="top-line">
            <div class="name">Step{{step}}</div>
            <t-button extraClass="white" v-if="step == '1'" @dotap="step='2'">下一步</t-button>
            <t-button v-if="step == '2'" @dotap="step='1'">上一步</t-button>
            <t-button extraClass="white" v-if="step == '2'" @dotap="step='3'">下一步</t-button>
            <t-button v-if="step == '3'" @dotap="step='2'">上一步</t-button>
            <t-button extraClass="white" v-if="step == '3'" @dotap="doSubmit">完成并提交审核</t-button>
        </div>
        <transition enter-active-class="animated anim05 slideInUp">
        <step1 v-show="step == '1'" ref="step1"></step1>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step2 v-show="step == '2'" ref="step2"></step2>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step3 v-show="step == '3'" ref="step3"></step3>
        </transition>
    </div>
</template>

<script type='es6'>
    import Cookies from 'js-cookie';
    import qs from 'qs';
    import TButton from '@/components/common/TButton.vue'
    import Step1 from '@/components/publish/Step1.vue'
    import Step2 from '@/components/publish/Step2.vue'
    import Step3 from '@/components/publish/Step3.vue'
    export default {
        name: 'app',
        components:{TButton,Step1,Step2,Step3},
        data(){
            return{
                step:'1'
            }
        },
        computed:{
            userData(){
                return this.$store.state.userData
            }
        },
        mounted(){
            this.$ajax.defaults.headers.common['mid'] = Cookies.get('xfmid');
            this.$ajax.defaults.headers.common['tokey'] = Cookies.get('xftokey');
            this.$ajax.defaults.baseURL = 'http://ticket.pc-online.cc';
            this.$ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        },
        methods:{
            doSubmit(){
                let self = this;
                let obj = {},step1 = self.$refs.step1,step2 = self.$refs.step2,step3 = self.$refs.step3;
                self.$tModal.confirm({
                    title:'是否确认信息无误并提交？',
                    content:'请仔细核查所填写的信息，确认提交之后信息无法修改。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。',
                    onOk(){
                        obj.city = step1.formData.city;
                        obj.activity = self.userData.activity;
                        obj.goods_name = step1.formData.goods_name;
                        obj.type = step1.formData.type;
                        obj.begin = step1.formData.begin;
                        if(obj.type != 1){
                            obj.end = step1.formData.end;
                        }
                        obj.hour_b = step1.formData.hour_b;
                        obj.hour_e = step1.formData.hour_e;
                        obj.address = step1.formData.address;
                        obj.mobile = step1.formData.mobile;
                        obj.cover = step1.formData.cover;
                        obj.cover2 = step1.formData.cover2;
                        obj.classes = [];
                        for(let item of step2.typeListData){
                            if(item.checked){
                                obj.classes.push({
                                    select:item.name,
                                    price:item.price,
                                    nums:item.sale_nums,
                                    max:item.sale_limit
                                })
                            }
                        }
                        obj.cate = step2.ticketType;
                        obj.is_idnum = step2.ids;
                        obj.sale_start = new Date(step2.saleStart).getTime();
                        obj.sale_end = new Date(step2.saleEnd).getTime();
                        obj.show_time = new Date(step2.showTime).getTime();
                        obj.notify = [];
                        for(let item of step2.noticeListData){
                            obj.notify.push(item.value);
                        }
                        obj.goods_desc = [];
                        for(let item of step3.activityListData){
                            obj.goods_desc.push({
                                img:item.imgUrl,
                                desc:item.desc
                            })
                        }
                        obj.person_desc = [];
                        for(let item of step3.actListData){
                            obj.person_desc.push({
                                img:item.logoUrl,
                                picture:item.imgUrl
                            })
                        }
                        //console.log(obj);
                        self.$ajax.post('/client/api/activity_add',qs.stringify(obj)).then(res=>{
                            let data = res.data;
                            if(data.status == 1){
                                self.$tModal.warn({
                                    title:'提交成功！',
                                    content:'后台将在3个工作日内完成活动审核，<br>活动票务通过与否，都将以短信形式通知到已注册的手机号上。',
                                    btn1Name:'返回首页',
                                    onOk(){
                                        self.$router.push('list');
                                    }
                                })
                            }else{
                                self.$tModal.warn({
                                    title:'提交失败！',
                                    content:'由于网络错误、流量拥挤提交失败，<br>请尝试重新提交。',
                                    btn1Name:'重新提交',
                                    onOk(){
                                        self.doSubmit();
                                    }
                                })
                            }
                        })
                    }
                });
            }
        }
    }

</script>


<style>
    .stpe2-frame{ width: 1400px; position: fixed; bottom: 0; left: 60px; display: flex; justify-content: space-between;}
    .stpe2-frame .frame{ width: 900px; height: 710px; background-color: #ffffff; position: relative;}
    .stpe2-frame .frame2{ width: 300px;}
    .stpe2-frame .frame .scroll{ width: 100%; height: 100%; display: flex; overflow-y: scroll; padding: 20px 0;box-sizing: border-box; }
    .stpe2-frame .frame .scroll::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .stpe2-frame .frame .scroll::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .stpe2-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .stpe2-frame .frame .step1{ width: 380px;}
    .stpe2-frame .frame .step2{ width: 520px; position: relative;}
    .stpe2-frame .frame2 .step1{ width: 300px;}
    .stpe2-frame .frame .step2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .stpe2-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .stpe2-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}

    .stpe2-frame .ticke-type-list{ height: 120px; padding: 0 55px; display: flex; flex-wrap: wrap; align-content: center; justify-content: space-between; border-bottom: 2px solid #e5e5e5; position: relative;}
    .stpe2-frame .ticke-type-list .name{ width: 128px; height: 40px; font-size: 16px; color: #000000; display: flex; align-items: center; margin: 10px 0;}
    .stpe2-frame .ticke-type-list .input{ width: 128px; height: 40px; position: relative; margin: 10px 0;}
    .stpe2-frame .ticke-type-list .input input{ width: 100%; height: 100%; box-sizing: border-box; font-size: 16px; color: #a5a5a5; border: 1px solid #a5a5a5; border-radius: 6px; line-height: 40px; padding: 0 15px;}
    .stpe2-frame .ticke-type-list .input input::-webkit-input-placeholder{ color: #a5a5a5; }
    .stpe2-frame .ticke-type-list .input-nums:after{content: '张'; line-height: 40px; position: absolute; top: 0; right: 15px; font-size: 16px; color: #a5a5a5;}
    .stpe2-frame .ticke-type-list .input-nums input{ padding-right: 35px;}
    .stpe2-frame .ticke-type-list .input-limit:before{content: '限购'; line-height: 40px; position: absolute; top: 0; left: 15px; font-size: 16px; color: #a5a5a5;}
    .stpe2-frame .ticke-type-list .input-limit:after{content: '张'; line-height: 40px; position: absolute; top: 0; right: 15px; font-size: 16px; color: #a5a5a5;}
    .stpe2-frame .ticke-type-list .input-limit input{ padding-right: 35px; padding-left: 60px;}
    .stpe2-frame .ticke-type-list .radio{ position: absolute; top: 17px; left: 22px;}

    .stpe2-frame .ticket-info{ margin-right: 20px; height: 70px; border-bottom: 1px solid #e5e5e5; display: flex;}
    .stpe2-frame .ticket-info h3{ width: 110px; height: 100%; border-right: 2px solid #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #000000;}
    .stpe2-frame .ticket-info ul{ margin-left: 30px; height: 100%; display: flex; align-items: center;}
    .stpe2-frame .ticket-info ul li{ font-size: 16px; color: #000000; width: 120px; display: flex; align-items: center;}
    .stpe2-frame .ticket-info ul li span{ margin: 0 10px;}
    .stpe2-frame .inp-line{ width: 270px; margin: 20px auto;}
    .stpe2-frame .inp-line h3{ font-size: 16px; color: #000000; margin-bottom: 15px; padding-left: 10px;}
    .stpe2-frame .inp-line input{ width: 270px; height: 40px; border: 1px solid #888888; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #888888; font-size: 16px;}
    .stpe2-frame .inp-line .ivu-input-icon{ line-height: 40px;}
    .stpe2-frame .notice-list{ margin: 20px;}
    .stpe2-frame .notice-list h3{ font-size: 20px; color: #000000; margin-bottom: 10px; padding-left: 10px; font-family: 'Helve';}
    .stpe2-frame .notice-list textarea{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 5px; padding: 7px 16px; color: #888888; font-size: 16px;}
</style>

<template>
    <div class="stpe2-frame">
        <div class="frame">
            <div class="scroll">
                <div class="step1">
                    <h3 class="title ml20"><span>3</span>票务信息</h3>
                    <div class="">
                        <div class="ticke-type-list" v-for="item in typeListData">
                            <input type="checkbox" class="radio" :checked="item.checked">
                            <h3 class="name" v-if="item.isDefault">{{item.name}}</h3>
                            <div class="input" v-if="!item.isDefault">
                                <input type="text" placeholder="票种名称" v-model="item.name">
                            </div>
                            <div class="input">
                                <input type="text" placeholder="价格" v-model="item.price">
                            </div>
                            <div class="input" :class="item.sale_nums == '' ? '' : 'input-nums'">
                                <input type="text" placeholder="张数" v-model="item.sale_nums">
                            </div>
                            <div class="input" :class="item.sale_limit == '' ? '' : 'input-limit'">
                                <input type="text" placeholder="限购张数" v-model="item.sale_limit">
                            </div>
                        </div>
                    </div>
                    <div class="tc mt30 mb30">
                        <a href="javascript:;" @click="newTypeItem"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
                <div class="step2">
                    <h3 class="title mr20"><span>4</span>票务类型及时间</h3>
                    <div class="ticket-info">
                        <h3>门票类型</h3>
                        <ul>
                           <li>
                               <input type="radio" class="radio">
                               <span>电子票</span>
                           </li>
                           <li>
                               <input type="radio" class="radio">
                               <span>实体票</span>
                               <t-ques></t-ques>
                           </li>
                        </ul>
                    </div>
                    <div class="ticket-info">
                        <h3>身份证</h3>
                        <ul>
                           <li>
                               <input type="radio" class="radio">
                               <span>需要</span>
                           </li>
                           <li>
                               <input type="radio" class="radio">
                               <span>不需要</span>
                           </li>
                        </ul>
                    </div>
                    <div class="inp-line">
                        <h3>开售时间</h3>
                        <TimePicker format="HH:mm" type="time" placeholder="活动时间" :editable="false"></TimePicker>
                    </div>
                    <div class="inp-line">
                        <h3>结束时间</h3>
                        <TimePicker format="HH:mm" type="time" placeholder="活动时间" :editable="false"></TimePicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="frame frame2">
            <div class="scroll">
                <div class="step1">
                    <h3 class="title ml20" style="padding-left: 10px;"><span>5</span>活动须知及联系</h3>
                    <div class="mt40">
                        <div class="notice-list" v-for="(item,index) in noticeListData">
                            <h3>{{index < 9 ? 0 : ''}}{{index + 1}}</h3>
                            <textarea rows="4" maxlength="60" placeholder="填写须知(30字内)" v-model="item.value"></textarea>
                        </div>
                    </div>
                    <div class="tc mt30 mb30">
                        <a href="javascript:;" @click="newNoticeItem"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TQues from '@/components/common/TQues.vue'
    export default {
        name: 'app',
        components:{TQues},
        data(){
            return{
                typeListData:[
                    {
                        checked:true,
                        isDefault:true,
                        name:'早鸟票',
                        price:'',
                        sale_nums:'',
                        sale_limit:''
                    },
                    {
                        checked:true,
                        isDefault:true,
                        name:'预售票',
                        price:'',
                        sale_nums:'',
                        sale_limit:''
                    },
                    {
                        checked:true,
                        isDefault:true,
                        name:'普通票',
                        price:'',
                        sale_nums:'',
                        sale_limit:''
                    }
                ],
                noticeListData:[
                    {value:''}
                ]
            }
        },
        methods:{
            newTypeItem(){
                this.typeListData.push({
                    checked:false,
                    isDefault:false,
                    name:'',
                    price:'',
                    sale_nums:'',
                    sale_limit:''
                })
            },
            newNoticeItem(){
                this.noticeListData.push({value:''})
            }
        }
    }

</script>


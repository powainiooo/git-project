<style>
    .step2-frame{ width: 1400px; position: absolute; bottom: 0; left: 60px; display: flex; justify-content: space-between; z-index: 400;}
    .step2-frame .frame{ width: 900px; height: 630px; background-color: #ffffff; position: relative;}
    .step2-frame .frame2{ width: 300px;}
    .step2-frame .frame .scroll{ width: 100%; height: 100%; display: flex; overflow-y: scroll; padding: 20px 0;box-sizing: border-box; }
    .step2-frame .frame .scroll::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .step2-frame .frame .scroll::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .step2-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .step2-frame .frame .step1{ width: 380px;}
    .step2-frame .frame .step2{ width: 520px;}
    .step2-frame .frame2 .step1{ width: 300px;}
    .step2-frame .tframe{ position: relative; min-height: 360px;}
    .step2-frame .tframe:after{ content: ''; width:1px; position: absolute; top: -60px; right: 0; bottom: -100px; background-color: #e5e5e5;}
    .step2-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px; display: flex; justify-content: space-between; align-items: center;}
    .step2-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .step2-frame .frame .title .ques2{ margin: 35px 20px 0 0;}

    .step2-frame .ticke-type-list{ height: 120px; padding: 0 55px; display: flex; flex-wrap: wrap; align-content: center; justify-content: space-between; border-bottom: 2px solid #e5e5e5; position: relative;}
    .step2-frame .ticke-type-list .name{ width: 128px; height: 40px; font-size: 16px; color: #000000; display: flex; align-items: center; margin: 10px 0;}
    .step2-frame .ticke-type-list .input{ width: 128px; height: 40px; position: relative; margin: 10px 0;}
    .step2-frame .ticke-type-list .input input{ width: 100%; height: 100%; box-sizing: border-box; font-size: 16px; color: #000000; border: 1px solid #a5a5a5; border-radius: 6px; line-height: 40px; padding: 0 15px;}
    .step2-frame .ticke-type-list .input input::-webkit-input-placeholder{ color: #a5a5a5; }
    .step2-frame .ticke-type-list .input-price:after{content: '元'; line-height: 40px; position: absolute; top: 0; right: 15px; font-size: 16px; color: #a5a5a5;}
    .step2-frame .ticke-type-list-readonly .input-price:after{color: #000;}
    .step2-frame .ticke-type-list .input-nums:after{content: '张'; line-height: 40px; position: absolute; top: 0; right: 15px; font-size: 16px; color: #a5a5a5;}
    .step2-frame .ticke-type-list-readonly .input-nums:after{color: #000;}
    .step2-frame .ticke-type-list .input-nums input{ padding-right: 35px;}
    .step2-frame .ticke-type-list .input-limit:before{content: '限购'; line-height: 40px; position: absolute; top: 0; left: 15px; font-size: 16px; color: #a5a5a5;}
    .step2-frame .ticke-type-list-readonly .input-limit:before{color: #000;}
    .step2-frame .ticke-type-list .input-limit:after{content: '张'; line-height: 40px; position: absolute; top: 0; right: 15px; font-size: 16px; color: #a5a5a5;}
    .step2-frame .ticke-type-list-readonly .input-limit:after{color: #000;}
    .step2-frame .ticke-type-list .input-limit input{ padding-right: 35px; padding-left: 60px;}
    .step2-frame .ticke-type-list-readonly input[readonly]{ background-color: #eeeef0;}
    .step2-frame .ticke-type-list .radio{ position: absolute; top: 17px; left: 22px;}
    .step2-frame .ticke-type-list .btn-del{ position: absolute; top: 10px; right: 16px; font-size: 24px; color: #002aa6;}

    .step2-frame .ticket-info{ margin-right: 20px; height: 70px; border-bottom: 1px solid #e5e5e5; display: flex;}
    .step2-frame .ticket-info h3{ width: 110px; height: 100%; border-right: 2px solid #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #000000;}
    .step2-frame .ticket-info>ul{ margin-left: 30px; height: 100%; display: flex; align-items: center;}
    .step2-frame .ticket-info>ul>li{ font-size: 16px; color: #000000; width: 120px; display: flex; align-items: center;}
    .step2-frame .ticket-info>ul>li span{ margin: 0 10px;}
    .step2-frame .inp-line{ width: 270px; margin: 20px auto;}
    .step2-frame .inp-line h3{ font-size: 16px; color: #000000; margin-bottom: 15px; padding-left: 10px;}
    .step2-frame .inp-line input{ width: 270px; height: 40px; border: 1px solid #888888; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #888888; font-size: 16px;}
    .step2-frame .inp-line .ivu-input-icon{ line-height: 40px;}
    .step2-frame .notice-list{ margin: 20px; position: relative;}
    .step2-frame .notice-list h3{ font-size: 20px; color: #000000; margin-bottom: 10px; padding-left: 10px; font-family: 'Helve';}
    .step2-frame .notice-list textarea{ width: 100%; box-sizing: border-box; border: 1px solid #888888; border-radius: 5px; padding: 7px 16px; color: #000000; font-size: 16px;}
    .step2-frame .notice-list textarea[readonly]{ background-color: #eeeef0;}
    .step2-frame .notice-list .btn-del{ position: absolute; top: -4px; right: 0; font-size: 24px; color: #002aa6;}
</style>

<template>
    <div class="step2-frame">
        <div class="frame frame1">
            <div class="scroll">
                <div class="step1">
                    <div class="title ml20" style="padding-left: 0;"><h3><span>3</span>票务信息</h3></div>
                    <div class="tframe">
                        <div class="ticke-type-list" :class="isEditor ? 'ticke-type-list-readonly' : ''" v-for="(item,index) in typeListData">
                            <input type="checkbox" class="radio" v-model="item.checked" v-if="!isEditor">
                            <h3 class="name" v-if="item.isDefault">{{item.name}}</h3>
                            <div class="input" v-if="!item.isDefault">
                                <input type="text" placeholder="票种名称" v-model="item.name" :readonly="isEditor">
                            </div>
                            <div class="input" :class="item.price == '' ? '' : 'input-price'">
                                <input type="text" placeholder="价格" v-model="item.price" :readonly="isEditor">
                            </div>
                            <div class="input" :class="item.sale_nums == '' ? '' : 'input-nums'">
                                <input type="text" placeholder="张数" v-model="item.sale_nums" :readonly="isEditor">
                            </div>
                            <div class="input" :class="item.sale_limit == '' ? '' : 'input-limit'">
                                <input type="text" placeholder="限购张数" v-model="item.sale_limit" :readonly="isEditor">
                            </div>
                            <a href="javascript:;" class="btn-del" v-if="!item.isDefault && !isEditor" @click="doDelType(index)"><Icon type="md-close" /></a>
                        </div>
                    </div>
                    <div class="tc mt30 mb30" v-if="!isEditor">
                        <a href="javascript:;" @click="newTypeItem"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
                <div class="step2">
                    <div class="title mr20"><h3><span>4</span>票务类型及时间</h3></div>
                    <div class="ticket-info">
                        <h3>门票类型</h3>
                        <ul>
                           <li v-if="ticketType == 1 || !isEditor">
                               <input type="radio" class="radio" v-model="ticketType" value="1">
                               <span>电子票</span>
                           </li>
                           <li v-if="ticketType == 2 || !isEditor">
                               <input type="radio" class="radio" v-model="ticketType" value="2">
                               <span>实体票</span>
                           </li>
                            <li v-if="!isEditor">
                                <div class="ques1">
                                    <t-ques>
                                        <ul class="list1">
                                            <li><span>1</span>电子票为虚拟门票，提供二维码作为入场凭证。</li>
                                            <li><span>2</span>实体票需活动方自行邮寄实体门票。</li>
                                        </ul>
                                    </t-ques>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="ticket-info">
                        <h3>身份证</h3>
                        <ul>
                           <li v-if="ids == 1 || !isEditor">
                               <input type="radio" class="radio" v-model="ids" value="1">
                               <span>需要</span>
                           </li>
                           <li v-if="ids == 0 || !isEditor">
                               <input type="radio" class="radio" v-model="ids" value="0">
                               <span>不需要</span>
                           </li>
                        </ul>
                    </div>
                    <div class="inp-line">
                        <h3>显示时间</h3>
                        <DatePicker format="yyyy/MM/dd HH:mm"
                                    type="datetime"
                                    placeholder="选择时间"
                                    :editable="false"
                                    v-model="showTime"
                                    :options="optionsE"
                                    @on-change="dateChange"
                                    :disabled="isEditor"
                                    :readonly="isEditor"></DatePicker>
                    </div>
                    <div class="inp-line">
                        <h3>开售时间</h3>
                        <DatePicker format="yyyy/MM/dd HH:mm"
                                    type="datetime"
                                    placeholder="选择时间"
                                    :editable="false"
                                    v-model="saleStart"
                                    :options="optionsE"
                                    :disabled="isEditor"
                                    :readonly="isEditor"></DatePicker>
                    </div>
                    <div class="inp-line">
                        <h3>结束时间</h3>
                        <DatePicker format="yyyy/MM/dd HH:mm"
                                    type="datetime"
                                    placeholder="选择时间"
                                    :editable="false"
                                    v-model="saleEnd"
                                    :options="optionsE"
                                    :disabled="isEditor"
                                    :readonly="isEditor"></DatePicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="frame frame2">
            <div class="scroll">
                <div class="step1">
                    <div class="title ml20" style="padding-left: 0;">
                        <h3 style="padding-left: 10px;"><span>5</span>活动须知及联系</h3>
                        <div class="ques2">
                            <t-ques :redbg="showNoticeError" v-if="isEditor ? showNoticeError : true">
                                <ul class="list2 mb30" v-if="!showNoticeError">
                                    <li><span>Demo</span></li>
                                    <li><span>01</span>本门票只能在深圳xxx使用</li>
                                    <li><span>02</span>请遵守法律法规，不要吸食毒品，拒绝黄赌毒侵蚀活动现场。</li>
                                    <li><span>03</span>未满18岁请勿购买，概不退换。</li>
                                </ul>
                                <ul class="list1" v-if="!showNoticeError">
                                    <li><span>1</span>每条须知的字数在30字内</li>
                                    <li><span>2</span>请合理使用须知，为了方便用户阅读，不相关的须知可以通过新增须知来填写</li>
                                </ul>
                                <ul class="list1" v-if="showNoticeError">
                                    <li v-for="(item,index) in errorData.notify" v-if="item != ''"><span>须知 {{index+1}} </span>{{item}}</li>
                                </ul>
                            </t-ques>
                        </div>
                    </div>

                    <div class="mt40">
                        <div class="notice-list" v-for="(item,index) in noticeListData">
                            <h3>{{index < 9 ? 0 : ''}}{{index + 1}}</h3>
                            <textarea rows="4"
                                      maxlength="30"
                                      placeholder="填写须知(30字内)"
                                      :readonly="errorData.notify[index] == ''"
                                      v-model="item.value"></textarea>
                            <a href="javascript:;" class="btn-del" @click="doDelNotice(index)" v-if="index != 0 && !isEditor"><Icon type="md-close" /></a>
                        </div>
                    </div>
                    <div class="tc mt30 mb30" v-if="!isEditor">
                        <a href="javascript:;" @click="newNoticeItem"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
            </div>
            <span v-if="canNext"></span>
        </div>
        <span style="display: none">{{disableDate}}</span>
    </div>
</template>

<script type='es6'>
    import TQues from '@/components/common/TQues.vue'
    import {formatDate} from '@/assets/js/date.js'
    export default {
        name: 'app',
        components:{TQues},
        //props:['errorData'],
        computed:{
            canNext(){
                let arr1 = this.typeListData;
                for(let item of arr1){
                    if(item.checked){
                        if(item.price == '' || item.sale_nums == '' || item.name == ''){
                            this.$emit('input',false);
                            return false;
                        }
                    }
                }
                if(this.saleStart == '' || this.saleEnd == '' || this.showTime == ''){
                    this.$emit('input',false);
                    return false;
                }
                let arr2 = this.noticeListData;
                for(let item of arr2){
                    if(item.value == ''){
                        this.$emit('input',false);
                        return false;
                    }
                }
                this.$emit('input',true);
                return true
            },
            disableDate(){
                let startDate = this.$store.state.startDate;
                let endDate = this.$store.state.endDate;
                this.optionsE = {
                    disabledDate (date) {
                        return date && date.valueOf() > new Date(endDate);
                    }
                };
                //let errorData = this.errorData;
                //let editorData = this.$store.state.editorData;
                //if(editorData.id != -1){
                //    this.dataInit();
                //}
                return '1'
            },
            errorData(){
                return this.$store.state.errorData
            }
        },
        mounted(){
            let editorData = this.$store.state.editorData;
            if(editorData.id != -1){
                this.dataInit();
                this.isEditor = true;
            }
        },
        data(){
            return{
                ticketType:'1',
                ids:'1',
                saleStart:'',
                saleEnd:'',
                showTime:'',
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
                showNoticeError:false,
                noticeListData:[
                    {value:''}
                ],
                optionsE: {
                    disabledDate (date) {
                        return date && date.valueOf() > new Date('2018-09-03');
                    }
                },
                isEditor:false
            }
        },
        methods:{
            dateChange(date){
                console.log(this.showTime)
            },
            dataInit(){
                let editorData = this.$store.state.editorData;
                let classes = editorData.classes;
                let thisC = this.typeListData;
                let arr = [];
                for(let item of classes){
                    let reg = new RegExp(item.select),isFit = false;
                    for(let i=0;i<thisC.length;i++){
                        if(reg.test(thisC[i].name)){
                            isFit = true;
                            //thisC[i].checked = true;
                            //thisC[i].isDefault = true;
                            //thisC[i].name = item.select;
                            //thisC[i].price = item.price;
                            //thisC[i].sale_nums = item.nums;
                            //thisC[i].sale_limit = item.max;
                        }
                    }
                    arr.push({
                        checked:true,
                        isDefault:isFit,
                        name:item.select,
                        price:item.price,
                        sale_nums:item.nums,
                        sale_limit:item.max
                    })
                }
                this.typeListData = arr;
                this.ticketType = editorData.cate;
                this.ids = editorData.is_idnum;
                let saleStart = formatDate(new Date(parseInt(editorData.sale_start)*1000),'yyyy/MM/dd HH:mm');
                this.saleStart = saleStart;
                let saleEnd = formatDate(new Date(parseInt(editorData.sale_end)*1000),'yyyy/MM/dd HH:mm');
                this.saleEnd = saleEnd;
                let showTime = formatDate(new Date(parseInt(editorData.show_time)*1000),'yyyy/MM/dd HH:mm');
                this.showTime = showTime;
                let notify = editorData.notify,notifyError = this.errorData.notify;
                this.showNoticeError = false;
                for(let i=0;i<notify.length;i++){
                    this.noticeListData[i] = {
                        value:notify[i]
                    };
                    if(notifyError[i] != ""){
                        this.showNoticeError = true
                    }
                }
            },
            newTypeItem(){
                this.typeListData.push({
                    checked:true,
                    isDefault:false,
                    name:'',
                    price:'',
                    sale_nums:'',
                    sale_limit:''
                })
            },
            newNoticeItem(){
                this.noticeListData.push({value:''})
            },
            doDelType(index){
                this.typeListData.splice(index,1)
            },
            doDelNotice(index){
                this.noticeListData.splice(index,1)
            }
        }
    }

</script>


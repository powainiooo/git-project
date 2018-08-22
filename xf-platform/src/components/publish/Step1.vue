<style>
    .stpe1-frame{ width: 1430px; position: fixed; bottom: 0; left: 60px; display: flex; justify-content: space-between;}
    .stpe1-frame .frame{ width: 900px; height: 630px; box-sizing: border-box; background-color: #ffffff; position: relative; padding:0 20px 20px 20px;; display: flex;}
    .stpe1-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .stpe1-frame .frame .step1{ width: 360px;}
    .stpe1-frame .frame .step2{ width: 500px; position: relative;}
    .stpe1-frame .frame .step2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .stpe1-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .stpe1-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .stpe1-frame .frame .step1 .inp-line{ width: 270px; margin-left: 45px; margin-bottom: 20px; position: relative;}
    .stpe1-frame .frame .step1 input{ width: 100%; height: 40px; border: 1px solid #888888; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #000000; font-size: 16px;}
    .stpe1-frame .frame .step1 input::-webkit-input-placeholder{ color: #888888;}
    .stpe1-frame .frame .step1 .inp-line .n-ques{ position: absolute; top:8px; right: -30px;}
    .stpe1-frame .frame .step1 .time-line{ width: 270px; display: flex; justify-content: space-between; margin-left: 45px;}
    .stpe1-frame .frame .step1 .time-line .inp-line{ width: 120px; margin-left: 0;}
    .stpe1-frame .frame .step1 .ivu-select-single .ivu-select-selection{ height: 40px; border-color: #888888;}
    .stpe1-frame .frame .step1 .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{ height: 40px; line-height: 40px; color: #888888; font-size: 16px; padding-left: 15px;}
    .stpe1-frame .frame .step1 .ivu-input-icon{ line-height: 40px;}
    .stpe1-frame .step2 .hint{ font-size: 14px; color: #888888;}
    .stpe1-frame .step2 .hint span{ font-size: 16px; font-weight: bold; margin-right: 4px;}
    .stpe1-frame .step2 .demo{ display: flex; justify-content: space-between; align-items: center;}
    .stpe1-frame .step2 .demo .n-btn{ width: 270px;}
    .stpe1-frame .step2 .ids-frame{ display: flex;}
    .stpe1-frame .step2 .ids-frame .upload-frame{ flex: 1;}
    .stpe1-frame .example-frame{ margin-top: -46px;}
</style>

<template>
    <div class="stpe1-frame">
        <div class="frame">
            <div class="step1">
                <h3 class="title"><span>1</span>填写企业基本信息</h3>
                <div class="mt20">
                    <div class="inp-line">
                        <Select v-model="formData.city" placeholder="选择城市">
                            <Option value="1">全部</Option>
                            <Option value="2">深圳</Option>
                            <Option value="3">广州</Option>
                        </Select>
                    </div>
                    <div class="inp-line">
                        <input type="text" placeholder="活动方标题" v-model="formData.title">
                        <t-ques width="290" style="z-index: 410;">
                            <ul class="list1">
                                <li><span>1</span>活动标题名称 | 活动方名称<br>Blue-icon | 小夫有票</li>
                                <li><span>2</span>如未按固定格式命名，<br>将无法通过审核。</li>
                            </ul>
                        </t-ques>
                    </div>
                    <div class="inp-line">
                        <Select v-model="formData.type" placeholder="活动类型">
                            <Option value="1">单日</Option>
                            <Option value="2">多日</Option>
                            <Option value="3">跨月多日</Option>
                        </Select>
                    </div>
                    <div class="inp-line" v-if="formData.type == 1">
                        <DatePicker format="yyyy/MM/dd" type="date" placeholder="活动日期" :editable="false" :disabled="formData.type == ''" @on-change="dateChange" style="width: 100%;"></DatePicker>
                    </div>
                    <div class="inp-line" v-if="formData.type != 1">
                        <DatePicker format="yyyy/MM/dd" type="daterange" placeholder="活动日期" :editable="false" :disabled="formData.type == ''" @on-change="dateChange" style="width: 100%;"></DatePicker>
                    </div>
                    <div class="time-line">
                        <div class="inp-line">
                            <TimePicker format="HH:mm" type="time" placeholder="活动时间" v-model="formData.timeBegin" :editable="false"></TimePicker>
                        </div>
                        <div class="inp-line">
                            <TimePicker format="HH:mm" type="time" placeholder="活动时间" v-model="formData.timeEnd" :editable="false"></TimePicker>
                        </div>
                    </div>
                    <div class="inp-line"><input type="text" placeholder="活动方地址" v-model="formData.address"></div>
                    <div class="inp-line"><input type="text" placeholder="活动联系电话"  v-model="formData.mobile"></div>
                </div>
            </div>
            <div class="step2">
                <h3 class="title"><span>2</span>上传图片</h3>
                <div class="pl50 pt20 pb20 pr" style="border-bottom: 1px solid #e5e5e5;">
                    <t-upload v-model="formData.logoImg">
                        <template slot="title">
                            <h3>活动方LOGO</h3>
                        </template>
                    </t-upload>
                    <t-ques style="position: absolute; left: 170px; top: 30px;">
                        <ul class="list1">
                            <li><span>1</span>上传尺寸在200px*140px的正方形区域内</li>
                            <li><span>2</span>图片为透明底黑图案PNG格式，LOGO统一使用R0 G0 B0 色值</li>
                        </ul>
                    </t-ques>
                </div>
                <div class="pl50 pt20 pb20 pr" style="border-bottom: 1px solid #e5e5e5;">
                    <t-upload  v-model="formData.posterImg">
                        <template slot="title">
                            <h3>宣传海报</h3>
                            <p>海报尺寸为750px*650px</p>
                        </template>
                    </t-upload>
                    <t-ques style="position: absolute; left: 170px; top: 30px;">
                        <div class="tc mb30"><img src="@/assets/img/img-hint.png"> </div>
                        <ul class="list1">
                            <li><span>1</span>海报尺寸为750px*650px</li>
                            <li><span>2</span>列表的预览图会截取中间红色部分作为展示，请按照尺寸进行合理的海报制作</li>
                        </ul>
                    </t-ques>
                </div>
            </div>
        </div>
        <div class="example-frame">
            <list-item :itemdata="formData"></list-item>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TUpload from '@/components/common/TUpload.vue'
    import TQues from '@/components/common/TQues.vue'
    import ListItem from '@/components/list/ListItem.vue'
    export default {
        name: 'app',
        components:{TButton,TUpload,ListItem,TQues},
        data(){
            return{
                formData:{
                    status:'',
                    city:['','',''],
                    title:'',
                    type:'',
                    begin:'',
                    end:'',
                    timeBegin:'',
                    timeEnd:'',
                    address:'',
                    mobile:'',
                    logoImg:'',
                    posterImg:''
                }
            }
        },
        computed:{

        },
        methods:{
            dateChange(date){
                if(this.formData.type == 1){
                    this.formData.begin = date;
                }else{
                    this.formData.begin = date[0];
                    this.formData.end = date[1];
                    if(date[0].substr(5,2) == date[1].substr(5,2)){
                        this.formData.type = '2'
                    }else{
                        this.formData.type = '3'
                    }
                }
            }
        }
    }

</script>


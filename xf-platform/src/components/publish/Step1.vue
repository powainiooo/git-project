<style>
    .stpe1-frame{ width: 1400px; position: fixed; bottom: 0; left: 60px; display: flex; justify-content: space-between;}
    .stpe1-frame .frame{ width: 900px; height: 710px; box-sizing: border-box; background-color: #ffffff; position: relative; padding: 20px; display: flex;}
    .stpe1-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .stpe1-frame .frame .step1{ width: 360px;}
    .stpe1-frame .frame .step2{ width: 500px; position: relative;}
    .stpe1-frame .frame .step2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .stpe1-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .stpe1-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .stpe1-frame .frame .step1 .inp-line{ width: 270px; margin-left: 45px; margin-bottom: 20px;}
    .stpe1-frame .frame .step1 input{ width: 270px; height: 40px; border: 1px solid #888888; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #888888; font-size: 16px;}
    .stpe1-frame .frame .step1 input::-webkit-input-placeholder{ color: #888888;}
    .stpe1-frame .frame .step1 .ivu-select-single .ivu-select-selection{ height: 40px; border-color: #888888;}
    .stpe1-frame .frame .step1 .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{ height: 40px; line-height: 40px; color: #888888; font-size: 16px; padding-left: 15px;}
    .stpe1-frame .frame .step1 .ivu-input-icon{ line-height: 40px;}
    .stpe1-frame .step2 .hint{ font-size: 14px; color: #888888;}
    .stpe1-frame .step2 .hint span{ font-size: 16px; font-weight: bold; margin-right: 4px;}
    .stpe1-frame .step2 .demo{ display: flex; justify-content: space-between; align-items: center;}
    .stpe1-frame .step2 .demo .n-btn{ width: 270px;}
    .stpe1-frame .step2 .ids-frame{ display: flex;}
    .stpe1-frame .step2 .ids-frame .upload-frame{ flex: 1;}
</style>

<template>
    <div class="stpe1-frame">
        <div class="frame">
            <div class="step1">
                <h3 class="title"><span>1</span>填写企业基本信息</h3>
                <div class="mt20">
                    <div class="inp-line"><al-cascader  v-model="address" placeholder="选择城市" level="2"/></div>
                    <div class="inp-line">
                        <input type="text" placeholder="活动方标题">
                    </div>
                    <div class="inp-line">
                        <Select>
                            <Option value="0">单日</Option>
                            <Option value="1">多日</Option>
                            <Option value="2">跨月多日</Option>
                        </Select>
                    </div>
                    <div class="inp-line"> <DatePicker type="date" placeholder="活动日期"></DatePicker></div>
                    <div class="inp-line dpn"> <DatePicker type="daterange" placeholder="活动日期"></DatePicker></div>
                    <div class="inp-line"><TimePicker format="HH:mm" type="timerange" placeholder="活动时间"></TimePicker></div>
                    <div class="inp-line"><input type="text" placeholder="活动方地址"></div>
                    <div class="inp-line"><input type="text" placeholder="活动联系电话"></div>
                </div>
            </div>
            <div class="step2">
                <h3 class="title"><span>2</span>上传图片</h3>
                <div class="pl50 pt20 pb20" style="border-bottom: 1px solid #e5e5e5;">
                    <t-upload @getImgSrc="companyImgUrl = $event">
                        <template slot="title">
                            <h3>企业营业执照</h3>
                        </template>
                    </t-upload>
                </div>
                <div class="pl50 pt20 pb20">
                    <t-upload @getImgSrc="logoImgUrl = $event">
                        <template slot="title">
                            <h3>活动方LOGO</h3>
                        </template>
                    </t-upload>
                    <p class="hint mt25 mb25">活动方LOGO我们将严格按照统一标准进行使用<br>请务必满足以下条件。</p>
                    <p class="hint mb5"><span>1</span>上传尺寸在200px*140px的矩形区域内</p>
                    <p class="hint mb25"><span>2</span>图片为白底黑图案形式，LOGO统一使用R0 G0 B0 色值</p>
                    <p class="hint mb25"><span>DEMO</span></p>
                    <div class="demo">
                        <img src="../../assets/img/logo.png" />
                        <t-button @dotap="$emit('dosubmit')">提交审核</t-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="example-frame">
            <list-item></list-item>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TUpload from '@/components/common/TUpload.vue'
    import ListItem from '@/components/list/ListItem.vue'
    export default {
        name: 'app',
        components:{TButton,TUpload,ListItem},
        data(){
            return{
                address:''
            }
        },
        methods:{

        }
    }

</script>


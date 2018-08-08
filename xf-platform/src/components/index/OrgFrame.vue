<style>
    .organizer-frame .frame{ width: 900px; height: 710px; box-sizing: border-box; background-color: #ffffff; position: relative; padding: 20px; display: flex;}
    .organizer-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .organizer-frame .frame .stpe1{ width: 360px;}
    .organizer-frame .frame .stpe2{ width: 500px; position: relative;}
    .organizer-frame .frame .stpe2:before{ content: ''; width:1px; position: absolute; top: 40px; left: 0; bottom: 0; background-color: #e5e5e5;}
    .organizer-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; font-family: 'HappyZcool'; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
    .organizer-frame .frame .title span{ font-size: 66px; margin-right: 10px;}
    .organizer-frame .frame .stpe1 input{ width: 270px; border: 1px solid #a5a5a5; border-radius: 5px; box-sizing: border-box; padding: 7px 16px; color: #a5a5a5; font-size: 16px;}
    .organizer-frame .stpe2 .hint{ font-size: 14px; color: #888888;}
    .organizer-frame .stpe2 .hint span{ font-size: 16px; font-weight: bold; margin-right: 4px;}
    .organizer-frame .stpe2 .demo{ display: flex; justify-content: space-between; align-items: center;}
    .organizer-frame .stpe2 .demo .n-btn{ width: 270px;}
    .organizer-frame .stpe2 .ids-frame{ display: flex;}
    .organizer-frame .stpe2 .ids-frame .upload-frame{ flex: 1;}
</style>

<template>
    <div class="organizer-frame">
        <div class="frame">
            <div class="stpe1">
                <h3 class="title"><span>1</span>填写企业基本信息</h3>
                <div class="mt20">
                    <p class="mb20 tc"><input type="text" placeholder="活动方名称"></p>
                    <div v-if="registerType == 'company'">
                        <p class="mb20 tc"><input type="text" placeholder="公司名称"></p>
                        <p class="mb20 tc"><input type="text" placeholder="公司地址"></p>
                    </div>
                    <p class="mb20 tc"  v-if="registerType == 'personal'"><input type="text" placeholder="联系地址"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人姓名"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人联系电话"></p>
                    <p class="mb20 tc"><input type="text" placeholder="负责人身份证号"></p>
                </div>
            </div>
            <div class="stpe2">
                <h3 class="title"><span>2</span>上传图片</h3>
                <div class="pl50 pt20 pb20" style="border-bottom: 1px solid #e5e5e5;" v-if="registerType == 'company'">
                    <t-upload>
                        <template slot="title">
                            <h3>企业营业执照</h3>
                        </template>
                    </t-upload>
                </div>
                <div class="pl50 pt20 pb20 ids-frame" style="border-bottom: 1px solid #e5e5e5;" v-if="registerType == 'personal'">
                    <t-upload simple>
                        <template slot="title">
                            <h3>身份证正面</h3>
                        </template>
                    </t-upload>
                    <t-upload simple>
                        <template slot="title">
                            <h3>身份证背面</h3>
                        </template>
                    </t-upload>
                </div>
                <div class="pl50 pt20 pb20">
                    <t-upload>
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
                        <t-button>提交审核</t-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TUpload from '@/components/common/TUpload.vue'
    export default {
        name: 'app',
        components:{TButton,TUpload},
        props:['registerType'],
        data(){
            return{

            }
        },
        methods:{

        }
    }

</script>


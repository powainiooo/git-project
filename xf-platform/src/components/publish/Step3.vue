<style>
    .step3-frame{ width: 1400px; position: fixed; bottom: 0; left: 60px; display: flex; justify-content: space-between; z-index: 100;}
    .step3-frame .frame{ width: 1200px; height: 630px; box-sizing: border-box; background-color: #ffffff; display: flex; position: relative;}
    .step3-frame .frame:before{ content: ''; width: 100%; height: 3px; background: url("../../assets/img/ticket-top.png") repeat-x; position: absolute; left: 0; top: -3px;}
    .step3-frame .frame:after{ content: ''; width: 1px; position: absolute; left: 50%; top: 60px; bottom: 20px; z-index: 100; background-color: #e5e5e5;}
    .step3-frame .frame .scroll{ width: 100%; height: 100%; display: flex; overflow-y: scroll; padding: 20px 0;box-sizing: border-box; box-sizing: border-box;}
    .step3-frame .frame .scroll::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .step3-frame .frame .scroll::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .step3-frame .frame .step1{ width: 50%;}
    .step3-frame .frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px; display: flex; justify-content: space-between; align-items: center;}
    .step3-frame .frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
    .step3-frame .frame .title>div{ margin: 35px 20px 0 0; }
    .step3-frame .frame .index{ font-size: 20px; color: #000000; font-family: 'Helve'; padding: 4px 0 4px 50px;border-bottom: 1px solid #e5e5e5;}
    .step3-frame .frame .text{ height: 143px;border-bottom: 3px solid #e5e5e5; padding-left: 50px; display: flex; align-items: center;}
    .step3-frame .frame .text textarea{ width: 460px;; box-sizing: border-box; border: 1px solid #888888; border-radius: 5px; padding: 7px 16px; color: #888888; font-size: 16px;}
    .step3-frame .frame .text textarea[readonly]{ background-color: #eeeef0;}
    .step3-frame .ques1{ position: absolute; top: 78px; left: 558px;}
    .step3-frame .ques2{ position: absolute; top: 78px; right: 20px;}
    .step3-frame .btn-del{ position: absolute; top: 0; right: 18px; font-size:  24px; color: #002aa6;}
    .step3-frame .act-upload .imgs{ background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188));}
</style>

<template>
    <div class="step3-frame">
        <div class="frame">
            <div class="scroll">
                <div class="step1">
                    <div class="title" style="margin-left: 20px; padding-left: 30px;">
                        <h3><span>1</span>活动详情(选填)</h3>
                        <div>
                            <t-ques :redbg="errorData.goods_desc.length != 0"
                                    v-if="isEditor ? showActivityError : true">
                                <ul class="list1" v-if="!showActivityError">
                                    <li><span>1</span>上传图片尺寸为660px*333px</li>
                                    <li><span>2</span>一张图片对应一段文字，可增添多个图片及对应文字，最多限制6张图</li>
                                </ul>
                                <ul class="list1" v-if="showActivityError">
                                    <li v-for="(item,index) in errorData.goods_desc" v-if="item.img != '' || item.desc != ''">
                                        <span></span>{{item.img == '' ? '' : '活动图片 '+(index+1)+'：'+item.img+'  '}}{{item.desc == '' ? '' : '活动文案 '+(index+1)+'：'+item.desc}}
                                    </li>
                                </ul>
                            </t-ques>
                        </div>

                    </div>
                    <div class="pr20 pr" v-for="(item,index) in activityListData">
                        <a href="javascript:;" class="btn-del" @click="doDelActivity(index)" v-if="!isEditor"><Icon type="md-close" /></a>
                        <h3 class="index">{{index < 9 ? 0 : ''}}{{index + 1}}</h3>
                        <div class="pl50 pt20 pb20 pr" style="border-bottom: 1px solid #e5e5e5;">
                            <t-upload v-model="item.imgUrl"
                                      :redButton="isEditor ? errorData.goods_desc.length == 0 ? false : errorData.goods_desc[index].img != '' : false"
                                      :hideButton="activityCheck(index,'img')">
                                <template slot="title">
                                    <h3>活动宣传图片</h3>
                                    <p>尺寸为660px*333px的JPG格式图片</p>
                                </template>
                            </t-upload>
                        </div>
                        <div class="text">
                            <textarea rows="4"
                                      maxlength="200"
                                      placeholder="填写详情(200字内)"
                                      v-model="item.desc"
                                      :readonly="activityCheck(index,'desc')"></textarea>
                        </div>
                    </div>
                    <div class="tc mt30 mb30" v-if="!isEditor">
                        <a href="javascript:;" @click="newActivityItem" v-if="activityListData.length < 6"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
                <div class="step1">
                    <div class="title" style="margin-left: 20px; padding-left: 30px;">
                        <h3><span>2</span>上传艺人图片(选填)</h3>
                        <div>
                            <t-ques :redbg="errorData.person_desc.length != 0"
                                    v-if="isEditor ? showActError : true">
                                <ul class="list1" v-if="!showActError">
                                    <li><span>1</span>艺人logo尺寸为230px*230px</li>
                                    <li><span>2</span>一个艺人logo对应上传一个艺人照片</li>
                                </ul>
                                <ul class="list1" v-if="showActError">
                                    <li v-for="(item,index) in errorData.person_desc" v-if="item.img != '' || item.picture != ''">
                                        <span></span>{{item.img == '' ? '' : '艺人logo '+(index+1)+'：'+item.img+'  '}}{{item.picture == '' ? '' : '艺人照片 '+(index+1)+'：'+item.picture}}
                                    </li>
                                </ul>
                            </t-ques>
                        </div>
                    </div>
                    <div class="pr20 pr" v-for="(item,index) in actListData">
                        <a href="javascript:;" class="btn-del" @click="doDelAct(index)" style="right: 15px;" v-if="!isEditor"><Icon type="md-close" /></a>
                        <h3 class="index">{{index < 9 ? 0 : ''}}{{index + 1}}</h3>
                        <div class="pl50 pt20 pb20 pr" style="border-bottom: 1px solid #e5e5e5;">
                            <t-upload v-model="item.logoUrl"
                                      :class="item.logoUrl != '' ? 'act-upload' : ''"
                                      :redButton="isEditor ? errorData.person_desc.length == 0 ? false : errorData.person_desc[index].img != '' : false"
                                      :hideButton="actCheck(index,'img')">
                                <template slot="title">
                                    <h3>艺人LOGO</h3>
                                    <p>尺寸为230px*230px</p>
                                    <p>图片为透明底白图案PNG格式，LOGO统一使用R255 G255 B255色值</p>
                                </template>
                            </t-upload>
                        </div>
                        <div class="pl50 pt20 pb20 pr" style="border-bottom: 3px solid #e5e5e5;">
                            <t-upload v-model="item.imgUrl"
                                      :redButton="isEditor ? errorData.person_desc.length == 0 ? false : errorData.person_desc[index].picture != '' : false"
                                      :hideButton="actCheck(index,'picture')">
                                <template slot="title">
                                    <h3>艺人照片</h3>
                                    <p>尺寸为480px*230px的JPG格式图片</p>
                                </template>
                            </t-upload>
                        </div>
                    </div>
                    <div class="tc mt30 mb30" v-if="!isEditor">
                        <a href="javascript:;" @click="newActItem"><img src="@/assets/img/add.png"> </a>
                    </div>
                </div>
                <span v-if="canNext"></span>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TUpload from '@/components/common/TUpload.vue'
    import TQues from '@/components/common/TQues.vue'
    export default {
        name: 'app',
        components:{TUpload,TQues},
        //props:['errorData'],
        computed:{
            canNext(){
                //let arr1 = this.activityListData;
                //for(let item of arr1){
                //    if(item.imgUrl == '' || item.desc == ''){
                //        this.$emit('input',false);
                //        return false;
                //    }
                //}
                //let arr2 = this.actListData;
                //for(let item of arr2){
                //    if(item.logoUrl == '' || item.imgUrl == ''){
                //        this.$emit('input',false);
                //        return false;
                //    }
                //}

                this.$emit('input',true);
                return true
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
            }else{
                this.activityListData.push({
                    imgUrl:'',
                    desc:''
                });
                this.actListData.push({
                    logoUrl:'',
                    imgUrl:''
                })
            }

        },
        data(){
            return{
                activityListData:[],
                actListData:[],
                isEditor:false,
                showActivityError:false,
                showActError:false
            }
        },
        methods:{
            dataInit(){
                let editorData = this.$store.state.editorData,fileurl = this.$store.state.fileurl;
                let list1 = editorData.goods_desc,goods_desc = this.errorData.goods_desc;
                this.showActivityError = false;
                for(let i=0;i<list1.length;i++){
                    this.activityListData.push({
                        imgUrl:fileurl+list1[i].img,
                        desc:list1[i].desc
                    });
                    if(goods_desc[i].img != '' || goods_desc[i].desc != ''){
                        this.showActivityError = true;
                    }
                }
                let list2 = editorData.person_desc,person_desc = this.errorData.person_desc;
                this.showActError = false;
                for(let i=0;i<list2.length;i++){
                    this.actListData.push({
                        logoUrl:fileurl+list2[i].img,
                        imgUrl:fileurl+list2[i].picture
                    });
                    if(person_desc[i].img != '' || person_desc[i].picture != ''){
                        this.showActError = true;
                    }
                }
            },
            newActivityItem(){
                if(this.activityListData.length >= 6) return;
                this.activityListData.push({
                    imgUrl:'',
                    desc:''
                })
            },
            newActItem(){
                this.actListData.push({
                    logoUrl:'',
                    imgUrl:''
                })
            },
            doDelActivity(index){
                this.activityListData.splice(index,1)
            },
            doDelAct(index){
                this.actListData.splice(index,1)
            },
            activityCheck(index,name){
                if(this.isEditor){
                    if(this.errorData.goods_desc.length == 0){
                        return true
                    }else{
                        return this.errorData.goods_desc[index][name] == ''
                    }
                }else{
                    return false
                }
            },
            actCheck(index,name){
                if(this.isEditor){
                    if(this.errorData.person_desc.length == 0){
                        return true
                    }else{
                        return this.errorData.person_desc[index][name] == ''
                    }
                }else{
                    return false
                }
            }
        }
    }

</script>


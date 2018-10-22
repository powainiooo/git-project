<style>
    .pro-info{ margin: 0 20px;}
    .pro-info .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 35px;}
    .pro-info .title .index{  font-size: 50px; margin-right: 10px; font-family: 'Helve';}
    .pro-info .time-item{ width: 270px; height: 40px; display: flex; border-radius: 6px; overflow: hidden; margin: 20px 0 20px 35px;}
    .pro-info .time-item p{ width: 100px; height: 100%; background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); font-size: 16px; color: #ffffff; display: flex; justify-content: center; align-items: center;}
    .pro-info .time-item div{ width: 170px; height: 100%; background-color: #eeeef0; padding: 0 15px; box-sizing: border-box; font-size: 12px; color: #000000; display: flex; justify-content: space-between; align-items: center;}
    .pro-info .title2{ display: flex; justify-content: space-between;}
    .pro-info .title2 .btn{ width: 90px; margin-top: 20px;}
    .pro-info .title2 .btn a{ font-size: 12px;}
    .pro-info .title2 .name{ display: flex; align-items: baseline;}

    .pro-info .ticket-list li{ display: flex;}
    .pro-info .ticket-list li.thead>div{ height: 50px; font-size: 16px; font-weight: normal; color: #c4c4c4; display: flex; justify-content: center; align-items: center; }
    .pro-info .ticket-list li .td1{ width: 120px;}
    .pro-info .ticket-list li .td2{ width: 180px;}
    .pro-info .ticket-list li .td3{ width: 120px;}
    .pro-info .ticket-list li .td4{ width: 180px;}
    .pro-info .ticket-list li.tbody>div{ display: flex; justify-content: center; align-items: center;}
    .pro-info .ticket-list li.tbody .td1{ font-size: 18px; color: #000000; font-weight: bold;}
    .pro-info .ticket-list li.tbody .td2{ font-size: 48px; color: #000000; font-weight: bold;}
    .pro-info .ticket-list li.tbody .td3 .ivu-input-number-input{ display: block; text-align: center;}
    .pro-info .ticket-list li.tbody .td-change .ivu-input-number-input{ font-weight: bold; color: #000000; font-size: 18px;}
    .pro-info .ticket-list li.tbody .td4 .ivu-switch-large{ width: 70px; height: 25px;}
    .pro-info .ticket-list li.tbody .td4 .ivu-switch-large:after{ top: 3px;}
    .pro-info .ticket-list li.tbody .td4 .ivu-switch-large.ivu-switch-checked:after{ left: 50px;}
    .pro-info .ticket-list li.tbody .td4 .ivu-switch-large .ivu-switch-inner{ top: 2px;}
    .pro-info .ticket-list-btns{ display: flex; justify-content: flex-end; margin-right: 60px; transition: height 0.3s cubic-bezier(.25,.76,.36,.97); overflow: hidden;}
    .pro-info .ticket-list-btns .n-btn{ width: 90px; margin-left: 10px;}

    .pro-info .qrcode{ display: flex;}
    .pro-info .qrcode .qritem{ margin:15px 35px; }
    .pro-info .qrcode .qritem img{ box-shadow: 0 2px 3px rgba(0,0,0,0.2); margin-bottom: 25px;}
    .pro-info .qrcode .qritem .n-btn{ width: 90px; margin-left: 5px;}

    .pro-info .download-frame{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); z-index: 1700; position: fixed; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;}
    .pro-info .download-frame p{ font-size: 14px; color: #ffffff; margin-top: 20px;}
    .pro-info .download-frame .close{font-size: 40px; color: #ffffff; position: absolute; top: 35px; right: 37px;}
</style>

<template>
    <div class="pro-info">
        <div class="title"><span class="index">1</span>基本信息</div>
        <div class="time-item">
            <p>开售时间</p>
            <div>
                <span style="font-weight: bold;">{{itemData.sale_start | formatDate('yyyy-MM-dd')}}</span>
                <span>{{itemData.sale_start | formatDate('HH:mm')}}</span>
            </div>
        </div>
        <div class="time-item">
            <p>停票时间</p>
            <div>
                <span style="font-weight: bold;">{{itemData.sale_end | formatDate('yyyy-MM-dd')}}</span>
                <span>{{itemData.sale_end | formatDate('HH:mm')}}</span>
            </div>
        </div>
        <div class="title title2">
            <div class="name">
                <span class="index">2</span>基本信息
                <t-ques style="margin-left: 15px;" width="300">
                    <ul class="list1">
                        <li><span>1</span>票的数量只可增加，<br>一旦提交无法减少张数。</li>
                        <li><span>2</span>售罄功能开启，售票平台对应的票种将显示"已售罄"，用户则无法再购买。</li>
                    </ul>
                </t-ques>
            </div>
            <div class="btn" v-if="itemData.status != 0">
                <t-button size="min" @dotap="$emit('openstatistics')">订单详情</t-button>
            </div>
        </div>
        <ul class="ticket-list">
            <li class="thead">
                <div class="td1">票种</div>
                <div class="td2">已售(张)</div>
                <div class="td3">数量(张)</div>
                <div class="td4">销售状态</div>
            </li>
            <li class="tbody" v-for="(item,index) in editorTypeList">
                <div class="td1">{{item.name}}</div>
                <div class="td2">{{item.sale_nums}}</div>
                <div class="td3" :class="editorTypeList[index].all_nums != lastTypeList[index].all_nums ? 'td-change' : ''">
                    <InputNumber :min="item.min_nums" v-model="item.all_nums"  size="large" :disabled="isVerify"></InputNumber>
                </div>
                <div class="td4">
                    <t-switch :disabled="item.sale_nums == item.all_nums || isVerify" v-model="item.is_sale_out" true-value="1" false-value="0">
                        <span slot="open">已售罄</span>
                        <span slot="close" v-if="!isVerify">销售中</span>
                        <span slot="close" v-if="isVerify"></span>
                    </t-switch>
                </div>
            </li>
        </ul>
        <div class="ticket-list-btns" :style="{height:isDiff ? '36px' : '0px'}">
            <t-button size="min" @dotap="doEditorTypeList">确认</t-button>
            <t-button size="min" extraClass="gray" @dotap="resetTypeList">取消</t-button>
        </div>
        <div class="title title2" v-if="!isVerify">
            <div class="name">
                <span class="index">3</span>链接码 及 验票码
                <t-ques style="margin-left: 15px;" width="300">
                    <ul class="list1">
                        <li><span>1</span>链接码用户推广时，方便用户扫描跳转到购票页面。</li>
                        <li><span>2</span>验票码扫描后可获得活动验票权限，授权成功后的手机可进行活动验票。</li>
                    </ul>
                </t-ques>
            </div>
        </div>
        <div class="qrcode" v-if="!isVerify">
            <div class="qritem">
                <img :src="itemData.wxacode" width="100" height="100">
                <t-button size="min" @dotap="downloadQR(fileurl+itemData.poster,'poster')">下载链接码</t-button>
            </div>
            <div class="qritem">
                <img :src="itemData.check_code" width="100" height="100">
                <t-button size="min" @dotap="downloadQR(itemData.check_code,'code')">下载验票码</t-button>
            </div>
        </div>

        <!-- 下载图片弹窗 -->
        <div class="download-frame" v-if="downloadSrc != ''">
            <img :src="downloadSrc" width="480">
            <p v-if="downloadType == 'poster'">右键图片另存为可下载活动链接码，活动链接码可用于活动推广使用。</p>
            <p v-if="downloadType == 'code'">右键图片另存为可下载活动验票码，可获得活动验票权限，授权成功后的手机可进行活动验票。</p>
            <a href="javascript:;" class="close" @click="downloadSrc = ''"><Icon type="md-close" /></a>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TQues from '@/components/common/TQues.vue'
    import TSwitch from '@/components/common/TSwitch.vue'
    import qs from 'qs'
    import {formatDate} from '@/assets/js/date.js'
    export default {
        name: 'app',
        components:{TButton,TQues,TSwitch},
        props:{
            itemData:{
                type:Object
            },
            fileurl:{
                type:String
            }
        },
        filters:{
            formatDate(time,reg){
                let date = new Date(time*1000);
                return formatDate(date,reg);
            }
        },
        computed:{
            isDiff(){
                for(let i=0;i<this.editorTypeList.length;i++){
                    if(this.editorTypeList[i].all_nums != this.lastTypeList[i].all_nums || this.editorTypeList[i].is_sale_out != this.lastTypeList[i].is_sale_out){
                        return true;
                        break;
                    }
                }
                return false
            },
            isVerify(){
                return this.itemData.status == 0 || this.itemData.status == 5
            }
        },
        data(){
            return{
                editorTypeList:[],
                lastTypeList:[],
                downloadSrc:'',
                downloadType:''
            }
        },
        mounted(){
            this.resetTypeList();
        },
        methods:{
            resetTypeList(){
                let tl = this.itemData.classes;
                this.editorTypeList = [];
                this.lastTypeList = [];
                for(let item of tl){
                    let out;
                    if(this.isVerify){
                        out = 0;
                    }else{
                        out = item.is_over.toString()
                    }
                    this.editorTypeList.push({
                        name:item.select,
                        sale_nums:parseInt(item.salenums),
                        all_nums:parseInt(item.nums),
                        min_nums:parseInt(item.nums),
                        is_sale_out:out
                    });
                    this.lastTypeList.push({
                        name:item.select,
                        sale_nums:parseInt(item.salenums),
                        all_nums:parseInt(item.nums),
                        min_nums:parseInt(item.nums),
                        is_sale_out:out
                    });
                }
            },
            doEditorTypeList(){
                let obj = {},self = this;
                obj.classes = [];
                let arr1 = this.editorTypeList,arr2 = this.itemData.classes;
                for(let i=0;i<arr1.length;i++){
                    obj.classes.push({
                        is_over:arr1[i].is_sale_out,
                        max:arr2[i].max,
                        nums:arr1[i].all_nums,
                        price:arr2[i].price,
                        salenums:arr2[i].salenums,
                        select:arr2[i].select
                    })
                }
                obj.id = this.itemData.id;
                self.$ajax.post('/client/api/activity_edit',qs.stringify(obj)).then(res=>{
                    let data = res.data;
                    if(data.status == 1){
                        self.lastTypeList = [];
                        for(let item of arr1){
                            self.lastTypeList.push({
                                name:item.name,
                                sale_nums:parseInt(item.sale_nums),
                                all_nums:parseInt(item.all_nums),
                                min_nums:parseInt(item.min_nums),
                                is_sale_out:item.is_sale_out
                            });
                        }
                        self.$Message.success(data.msg);
                        self.$emit('change',obj.id);
                    }else{
                        self.$Message.warning(data.msg);
                    }
                })
            },
            downloadQR(url,type){
                this.downloadSrc = url;
                this.downloadType = type;
            }
        }
    }

</script>


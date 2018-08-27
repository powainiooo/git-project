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
</style>

<template>
    <div class="pro-info">
        <div class="title"><span class="index">1</span>基本信息</div>
        <div class="time-item">
            <p>开售时间</p>
            <div>
                <span style="font-weight: bold;">{{itemData.sale_start | formatDate}}</span>
                <span>{{itemData.hour_b}}</span>
            </div>
        </div>
        <div class="time-item">
            <p>停票时间</p>
            <div>
                <span style="font-weight: bold;">{{itemData.sale_end | formatDate}}</span>
                <span>{{itemData.hour_e}}</span>
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
            <div class="btn">
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
                    <t-switch :disabled="item.sale_nums == item.all_nums || isVerify" v-model="item.is_sale_out" true-value="2" false-value="1">
                        <span slot="open">已售罄</span>
                        <span slot="close">销售中</span>
                    </t-switch>
                </div>
            </li>
        </ul>
        <div class="ticket-list-btns" :style="{height:isDiff ? '36px' : '0px'}">
            <t-button size="min">确认</t-button>
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
                <img src="@/assets/img/qrcode1.png" width="100" height="100">
                <t-button size="min">下载链接码</t-button>
            </div>
            <div class="qritem">
                <img src="@/assets/img/qrcode2.png" width="100" height="100">
                <t-button size="min">下载验票码</t-button>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TQues from '@/components/common/TQues.vue'
    import TSwitch from '@/components/common/TSwitch.vue'
    import {formatDate} from '@/assets/js/date.js'
    export default {
        name: 'app',
        components:{TButton,TQues,TSwitch},
        props:{
            itemData:{
                type:Object
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time*1000);
                return formatDate(date,'yyyy-MM-dd');
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
                return this.itemData.status == 0
            }
        },
        data(){
            return{
                editorTypeList:[],
                lastTypeList:[]
            }
        },
        mounted(){
            this.resetTypeList()
        },
        methods:{
            resetTypeList(){
                let tl = this.itemData.classes;
                this.editorTypeList = [];
                for(let item of tl){
                    let out;
                    if(this.isVerify){
                        out = '2';
                    }else{
                        out = item.salenums == item.nums ? '2' : '1'
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
            }
        }
    }

</script>


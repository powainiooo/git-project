<style>
    .pro-table .table-opera{ display: flex; justify-content: space-between; margin: 0 20px;}
    .pro-table .table-opera>div{ display: flex; align-items: center;}
    .pro-table .table-opera>div .ivu-select-selection{ border-color: #878787;}
    .pro-table .table-opera>div .ivu-input{ border-color: #878787;}

    .pro-table .table-list{ width: 100%;}
    .pro-table .table-list th{ height: 50px; font-size: 16px; color: #000000;border-top: 1px solid #dcdcdc;border-bottom: 1px solid #dcdcdc; vertical-align: middle; text-align: left; padding:0 15px;}
    .pro-table .table-list td{ font-size: 14px; color: #888888;border-bottom: 1px solid #dcdcdc; padding: 15px;}
    .pro-table .table-list td.check{ background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); color: #ffffff;}
    .pro-table .table-list td.refund{ background-color: #e73828; color: #ffffff;}
    .pro-table .table-list tbody tr:nth-child(2n+1){ background-color: #eeeef0;}
</style>

<template>
    <div class="pro-table">
        <div class="table-opera">
            <div>
                <t-button size="min" style="width: 90px; margin-right: 30px;">导出表格</t-button>
                <t-button size="min" style="width: 90px; margin-right: 30px;" @dotap="doNotify">一次性通知</t-button>
                <t-ques width="290">
                    <ul class="list1">
                        <li><span>1</span>一次性通知，仅支持使用一次。</li>
                        <li><span>2</span>通知类型 如：活动取消、活动改期、艺人时间更换、艺人无法到场等。</li>
                    </ul>
                </t-ques>
            </div>
            <div>
                <Select style="width:130px; margin-right: 20px;">
                    <Option value="0">普通票</Option>
                    <Option value="1">早鸟票</Option>
                </Select>
                <Input v-model="value" placeholder="请输入电话、姓名、单号" style="width: 270px; margin-right: 20px;" />
                <t-button size="min" style="width: 90px;">查询</t-button>
            </div>
        </div>
        <div style="margin: 20px;">
            <table class="table-list">
                <thead>
                <tr>
                    <th>票种</th>
                    <th>下单时间</th>
                    <th>买家</th>
                    <th>电话</th>
                    <th>邮寄地址</th>
                    <th>身份证</th>
                    <th>单号</th>
                    <th>单价</th>
                    <th>票数</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>普通票</td>
                    <td>2017-08-08</td>
                    <td>张三</td>
                    <td>13812341234</td>
                    <td>深圳市宝安区新安六路众里创业社区309</td>
                    <td>44030199028391029</td>
                    <td>***39108563</td>
                    <td>130</td>
                    <td><span class="numbers">1</span></td>
                    <td>未验票</td>
                    <td>退款</td>
                </tr>
                <tr>
                    <td>普通票</td>
                    <td>2017-08-08</td>
                    <td>张三</td>
                    <td>13812341234</td>
                    <td>深圳市宝安区新安六路众里创业社区309</td>
                    <td>44030199028391029</td>
                    <td>***39108563</td>
                    <td>130</td>
                    <td><span class="numbers">1</span></td>
                    <td class="check">已验票</td>
                    <td>退款</td>
                </tr>
                <tr>
                    <td>普通票</td>
                    <td>2017-08-08</td>
                    <td>张三</td>
                    <td>13812341234</td>
                    <td>深圳市宝安区新安六路众里创业社区309</td>
                    <td>44030199028391029</td>
                    <td>***39108563</td>
                    <td>130</td>
                    <td><span class="numbers">1</span></td>
                    <td class="refund">已退款</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import TQues from '@/components/common/TQues.vue'
    export default {
        name: 'app',
        components:{TButton,TQues},
        data(){
            return{

            }
        },
        methods:{
            doNotify(){
                let self = this;
                self.$tModal.confirm({
                    title:'是否确认使用一次性通知？',
                    content:'一次性通知仅可使用一次，请谨慎使用！<br>可用于活动场地变更、活动改期、活动取消等紧急情况时，作为通知已购票用户功能。',
                    onOk(){
                        self.$tModal.confirm({
                            type:'textarea',
                            onOk(txt){
                                console.log(txt);
                            }
                        })
                    }
                })
            }
        }
    }

</script>


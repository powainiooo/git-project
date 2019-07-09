<style scoped>
.refund-frame { border-top: 1px solid #e5e5e5; margin: 0 20px;}
.refund-frame .title{ font-size: 18px; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
.refund-frame .title span{ font-size: 66px; margin-right: 10px; font-family: 'Helve';}
.refund-frame .radio-list { display: flex; align-items: center; flex-wrap: wrap; margin: 30px 50px;}
.refund-frame .radio-list li{ margin-right: 25px; margin-bottom: 20px; font-size: 16px; color: #000000;}
.refund-frame .radio-list li div { display: flex; align-items: center;}
.refund-frame .radio-list li span { margin-left: 10px}
.refund-frame .radio-list .text{ border: 2px solid #c3c3c3; border-radius: 5px; padding: 10px; margin-top: 10px;}

.refund-frame .table-list{ width: 100%; margin-bottom: 20px;}
.refund-frame .table-list th{ height: 50px; font-size: 16px; color: #000000;border-top: 1px solid #dcdcdc;border-bottom: 1px solid #dcdcdc; vertical-align: middle; text-align: left; padding:0 15px;}
.refund-frame .table-list td{ font-size: 14px; color: #888888;border-bottom: 1px solid #dcdcdc; padding: 15px;}
.refund-frame .table-list td.check{ background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); color: #ffffff;}
.refund-frame .table-list td.refund{ background-color: #e73828; color: #ffffff;}
.refund-frame .table-list tbody tr:nth-child(2n+1){ background-color: #eeeef0;}

</style>

<template>
<div class="refund-frame">
   <h3 class="title"><span>1</span>退款类型</h3>
   <ul class="radio-list">
      <li v-for="i in refundType" :key="i.value">
         <div>
            <input type="radio" class="radio" :value="i.value" v-model="condition.refundType" />
            <span>{{i.name}}</span>
         </div>
      </li>
   </ul>
   <!-- 个别退款 -->
   <div class="selects" v-if="condition.refundType === 1">
      <div style="display: flex; align-items: center; margin-left: 50px; margin-bottom: 20px;">
         <Select style="width:130px; margin-right: 20px;" v-model="selectType">
            <Option value="0">全部</Option>
            <Option v-for="(item,index) in itemData.classes" :key="index" :value="item.select">{{item.select}}</Option>
         </Select>
         <Input v-model="keyword" placeholder="请输入电话、姓名、单号" style="width: 270px; margin-right: 20px;" />
         <t-button size="min" style="width: 90px;" @dotap="getListData">查询</t-button>
      </div>
      <table class="table-list">
         <thead>
         <tr>
            <th></th>
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
         </tr>
         </thead>
         <tbody>
         <tr v-for="item in listData">
            <td><input type="radio" class="radio" :value="item.id" v-model="condition.ids" /></td>
            <td>{{item.sele}}</td>
            <td>{{fmt(item.order_time)}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.address || '--'}}</td>
            <td>{{item.idnum || '--'}}</td>
            <td>{{item.order_num}}</td>
            <td>{{item.price}}</td>
            <td><span class="numbers">{{item.nums}}</span></td>
            <td>
               <span v-if="item.status !== 3">{{item.is_check === '1' ? '已验票' : '未验票'}}</span>
               <span v-if="item.status === 3">已退款</span>
            </td>
         </tr>
         </tbody>
      </table>
      <Page :total="allnums" @on-change="changePage" />
      <h3 class="title" style="margin-top: 80px;"><span>2</span>退款原因</h3>
      <ul class="radio-list">
         <li v-for="i in reasonSelects" :key="i.value">
            <div>
               <input type="radio" class="radio" :value="i.value" v-model="condition.reasonSelects" />
               <span>{{i.name}}</span>
            </div>
         </li>
         <li style="width: 100%">
            <div>
               <input type="radio" class="radio" :value="4" v-model="condition.reasonSelects" />
               <span>其它原因</span>
            </div>
            <textarea rows="3" class="text" style="width: 300px;" placeholder="在此填写其它退款原因" v-model="condition.textSelects"></textarea>
         </li>
      </ul>
   </div>
   <!-- 全部退款 -->
   <div class="all" v-if="condition.refundType === 2">
      <h3 class="title" style="margin-top: 80px;"><span>2</span>退款原因</h3>
      <ul class="radio-list">
         <li v-for="i in reasonSelects" :key="i.value">
            <div>
               <input type="radio" class="radio" :value="i.value" v-model="condition.reasonAll" />
               <span>{{i.name}}</span>
            </div>
         </li>
         <li style="width: 100%">
            <div>
               <input type="radio" class="radio" :value="5" v-model="condition.reasonAll" />
               <span>其它原因</span>
            </div>
            <textarea rows="3" class="text" style="width: 300px;" placeholder="在此填写其它退款原因" v-model="condition.textAll"></textarea>
         </li>
      </ul>
      <h3 class="title" style="margin-top: 50px;"><span>3</span>通知凭证</h3>
      <div style="margin: 30px 50px;">
         <t-upload v-model="condition.infor">
            <template slot="title">
            <p>因活动方原因导致退款行为，活动方已通知到位方可提交退款申请，<br/>需提供通知凭证（如推文告知用户），若未通知到位退款申请将驳回。</p>
            </template>
         </t-upload>
      </div>
   </div>
   <div style="margin-left: 50px; margin-bottom: 30px;">
      <t-button size="min" style="width: 300px;" @dotap="doSubmit">提交申请</t-button>
   </div>
</div>
</template>

<script type="es6">
import TButton from '@/components/common/TButton.vue'
import TQues from '@/components/common/TQues.vue'
import TUpload from '@/components/common/TUpload.vue'
export default {
   name: 'App',
   props:['itemData'],
   components:{TButton,TQues, TUpload},
   data() {
      return {
         refundType: [
            {value: 1, name: '个别退款'},
            {value: 2, name: '全部退款'}
         ],
         reasonSelects: [
            {value: 1, name: '买错票'},
            {value: 2, name: '买多票'},
            {value: 3, name: '行程突变'}
         ],
         reasonAll: [
            {value: 1, name: '活动改期'},
            {value: 2, name: '艺人原因'},
            {value: 3, name: '场地原因'},
            {value: 4, name: '活动限流'}
         ],
         keyword: '',
         selectType: '0',
         condition: {
            refundType: 2,
            reasonSelects: 1,
            textSelects: '',
            reasonAll: 1,
            textAll: '',
            ids: [],
            infor: ''
         },
         allnums: 0,
         page: 1,
      }
   },
   methods: {
      getListData(){
         let self = this;
         this.$ajax.get('/client/api/act_order',{
            params:{
               id:this.itemData.id,
               keyword:this.keyword,
               sele:this.selectType,
               page:this.page
            }
         }).then(res=>{
            self.listData = res.data.data.data.list;
            self.allnums = parseInt(res.data.data.data.nums);
         })
      },
      doSubmit () {
         let self = this
         self.$tModal.confirm({
            title:'是否提交退款申请？',
            content:'请仔细核查申请退款内容，<br/>若因活动方原因导致退款行为，且未通知到位退款申请将被驳回。',
            onOk(){
               let obj = {}
               obj.goods_id = this.itemData.id
               obj.act_name = this.itemData.activity
               obj.goods_name = this.itemData.goods_name
               obj.re_type = this.condition.refundType
               if (this.condition.refundType === 1) { // 个别退款
                  obj.re_id = this.condition.reasonSelects
                  obj.orders = this.condition.ids
                  obj.reason = this.condition.textSelects
               } else if (this.condition.refundType === 2) { // 全部退款
                  obj.re_id = this.condition.reasonAll
                  obj.reason = this.condition.textAll
                  obj.notify_img = this.condition.infor
               }
               this.$ajax.get('/client/api/refund_check',obj).then(res=>{
                  let data = res.data
                  if (data.status === 1) {
                     self.$tModal.warn({
                        title: '提交成功！',
                        content: '后台将在3个工作日内完成退款申请审核，<br>退款申请是否通过审核，请自行登录查询结果。',
                        onOk () {
                           self.$emit('switch-page', 'table')
                        }
                     })
                  } else {
                     self.$tModal.warn({
                        title: data.msg
                     })
                  }
               })
            }
         })
      }
   }
}
</script>


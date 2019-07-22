<style scoped>
.refund-frame { border-top: 1px solid #e5e5e5; margin: 0 20px;}
.refund-frame .title{ font-size: 18px; color: #000000; border-bottom: 1px solid #e5e5e5; padding-left: 50px;}
.refund-frame .title h3 { display: inline-block; margin-right: 15px;}
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
            <input type="radio" class="radio" :value="i.value" v-model="condition.refundType" :disabled="isChecking && errorData.chk_type === '1'"/>
            <span>{{i.name}}</span>
         </div>
      </li>
   </ul>
   <!-- 个别退款 -->
   <div class="selects" v-if="condition.refundType === 1">
      <div style="display: flex; align-items: center; margin:-30px 0 20px 50px;">
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
         <tr v-for="(item, index) in listData" :key="index" v-if="item.is_refund === '0'">
            <td><input type="checkbox" class="radio" :value="item.id" v-model="condition.ids" :disabled="isChecking" /></td>
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
               <span v-if="item.status !== '3'">{{item.is_check === '1' ? '已验票' : '未验票'}}</span>
               <span v-if="item.status === '3'">已退款</span>
            </td>
         </tr>
         </tbody>
      </table>
      <Page :total="allnums" @on-change="changePage" />
      <div class="title" style="margin-top: 80px;">
         <h3><span>2</span>退款原因</h3>
         <t-ques width="290"
                 redbg
                 v-if="isChecking && errorData.chk_reason === '2'"
                 style="z-index: 410;">
            <ul class="list1">
               <li>{{errorData.reason_msg}}</li>
            </ul>
         </t-ques>
      </div>
      <ul class="radio-list">
         <li v-for="i in reasonSelects" :key="i.value">
            <div>
               <input type="radio" class="radio" :value="i.value" v-model="condition.reasonSelects" :disabled="isChecking && errorData.chk_reason === '1'" />
               <span>{{i.name}}</span>
            </div>
         </li>
         <li style="width: 100%">
            <div>
               <input type="radio" class="radio" :value="4" v-model="condition.reasonSelects" :disabled="isChecking && errorData.chk_reason === '1'" />
               <span>其它原因</span>
            </div>
            <textarea rows="3" class="text" style="width: 300px;" placeholder="在此填写其它退款原因" v-model="condition.textSelects" :readonly="isChecking && errorData.chk_reason === '1'"></textarea>
         </li>
      </ul>
   </div>
   <!-- 全部退款 -->
   <div class="all" v-if="condition.refundType === 2">
      <div class="title" style="margin-top: 80px;">
         <h3><span>2</span>退款原因</h3>
         <t-ques width="290"
                 redbg
                 v-if="isChecking && errorData.chk_reason === '2'"
                 style="z-index: 410;">
            <ul class="list1">
               <li>{{errorData.reason_msg}}</li>
            </ul>
         </t-ques>
      </div>
      <ul class="radio-list">
         <li v-for="i in reasonAll" :key="i.value">
            <div>
               <input type="radio" class="radio" :value="i.value" v-model="condition.reasonAll" :disabled="isChecking && errorData.chk_reason === '1'" />
               <span>{{i.name}}</span>
            </div>
         </li>
         <li style="width: 100%">
            <div>
               <input type="radio" class="radio" :value="5" v-model="condition.reasonAll" :disabled="isChecking && errorData.chk_reason === '1'" />
               <span>其它原因</span>
            </div>
            <textarea rows="3" class="text" style="width: 300px;" placeholder="在此填写其它退款原因" v-model="condition.textAll" :readonly="isChecking && errorData.chk_reason === '1'"></textarea>
         </li>
      </ul>
      <div class="title" style="margin-top: 50px;">
         <h3><span>3</span>通知凭证</h3>
         <t-ques width="290"
                 redbg
                 v-if="isChecking && errorData. chk_notify === '2'"
                 style="z-index: 410;">
            <ul class="list1">
               <li>{{errorData.notify_msg}}</li>
            </ul>
         </t-ques>
      </div>
      <div style="margin: 30px 50px;">
         <t-upload v-model="condition.infor"
                   :redButton="isChecking && errorData.chk_notify === '2'"
                   :hideButton="isChecking && errorData.chk_notify === '1'">
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
import { formatDate } from '@/assets/js/date.js'
import qs from 'qs'
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
            refundType: 1,
            reasonSelects: 1,
            textSelects: '',
            reasonAll: 1,
            textAll: '',
            ids: [],
            infor: ''
         },
         listData: [],
         allnums: 0,
         page: 1,
         isChecking: false,
         errorData: {}
      }
   },
   watch: {
      'condition.refundType' (val) {
         if (val === 1) {
            this.getListData()
         }
      }
   },
   computed: {
      fileurl () {
         return this.$store.state.fileurl
      }
   },
   mounted () {
      // this.getErrorData()
      this.getListData()
   },
   methods: {
      getListData(){
         this.$ajax.get('/client/api/act_order',{
            params:{
               id:this.itemData.id,
               keyword:this.keyword,
               sele:this.selectType,
               page:this.page
            }
         }).then(res=>{
            this.listData = res.data.data.data.list;
            this.allnums = parseInt(res.data.data.data.nums);
         })
      },
      changePage (val) {
         this.page = val
         this.getListData()
      },
      getErrorData(){
         this.isChecking = true
         this.$ajax.get('/client/api/refund_info',{
            params:{
               goods_id:this.itemData.id
            }
         }).then(res=>{
            let data = res.data.data
            this.errorData = data
            this.condition.refundType = parseInt(data.re_type)
            if (this.condition.refundType === 1) { // 个别退款
               this.condition.reasonSelects = parseInt(data.re_id)
               this.condition.ids = data.orders.split(',')
               this.condition.textSelects = data.reason
            } else if (this.condition.refundType === 2) { // 全部退款
               this.condition.reasonAll = parseInt(data.re_id)
               this.condition.textAll = data.reason
               this.condition.infor = this.fileurl + data.notify_img
            }
         })
      },
      doSubmit () {
         let self = this
         if (self.condition.refundType === 2 && self.condition.infor === '') {
            self.$tModal.warn({
               title: '请上传凭证'
            })
            return
         }
         self.$tModal.confirm({
            title:'是否提交退款申请？',
            content:'请仔细核查申请退款内容，<br/>若因活动方原因导致退款行为，且未通知到位退款申请将被驳回。',
            onOk(){
               console.log('refund ok')
               let obj = {}
               obj.goods_id = self.itemData.id
               obj.act_name = self.itemData.activity
               obj.goods_name = self.itemData.goods_name
               obj.re_type = self.condition.refundType
               if (self.condition.refundType === 1) { // 个别退款
                  obj.re_id = self.condition.reasonSelects
                  obj.orders = self.condition.ids.join(',')
                  obj.reason = self.condition.textSelects
               } else if (self.condition.refundType === 2) { // 全部退款
                  obj.re_id = self.condition.reasonAll
                  obj.reason = self.condition.textAll
                  obj.notify_img = self.condition.infor
               }
               self.$ajax.post('/client/api/refund_check',qs.stringify(obj)).then(res=>{
                  let data = res.data
                  if (data.status === 1) {
                     self.$tModal.warn({
                        title: '提交成功！',
                        content: '后台将在3个工作日内完成退款申请审核，<br>退款申请是否通过审核，请自行登录查询结果。',
                        onOk () {
                           self.$emit('switch-page', 'table')
                           self.$emit('change', self.itemData.id)
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
      },
      fmt (time) {
         let date = new Date(parseInt(time) * 1000)
         return formatDate(date, 'yyyy-MM-dd')
      }
   }
}
</script>


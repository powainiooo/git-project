<style>
    .pro-table .table-opera{ display: flex; justify-content: space-between; margin: 0 20px;}
    .pro-table .table-opera>div{ display: flex; align-items: center;}
    .pro-table .table-opera>div .ivu-select-selection{ border-color: #878787;}
    .pro-table .table-opera>div .ivu-input{ border-color: #878787;}

    .pro-table .table-list{ width: 100%; margin-bottom: 20px;}
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
                <t-button size="min" style="width: 90px; margin-right: 30px;" @dotap="doExcel" :isDisabled="isGetExcel">
                    <span v-if="!isGetExcel">导出表格</span>
                    <Spin v-if="isGetExcel"></Spin>
                    <span v-if="isGetExcel">生成中</span>
                </t-button>
                <t-button size="min" style="width: 90px; margin-right: 30px;" @dotap="doNotify" v-if="!isInfor">一次性通知</t-button>
                <t-ques width="290" v-if="!isInfor">
                    <ul class="list1">
                        <li><span>1</span>一次性通知，仅支持使用一次</li>
                        <li><span>2</span>通知类型 如：活动取消、活动改期、艺人时间更换、艺人无法到场等。</li>
                        <li><span>3</span>由于微信消息通知限制，只可在用户已购票后的7日内发送消息，超过7日的用户则无法收取该消息。</li>
                    </ul>
                </t-ques>
               <t-button size="min" style="width: 90px; margin-left: 30px;" @dotap="gotoRefund" v-if="itemData.refund_chk === 1">退款申请</t-button>
               <t-button size="min" style="width: 130px; margin-left: 30px;" v-if="itemData.refund_chk === 3">退款申请 审核中</t-button>
               <t-button size="min" style="width: 130px; margin-left: 30px;" @dotap="gotoRefundError" v-if="itemData.refund_chk === 4" red>退款申请 审核不通过</t-button>
            </div>
            <div>
                <Select style="width:130px; margin-right: 20px;" v-model="selectType">
                    <Option value="0">全部</Option>
                    <Option v-for="(item,index) in itemData.classes" :key="index" :value="item.select">{{item.select}}</Option>
                </Select>
                <Input v-model="keyword" placeholder="请输入电话、姓名、单号" style="width: 270px; margin-right: 20px;" />
                <t-button size="min" style="width: 90px;" @dotap="getListData">查询</t-button>
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
                <tr v-for="(item, index) in listData" :key="index">
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
                    <td>
                        <span style="cursor: pointer; color: #2d8cf0;" @click="doRefund(item.id)" v-if="item.is_refund !== '0' && item.status !== '3' && item.price != 0 && item.is_check === '0'">退款</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <Page :total="allnums" @on-change="changePage" />
        </div>
    </div>
</template>

<script type='es6'>
import qs from 'qs'
import TButton from '@/components/common/TButton.vue'
import TQues from '@/components/common/TQues.vue'
import { formatDate } from '@/assets/js/date.js'
export default {
   name: 'app',
   components: { TButton, TQues },
   data () {
      return {
         keyword: '',
         selectType: '0',
         listData: [],
         allnums: 0,
         page: 1,
         isGetExcel: false,
         isInfor: false
      }
   },
   props: ['itemData'],
   mounted () {
      this.getListData()
      this.isInfor = this.itemData.is_send === 1
   },
   methods: {
      getListData () {
         let self = this
         this.$ajax.get('/client/api/act_order', {
            params: {
               id: this.itemData.id,
               keyword: this.keyword,
               sele: this.selectType,
               page: this.page
            }
         }).then(res => {
            self.listData = res.data.data.data.list
            self.allnums = parseInt(res.data.data.data.nums)
         })
      },
      doRefund (id) {
         let self = this
         self.$tModal.confirm({
            title: '是否确认退款?',
            content: '确认退款之后款项将原路返回到该用户账上，请谨慎操作。',
            onOk () {
               self.$ajax.post('/client/api/order_refund', qs.stringify({ id: id })).then(res => {
                  let data = res.data
                  if (data.status === '1') {
                     self.$Message.success('退款成功')
                     self.getListData()
                     self.$emit('change', self.itemData.id)
                  } else {
                     console.log('refund fail')
                     self.$Message.warning({content: data.msg})
                  }
               })
            }
         })
      },
      gotoRefund () {
         let self = this
         self.$tModal.confirm({
            title: '是否确认申请退款?',
            content: '为保障购票者的权益，小夫有票将开启对活动方的信用记录，<br/>若因活动方原因导致多次活动退款，将影响到活动方的信用记录。<br/>请认真填写退款信息，此举措将影响到您的信用记录。',
            onOk () {
               self.$emit('switch-page', 'refund')
            }
         })
      },
      gotoRefundError () {
         this.$emit('switch-page', 'refund-error')
      },
      changePage (val) {
         this.page = val
         this.getListData()
         console.log(val)
      },
      doExcel () {
         let self = this
         self.isGetExcel = true
         this.$ajax.get('/client/api/out_excel', {
            params: {
               id: this.itemData.id
            }
         }).then(res => {
            let data = res.data
            self.isGetExcel = false
            if (data.status === 1) {
               window.location = data.url
            } else {
               self.$Message.warning(data.msg)
            }
         })
      },
      doNotify () {
         let self = this
         self.$tModal.confirm({
            title: '是否确认使用一次性通知？',
            content: '一次性通知仅可使用一次，由于微信消息通知限制，只可在用户已购票后的7日内发送消息。<br>超过7日的用户则无法收取该消息，请谨慎使用！<br>可用于活动场地变更、活动改期、活动取消等紧急情况时，作为通知已购票用户功能。',
            onOk () {
               self.$tModal.confirm({
                  type: 'textarea',
                  onOk (txt) {
                     self.$ajax.get('/client/api/batch_wxsms', {
                        params: {
                           id: self.itemData.id,
                           content: txt
                        }
                     }).then(res => {
                        let data = res.data
                        if (data.status === 1) {
                           self.$Message.success(data.msg)
                           self.isInfor = true
                        } else {
                           self.$Message.warning(data.msg)
                        }
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

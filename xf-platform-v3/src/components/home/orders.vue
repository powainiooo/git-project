<style scoped>
.orders .btns { margin: 20px 40px 20px 56px; }
.c-tables-orders th:nth-last-child(2) { text-align: center; }
.c-tables-orders th:nth-last-child(3) { text-align: center; }
.c-tables-orders td:nth-last-child(2)>div { text-align: center; padding-right: 0; margin: 0 auto; }
.c-tables-orders td:nth-last-child(3)>div { text-align: center; padding-right: 0; }

.refund-hint { position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 10; background-color: rgba(11, 11, 13, 0.9); display: flex; align-items: center; }
.refund-hint>div { margin-left: 250px; }
.refund-hint>div h3 { color: #ffffff; margin-bottom: 20px; font-size: 18px; }
.refund-hint>div p { color: #ffffff; margin-bottom: 50px; font-size: 16px; line-height: 24px; }
.refund-hint>div button { width: 90px; margin-right: 20px; }
.btn-err { width: 35px; height: 20px; display: inline-block; background: linear-gradient(342deg, #E63828 0%, #E85412 100%); border-radius: 3px; font-size: 10px; color: #ffffff; line-height: 20px; text-align: center; }
</style>

<template>
<div class="orders">
  <div class="between btns">
    <div>
      <Button size="small" class="mr10" :loading="isExport" @click="doExport">导出表格</Button>
<!--      <Button size="small" class="mr10" @click="doNotify" v-if="showNotify">一次性通知</Button>-->
      <Button size="small" @click="showRefundHint = true" v-if="refundState === 0 || refundState === 2">退款申请</Button>
      <Button size="small" style="cursor: default;" v-else-if="refundState === 1">退款申请 审核中</Button>
      <Button size="small" v-else-if="refundState === 4" @click="doRefundBatch">批量退款</Button>
      <Button size="small" type="error" v-else-if="refundState === 3" @click="toRefundDetail">退款申请 审核不通过</Button>
    </div>
    <div class="flex">
      <c-select class="mr10" :list="record.price" @change="ticketChange"/>
      <div class="c-search">
        <input placeholder="输入电话、姓名、单号" v-model="keyword" />
        <Button size="small" @click="getData">查询</Button>
      </div>
    </div>
  </div>

  <div class="c-tables c-tables-orders">
    <table>
      <col width="104" />
      <col width="130" />
      <col width="70" />
      <col width="130" />
      <col width="190" v-if="record.ticket_type === 2" />
      <col width="170" v-if="record.id_card_flag === 1" />
      <col width="170" />
      <col width="60" />
      <col width="60" />
      <col width="100" />
      <col width="80" />
      <thead>
      <tr>
        <th>票种</th>
        <th>下单时间</th>
        <th>买家</th>
        <th>电话</th>
        <th v-if="record.ticket_type === 2">邮寄地址</th>
        <th v-if="record.id_card_flag === 1">身份证</th>
        <th>单号</th>
        <th>单价</th>
        <th>票数</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <td><div>{{item.price_name}}</div></td>
        <td class="helveB"><div>{{item.createtime}}</div></td>
        <td><div>{{item.name}}</div></td>
        <td class="helveB"><div>{{item.mobile}}</div></td>
        <td v-if="record.ticket_type === 2"><div>{{item.address}}</div></td>
        <td class="helveB" v-if="record.id_card_flag === 1"><div>{{item.id_card_no}}</div></td>
        <td class="helveB"><div>{{item.order_no}}</div></td>
        <td class="helveB"><div>{{item.price}}</div></td>
        <td><div class="style1">{{item.num}}</div></td>
        <td>
          <div class="status" v-if="item.state === 3 || item.state === 4">{{stateList[item.state]}}</div>
          <div class="status" v-else>{{item.ticket_code_state === 2 ? '已验票' : '未验票'}}</div>
        </td>
        <td>
          <div>
            <a href="javascript:;"
               class="btn-err"
               v-if="item.refund_state === 2 && item.price != 0 && item.ticket_code_state === 1"
               @click="doRefund(item.order_no)">退款</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml20 mt15">
    <Page :total="total" class-name="xf-page" />
  </div>

  <div class="refund-hint" v-if="showRefundHint">
    <div>
      <h3>是否确认申请退款？</h3>
      <p>为保障购票者的权益，小夫有票 将开启对活动方的信用记录，<br/>
        若因活动方原因导致多次活动退款，将影响到活动方的信用记录。<br/>
        请认真填写退款信息，此举措将影响到您的信用记录。</p>
      <div>
        <Button size="small" @click="gotoRefund">确认申请</Button>
        <Button type="normal" size="small" @click="showRefundHint = false">取消申请</Button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import Vue from 'vue'
import cSelect from '../cSelect'
import { postAction } from '../../utils'
import { ACCESS_TOKEN } from '@/config'
export default {
  name: 'app',
  props: {
    record: Object
  },
  components: {
    cSelect
  },
  data () {
    return {
      showRefundHint: false,
      stateList: ['未付款', '已支付', '退款申请中', '已退款', '已退款'],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      list: [],
      type: '',
      keyword: '',
      isExport: false,
      showNotify: false,
      refundState: 0
    }
  },
  mounted () {
    console.log('orders')
    this.getData()
  },
  methods: {
    getData () {
      postAction('/editor/order/lists', {
        ticket_id: this.record.id,
        keyword: this.keyword,
        price_name: this.type,
        page: this.pageNo,
        limit: this.pageSize
      }).then(res => {
        if (res.code === 1) {
          this.list = res.data.list
          this.total = res.data.total
          this.showNotify = res.data.one_time_notify_flag === 0
          this.refundState = res.data.refund_flag
        }
      })
    },
    ticketChange (e) {
      this.type = e.id
    },
    doExport () {
      // if (this.isExport) return
      // this.isExport = true
      // downFile('/editor/order/export', {
      //   id: this.record.id
      // }).then(res => {
      //   this.isExport = false
      //   const blob = new Blob([res.data], {
      //     type: 'application/vnd.ms-excel'
      //   })
      //   const url = window.URL.createObjectURL(blob)
      //   const a = document.createElement('a')
      //   a.href = url
      //   a.download = '导出表格.xls'
      //   a.click()
      //   window.URL.revokeObjectURL(url)
      // })
      window.open(`${window.baseUrl}/editor/order/export?id=${this.record.id}&token=${Vue.ls.get(ACCESS_TOKEN)}`)
    },
    doNotify () {
      console.log('doNotify', this.$tModal)
      this.$tModal.confirm({
        title: '是否确认使用一次性通知？',
        content: '一次性通知仅可使用一次，由于微信消息通知限制，只可在用户已购票后的7日内发送消息。<br>超过7日的用户则无法收取该消息，请谨慎使用！<br>可用于活动场地变更、活动改期、活动取消等紧急情况时，作为通知已购票用户功能。',
        onOk: () => {
          this.$tModal.confirm({
            type: 'textarea',
            onOk: txt => {
              postAction('/editor/notice/subscribe_message_send', {
                ticket_id: this.record.id,
                content: txt
              }).then(res => {
                if (res.code === 1) {
                  this.$Message.success(res.msg)
                  this.showNotify = false
                } else {
                  this.$Message.warning(res.msg)
                }
              })
            }
          })
        }
      })
    },
    gotoRefund () {
      this.showRefundHint = false
      this.$store.commit('SET_REFUNDERRORDATA', {})
      this.$emit('toggle', 'refunds')
    },
    toRefundDetail () {
      postAction('/editor/order/refund_audit_result', {
        ticket_id: this.record.id
      }).then(res => {
        if (res.code === 1) {
          this.$store.commit('SET_REFUNDERRORDATA', res.data)
          this.$emit('toggle', 'refunds')
        }
      })
    },
    doRefund (orderNo) {
      this.$tModal.confirm({
        title: '是否确认退款?',
        content: '确认退款之后款项将原路返回到该用户账上，请谨慎操作。',
        onOk: () => {
          postAction('/editor/order/refund', {
            order_no: orderNo
          }).then(res => {
            if (res.code === 1) {
              this.$Message.success('退款成功')
              this.getData()
            }
          })
        }
      })
    },
    doRefundBatch () {
      this.$tModal.confirm({
        title: '是否确认批量退款?',
        content: '确认退款之后款项将原路返回到该用户账上，请谨慎操作。',
        onOk: () => {
          postAction('/editor/order/batch_refund', {
            ticket_id: this.record.id
          }, false).then(res => {
            if (res.code === 0) {
              this.$Message.success(res.msg)
              this.getData()
            }
          })
        }
      })
    }
  }
}
</script>

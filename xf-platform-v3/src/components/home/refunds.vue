<style scoped>
.refunds { margin: 140px 20px 50px 20px; }
.c-tables-refunds { margin: 0 }
</style>

<template>
<div class="refunds">
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(1)" />
      <span>退款类型</span>
    </div>
    <div class="warnTxt" v-if="refundErrorData.audit_type && refundErrorData.audit_type !== ''"><span>{{refundErrorData.audit_type}}</span></div>
  </div>
  <div class="mt35 ml35 ">
    <RadioGroup class="xf-radios" v-model="formData.type">
      <Radio :label="1">个别退款</Radio>
      <Radio :label="2">全部退款</Radio>
    </RadioGroup>
  </div>
  <template v-if="formData.type === 1">
    <div class="flex btns mt30 mb20">
      <div class="flex">
        <c-select class="mr10" :list="record.price" @change="ticketChange"/>
        <div class="c-search">
          <input placeholder="输入电话、姓名、单号" v-model="keyword" />
          <Button size="small" @click="getData">查询</Button>
        </div>
      </div>
    </div>
    <div class="c-tables c-tables-refunds">
      <table>
        <thead>
        <tr>
          <th v-for="(item, index) in columns"
              :key="index"
              :style="{
                width: item.width + 'px' || 'auto'
              }">{{item.name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>
            <div><input type="checkbox" class="xf-checkbox" :value="item.id" v-model="ids" /></div>
          </td>
          <td><div>{{item.price_name}}</div></td>
          <td class="helveB"><div>{{item.createtime}}</div></td>
          <td><div>{{item.name}}</div></td>
          <td class="helveB"><div>{{item.mobile}}</div></td>
          <td><div>{{item.address}}</div></td>
          <td class="helveB"><div>{{item.id_card_no}}</div></td>
          <td class="helveB"><div>{{item.order_no}}</div></td>
          <td class="helveB"><div>{{item.price}}</div></td>
          <td><div class="style1">{{item.num}}</div></td>
          <td>
            <div class="status">{{stateList[item.state]}}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ml20 mt15">
      <Page :total="total" class-name="xf-page" @on-change="pageChange" />
    </div>
  </template>
  <div class="c-infos-titles mt110">
    <div class="l">
      <img :src="getIndexSrc(2)" />
      <span>退款原因</span>
    </div>
    <div class="warnTxt" v-if="refundErrorData.audit_reason && refundErrorData.audit_reason !== ''"><span>{{refundErrorData.audit_reason}}</span></div>
  </div>
  <div class="mt35 ml35 mb90">
    <RadioGroup class="xf-radios" v-model="formData.reason_type">
      <Radio :label="1">活动改期</Radio>
      <Radio :label="2">艺人原因</Radio>
      <Radio :label="3">场地原因</Radio>
      <Radio :label="4">活动限流</Radio>
      <div class="flex mt30">
        <Radio :label="0">其他原因</Radio>
        <Input type="textarea" placeholder="填写原因" :rows="4" style="width: 320px;" v-model="formData.reason" />
      </div>
    </RadioGroup>
  </div>
  <template v-if="formData.type === 2">
    <div class="c-infos-titles">
      <div class="l">
        <img :src="getIndexSrc(3)" />
        <span>通知凭证</span>
      </div>
      <div class="warnTxt" v-if="refundErrorData.audit_voucher && refundErrorData.audit_voucher !== ''"><span>{{refundErrorData.audit_voucher}}</span></div>
    </div>
    <div class="mt35 ml35 mb140">
      <upload-img width="170" v-model="formData.voucher">
        <span slot="hint">因活动方原因导致退款行为，活动方已通知到位方可提交退款申请，<br/>需提供通知凭证（如推文告知用户），若未通知到位退款申请将驳回。</span>
      </upload-img>
    </div>
  </template>
  <div class="mt35 ml35">
    <Button size="small" style="width: 90px;" :disabled="btnDisabled" @click="handleSubmit">提交申请</Button>
  </div>

  <alert ref="alert" @onOk="onOk" />
</div>
</template>

<script type='es6'>
import cSelect from '../cSelect'
import uploadImg from '../uploadImg'
import alert from '../login/alert'
import { postAction } from '../../utils'
export default {
  name: 'app',
  components: {
    uploadImg,
    cSelect,
    alert
  },
  props: {
    record: Object
  },
  data () {
    return {
      stateList: ['未付款', '已支付', '退款申请中', '全额退款', '部分退款'],
      columns: [ // 1260
        { name: '', width: 80 },
        { name: '票种', width: 100 },
        { name: '下单时间', width: 130 },
        { name: '买家', width: 70 },
        { name: '电话', width: 130 },
        { name: '邮寄地址', width: 190 },
        { name: '身份证', width: 170 },
        { name: '单号', width: 170 },
        { name: '总价', width: 60 },
        { name: '票数', width: 60 },
        { name: '状态', width: 100 }
      ],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      list: [],
      type: '',
      keyword: '',
      formData: {
        type: 1,
        reason_type: 1,
        reason: '',
        voucher: ''
      },
      ids: [],
      errorData: {}
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    btnDisabled () {
      if (this.formData.type === 1) {
        return this.ids.length === 0
      } else {
        return this.formData.voucher === ''
      }
    },
    refundErrorData () {
      return this.$store.state.refundErrorData
    }
  },
  watch: {
    refundErrorData: {
      handler (val) {
        console.log('refundErrorData', val)
        if (val.id) {
          this.formData.type = val.type
          this.formData.reason_type = val.reason_type
          this.formData.reason = val.reason
          this.formData.voucher = val.voucher || ''
          this.ids = val.order_ids.split(',')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    },
    pageChange (e) {
      this.pageNo = e
      this.getData()
    },
    getData () {
      postAction('/editor/order/lists', {
        ticket_id: this.record.id,
        keyword: this.keyword,
        price_id: this.type,
        page: this.pageNo,
        limit: this.pageSize,
        state: 1
      }).then(res => {
        if (res.code === 1) {
          this.list = res.data.list
          this.total = res.data.total || 2
        }
      })
    },
    handleSubmit () {
      this.$tModal.confirm({
        title: '是否提交退款申请？',
        content: '请仔细核查申请退款内容，<br/>若因活动方原因导致退款行为，且未通知到位退款申请将被驳回。',
        onOk: () => {
          const params = {
            ticket_id: this.record.id,
            type: this.formData.type,
            reason_type: this.formData.reason_type,
            reason: this.formData.reason
          }
          if (this.formData.type === 1) {
            params.order_ids = JSON.stringify(this.ids)
          } else {
            params.voucher = this.formData.voucher
          }
          postAction('/editor/order/refund_apply', params).then(res => {
            if (res.code === 1) {
              this.$refs.alert.show('suc', '后台将在3个工作日内完成退款申请审核，<br>退款申请是否通过审核，请自行登录查询结果。')
            } else {
              this.$refs.alert.show('fail', res.msg)
            }
          })
        }
      })
    },
    onOk () {
      this.$emit('toggle', 'orders')
    },
    ticketChange (e) {
      this.type = e.id
      this.getData()
    }
  }
}
</script>

<style scoped>
.refunds { margin: 140px 20px 50px 20px; }
</style>

<template>
<div class="refunds">
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(1)" />
      <span>退款类型</span>
    </div>
    <div class="warnTxt">通知凭证不合规</div>
  </div>
  <div class="mt35 ml35 mb110">
    <RadioGroup class="xf-radios" v-model="formData.type">
      <Radio label="1">个别退款</Radio>
      <Radio label="2">全部退款</Radio>
    </RadioGroup>
  </div>
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(2)" />
      <span>退款原因</span>
    </div>
  </div>
  <div class="mt35 ml35 mb90">
    <RadioGroup class="xf-radios" v-model="formData.reason_type">
      <Radio label="1">活动改期</Radio>
      <Radio label="2">艺人原因</Radio>
      <Radio label="3">场地原因</Radio>
      <Radio label="4">活动限流</Radio>
      <div class="flex mt30">
        <Radio label="0">其他原因</Radio>
        <Input type="textarea" placeholder="填写原因" :rows="4" style="width: 320px;" v-model="formData.reason" />
      </div>
    </RadioGroup>
  </div>
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(3)" />
      <span>通知凭证</span>
    </div>
  </div>
  <div class="mt35 ml35 mb140">
    <upload-img width="170" v-model="formData.voucher">
      <span slot="hint">因活动方原因导致退款行为，活动方已通知到位方可提交退款申请，<br/>需提供通知凭证（如推文告知用户），若未通知到位退款申请将驳回。</span>
    </upload-img>
  </div>
  <div class="mt35 ml35">
    <Button size="small" style="width: 90px;" :disabled="formData.voucher === ''" @click="handleSubmit">提交申请</Button>
  </div>
</div>
</template>

<script type='es6'>
import uploadImg from '../uploadImg'
import {postAction} from '../../utils'
export default {
  name: 'app',
  components: {
    uploadImg
  },
  data () {
    return {
      formData: {
        type: '1',
        reason_type: '1',
        reason: '',
        voucher: ''
      }
    }
  },
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    },
    handleSubmit () {
      this.$tModal.confirm({
        title: '是否提交退款申请？',
        content: '请仔细核查申请退款内容，<br/>若因活动方原因导致退款行为，且未通知到位退款申请将被驳回。',
        onOk: () => {
          postAction('/editor/order/refund_apply')
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
    }
  }
}
</script>

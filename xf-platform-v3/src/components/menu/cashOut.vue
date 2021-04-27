<style scoped>

</style>

<template>
<div>
  <Form ref="form" :model="formData" class="form" style="margin-top: 130px">
    <tag-line title="活动名称" :width="300" class="mb10">{{record.name}}</tag-line>
    <tag-line title="提款额" class="mb50">{{record.avaliable_withdraw_amt}}元</tag-line>
    <FormItem>
      <RadioGroup class="xf-radios" v-model="formData.invoice">
        <Radio label="0">不需要发票</Radio>
        <Radio label="1">需要发票</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Input v-model="vericode.mobile" readonly />
    </FormItem>
    <FormItem>
      <Input v-model="vericode.code" placeholder="验证码">
        <Button slot="append" :disabled="veriBtnDisabled" @click="getCode">{{vericode.btnName}}</Button>
      </Input>
    </FormItem>
    <FormItem>
      <Input type="password" v-model="formData.password" placeholder="密码" />
    </FormItem>
    <FormItem class="mt90" v-if="formData.invoice === '0'">
      <Button size="small" :loading="isAjax" :disabled="nextDisabled" @click="handleSubmit">提交申请</Button>
    </FormItem>
  </Form>
  <hr v-if="formData.invoice === '1'"/>
  <Form ref="form" :model="formData" class="form" style="margin-top: 45px" v-if="formData.invoice === '1'">
    <div class="form-title">新银行卡信息</div>
    <tag-line title="发票名称" :width="300" class="mb10">票务代售服务费</tag-line>
    <FormItem>
      <Input v-model="formData.company" placeholder="公司全称" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.tax_number" placeholder="纳税人识别号" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.address" placeholder="公司地址" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.telphone" placeholder="电话" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.account_bank" placeholder="开户行" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.card_no" placeholder="银行账号" />
    </FormItem>
    <FormItem class="mt90">
      <Button size="small" :loading="isAjax" :disabled="nextDisabled" @click="handleSubmit">提交申请</Button>
    </FormItem>
  </Form>
</div>
</template>

<script type='es6'>
import vericode from '@/mixin/vericode'
import tagLine from '../tagLine'
import { postAction } from '../../utils'
export default {
  name: 'app',
  mixins: [vericode],
  components: {
    tagLine
  },
  props: {
    record: Object
  },
  computed: {
    nextDisabled () {
      if (this.vericode.code === '' || this.formData.password === '') {
        return true
      }
      if (this.formData.invoice === '1') {
        for (const key in this.formData) {
          if (this.formData[key] === '') {
            return true
          }
        }
      }
      return false
    },
    globalData () {
      return this.$store.state.globalData.merchant
    }
  },
  mounted () {
    this.vericode.mobile = this.globalData.mobile
  },
  data () {
    return {
      vericodeEvent: 'withdraw',
      formData: {
        invoice: '0',
        password: '',
        company: '',
        tax_number: '',
        address: '',
        telphone: '',
        account_bank: '',
        card_no: ''
      },
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      this.$tModal.confirm({
        title: '是否确认提交申请？',
        content: '请仔细核查活动信息，确认提交申请之后操作不可返回。<br>若是您填写的发票信息有误，小夫有票将不再重复开票。',
        onOk: () => {
          if (this.isAjax) return false
          this.isAjax = true
          let params = {
            ticket_id: this.record.id,
            mobile: this.vericode.mobile,
            code: this.vericode.code,
            password: this.formData.password,
            invoice_flag: this.formData.invoice
          }
          if (this.formData.invoice === '1') {
            params = Object.assign(params, this.formData)
          }
          postAction('/editor/finance/withdraw_apply', params).then(res => {
            this.isAjax = false
            if (res.code === 1) {
              this.$tModal.warning({
                title: '提交成功！',
                content: '后台将在5个工作日内完成提现审核，结款将<br>若是您填写的发票信息有误，小夫有票将不再重复开票。',
                onOk: () => {
                  this.$store.commit('SET_MENU', false)
                  this.$emit('toggle', 'infos')
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

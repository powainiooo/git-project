<style scoped>

</style>

<template>
<div>
  <Form ref="form" :model="formData" class="form" style="margin-top: 130px">
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
  </Form>
  <hr/>
  <Form ref="form" :model="formData" class="form" style="margin-top: 45px">
    <div class="form-title">新银行卡信息</div>
    <FormItem>
      <Input v-model="formData.account_name" placeholder="个人开户名" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.account_id_card_no" placeholder="身份证号" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.account_mobile" placeholder="预留手机号" />
    </FormItem>
    <FormItem>
      <Input v-model="formData.account_card_no" placeholder="个人银行卡号" />
    </FormItem>
    <FormItem>
      <Select v-model="formData.account_bank_id" placeholder="选择银行">
        <Option v-for="item in bankList" :key="item.value" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Input v-model="formData.account_opening_banke" placeholder="开户支行" />
    </FormItem>
    <FormItem style="margin-top: 40px">
      <Button size="small" :loading="isAjax" :disabled="nextDisabled" @click="handleSubmit">确定修改</Button>
    </FormItem>
  </Form>
</div>
</template>

<script type='es6'>
import vericode from '@/mixin/vericode'
import { postAction } from '../../utils'
export default {
  name: 'app',
  mixins: [vericode],
  computed: {
    bankList () {
      return this.$store.state.bankList
    },
    nextDisabled () {
      if (this.vericode.code === '') return true
      for (const key in this.formData) {
        if (this.formData[key] === '') {
          return true
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
      vericodeEvent: 'cardedit',
      formData: {
        password: '',
        account_name: '',
        account_id_card_no: '',
        account_mobile: '',
        account_card_no: '',
        account_bank_id: '',
        account_opening_banke: ''
      },
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      this.$tModal.confirm({
        title: '是否确认修改银行卡信息？',
        content: '请仔细核查银行卡信息，确认修改绑定后所有活动结款都将打款到新修改的银行卡。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。',
        onOk: () => {
          if (this.isAjax) return false
          this.isAjax = true
          postAction('aa', this.formData).then(res => {
            if (res.code === 1) {
              this.$tModal.warning({
                title: '修改成功！',
                content: '银行卡信息修改成功，绑定的银行卡已更新。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。',
                onOk: () => {
                  this.$store.commit('SET_MENU', false)
                  this.$store.dispatch('getUserData')
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

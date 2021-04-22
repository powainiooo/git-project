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
  <Form ref="form" :model="formData2" class="form" style="margin-top: 45px">
    <div class="form-title">新银行卡信息</div>
    <FormItem>
      <Input v-model="formData2.account_name" placeholder="个人开户名" />
    </FormItem>
    <FormItem>
      <Input v-model="formData2.account_id_card_no" placeholder="身份证号" />
    </FormItem>
    <FormItem>
      <Input v-model="formData2.account_mobile" placeholder="预留手机号" />
    </FormItem>
    <FormItem>
      <Input v-model="formData2.account_card_no" placeholder="个人银行卡号" />
    </FormItem>
    <FormItem>
      <Select v-model="formData2.account_bank_id" placeholder="选择银行">
        <Option v-for="item in bankList" :key="item.value" :value="item.value">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Input v-model="formData2.account_opening_banke" placeholder="开户支行" />
    </FormItem>
    <FormItem style="margin-top: 40px">
      <Button size="small" style="width: 90px" :disabled="nextDisabled" @click="handleSubmit">确定修改</Button>
    </FormItem>
  </Form>
</div>
</template>

<script type='es6'>
import vericode from '@/mixin/vericode'
export default {
  name: 'app',
  mixins: [vericode],
  computed: {
    bankList () {
      return this.$store.state.bankList
    },
    nextDisabled () {
      return true
    }
  },
  data () {
    return {
      formData: {},
      formData2: {
        account_name: '',
        account_id_card_no: '',
        account_mobile: '',
        account_card_no: '',
        account_bank_id: '',
        account_opening_banke: ''
      }
    }
  },
  methods: {
    handleSubmit () {}
  }
}
</script>

<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">忘记密码</div>
      <FormItem>
        <Input v-model="vericode.mobile" placeholder="联系电话" />
      </FormItem>
      <FormItem>
        <Input v-model="vericode.code" placeholder="验证码">
          <Button slot="append" :disabled="veriBtnDisabled" @click="getCode">{{vericode.btnName}}</Button>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.newpassword" placeholder="新密码" />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.newpassword2" placeholder="确认新密码" />
      </FormItem>
      <FormItem style="margin-top: 40px">
        <Button size="small" style="width: 90px" @click="handleSubmit" :loading="isAjax">确认修改</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script type='es6'>
import vericode from '@/mixin/vericode'
import { postAction } from '../../utils'
export default {
  name: 'app',
  mixins: [vericode],
  data () {
    return {
      vericodeEvent: 'resetpwd',
      formData: {
        newpassword: '',
        newpassword2: ''
      },
      isAjax: false
    }
  },
  inject: ['changePage'],
  methods: {
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/editor/user/resetpwd', {
        mobile: this.vericode.mobile,
        code: this.vericode.code,
        newpassword: this.formData.newpassword,
        newpassword2: this.formData.newpassword2
      }).then(res => {
        this.isAjax = false
        if (res.code === 1) {
          this.$Message.success('修改成功')
          this.changePage('login')
        } else {
          this.$Message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">忘记密码</div>
      <FormItem>
        <Input v-model="formData.usename" placeholder="联系电话" />
      </FormItem>
      <FormItem>
        <verification-code />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.usename" placeholder="新密码" />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.usename" placeholder="确认新密码" />
      </FormItem>
      <FormItem style="margin-top: 40px">
        <Button size="small" style="width: 90px" @click="handleNext">确认修改</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script type='es6'>
import verificationCode from '@/components/verificationCode'
export default {
  name: 'app',
  components: {
    verificationCode
  },
  data () {
    return {
      formData: {
        usename: '',
        password: ''
      }
    }
  },
  inject: ['changePage'],
  methods: {
    handleNext () {
      this.changePage('infos')
    }
  }
}
</script>

<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">登陆</div>
      <FormItem>
        <Input v-model="formData.usename" placeholder="邮箱 / 联系电话" />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem style="margin-top: -6px">
        <a href="javascript:;" class="txt" @click="changePage('forget')">忘记密码？</a>
      </FormItem>
      <div class="form-item" style="margin-top: 40px">
        <Button size="small" disabled style="width: 90px;">登录</Button>
      </div>
    </Form>
  </div>
</div>
</template>

<script type='es6'>

export default {
  name: 'app',
  inject: ['changePage'],
  data () {
    return {
      formData: {
        usename: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

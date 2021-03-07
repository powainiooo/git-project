<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">注册</div>
      <FormItem>
        <Input v-model="formData.usename" placeholder="邮箱" />
      </FormItem>
      <FormItem>
        <Input v-model="formData.usename" placeholder="联系电话" />
      </FormItem>
      <FormItem>
        <Input v-model="formData.usename" placeholder="验证码">
          <Button slot="append">获取验证码</Button>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.usename" placeholder="密码" />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.usename" placeholder="重复密码" />
      </FormItem>
      <FormItem style="margin-top: 40px">
        <Button style="width: 90px" @click="handleNext">下一步</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
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

<style lang="stylus">
@import "../assets/css/mixin.styl"
.login-box
  size(100%, 100%); position relative; overflow hidden;
.hint-box
  background-color #E8D1B9; size(100%, 100%); abTL(42px, 0)
</style>

<template>
<float-box :width="400">
  <div class="login-box">
    <!-- 登录表单 -->
    <Form class="c-form mt120">
      <h3 class="f18 mb30 ml10">登陆</h3>
      <FormItem>
        <Input placeholder="账号" />
      </FormItem>
      <FormItem>
        <Input type="password" placeholder="密码" />
      </FormItem>
      <FormItem class="mt80">
        <Button>确认</Button>
      </FormItem>
    </Form>
    <!-- 提示 -->
    <div class="hint-box box"></div>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
export default {
  name: 'app',
  components: {
    floatBox
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

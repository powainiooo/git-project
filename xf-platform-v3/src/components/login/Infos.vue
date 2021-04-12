<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">注册</div>
      <FormItem>
        <RadioGroup v-model="key1" type="button" button-style="solid" class="tab-bar">
          <Radio label="1">企业</Radio>
          <Radio label="2">个人</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="key2" type="button" button-style="solid" class="tab-bar" v-if="key1 === '1'">
          <Radio label="1">场地方</Radio>
          <Radio label="2">活动方</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <div class="txt">我们将会校验您的真实性，所以请如实选择身份性质，如发现真实性存疑，我们有权锁定您的账户并采取对应措施。</div>
      </FormItem>
      <FormItem style="margin-top: 40px">
        <Button style="width: 90px" @click="handleNext" v-if="showBtn">下一步</Button>
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
      key1: '1',
      key2: '1',
      showBtn: true
    }
  },
  inject: ['changePage'],
  methods: {
    handleNext () {
      let type = ''
      if (this.key1 === '1') { // 企业
        if (this.key2 === '1') { // 场地方
          type = '3'
        } else if (this.key2 === '2') { // 活动方
          type = '2'
        }
      } else if (this.key1 === '2') { // 个人
        type = '1'
      }
      this.$store.commit('SET_REGISTER', {
        key: 'type',
        data: type
      })
      this.showBtn = false
      this.changePage('form')
    }
  }
}
</script>

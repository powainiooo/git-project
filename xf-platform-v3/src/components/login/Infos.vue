<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title">注册</div>
      <FormItem>
        <ul class="tab-bar">
          <li v-for="i in tabList1"
              :key="i.value"
              class="tab-bar-item"
              :class="{'tab-bar-active': i.value === tabKey1}"
              @click="tabKey1 = i.value">{{i.name}}</li>
        </ul>
      </FormItem>
      <FormItem>
        <ul class="tab-bar">
          <li v-for="i in tabList2"
              :key="i.value"
              class="tab-bar-item"
              :class="{'tab-bar-active': i.value === tabKey2}"
              @click="tabKey2 = i.value">{{i.name}}</li>
        </ul>
      </FormItem>
      <FormItem>
        <div class="txt">我们将会校验您的真实性，所以请如实选择身份性质，如发现真实性存疑，我们有权锁定您的账户并采取对应措施。</div>
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
      },
      tabList1: [
        { name: '企业', value: 1 },
        { name: '个人', value: 2 }
      ],
      tabKey1: 1,
      tabList2: [
        { name: '场地方', value: 1 },
        { name: '活动方', value: 2 }
      ],
      tabKey2: 1
    }
  },
  inject: ['changePage'],
  methods: {
    handleNext () {
      this.changePage('form')
    }
  }
}
</script>

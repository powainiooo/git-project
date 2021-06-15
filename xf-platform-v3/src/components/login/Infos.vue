<style lang="stylus" type="text/stylus">

</style>

<template>
<div style="margin-top: -70px;">
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form">
      <div class="form-title" v-if="isUpdate">完善账号信息</div>
      <div class="form-title" v-else>注册</div>
      <FormItem>
        <Button style="width: 125px" v-if="isUpdate && key1 === '1'">企业</Button>
        <Button style="width: 125px" v-if="isUpdate && key1 === '2'">个人</Button>
        <RadioGroup v-model="key1" type="button" button-style="solid" class="tab-bar" @on-change="handleNext" v-if="!isUpdate">
          <Radio label="1">企业</Radio>
          <Radio label="2">个人</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="key2" type="button" button-style="solid" class="tab-bar" v-if="key1 === '1'" @on-change="handleNext">
          <Radio label="1">场地方</Radio>
          <Radio label="2">活动方</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <div class="txt" v-if="isUpdate" style="margin-left: 0;">由于小夫有票系统升级，旧账号登录需补全相关信息，企业账号需划分为场地方或活动方,个人账号则无变动。<br/>
          场地方:  如酒吧，有实体场地的，则为场地方<br/>
          活动方:  无实体场地的音乐主办方，则为活动方</div>
        <div class="txt" v-else>我们将会校验您的真实性，所以请如实选择身份性质，如发现真实性存疑，我们有权锁定您的账户并采取对应措施。</div>
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
      showBtn: true,
      isUpdate: false
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
    },
    setDefaults (type) {
      if (type === 1) {
        this.key1 = '2'
      } else if (type === 2) {
        this.key1 = '1'
        this.key2 = '2'
      } else if (type === 3) {
        this.key1 = '1'
        this.key2 = '1'
      }
      this.showBtn = false
      this.isUpdate = true
      this.$store.commit('SET_REGISTER', {
        key: 'type',
        data: type.toString()
      })
    }
  }
}
</script>

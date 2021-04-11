<style lang="stylus" type="text/stylus">

</style>

<template>
<Input :value="value" @input="ipChange" placeholder="验证码">
  <Button slot="append" :disabled="btnDisabled" @click="getCode">{{btnName}}</Button>
</Input>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    value: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    event: String
  },
  computed: {
    btnName () {
      if (this.btnDisabled) {
        return `请${this.count}秒以后再尝试`
      } else {
        return '获取验证码'
      }
    }
  },
  data () {
    return {
      btnDisabled: false,
      times: 60,
      count: 0
    }
  },
  methods: {
    ipChange (e) {
      this.$emit('input', e)
    },
    getCode () {
      getAction('/editor/sms/send', {
        mobile: this.mobile,
        event: this.event
      }).then(res => {
        if (res.code === 1) {
          this.startCount()
        }
      })
    },
    startCount () {
      this.count = this.times
      this.btnDisabled = true
      const t = setInterval(() => {
        if (this.count === 0) {
          clearInterval(t)
          this.btnDisabled = false
        } else {
          this.count -= 1
        }
      })
    }
  }
}
</script>

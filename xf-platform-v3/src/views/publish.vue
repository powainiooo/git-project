<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.step-frame
  size(100%, 100vh)
  abTL(0, 0)
.stepIn
  animation stepIn 1s cubic-bezier(.23,.56,.24,.92) .5s both
@keyframes stepIn
  0%
    transform translateX(100px)
    opacity 0
  100%
    transform translateX(0)
    opacity 1
.stepOut
  animation stepOut 1s cubic-bezier(.23,.56,.24,.92) both
@keyframes stepOut
  0%
    transform translateX(0)
    opacity 1
  100%
    transform translateX(-100px)
    opacity 0
</style>

<template>
<div class="publish-container">
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step1 ref="step1" :step="step" @change="pageFunc" v-show="step === 1"/>
  </transition>
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step2 ref="step2" :step="step" @change="pageFunc" v-show="step === 2"/>
  </transition>
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step3 ref="step3" :step="step" @change="pageFunc" v-show="step === 3"/>
  </transition>
  <alert ref="alert" @onRetry="handleSubmit" @onOk="onOk" />
</div>
</template>

<script type='es6'>
import step1 from '@/components/publish/step1'
import step2 from '@/components/publish/step2'
import step3 from '@/components/publish/step3'
import alert from '../components/login/alert'
import { postAction } from '../utils'
export default {
  name: 'app',
  components: {
    step1,
    step2,
    step3,
    alert
  },
  data () {
    return {
      step: 1,
      isAjax: false
    }
  },
  beforeRouteEnter (to, from, next) {
    document.body.style.overflow = 'hidden'
    next()
  },
  beforeRouteLeave (to, from, next) {
    document.body.style.overflow = 'auto'
    next()
  },
  methods: {
    pageFunc (type) {
      switch (type) {
        case 'back':
          this.step -= 1
          break
        case 'next':
          this.step += 1
          break
        case 'submit':
          // this.step -= 1
          this.handleSubmit()
          break
      }
    },
    handleSubmit () {
      if (this.isAjax) return
      const params1 = this.$refs.step1.getParams()
      const params2 = this.$refs.step2.getParams()
      const params3 = this.$refs.step3.getParams()
      const params = Object.assign({}, params1, params2, params3)
      console.log('params', params)
      this.isAjax = true
      postAction('/editor/ticket/add', params).then(res => {
        if (res.code === 1) {
          this.$refs.alert.show('suc')
        } else {
          this.$refs.alert.show('fail', res.msg)
        }
        this.isAjax = false
      })
    },
    onOk () {
      this.$router.push('/index')
    }
  }
}
</script>

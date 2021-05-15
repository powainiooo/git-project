<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.step-frame
  size(100%, 100vh)
  abTL(0, 0)
.stepIn
  animation stepIn 1s cubic-bezier(.23,.56,.24,.92) .5s both
.form
  .warnTxt
   top 4px
   left 104%
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
.logo-top
  abTL(20px, 30px)
</style>

<template>
<div class="publish-container">
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step1 ref="step1" :step="step" :type="type" @change="pageFunc" v-show="step === 1"/>
  </transition>
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step2 ref="step2" :step="step" :type="type" @change="pageFunc" v-show="step === 2"/>
  </transition>
  <transition enter-active-class="stepIn" leave-active-class="stepOut">
    <step3 ref="step3" :step="step" :type="type" @change="pageFunc" v-show="step === 3"/>
  </transition>
  <alert ref="alert" @onRetry="handleSubmit" @onOk="onOk" />
  <div class="logo-top">
    <router-link to="/"><img src="@/assets/img/logo.png" width="161" /></router-link>
  </div>
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
      isAjax: false,
      id: '',
      type: 'new',
      detailRecord: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.id) {
      this.getErrorData()
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
      this.$tModal.confirm({
        title: '是否确认信息无误并提交？',
        content: '请仔细核查所填写的信息，确认提交之后信息无法修改。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。<br><span style="color:#002aac;">注：当多人抢票时，平台会存在爆库存导致多卖票的情况。如本场活动热门，建议减少首发票量，后续可手动增加票量。</span>',
        onOk: () => {
          const params1 = this.$refs.step1.getParams()
          const params2 = this.$refs.step2.getParams()
          const params3 = this.$refs.step3.getParams()
          const params = Object.assign({}, params1, params2, params3)
          let url = '/editor/ticket/add'
          if (this.id !== '' && this.type === 'modify') {
            url = '/editor/ticket/edit'
            params.id = this.id
          }
          console.log('params', params)
          // return false
          this.isAjax = true
          postAction(url, params).then(res => {
            if (res.code === 1) {
              this.$refs.alert.show('suc', '后台将在3个工作日内完成活动审核，<br>活动票务是否通过审核，请自行登录查询结果。')
            } else {
              this.$refs.alert.show('fail', res.msg)
            }
            this.isAjax = false
          })
        }
      })
    },
    onOk () {
      this.$router.push('/index')
    },
    getDetailData () {
      postAction('/editor/ticket/detail', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          this.detailRecord = res.data
          this.$refs.step1.setData(res.data)
          this.$refs.step2.setData(res.data)
          this.$refs.step3.setData(res.data)
        }
      })
    },
    getErrorData () {
      postAction('/editor/ticket/audit_result', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          this.$store.commit('SET_ERRORDATA', res.data)
          this.getDetailData()
        }
      })
    }
  }
}
</script>

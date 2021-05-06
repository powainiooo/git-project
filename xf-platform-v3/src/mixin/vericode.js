import { postAction } from '@/utils'

export default {
  data () {
    return {
      vericode: {
        mobile: '',
        code: '',
        btnName: '获取验证码',
        index: 0
      }
    }
  },
  computed: {
    phoneDisabled () {
      const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      return !reg.test(this.vericode.mobile)
    },
    veriBtnDisabled () {
      return (this.phoneDisabled || this.vericode.index !== 0)
    }
  },
  methods: {
    getCode () {
      postAction('/editor/sms/send', {
        mobile: this.vericode.mobile,
        event: this.vericodeEvent
      }).then(res => {
        if (res.code === 1) {
          this.veriCodeCount()
        }
      })
    },
    veriCodeCount () {
      this.vericode.index = 60
      this.vericode.btnName = `请${this.vericode.index}秒以后再尝试`
      const t = setInterval(() => {
        if (this.vericode.index === 0) {
          clearInterval(t)
          this.vericode.btnName = '获取验证码'
        } else {
          this.vericode.index--
          this.vericode.btnName = `请${this.vericode.index}秒以后再尝试`
        }
      }, 1000)
    }
  }
}

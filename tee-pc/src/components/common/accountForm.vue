<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.account-box
  min-height 100%
  position relative
  &:before
    content ''; size(1px, 100%); background-color #F2F2F2; abTL(0, 50%)
  .btn-code
    font-size 12px; min-width 78px; padding 0; text-align center;
</style>

<template>
<float-box :width="800">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" @click="handleSave">确认保存</Button>
  </div>
  <div class="account-box">
    <!-- 登录表单 -->
    <Form ref="form" :model="formData" :rules="ruleValidate">
      <Row>
        <Col span="12">
          <div class="c-form mt50">
            <h3 class="f18 mb30 ml10">基本信息</h3>
            <FormItem>
              <Input placeholder="门店名称" v-model="formData.xxx1" />
            </FormItem>
            <FormItem>
              <c-date-time type="timerange" placeholder="营业时间" v-model="formData.xxx2" />
            </FormItem>
            <FormItem>
              <Select placeholder="门店城市" v-model="formData.xxx3"></Select>
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" placeholder="门店名称" v-model="formData.xxx4" />
            </FormItem>
            <FormItem>
              <upload-img v-model="formData.xxx5">
                <span slot="title">门店logo</span>
                <span slot="hint">尺寸210px*80px</span>
              </upload-img>
            </FormItem>
            <h3 class="f18 mb30 ml10">积分使用设置</h3>
            <FormItem>
              <Input placeholder="单笔使用上限" v-model="formData.xxx6"><span slot="append">积分</span></Input>
              <p class="form-hint mb75">100积分 = 1元，单笔最高可用积分即最高优惠额度。</p>
            </FormItem>
          </div>
        </Col>
        <Col span="12">
          <div class="c-form mt50">
            <h3 class="f18 mb30 ml10">银行账户信息</h3>
            <FormItem>
              <Input placeholder="开户名" v-model="formData.xxx7" />
            </FormItem>
            <FormItem prop="xxx8">
              <Input placeholder="身份证号" v-model="formData.xxx8" />
            </FormItem>
            <FormItem prop="xxx9">
              <Input placeholder="预留手机号" v-model="formData.xxx9" />
            </FormItem>
            <FormItem>
              <div class="between">
                <Input placeholder="验证码" v-model="formData.xxx10" style="width: 158px;" />
                <Button class="btn-code" @click="getCode" :disabled="verifyIndex !== 0">{{verifyBtn}}</Button>
              </div>
            </FormItem>
            <FormItem>
              <Select placeholder="选择银行" v-model="formData.xxx11"></Select>
            </FormItem>
            <FormItem>
              <Input placeholder="卡户支行" v-model="formData.xxx12" />
            </FormItem>
            <FormItem>
              <Input placeholder="银行卡号" v-model="formData.xxx13" />
            </FormItem>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from './floatBox'
import cDateTime from './cDateTime'
import uploadImg from './uploadImg'
export default {
  name: 'app',
  components: {
    floatBox,
    cDateTime,
    uploadImg
  },
  computed: {
    btnDisabled () {
      for (const key in this.formData) {
        const d = this.formData[key]
        if (Array.isArray(d)) {
          if (d.length === 0) return true
        } else {
          if (d === '') return true
        }
      }
      return false
    },
    verifyBtn () {
      if (this.verifyIndex === 0) {
        return '获取验证码'
      } else {
        return `${this.verifyIndex}秒后重试`
      }
    }
  },
  data () {
    return {
      formData: {
        xxx1: '',
        xxx2: [],
        xxx3: '',
        xxx4: '',
        xxx5: '',
        xxx6: '',
        xxx7: '',
        xxx8: '',
        xxx9: '',
        xxx10: '',
        xxx11: '',
        xxx12: '',
        xxx13: ''
      },
      ruleValidate: {
        xxx8: [
          { required: true, trigger: 'blur', validator: this.idsValidator }
        ],
        xxx9: [
          { required: true, trigger: 'blur', validator: this.phoneValidator }
        ]
      },
      verifyIndex: 0
    }
  },
  methods: {
    idsValidator (rule, value, callback) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    },
    phoneValidator (rule, value, callback) {
      const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    getCode () {
      this.$refs.form.validateField('xxx9', (valid) => {
        if (valid === '') {
          this.verifyIndex = 60
          const t = setInterval(() => {
            this.verifyIndex -= 1
            if (this.verifyIndex === 0) {
              clearInterval(t)
            }
          }, 1000)
        }
      })
    },
    handleSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$router.push('/index')
        }
      })
    }
  }
}
</script>

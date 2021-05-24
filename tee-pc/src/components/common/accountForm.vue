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
<float-box v-model="visible" :mask="status !== 'new'" :width="800">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" :loading="isAjax" @click="handleSave">确认保存</Button>
     <a href="javascript:;" class="btn-close ml20" @click="handleCancel"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="account-box">
    <!-- 登录表单 -->
    <Form ref="form" :model="formData" :rules="ruleValidate">
      <Row>
        <Col span="12">
          <div class="c-form mt50">
            <h3 class="f18 mb30 ml10">基本信息</h3>
            <FormItem>
              <Input placeholder="门店名称" v-model="formData.shop_name" />
            </FormItem>
            <FormItem>
              <c-date-time type="timerange" format="HH:mm" placeholder="营业时间" v-model="times" @change="timeChange" />
            </FormItem>
            <FormItem>
              <Cascader :data="cityData" v-model="cities" @on-change="cityChange"></Cascader>
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" placeholder="门店地址" v-model="formData.address" />
            </FormItem>
            <FormItem>
              <upload-img v-model="formData.shop_logo">
                <span slot="title">门店logo</span>
                <span slot="hint">尺寸210px*80px</span>
              </upload-img>
            </FormItem>
            <h3 class="f18 mb30 ml10">积分使用设置</h3>
            <FormItem>
              <Input placeholder="单笔使用上限" v-model="formData.score_use_top"><span slot="append">积分</span></Input>
              <p class="form-hint mb75">100积分 = 1元，单笔最高可用积分即最高优惠额度。</p>
            </FormItem>
          </div>
        </Col>
        <Col span="12">
          <div class="c-form mt50">
            <h3 class="f18 mb30 ml10">银行账户信息</h3>
            <FormItem>
              <Input placeholder="开户名" v-model="formData.name" />
            </FormItem>
            <FormItem prop="idno">
              <Input placeholder="身份证号" v-model="formData.idno" />
            </FormItem>
            <FormItem prop="phone">
              <Input placeholder="预留手机号" v-model="formData.phone" />
            </FormItem>
            <FormItem>
              <div class="between">
                <Input placeholder="验证码" v-model="formData.code" style="width: 158px;" />
                <Button class="btn-code" @click="getCode" :disabled="verifyIndex !== 0">{{verifyBtn}}</Button>
              </div>
            </FormItem>
            <FormItem>
              <Select placeholder="选择银行" v-model="formData.bank_name">
                <Option v-for="i in bankList" :key="i.id" :value="i.id">{{i.bank_name}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input placeholder="卡户支行" v-model="formData.bank_subname" />
            </FormItem>
            <FormItem>
              <Input placeholder="银行卡号" v-model="formData.bank_number" />
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
import cityData from '@/utils/cityData.json'
import { getAction, postAction } from '@/utils'

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
    },
    globalData () {
      return this.$store.state.globalData
    }
  },
  data () {
    return {
      visible: false,
      cityData,
      cities: [],
      times: [],
      bankList: [],
      formData: {
        shop_name: '',
        word_time_start: '',
        word_time_end: '',
        province: '',
        city: '',
        address: '',
        shop_logo: '',
        score_use_top: '',
        name: '',
        idno: '',
        phone: '',
        code: '',
        bank_name: '',
        bank_subname: '',
        bank_number: ''
      },
      ruleValidate: {
        idno: [
          { required: true, trigger: 'blur', validator: this.idsValidator }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: this.phoneValidator }
        ]
      },
      verifyIndex: 0,
      isAjax: false,
      status: 'new'
    }
  },
  mounted () {
  },
  methods: {
    getBankList () {
      getAction('/shopapi/shop/banks').then(res => {
        if (res.code === 0) {
          this.bankList = res.data
        }
      })
    },
    show () {
      this.visible = true
      this.formData.shop_name = this.globalData.shop.shop_name
      this.status = 'new'
      this.getBankList()
    },
    view () {
      this.visible = true
      this.status = 'view'
      this.formData = {
        shop_name: this.globalData.shop.shop_name,
        word_time_start: this.globalData.shop.word_time_start,
        word_time_end: this.globalData.shop.word_time_end,
        province: this.globalData.shop.province,
        city: this.globalData.shop.city,
        address: this.globalData.shop.address,
        shop_logo: this.globalData.shop.shop_logo,
        score_use_top: this.globalData.shop.score_use_top,
        name: this.globalData.bank.name,
        idno: this.globalData.bank.idno,
        phone: this.globalData.bank.phone,
        bank_name: Number(this.globalData.bank.bank_name),
        bank_subname: this.globalData.bank.bank_subname,
        bank_number: this.globalData.bank.bank_number
      }
      this.cities = [this.globalData.shop.province, this.globalData.shop.city]
      this.times = [this.globalData.shop.word_time_start, this.globalData.shop.word_time_end]
    },
    handleCancel () {
      this.visible = false
    },
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
      this.$refs.form.validateField('phone', (valid) => {
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
          if (this.isAjax) return
          this.isAjax = true
          const params = { ...this.formData }
          postAction('/shopapi/shop/update', params).then(res => {
            this.isAjax = false
            if (res.code === 0) {
              this.$Message.success(res.msg)
              if (this.status === 'new') {
                this.$router.push('/index')
              } else {
                this.visible = false
              }
              this.$store.dispatch('getUserData')
            }
          })
        }
      })
    },
    timeChange (e) {
      this.formData.word_time_start = e[0]
      this.formData.word_time_end = e[1]
    },
    cityChange (e) {
      this.formData.province = e[0]
      this.formData.city = e[1]
    }
  }
}
</script>

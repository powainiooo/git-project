<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.account-box
  min-height 100%; position relative; overflow hidden
  &:before,&:after
    content ''; size(1px, 100%); background-color #F2F2F2; abTL(0, 400px)
  &:after
    left 801px;
  .btn-code
    font-size 12px; min-width 78px; padding 0; text-align center;
  .qrcode
    size(240px, 100%);
    .img
      size(90px, 90px); background-color #ffffff; border-radius 20px; center(); font-size 0; margin 20px auto 15px auto
</style>

<template>
<float-box v-model="visible" :title="title" :mask="status !== 'new'" :width="status === 'view' ? 1040 : 800">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" :loading="isAjax" @click="handleSave" v-if="status !== 'view'">确认保存</Button>
    <Button @click="status = 'edit'" v-else>编辑信息</Button>
     <a href="javascript:;" class="btn-close ml20" @click="handleCancel" v-if="status !== 'new'"><img src="@/assets/img/close.png" /></a>
  </div>
  <div class="account-box">
    <div class="flex">
      <!-- 登录表单 -->
      <Form ref="form" :model="formData" :rules="ruleValidate" style="width: 800px;">
        <Row>
          <Col span="12">
            <div class="c-form mt50">
              <h3 class="f18 mb30 ml10">基本信息</h3>
              <template v-if="status === 'view'">
              <FormItem>
                <Input placeholder="门店名称" v-model="formData.shop_name" :disabled="notNew">
                  <span slot="prepend">门店名称</span>
                </Input>
              </FormItem>
              </template>
              <div v-else>
                <FormItem>
                  <Input placeholder="门店名称" v-model="formData.shop_name" />
                </FormItem>
              </div>
              <FormItem>
                <Input :value="times[0] + ' ~ ' + times[1]" :disabled="notNew" v-if="status === 'view'">
                  <span slot="prepend">营业时间</span>
                </Input>
                <c-date-time type="timerange" format="HH:mm" placeholder="营业时间" v-model="times" @change="timeChange" v-else />
              </FormItem>
              <template v-if="status === 'view'">
              <FormItem>
                <Input placeholder="门店电话" v-model="formData.shop_phone" :disabled="status === 'view'">
                  <span slot="prepend">门店名称</span>
                </Input>
              </FormItem>
              </template>
              <div v-else>
                <FormItem>
                  <Input placeholder="门店电话" v-model="formData.shop_phone" />
                </FormItem>
              </div>
              <FormItem v-if="false">
                <Input :value="cities[0] + ' / ' + cities[1]" :disabled="notNew" v-if="notNew">
                  <span slot="prepend">门店地址</span>
                </Input>
                <Cascader :data="cityData" v-model="cities" @on-change="cityChange" placeholder="选择省份 / 城市" v-else></Cascader>
              </FormItem>
              <FormItem>
                <Input ref="address" type="textarea" :rows="4" placeholder="门店地址" v-model="formData.address" :disabled="status === 'view'" />
                <a href="javascript:;" class="btn-geo" @click="openGeo" v-if="status !== 'view'">定位</a>
              </FormItem>
              <FormItem>
                <upload-img v-model="formData.shop_logo" :disabled="notNew">
                  <span slot="title">门店logo</span>
                  <span slot="hint">尺寸420px*160px</span>
                </upload-img>
              </FormItem>
              <h3 class="f18 mb30 ml10">积分使用设置</h3>
              <FormItem>
                <Input v-model="formData.score_use_top" :disabled="notNew" v-if="status === 'view'">
                  <span slot="prepend">积分上限</span>
                  <span slot="append">积分</span>
                </Input>
                <div v-else>
                  <Input placeholder="单笔使用上限" v-model="formData.score_use_top">
                    <span slot="append">积分</span>
                  </Input>
                </div>
                <p class="form-hint mb75">100积分 = 1元，单笔最高可用积分即最高优惠额度。</p>
              </FormItem>
            </div>
          </Col>
          <Col span="12">
            <div class="c-form mt50">
              <h3 class="f18 mb30 ml10">银行账户信息</h3>
              <template v-if="status === 'view'">
              <FormItem>
                <Input v-model="formData.name" disabled>
                  <span slot="prepend">开户名</span>
                </Input>
              </FormItem>
              <FormItem prop="idno">
                <Input v-model="formData.idno" disabled>
                  <span slot="prepend">身份证号</span>
                </Input>
              </FormItem>
              <FormItem prop="phone">
                <Input v-model="formData.phone" disabled>
                  <span slot="prepend">预留手机号</span>
                </Input>
              </FormItem>
              <FormItem>
                <Input v-model="formData.bank_number" disabled>
                  <span slot="prepend">银行卡号</span>
                </Input>
              </FormItem>
              <FormItem>
                <Input v-model="bankName" disabled>
                  <span slot="prepend">选择银行</span>
                </Input>
              </FormItem>
              <FormItem>
                <Input v-model="formData.bank_subname" disabled>
                  <span slot="prepend">卡户支行</span>
                </Input>
              </FormItem>
              </template>
              <div v-else>
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
                  <Input placeholder="银行卡号" v-model="formData.bank_number" />
                </FormItem>
                <FormItem>
                  <Select placeholder="选择银行" v-model="formData.bank_name">
                    <Option v-for="i in bankList" :key="i.id" :value="i.id">{{i.bank_name}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input placeholder="卡户支行" v-model="formData.bank_subname" />
                </FormItem>
              </div>
              <h3 class="f18 mb30 ml10">打印设备信息</h3>
              <template v-if="status === 'view'">
              <FormItem>
                <Input v-model="formData.printer_code" disabled>
                  <span slot="prepend">终端号</span>
                </Input>
              </FormItem>
              <FormItem>
                <Input v-model="formData.printer_sign" disabled>
                  <span slot="prepend">密钥</span>
                </Input>
              </FormItem>
              </template>
              <div v-else>
                <FormItem>
                  <Input placeholder="终端号" v-model="formData.printer_code" />
                </FormItem>
                <FormItem>
                  <Input placeholder="密钥" v-model="formData.printer_sign" />
                </FormItem>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <!-- 程序码 -->
      <div class="qrcode" v-if="status === 'view'">
        <h3 class="f18 tc mt50">程序码</h3>
        <div class="img">
          <img :src="imgSrc + qrcodeImg" width="68" />
        </div>
        <div class="tc">
          <Button size="small" class="bg-main" @click="downloadImg(imgSrc + qrcodeImg)">保存程序码</Button>
        </div>
      </div>
    </div>
    <!-- 地址选择 -->
    <addr-picker ref="addrPicker" @confirm="getAddrData" />
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from './floatBox'
import cDateTime from './cDateTime'
import uploadImg from './uploadImg'
import cityData from '@/utils/cityData.json'
import { getAction, postAction } from '@/utils'
import addrPicker from './addrPicker'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/config'

export default {
  name: 'app',
  components: {
    floatBox,
    cDateTime,
    uploadImg,
    addrPicker
  },
  computed: {
    btnDisabled () {
      for (const key in this.formData) {
        const d = this.formData[key]
        if (Array.isArray(d)) {
          if (d.length === 0) return true
        } else {
          if (key !== 'printer_code' && key !== 'printer_sign' && d === '') return true
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
    },
    notNew () {
      return this.status !== 'new'
    },
    bankName () {
      const item = this.bankList.find(i => i.id == this.formData.bank_name)
      return item ? item.bank_name : '--'
    },
    title () {
      if (this.status === 'new') {
        return '完善账号信息'
      } else if (this.status === 'view') {
        return '账号信息'
      } else {
        return '编辑账号信息'
      }
    },
    imgSrc () {
      return this.$store.state.imgSrc
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
        lat: '',
        lng: '',
        shop_logo: '',
        score_use_top: '',
        name: '',
        idno: '',
        phone: '',
        shop_phone: '',
        code: '',
        bank_name: '',
        bank_subname: '',
        bank_number: '',
        printer_code: '',
        printer_sign: ''
      },
      qrcodeImg: '',
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
          console.log('banks list', res.data)
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
        shop_phone: this.globalData.shop.shop_phone,
        bank_name: Number(this.globalData.bank.bank_name),
        bank_subname: this.globalData.bank.bank_subname,
        bank_number: this.globalData.bank.bank_number,
        printer_code: this.globalData.printer.printer_code,
        printer_sign: this.globalData.printer.printer_sign
      }
      this.qrcodeImg = this.globalData.shop.qrcode
      this.cities = [this.globalData.shop.province, this.globalData.shop.city]
      this.times = [this.globalData.shop.word_time_start, this.globalData.shop.word_time_end]
      this.getBankList()
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
          postAction('/shopapi/sms/send', {
            phone: this.formData.phone
          }).then(res => {
            if (res.code === 0) {
              this.$Message.success('发送成功')
              this.verifyIndex = 60
              const t = setInterval(() => {
                this.verifyIndex -= 1
                if (this.verifyIndex === 0) {
                  clearInterval(t)
                }
              }, 1000)
            }
          })
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
    },
    openGeo () {
      this.$refs.addrPicker.show()
    },
    getAddrData (data) {
      console.log('getAddrData', data)
      this.formData.province = data.addressComponents.province
      this.formData.city = data.addressComponents.city
      this.formData.address = data.address
      this.formData.lat = data.location.lat
      this.formData.lng = data.location.lng
      this.$refs.address.focus()
    },
    downloadImg (src) {
      window.open(`${window.baseUrl}/shopapi/shop/download/qrcode?api_token=${Vue.ls.get(ACCESS_TOKEN)}`)
    }
  }
}
</script>

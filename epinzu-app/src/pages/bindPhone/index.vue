<template>
  <view class="index">
    <view class="mt26 ml12 mb65 f26">绑定手机号</view>
    <Field placeholder="请输入手机号" v-model="phone" />
    <Field placeholder="请输入验证码" v-model="code">
      <template #button>
      <button class="c-btn c-btn-border c-btn-24"style="width: 80px;" @tap="getCode">{{btnName}}</button>
      </template>
    </Field>
    <view class="ml12 mr12 mt40">
      <button class="c-btn"
              :class="{'c-btn-disabled': btnDisable}"
              @tap="handleSubmit">提交</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Field from "../../components/common/Field"
import { postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Field
  },
  computed: {
    btnDisable () {
      if (this.phone ==='' || this.code === '') {
        return true
      }
      return false
    },
    btnName () {
      return this.count === 0 ? '获取验证码' : `${this.count}s`
    },
    record () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      func: '',
      phone: '',
      code: '',
      count: 0,
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      if (this.btnDisable) return
      if (this.isAjax) return
      const params = {
        user_id: this.$store.state.userId,
        phone: this.phone,
        code: this.code
      }
      this.isAjax = true
      let url = '/userapi/alipay/mini/bind'
      if (this.func === 'update') {
        url = '/userapi/user/bind/phone'
      }
      postAction(url, params).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: '绑定成功'
          })
          if (this.func === 'new') {
            this.$store.commit('SET_TOKEN', res.data.api_token)
          }
          Taro.navigateBack({
            delta: 1
          })
        } else {
          this.isAjax = false
        }
      })
    },
    getCode () {
      if (this.count !== 0) return
      postAction('/userapi/sms/send', {
        phone: this.phone
      }).then(res => {
        if (res.code === 0) {
          if (this.count !== 0) return
          this.count = 60
          const t = setInterval(() => {
            if (this.count === 0) {
              clearInterval(t)
            } else {
              this.count -= 1
            }
          }, 1000)
        }
      })
    }
  },
  onLoad (options) {
    this.func = options.func || 'new'
    if (this.func === 'update') {
      this.phone = this.record.phone
    }
  }
}
</script>

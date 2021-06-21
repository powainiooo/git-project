<template>
  <view class="index">
    <Field placeholder="请输入手机号" v-model="phone" />
    <Field placeholder="请输入验证码" v-model="code">
      <template #button>
      <button class="c-btn c-btn-border c-btn-24" style="width: 80px;" @tap="getCode">{{btnName}}</button>
      </template>
    </Field>
    <view class="ml12 mr12 mt40">
      <button class="c-btn" :disabled="btnDisable" @tap="handleSubmit">提交</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Field from "../../components/common/Field"
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
    }
  },
  data () {
    return {
      phone: '',
      code: '',
      count: 0
    }
  },
  mounted () {

  },
  methods: {
    handleSubmit () {
      console.log('handleSubmit')
      const params = {
        phone: this.phone,
        code: this.code
      }
      Taro.showToast({
        title: '修改成功'
      })
    },
    getCode () {
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
  }
}
</script>

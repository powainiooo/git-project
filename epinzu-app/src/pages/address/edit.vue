<template>
  <view class="Address">
    <Field label="收件人" placeholder="请填写" v-model="formData.name" />
    <Field label="手机号码" placeholder="请填写" v-model="formData.phone" />
    <view @tap="choose">
      <Field label="地址" placeholder="请填写" :readonly="true" v-model="formData.addr1">
        <image src="@/img/ar1.png" mode="widthFix" class="w10" slot="rightIcon" />
      </Field>
    </view>
    <Field label="详情地址" placeholder="请填写" v-model="formData.addr2" class="mb8" />
    <view class="between bg-fff">
      <view class="ml12">设为默认地址</view>
      <view class="switch mr12 mt10 mb10" @tap="toggle">
        <image src="@/img/switch.png" mode="widthFix" class="wp100" v-if="formData.default === 1" />
        <image src="@/img/switch-check.png" mode="widthFix" class="wp100" v-else />
      </view>
    </view>

    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Field from "@/c/common/Field"

export default {
  name: 'Index',
  components: {
    Field
  },
  data () {
    return {
      formData: {
        name: '',
        phone: '',
        addr1: '',
        addr2: '',
        default: 1
      }
    }
  },
  methods: {
    choose () {
      console.log('chooseLocation')
      Taro.chooseLocation({
        success: res => {
          console.log('chooseLocation', res)
          this.formData.addr1 = `${res.provinceName}${res.cityName}`
          this.formData.addr2 = `${res.address}`
        }
      })
    },
    toggle () {
      this.formData.default = this.formData.default === 1 ? 2 : 1
    }
  },
}
</script>

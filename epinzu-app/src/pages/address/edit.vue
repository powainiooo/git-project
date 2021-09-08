<template>
  <view class="Address">
    <Field label="收件人" placeholder="请填写" v-model="formData.rev_name" />
    <Field label="手机号码" placeholder="请填写" v-model="formData.rev_phone" />
    <view class="h52 between borderB bg-fff" @tap="choose">
      <view class="acenter">
        <view class="w82 ml12 mr8">地址</view>
        <view class="c-999" v-if="addr1 === ''">请选择</view>
        <view class="c-333" v-else>{{addr1}}</view>
      </view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10 mr12" slot="rightIcon" />
    </view>
    <Field label="详情地址" placeholder="楼、门牌" v-model="formData.address" class="mb8" />
    <view class="between bg-fff">
      <view class="ml12">设为默认地址</view>
      <view class="switch mr12 mt10 mb10" @tap="toggle">
        <image src="@/img/switch.png" mode="widthFix" class="wp100" v-if="formData.status === 0" />
        <image src="@/img/switch-check.png" mode="widthFix" class="wp100" v-else />
      </view>
    </view>

    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn" @tap="handleSave">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Field from "@/c/common/Field"
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Field
  },
  computed: {
    addr1 () {
      return this.formData.province === '' ? '' : `${this.formData.province} ${this.formData.city}`
    }
  },
  data () {
    return {
      formData: {
        rev_name: '',
        rev_phone: '',
        province: '',
        city: '',
        address: '',
        lng: '',
        lat: '',
        status: 1
      },
      id: '',
      isAjax: false
    }
  },
  methods: {
    choose () {
      Taro.chooseLocation({
        success: res => {
          console.log('chooseLocation', res)
          res.address = res.address.replace(res.cityName, '')
          this.formData.province = res.provinceName
          this.formData.city = res.cityName
          this.formData.address = res.address + res.name
          this.formData.lng = res.longitude
          this.formData.lat = res.latitude
        }
      })
    },
    toggle () {
      this.formData.status = this.formData.status === 1 ? 0 : 1
    },
    getDetail () {
      getAction(`/userapi/user/address/show/${this.id}`).then(res => {
        if (res.code === 0) {
          for (let key in this.formData) {
            this.formData[key] = res.data[key]
          }
        }
      })
    },
    handleSave () {
      if (this.isAjax) return
      this.isAjax = true
      let url = '/userapi/user/address/store'
      if (this.id !== '') {
        url = `/userapi/user/address/update/${this.id}`
      }
      postAction(url, this.formData).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          setTimeout(() => {
            Taro.navigateBack({
              delta: 1
            })
          }, 500)
        }
      })
    }
  },
  onLoad (options) {
    if (options.id) {
      this.id = options.id
      this.getDetail()
    }
  }
}
</script>

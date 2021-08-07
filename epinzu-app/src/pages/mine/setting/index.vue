<template>
  <view class="Setting">
    <view class="section2" style="padding-right: 0">
      <view class="h52 between borderB" @tap="selectAvatar">
        <view>我的头像</view>
        <view class="acenter">
          <image :src="imgSrc + record.avatar" mode="widthFix" class="avatar mr8" slot="value" />
          <image src="@/img/ar1.png" mode="widthFix" class="w10 mr12" />
        </view>
      </view>
      <view class="h52 between borderB" @tap="toPage('/pages/mine/nickname/index?name=' + record.nickname)">
        <view>我的昵称</view>
        <view class="acenter">
          <text class="c-999 mr8">{{record.nickname}}</text>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 mr12" />
        </view>
      </view>
      <Cell title="账号与安全"
            isLink
            @tap="toPage('/pages/mine/account/index?')" />
      <Cell title="实名认证"
            :value="record.srrz_status === 0 ? '未认证' : '已认证'"
            color="#999999"
            isLink
            @tap="toAuth" />
    </view>
    <view class="tc f12 mt24" @tap="toWeb">《品租软件隐私政策》</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Cell from '@/c/common/Cell'
import { uploadAvatar, postAction } from '@/utils/api'
import { promisify } from '@/utils'
import { baseUrl } from "@/config"

const chooseImage = promisify(Taro.chooseImage)

export default {
  name: 'Setting',
  components: {
    Cell
  },
  computed: {
    record () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc
    }
  },
  methods: {
    toPage (url) {
      Taro.navigateTo({
        url
      })
    },
    toAuth () {
      if (this.record.srrz_status === 0) {
        Taro.navigateTo({
          url: '/pages/mine/auth/index'
        })
      }
    },
    selectAvatar () {
      chooseImage({
        count: 1
      }).then(res1 => {
        console.log('chooseImage', res1)
        uploadAvatar(res1.tempFilePaths[0]).then(res2 => {
          const res3 = JSON.parse(res2)
          if (res3.code === 0) {
            this.changeAvatar(res3.data.thumb)
          } else {
            Taro.showToast({
              title: res3.msg
            })
          }
        })
      })
    },
    changeAvatar (url) {
      postAction('/userapi/user/edit/avatar', {
        avatar: url
      }).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('getUserInfo')
        }
      })
    },
    toWeb () {
      Taro.navigateTo({
        url: `/pages/webview/index?src=${baseUrl}/apph5/single/ysxy`
      })
    }
  }
}
</script>

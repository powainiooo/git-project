<style>
.logins .logos { text-align: center; font-size: 18px; margin-bottom: 56px; }
.logins .logos image { width: 75px; height: 75px; margin-bottom: 8px; }
.logins .hint { font-size: 16px; color: #999999; padding-left: 14px; margin-bottom: 48px; position: relative; }
.logins .hint:before { content: ''; width: 6px; height: 6px; border-radius: 50%; background-color: #D8D8D8; position: absolute; top: 8px; left: 0; }
.logins .bottoms { width: 100%; position: fixed; left: 0; bottom: 50px; font-size: 12px; line-height: 17px; text-align: center; }
.logins .bottoms navigator { color: #FE322B; display: inline; }
</style>

<template>
  <view class="mt40 ml30 mr30 logins">
    <view class="logos">
      <image src="@/img/logo.png" />
      <view>品租</view>
    </view>
    <view class="f16 mb10">申请获得以下权限</view>
    <view class="hint">获得你的公开信息（昵称，头像等）</view>
    <button class="c-btn c-btn-primary"> 登录 </button>

    <view class="bottoms">
      <view>点击登录表示你已经阅读并同意</view>
      <text>品租<navigator>《软件许可及服务协议》</navigator><navigator>《软件隐私政策》</navigator></text>
    </view>
  </view>
</template>

<script>

export default {
  name: 'Login'
}
</script>

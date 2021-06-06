<style scoped>
.mine-container .line1 { height: 145px; margin: 40px 34px 40px 34px; }
.mine-container .line1 .avatar { width: 145px; height: 145px; border-radius: 50%; overflow: hidden; box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1); margin-right: 20px; }
.mine-container .line1 .name { font-size: 30px; }
.mine-container .line1 .btn { width: 120px; }

.mine-container .line2 { overflow: hidden; padding-top: 25px; position: relative; margin-bottom: 70px; }
.mine-container .line2 ul { background-color: #ffffff; border-radius: 30px 30px 0 0; box-shadow: 0px 3px 25px 0px rgba(0, 0, 0, 0.08); margin: 0 34px; display: flex; padding: 20px 34px 35px 34px; }
.mine-container .line2 ul li { flex: 1; }
.mine-container .line2 ul li.borderR { padding-right: 40px; margin-right: 40px }
.mine-container .line2 ul li p { font-size: 20px; line-height: 20px; color: #C9C9C9; }
.mine-container .line2 ul li div { font-size: 100px; line-height: 117px; font-family: DinB; }
.mine-container .line2 .sd { width: 100%; position: absolute; left: 0; bottom: 0; }

.mine-container .line3 { box-sizing: border-box; height: 100px; margin: 0 34px 40px 34px; box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1); background-color: #ffffff; border-radius: 15px; padding: 0 26px; }
.mine-container .line3 span { font-size: 24px; }
.mine-container .line3 img { width: 8px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh mine-container">
    <div class="line1 acenter">
      <template v-if="isLogin">
      <open-data type="userAvatarUrl" class="avatar"></open-data>
      <open-data type="userNickName" class="name"></open-data>
      </template>
      <button class="btn btn-style1" @click="handleLogin" v-else>点击登录</button>
    </div>

    <div class="line2">
      <ul>
        <li class="borderR">
          <p>总积分</p>
          <div @click="toPage('/pages/personal/points/main')">{{score}}</div>
        </li>
        <li class="borderR">
          <p>优惠券</p>
          <div @click="toPage('/pages/personal/coupon/main')">{{coupon}}</div>
        </li>
        <li>
          <p>奖品</p>
          <div @click="toPage('/pages/personal/gift/main')">{{prize}}</div>
        </li>
      </ul>
      <img src="/static/images/sd1.png" mode="widthFix" class="sd" />
    </div>

    <a href="/pages/personal/address/main" class="line3 between">
      <span>收货地址</span>
      <img src="/static/images/arrow4.png" mode="widthFix" />
    </a>
    <a href="/pages/personal/aboutus/main" class="line3 between">
      <span>关于无事干杯</span>
      <img src="/static/images/arrow4.png" mode="widthFix" />
    </a>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import store from '@/store'
import { doLogin, getAction } from '@/utils/api'

export default {
  components: {
    cHeader
  },
  computed: {
    isLogin () {
      return store.state.isLogin
    }
  },
  data () {
    return {
      score: 0,
      coupon: 0,
      prize: 0
    }
  },

  methods: {
    toPage: mpvue.toPage,
    handleLogin () {
      mpvue.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          console.log(res)
          doLogin(res.userInfo)
        }
      })
    },
    getData () {
      getAction('/userapi/user/show').then(res => {
        if (res.code === 0) {
          this.score = res.data.score
          this.coupon = res.data.coupon_nums
          this.prize = res.data.prize_nums
        }
      })
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.getData()
  }
}
</script>

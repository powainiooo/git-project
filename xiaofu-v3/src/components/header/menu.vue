<style scoped>
.c-menu { width: 100%; height: calc(100vh - 100px); overflow-y: auto; box-sizing: border-box; padding: 0 25px; background-color: #ffffff; position: absolute; top: -100vh; left: 0; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-menu-show { top: 100px; }
.c-menu .personal { height: 210px; display: flex; align-items: center; }
.c-menu .personal .avatar { width: 147px; height: 147px; box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.1); background: #D8D8D8; margin-right: 32px; border-radius: 36px; overflow: hidden; }
.c-menu .personal .avatar img { width: 100%; height: 100%; }
.c-menu .personal button { font-size: 26px; font-family: HelveB; margin: 0; background-color: transparent; }

.c-menu .ticket { width: 700px; height: 300px; position: relative; margin: 15px 0 80px 0; }
.c-menu .ticket>img { width: 100%; height: 100%; }
.c-menu .ticket-info { width: 100%; height: 200px; display: flex; position: absolute; top: 100px; left: 0; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15); border-radius: 0 0 20px 20px; background-color: #ffffff; overflow: hidden; }
.c-menu .ticket-info-left { flex: 1; display: flex; align-items: center; padding-left: 28px; }
.c-menu .ticket-info-img { flex: 1; height: 100%; background-color: #EEEEEF; mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAADJCAMAAABc4apnAAAATlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEoqZZAAAAGXRSTlMB6ADidwj27c+MwKuygjIpHBUO2dedbE9MZs7UuwAAAhBJREFUeNrs0MtNAlAARUGiIMT4YWv/jbo9BfAWN5kpYS682Ftd/nipL70nfeo96a73qF+9J131nvR+03vSVe9J96fekx43vSd93fSe9HjqPel+vek96f3756L3pI/Hp96j9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q3/LdDLzcIw1AQRZ1xMBgLUEJ+/VeaZV4BmYWle0o49Eb09oXeiN6+0BvR2xd6I3q7Uuh1etLr9KLXqdHrNNLr9KXXKCd6jT6i16dM9BpV0eszzPQa7aLXp4pen5bo9WkP0WtTk+h1yYdEr0mps+g1+Y+TLmnATfLyXrefFJ2DAYE+HkSLfAAAAABJRU5ErkJggg==); mask-size: 100% 100%; -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAADJCAMAAABc4apnAAAATlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEoqZZAAAAGXRSTlMB6ADidwj27c+MwKuygjIpHBUO2dedbE9MZs7UuwAAAhBJREFUeNrs0MtNAlAARUGiIMT4YWv/jbo9BfAWN5kpYS682Ftd/nipL70nfeo96a73qF+9J131nvR+03vSVe9J96fekx43vSd93fSe9HjqPel+vek96f3756L3pI/Hp96j9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q36C29W/SW3i16S+8WvaV3i97Su0Vv6d2it/Ru0Vt6t+gtvVv0lt4tekvvFr2ld4ve0rtFb+ndorf0btFberfoLb1b9JbeLXpL7xa9pXeL3tK7RW/p3aK39G7RW3q3/LdDLzcIw1AQRZ1xMBgLUEJ+/VeaZV4BmYWle0o49Eb09oXeiN6+0BvR2xd6I3q7Uuh1etLr9KLXqdHrNNLr9KXXKCd6jT6i16dM9BpV0eszzPQa7aLXp4pen5bo9WkP0WtTk+h1yYdEr0mps+g1+Y+TLmnATfLyXrefFJ2DAYE+HkSLfAAAAABJRU5ErkJggg==); -webkit-mask-size: 100% 100%; }
.c-menu .ticket-info-img img { width: 100%; height: 100%; }

.c-menu .navs { width: 100%; margin-bottom: 60px; }
.c-menu .navs a { width: 100%; height: 100px; display: flex; align-items: center; background-color: #EEEEEF; border-radius: 20px; margin-bottom: 20px; }
.c-menu .navs a.active { background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%); }
.c-menu .navs a .icons { width: 98px; display: flex; justify-content: center; }
.c-menu .navs a div { font-size: 24px; color: #9E9E9F; }
.c-menu .navs a.active div { color: #ffffff; }
.c-menu .navs a div span { font-family: HelveL; margin-left: 13px; }
</style>

<template>
<div class="c-menu" :class="{'c-menu-show': show}">
  <div class="personal">
    <div class="avatar">
      <img :src="userInfo.avatarUrl" v-if="hasUserInfo"/>
    </div>
    <button v-if="hasUserInfo">{{userInfo.nickName}}</button>
    <button open-type="getUserInfo" @getuserinfo="getuserinfo" v-else>点击登录</button>
  </div>

  <div class="ticket"
       hover-class="hscale"
       hover-stay-time="10"
       @click="toOrderList">
    <img src="/static/images/menu/frame.png" />
    <div class="ticket-info">
      <div class="ticket-info-left">
        <tk-info />
      </div>
      <div class="ticket-info-img">
        <img src="/static/images/menu/icon1.png" />
      </div>
    </div>
  </div>

  <nav class="navs">
    <a href="#" class="active">
      <div class="icons">
        <img src="/static/images/menu/icon1.png" style="width: 52rpx;" mode="widthFix" />
      </div>
      <div>小夫星選<span>Lee's Star</span></div>
    </a>
    <a href="#">
      <div class="icons">
        <img src="/static/images/menu/icon2.png" style="width: 55rpx;" mode="widthFix" />
      </div>
      <div>隶属于<span>Member of HO</span></div>
    </a>
    <a href="#">
      <div class="icons">
        <img src="/static/images/menu/icon3.png" style="width: 38rpx;" mode="widthFix" />
      </div>
      <div>售后声明<span>After sales</span></div>
    </a>
    <a href="#">
      <div class="icons">
        <img src="/static/images/menu/icon4.png" style="width: 44rpx;" mode="widthFix" />
      </div>
      <div>联系<span>Contact</span></div>
    </a>
  </nav>
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
import { doLogin } from '@/utils/api'
import store from '@/store'

export default {
  name: 'app',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    tkInfo
  },
  computed: {
    hasUserInfo () {
      return store.state.settings['scope.userInfo']
    },
    userInfo () {
      return store.state.personalInfo
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getuserinfo (e) {
      doLogin(e.mp.detail)
    },
    toOrderList () {
      mpvue.navigateTo({
        url: '/pages/order/list/main'
      })
    }
  }
}
</script>

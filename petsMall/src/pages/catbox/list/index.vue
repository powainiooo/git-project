<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.list-container { margin: 60px 45px; }
.list-container .c-list-item { margin-bottom: 40px; }

.footer-btn { width: 100%; height: 200px; position: fixed; left: 0; bottom: 0; z-index: 1000; display: flex; align-items: center; box-shadow: 0 -5px 8px rgba(0, 0, 0, .05); background-color: #ffffff; }
.footer-btn .menu { width: 114px; height: 90px; margin-left: 70px; margin-right: 30px; }
.footer-btn .arrow { width: 80px; height: 80px; margin-left: 110px; }
.footer-btn div p { font-size: 30px; color: #372C1E; text-shadow: var(--textShadow); }
.footer-btn div p.en { font-size: 34px; font-family: HelveThin; }
.footer-btn button { width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; }

.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div class="container">
   <c-header title="选择猫盒|Selection cat box" />
   <div class="list-container">
      <c-list-item v-for="item in listData" :key="id" :itemData="item" />
   </div>
   <div class="hint" v-if="loadOver"></div>
   <div class="hint-result" v-if="listData.length === 0">
      <img src="/static/images/goods/warn.png" mode="widthFix" style="width: 71rpx;" />
      <h3 class="en">No related content</h3>
      <h3>无相关内容！</h3>
   </div>

   <a class="footer-btn" @click="toMyBox">
      <img src="/static/images/catbox/icon-menu.png" class="menu" />
      <div>
         <p class="en">Customized cat box</p>
         <p>自定义猫盒套餐</p>
      </div>
      <img src="/static/images/catbox/icon-arrow.png" class="arrow" />
      <button v-if="!hasUserInfo" class="footer-btn" open-type="getUserInfo" @getuserinfo="getuserinfo"></button>
   </a>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cListItem from './modules/listItem'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
   components: {
      cHeader,
      cListItem
   },
   computed: {
      loadOver () {
         return this.total === this.listData.length
      },
      hasUserInfo () {
         return store.state.settings['scope.userInfo']
      }
   },
   data () {
      return {
         listData: [],
         total: 0,
         pageNo: 1
      }
   },
   methods: {
      getData () {
         mpvue.showLoading()
         getAction('group_list', {
            word: '',
            page: this.pageNo
         }).then(res => {
            mpvue.hideLoading()
            this.total = parseInt(res.data.nums)
            this.listData = this.listData.concat(res.data.list)
            console.log('this.listData', this.listData)
         })
      },
      reset () {
         this.pageNo = 1
         this.listData = []
         this.getData()
      },
      toMyBox () {
         if (!this.hasUserInfo) return
         getAction('my_group', {
            token: store.state.token
         }).then(res => {
            if (Array.isArray(res.data)) {
               mpvue.navigateTo({
                  url: '/pages/catbox/diy/main'
               })
            } else {
               mpvue.navigateTo({
                  url: '/pages/catbox/mine/main'
               })
            }
            this.showMenu = false
         })
      },
      getuserinfo (e) {
         console.log('getuserinfo', e)
         if (e.mp.detail.errMsg !== 'getUserInfo:ok') return
         getAction('wxuser_add', {
            openid: store.state.openid,
            country: e.mp.detail.userInfo.country,
            province: e.mp.detail.userInfo.province,
            city: e.mp.detail.userInfo.city,
            gender: e.mp.detail.userInfo.gender,
            nickName: e.mp.detail.userInfo.nickName,
            avatarUrl: e.mp.detail.userInfo.avatarUrl
         }).then(res => {
            store.commit('SET_PERSONINFO', e.mp.detail.userInfo)
            store.commit('SET_TOKEN', res.data)
            mpvue.getSetting({
               success: res2 => {
                  console.log('res2', res2)
                  store.commit('SET_SETTING', res2.authSetting)
                  this.$nextTick(() => {
                     this.toMyBox()
                  })
               }
            })
         })
      }
   },
   onShow () {
      this.reset()
   },
   onLoad () {
      Object.assign(this.$data, this.$options.data())
   },
   onReachBottom () {
      if (this.loadOver) return
      this.page += 1
      this.getData()
   }
}
</script>

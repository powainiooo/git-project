<style>
.c-footer { width: 100%; height: 200px; position: fixed; left: 0; bottom: 0; z-index: 1100; display: flex; box-shadow: 0 -5px 8px rgba(0, 0, 0, .05); }
.c-footer button { flex: 1; box-sizing: border-box; padding-top: 60px; border: none; font-size: 36px; color: var(--textColor); text-shadow: var(--textShadow); background-color: #E8E6E4; line-height: 1; border-radius: 0; }
.c-footer button span { font-size: 40px; font-family: Helve; }
.c-footer .price { width: 280px; background-color: #ffffff; display: flex; justify-content: center; align-items: baseline; font-size: 80px; color: var(--textColor2); text-shadow: var(--textShadow); font-family: HelveThin; padding-top: 40px; line-height: 1; }
.c-footer .price span { font-size: 22px; }
.c-footer .close { width: 200px; height: 200px; background-color: var(--mainColor); display: flex; justify-content: center; padding-top: 60px; box-sizing: border-box; }
.c-footer .close img { width: 54px; height: 54px; }
</style>

<template>
<div class="c-footer">
   <div class="price" v-if="price !== ''">{{price}}<span>元</span></div>
   <div class="close" v-if="showClose" @click="close"><img src="/static/images/header/close.png" /></div>
   <button @click="btnFunc">{{titleArr[0]}}| {{titleArr[1]}}</button>
</div>
</template>

<script type='es6'>
import store from '@/store'
import { getAction } from '@/utils/api'

export default {
   name: 'app',
   props: {
      btnName: String,
      price: {
         type: [String, Number],
         default: ''
      },
      showClose: {
         type: Boolean,
         default: false
      },
      needAuth: {
         type: Boolean,
         default: false
      }
   },
   data () {
      return {}
   },
   computed: {
      titleArr () {
         return this.btnName.split('|')
      },
      userInfoAuth () {
         return store.state.token !== ''
      }
   },
   methods: {
      btnFunc () {
         if (this.userInfoAuth) {
            this.$emit('btnFunc')
         } else {
            if (this.needAuth) {
               mpvue.getUserProfile({
                  desc: '用于完善会员资料',
                  success: res => {
                     console.log(res)
                     this.addUser(res.userInfo)
                  }
               })
            }
         }
      },
      addUser (userInfo) {
         getAction('wxuser_add', {
            openid: store.state.openid,
            ...userInfo
         }).then(res => {
            store.commit('SET_TOKEN', res.data)
            this.$emit('btnFunc')
         })
      },
      close () {
         this.$emit('close')
      }
   }
}
</script>

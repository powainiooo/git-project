<style>
    .n-menu{ position: fixed; top: 0; right: 0; z-index: 1010;}
    .n-menu .btn{ font-size: 32px; color: #ffffff; margin-top: 6px; display: block;}
    .n-menu .btn2{ font-size: 40px; color: #0129ac;}
    .n-menu .btn2 .ivu-icon{ display: block;}
    .n-menu .n-menu-frame{ width: 500px; height: 100vh; position: absolute; top: 0; right: 0; background-color: #ffffff; transition: all 0.5s cubic-bezier(.25,.76,.36,.97); box-shadow: 0 2px 10px rgba(0,0,0,0.2); overflow-y: scroll;}
    .n-menu .n-menu-frame::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .n-menu .n-menu-frame::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .n-menu .n-menu-btns{ overflow: hidden; margin: 50px 40px 100px 40px;}
    .n-menu .info-item{ display: flex; height: 40px; margin-bottom: 20px;}
    .n-menu .info-item .name{ width: 100px; height: 100%; box-sizing: border-box; font-size: 16px; color: #ffffff; padding-left: 15px; display: flex; align-items: center; background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); border-radius: 5px 0 0 5px;}
    .n-menu .info-item .info{ width: 170px; height: 100%; box-sizing: border-box; font-size: 16px; color: #000000; font-weight: bold; padding-left: 15px; display: flex; align-items: center; background-color: #eeeef0; border-radius: 0 5px 5px 0;}
    .n-menu .copyright{ position: absolute; left: 35px; bottom: 30px; font-size: 20px; color: #000000;}
    .n-menu .copyright span{ font-size: 12px; color: #bebebe;}
    .n-menu .anim{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97);}
    .n-menu .copyright .logout{ width: 28px; height: 28px; background-color: #e83727; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: #ffffff; font-size: 20px; position: absolute; top: 0; right: 0;}
</style>

<template>
    <div class="n-menu">
        <a href="javascript:;" class="btn mt50 mr40" @click="doShowNavs"><Icon type="ios-menu" /></a>
        <transition enter-active-class="animated anim slideInRight" leave-active-class="animated anim slideOutRight">
        <div class="n-menu-frame" v-if="showNavs" :style="{width:showItem == 'recordlist' ? '1300px' : '500px'}">
            <div class="n-menu-btns">
                <a href="javascript:;"
                   class="btn2 fl"
                   v-if="showItem !== 'nav'"
                   @click="toggle('nav')"><Icon type="ios-arrow-back" /></a>
                <a href="javascript:;" class="btn2 fr"  @click="doHideNavs"><Icon type="md-close" /></a>
            </div>
            <menu-nav v-if="showItem === 'nav'" @toggle="toggle"></menu-nav>
            <base-info v-if="showItem === 'baseinfo'"></base-info>
            <bank-info v-if="showItem === 'bankinfo'" @toggle="toggle"></bank-info>
            <editor-bank v-if="showItem === 'editorbank'" @toggle="toggle"></editor-bank>
            <record-list v-if="showItem === 'recordlist'" @toggle="toggle"></record-list>
            <t-laws v-if="showLaws" readonly @close="showLaws=false"></t-laws>
            <contact v-if="showItem === 'contact'" readonly></contact>
            <div class="copyright" v-if="showItem === 'nav' || showItem === 'contact'">
                <i class="icon-logo"></i><br>
                <span>Copyright &copyright; 2018HO.AllRights reserved.粤ICP备16121686号-1</span>
                <a href="javascript:;" class="logout" @click="doLogout"><Icon type="ios-power" /></a>
            </div>
        </div>
        </transition>
    </div>
</template>

<script type="es6">
import MenuNav from '@/components/menu/MenuNav.vue'
import BaseInfo from '@/components/menu/BaseInfo.vue'
import BankInfo from '@/components/menu/BankInfo.vue'
import EditorBank from '@/components/menu/EditorBank.vue'
import RecordList from '@/components/menu/RecordList.vue'
import TLaws from '@/components/common/TLaws.vue'
import Contact from '@/components/menu/Contact.vue'
import Cookies from 'js-cookie'
export default {
   name: 'App',
   components: { MenuNav, BaseInfo, BankInfo, EditorBank, RecordList, TLaws, Contact },
   data () {
      return {
         showItem: 'nav',
         showLaws: false
      }
   },
   computed: {
      showNavs () {
         return this.$store.state.showGlobalMenuDetail
      }
   },
   methods: {
      doShowNavs () {
         this.$store.commit('doShowGlobalMenuDetail', true)
         this.showItem = 'nav'
      },
      doHideNavs () {
         this.$store.commit('doShowGlobalMenuDetail', false)
      },
      toggle (val, id, cash, site) {
         if (val === 'laws') {
            this.showLaws = true
         } else if (val === 'recordlist') {
            this.showItem = val
         } else if (val === 'close') {
            this.showItem = 'nav'
            this.$store.commit('doShowGlobalMenuDetail', false)
         } else {
            this.showItem = val
         }
      },
      doLogout () {
         let self = this
         self.$tModal.confirm({
            title: '是否确认登出？',
            content: '确认登出后将回到首页，未保存的资料内容将丢失，请保存好资料后再妥善操作。',
            onOk () {
               self.$ajax.post('/client/api/logout').then(res => {
                  if (res.data.status === 1) {
                     self.$ajax.defaults.headers.common['mid'] = ''
                     self.$ajax.defaults.headers.common['tokey'] = ''
                     Cookies.remove('xfmid')
                     Cookies.remove('xftokey')
                     self.$router.push('index')
                  } else {
                     self.$Message.warning('操作失败')
                  }
               })
            }
         })
      }
   }
}

</script>

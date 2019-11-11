<style>
.n-menu{ position: fixed; top: 0; right: 0; z-index: 1500;}
.n-menu-bg { position: fixed; top: 0; right: 0; bottom: 0; left: 0;  background-color: rgba(0, 0, 0, 0.7);}
.n-menu .n-menu-frame{ width: 500px; height: 100vh; position: absolute; top: 0; right: 0; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.2); overflow: hidden; z-index: 10}
.n-menu .n-menu-frame::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
.n-menu .n-menu-frame::-webkit-scrollbar-thumb{ background-color: #002aa6;}
.n-menu .copyright{ position: absolute; left: 35px; bottom: 30px;}
.n-menu .copyright img { width: 55px;}
.n-menu .copyright span{ font-size: 12px; color: #bebebe;}
</style>

<template>
<div class="n-menu">
   <btn-func @click.native="doShowMenu" type="menu"></btn-func>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
   <div class="n-menu-bg" v-if="showFrame"></div>
   </transition>
   <transition enter-active-class="slideIn500" leave-active-class="slideOut500">
   <div class="n-menu-frame" v-if="showFrame">
      <menu-nav @toggle="toggle"></menu-nav>
      <transition enter-active-class="" leave-active-class="">
      <member v-if="showItem === 'member'"></member>
      <after-sales v-else-if="showItem === 'aftersales'"></after-sales>
      <contact v-else-if="showItem === 'contact'"></contact>
      </transition>
      <btn-func @click.native="doToggleMenu"></btn-func>
      <div class="copyright" v-if="showItem === 'nav'">
         <img src="@/assets/images/logo3.png" /><br>
         <span>Copyright &copyright; 2018HO.AllRights reserved.粤ICP备16121686号-1</span>
      </div>
   </div>
   </transition>
</div>
</template>

<script type="es6">
import MenuNav from './MenuNav.vue'
import member from './member.vue'
import afterSales from './afterSales.vue'
import contact from './Contact.vue'
import btnFunc from '@/components/btnFunc.vue'
export default {
   name: 'App',
   components: { MenuNav, member, afterSales, contact, btnFunc},
   data () {
      return {
         showFrame: false,
         showItem: 'nav'
      }
   },
   methods: {
      doShowMenu () {
         console.log('show')
         this.showFrame = true
      },
      doToggleMenu () {
         console.log('toggle')
         if (this.showItem === 'nav') {
            this.showFrame = false
         } else {
            this.showItem = 'nav'
         }
      },
      toggle (val) {
         this.showItem = val
      }
   }
}

</script>

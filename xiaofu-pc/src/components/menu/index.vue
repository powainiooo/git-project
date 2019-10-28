<style>
.n-menu{ position: fixed; top: 0; right: 0; z-index: 1500;}
.n-menu .n-menu-frame{ width: 500px; height: 100vh; position: absolute; top: 0; right: 0; background-color: #ffffff; transition: all 0.5s cubic-bezier(.25,.76,.36,.97); box-shadow: 0 2px 10px rgba(0,0,0,0.2); overflow-y: scroll;}
.n-menu .n-menu-frame::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
.n-menu .n-menu-frame::-webkit-scrollbar-thumb{ background-color: #002aa6;}
.n-menu .copyright{ position: absolute; left: 35px; bottom: 30px;}
.n-menu .copyright img { width: 55px;}
.n-menu .copyright span{ font-size: 12px; color: #bebebe;}
</style>

<template>
<div class="n-menu">
   <btn-func @click.native="btnFunc"></btn-func>
   <div class="n-menu-frame">
      <menu-nav @toggle="toggle" v-if="showItem === 'nav'"></menu-nav>
      <member v-if="showItem === 'member'"></member>
      <after-sales v-if="showItem === 'aftersales'"></after-sales>
      <contact v-if="showItem === 'contact'"></contact>
      <div class="copyright">
         <img src="@/assets/images/logo3.png" /><br>
         <span>Copyright &copyright; 2018HO.AllRights reserved.粤ICP备16121686号-1</span>
      </div>
   </div>
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
         showItem: 'contact'
      }
   },
   methods: {
      btnFunc () {
         console.log('btnFunc clicked')
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
      }
   }
}

</script>

<style scoped>
   .z-menu { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 500; background-color: rgba(0, 0, 0, 1); transition: all 1s ease-out;}
   .z-menu .btn-menu { position: absolute; top: 50%; right: 0; display: flex; align-items: center; margin-top: -75px; transition: all 0.3s ease-out; z-index: 10;}
   .z-menu .btn-menu .icon-menu { width: 32px; margin-right: 18px; transition: all 0.3s ease-out;}
   .z-menu .btn-menu div { width: 80px; height: 150px; background-color: #ffd400; display: flex; align-items: center; overflow: hidden; transition: all 0.3s ease-out;}
   .z-menu .btn-menu div img { width: 18px; margin-left: 20px;}
   .z-menu-fold { width: 60px; background-color: rgba(0, 0, 0, 0);}
   .z-menu .btn-menu-small { margin-top: -20px;}
   .z-menu .btn-menu-small .icon-menu { width: 10px; margin-right: 12px;}
   .z-menu .btn-menu-small div { width: 2px; height: 40px}

   .nav-list { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;}
   .nav-list .level1 { width: 960px;}
   .nav-list .level1>li { margin-bottom: 50px; position: relative;}
   .nav-list .level1>li:last-child { margin-bottom: 0;}
   .nav-list .level1>li>a { display: block; font-size: 80px; line-height: 80px; color: #ffffff; font-family: TTHBold; transition: all 0.15s linear;}
   .nav-list .level1>li>a:hover { color: #ffd400; transform: translateX(-40px)}
   .nav-list .level2 { width: 350px; position: absolute; left: -340px; top: 0; padding-top: 80px;}
   .nav-list .level2:before { content: ''; width: 300px; height: 1px; background-color: #afafaf; position: absolute; top: 80px; left: 0;}
   .nav-list .level2 li { margin-top: 20px;}
   .nav-list .level2 li a { font-size: 16px; font-family: TTHBold; color: #ffffff;}
   .nav-list .level2 li a:hover { color: #ffd400;}
   .nav-list .menuIn { animation: menuIn 0.2s linear}
   @keyframes menuIn {
      0% { transform: translateX(40px); opacity: 0;}
      100% { transform: translateX(0); opacity: 1;}
   }
   .nav-list .menuOut { animation: menuOut 0.2s linear}
   @keyframes menuOut {
      0% { transform: translateX(0); opacity: 1;}
      100% { transform: translateX(40px); opacity: 0;}
   }
</style>

<template>
<div class="z-menu" :class="{'z-menu-fold':fold}">
   <a href="javascript:;"
      class="btn-menu"
      :class="{'btn-menu-small':smallBtn}"
      @click="toggleFold">
      <img src="@/assets/images/icon-menu.png" class="icon-menu"/>
      <div><img src="@/assets/images/icon-arrow.png"/></div>
   </a>

   <nav class="nav-list">
      <ul class="level1" v-if="!fold">
         <li v-for="(item, index) in navList"
             @mouseover="level2Index = index"
             @mouselever="level2Index = -1"
             :key="index"
             >
            <a href="javascript:;">{{item.name}}</a>
            <transition enter-active-class="menuIn" leave-active-class="menuOut">
               <ul class="level2" v-if="item.list && level2Index === index">
                  <li v-for="item2 in item.list" :key="item2"><a href="javascript:;">{{item2}}</a></li>
               </ul>
            </transition>
         </li>
      </ul>
   </nav>
</div>
</template>

<script>
export default {
   name: 'zMenu',
   data () {
      return {
         fold: true,
         smallBtn: true,
         navList: [
            { name: 'Brand', list: ['Brand1', 'Brand2'] },
            { name: 'Series', list: ['Series1', 'Series2'] },
            { name: 'Accessories', list: ['Accessories1', 'Accessories2'] },
            { name: 'Test Drive & After-sales' }
         ],
         level2Index: -1
      }
   },
   methods: {
      toggleFold () {
         if (this.fold) {
            this.fold = false
            setTimeout(() => {
               this.smallBtn = false
            }, 1000)
         } else {
            this.smallBtn = true
            setTimeout(() => {
               this.fold = true
            }, 300)
         }
      }
   }
}
</script>

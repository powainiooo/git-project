<style scoped>
   .z-menu { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 500; background-color: rgba(0, 0, 0, 1); transition: all 0.6s cubic-bezier(.25,.7,.44,.94);}
   .z-menu .btn-menu { position: absolute; top: 50%; left: 100%; display: flex; align-items: center; margin-top: -75px; transition: all 0.3s ease-out; z-index: 10; margin-left: -124px;}
   .z-menu .btn-menu .icon-menu { width: 32px; margin-right: 12px; transition: all 0.3s ease-out; opacity: 0;}
   .z-menu .btn-menu div { width: 80px; height: 150px; background-color: #ffd400; display: flex; align-items: center; overflow: hidden; transition: all 0.3s ease-out;}
   .z-menu .btn-menu div img { width: 18px; margin-left: 20px;}
   .z-menu-fold { width: 60px; background-color: rgba(0, 0, 0, 0);}
   .z-menu-fold .btn-menu { margin-left: -30px;}
   .z-menu-fold .btn-menu .icon-menu { opacity: 1;}
   .z-menu .btn-menu-small { margin-top: -20px;}
   .z-menu .btn-menu-small .icon-menu { width: 10px;}
   .z-menu .btn-menu-small div { width: 2px; height: 40px}

   .nav-list { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;}
   .nav-list .level1 { width: 960px;}
   .nav-list .level1 .li1 { margin-bottom: 50px; position: relative;}
   .nav-list .level1 .li1:last-child { margin-bottom: 0;}
   .nav-list .level1 .li1 .name1 { display: block; font-size: 80px; line-height: 80px; color: #ffffff; font-family: TTHBold; transition: all 0.15s linear;}
   /*.nav-list .level1 .li1>a:hover { color: #ffd400; transform: translateX(-40px)}*/
   .nav-list .level1 .li1.active .name1 { color: #ffd400; transform: translateX(-40px)}
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
   .nav-list .firstIn { animation: firstIn 0.4s ease-out both}
   @keyframes firstIn {
      0% { transform: translateX(100px); opacity: 0;}
      100% { transform: translateX(0); opacity: 1;}
   }
   .nav-list .li1:nth-child(1) .name1 { animation-delay: 0.1s;}
   .nav-list .li1:nth-child(2) .name1 { animation-delay: 0.2s;}
   .nav-list .li1:nth-child(3) .name1 { animation-delay: 0.3s;}
   .nav-list .li1:nth-child(4) .name1 { animation-delay: 0.4s;}
   .nav-list .li1:nth-child(5) .name1 { animation-delay: 0.5s;}
</style>

<template>
<div class="z-menu" :class="{'z-menu-fold':fold}">
   <a href="javascript:;"
      class="btn-menu"
      :class="{'btn-menu-small':smallBtn}"
      @click="toggleFold" @mouseover="smallBtn = false" @mouseleave="mousel">
      <img src="@/assets/images/icon-menu.png" class="icon-menu"/>
      <div>
         <img src="@/assets/images/icon-arrow.png" v-if="!fold"/>
         <img src="@/assets/images/icon-arrow-right.png" v-else/>
      </div>
   </a>

   <nav class="nav-list">
      <ul class="level1">
         <li v-for="(item, index) in navList"
             @mouseover="level2Index = index"
             @mouseleave="level2Index = -1"
             :key="index"
             class="li1"
             :class="{'active':level2Index === index}">
            <transition enter-active-class="firstIn">
            <a href="javascript:;" class="name1" v-if="showMenu">{{item.name}}</a>
            </transition>
            <transition enter-active-class="menuIn" leave-active-class="menuOut">
               <ul class="level2" v-if="item.list && level2Index === index">
                  <li v-for="item2 in item.list" :key="item2.name"><a :href="item2.href">{{item2.name}}</a></li>
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
            {
               name: 'Brand',
               list: [
                  { name: 'Brand story', href: 'index.html?page=1' },
                  { name: 'Brand Concept', href: 'index.html?page=2' },
                  { name: 'The Owner Story', href: 'index.html?page=3' }
               ]
            },
            {
               name: 'Series',
               list: [
                  { name: 'Core advantages of concept car', href: 'detail2.html' },
                  { name: 'Production model series', href: 'index.html?page=4' }
               ]
            },
            {
               name: 'Accessories',
               list: [
                  { name: 'Accessories', href: 'index.html?page=5' }
               ]
            },
            {
               name: 'Test Drive & After-sales',
               list: [
                  { name: 'Test Drive', href: 'index.html?page=6' },
                  { name: 'After-sales', href: 'index.html?page=aftersales' }
               ]
            },
            {
               name: 'About EV',
               list: [
                  { name: 'Media Center', href: 'news.html' },
                  { name: 'Join us', href: 'contact.html?page=join' },
                  { name: 'Contact us', href: 'contact.html?page=contact' }
               ]
            }
         ],
         level2Index: -1,
         showMenu: false
      }
   },
   methods: {
      mousel () {
         if (this.fold) {
            this.smallBtn = true
         }
      },
      toggleFold () {
         if (this.fold) {
            this.fold = false
            this.smallBtn = false
            setTimeout(() => {
               this.showMenu = true
            }, 600)
         } else {
            this.showMenu = false
            this.smallBtn = true
            this.fold = true
         }
      }
   }
}
</script>

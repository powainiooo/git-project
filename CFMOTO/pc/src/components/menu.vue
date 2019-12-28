<style scoped>
   .z-menu { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 500; background-color: rgba(0, 0, 0, 1); transition: all 1s ease-out;}
   .z-menu .btn-menu { position: absolute; top: 50%; right: 0; display: flex; align-items: center; margin-top: -75px; transition: all 0.3s ease-out;}
   .z-menu .btn-menu .icon-menu { width: 32px; margin-right: 18px; transition: all 0.3s ease-out;}
   .z-menu .btn-menu div { width: 80px; height: 150px; background-color: #ffd400; display: flex; align-items: center; overflow: hidden; transition: all 0.3s ease-out;}
   .z-menu .btn-menu div img { width: 18px; margin-left: 20px;}
   .z-menu-fold { width: 60px; background-color: rgba(0, 0, 0, 0);}
   .z-menu .btn-menu-small { margin-top: -20px;}
   .z-menu .btn-menu-small .icon-menu { width: 10px; margin-right: 12px;}
   .z-menu .btn-menu-small div { width: 2px; height: 40px}

   .nav-list { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;}
   .nav-list .level1 { width: 960px;}
   .nav-list .level1>li { margin-bottom: 50px;}
   .nav-list .level1>li:last-child { margin-bottom: 0;}
   .nav-list .level1>li>a { display: block; font-size: 80px; line-height: 80px; color: #ffffff; font-family: TTHBold; transition: all 0.15s linear;}
   .nav-list .level1>li>a:hover { color: #ffd400; transform: translateX(-40px)}
</style>

<template>
<div class="z-menu" :class="{'z-menu-fold':fold}">
   <a href="javascript:;" class="btn-menu" :class="{'btn-menu-small':smallBtn}" @click="toggleFold">
      <img src="@/assets/images/icon-menu.png" class="icon-menu"/>
      <div><img src="@/assets/images/icon-arrow.png"/></div>
   </a>

   <nav class="nav-list">
      <ul class="level1">
         <li>
            <a href="javascript:;">Brand</a>
         </li>
         <li>
            <a href="javascript:;">Series</a>
         </li>
         <li>
            <a href="javascript:;">Accessories</a>
         </li>
         <li>
            <a href="javascript:;">Test Drive & After-sales</a>
         </li>
         <li>
            <a href="javascript:;">About EV</a>
         </li>
      </ul>
   </nav>
</div>
</template>

<script>
   export default {
      name: 'menu',
      data () {
         return {
            fold: false,
            smallBtn: true
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

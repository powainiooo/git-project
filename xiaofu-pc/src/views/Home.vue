<style lang="stylus" type="text/stylus">
   .container
      min-height 100vh
      background-image url("../assets/images/go.png")
      background-repeat no-repeat
      background-position 0 42%
      .right
         margin-left 460px
         min-height 100vh
         overflow hidden
         background-color rgba(255, 255, 255, 0.1)
      .pro-list-container
         width 1090px
         margin 70px auto
         .pro-list
            margin 0 -25px
            display flex
            flex-wrap wrap
            .list-item
               margin 0 25px 100px 25px
</style>

<template>
   <div class="container">
      <search></search>
      <div class="right">
         <banner></banner>
         <div class="pro-list-container">
            <div class="pro-list">
               <list-item fold></list-item>
               <list-item fold></list-item>
               <list-item fold></list-item>
               <list-item fold></list-item>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import search from '@/components/search.vue'
   import banner from '@/components/banner.vue'
   import listItem from '@/components/listItem.vue'
   export default {
      name: 'home',
      components: {
         search,
         banner,
         listItem
      }
   }
</script>

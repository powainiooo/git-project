<style lang="stylus" type="text/stylus" scoped>
   .list-item
      width 100%
      transition transform 0.1s ease-out
      .frame
         width 100%
         font-family 'Helve'
         position relative
         padding 25px
         background-color #ffffff
         box-shadow 0 0 10px rgba(0, 0, 0, 0.1)
      .top
         height 122px
         border-bottom 1px solid #c1c1c1
         overflow hidden
         .date
            width 210px
            float left
            border-right 1px solid #c1c1c1
            .year
               height 32px
               display flex
               justify-content space-between
               align-items center
               font-size 14px
               padding 0 20px
               border-bottom 1px solid #c1c1c1
            .days
               height 90px
               font-size 70px
               line-height 90px
               font-family 'Helve'
               text-align center
         .date2
            width 300px
         .date3
            width 300px
            .days
               font-size 50px
         .logo
            height 100%
            display flex
            align-items center
            justify-content center
            img
               width auto
               height 70%

      .title
         font-size 30px
         line-height 1.2
         font-family 'Helve'
         padding 15px 20px
         overflow hidden
      .bottom
         display flex
         border-top 1px solid #c1c1c1
      .time
         width 210px
         height 40px
         border-right 1px solid #c1c1c1
         font-size 18px
         padding 0 20px
         display flex
         align-items center
      .address
         font-size 18px
         padding 0 20px
         display flex
         align-items center
      .imgs
         height 286px
         overflow hidden
         display flex
         justify-content center
         align-items center
         position relative
         z-index 10
         box-shadow 0 0 20px rgba(0, 0, 0, 0.25)
         img
            width 100%
</style>

<template>
   <div class="list-item">
      <div class="imgs"><img :src="imgSrc + itemData.cover2"/></div>
      <!--<div class="imgs"><img src="@/assets/images/img.jpg"/></div>-->
      <div class="frame slideUp" style="animation-delay: 0.5s" ref="frame">
         <div class="top">
            <div class="date" :class="`date${itemData.type}`">
               <div class="year">
                  <span v-for="i in itemData.begin.slice(0, 4)">{{i}}</span>
               </div>
               <div class="days">{{itemData.date}}</div>
            </div>
            <div class="logo"><img src="@/assets/images/logo2.png"/></div>
            <!--<div class="logo"><img :src="imgSrc + itemData.cover"/></div>-->
         </div>
         <div class="title" v-if="itemData.activity === ''">{{itemData.goods_name}}</div>
         <div class="title" v-else>{{itemData.goods_name}} | {{itemData.activity}}</div>
         <div class="bottom">
            <div class="time">{{itemData.hour_b}}-{{itemData.hour_e}}</div>
            <div class="address">{{itemData.address}}</div>
         </div>
      </div>
   </div>
</template>

<script>
    export default {
       name: "list-item",
       props:{
          itemData: {
             type: Object,
             default: () => {}
          }
       },
       data() {
          return {}
       },
       computed: {
          imgSrc () {
             return this.$store.state.imgSrc
          }
       }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
   .list-item
      width 330px
      .frame
         width 330px
         font-family 'Helve'
         position relative
         transform-origin 0 0
         &::before
            content ''
            width 100%
            height 2px
            background url("../assets/images/ticket-top.png") no-repeat
            position absolute
            top -2px
            left 0
         &::after
            content ''
            width 100%
            height 174px
            background url("../assets/images/ticket-shadow2.png") no-repeat
            position absolute
            bottom -84px
            left 0
      .top
         height 85px
         border-bottom 1px solid #c1c1c1
         background-color #ffffff
         overflow hidden
         .date
            width 140px
            float left
            border-right 1px solid #c1c1c1
            .year
               height 20px
               display flex
               justify-content space-between
               align-items center
               font-size 12px
               padding 0 10px
               border-bottom 1px solid #c1c1c1
            .days
               font-size 44px
               line-height 65px
               font-family 'Helve'
               text-align center
         .date2
            width 190px
         .date3
            width 190px
            .days
               font-size 32px
         .logo
            height 100%
            text-align center
            img
               width auto
               height 100%

      .title
         font-size 24px
         background-color #ffffff
         line-height 1.2
         font-family 'Helve'
         padding 6px 12px
         overflow hidden
      .time
         font-size 16px
         border-top 1px solid #c1c1c1
         padding 6px 12px
         background-color #ffffff
      .address
         font-size 16px
         border-top 1px solid #c1c1c1
         padding 6px 12px
         background-color #ffffff
      .imgs
         height 286px
         mask-image: url('../assets/images/cover.png');
         mask-position center bottom
         overflow hidden
         display flex
         justify-content center
         align-items center
         img
            width 100%
   .list-item-fold
      .frame
         &::after
            background-image url("../assets/images/ticket-shadow2.png")
      .title
         word-break break-all
         white-space nowrap
         text-overflow ellipsis
      .time
         display none
      .address
         display none
      .imgs
         height 143px
</style>

<template>
   <div class="list-item" :class="{'list-item-fold': fold}" :style="{width: width + 'px'}">
      <div class="frame" :style="{transform: 'scale('+ width/330 + ')'}" ref="frame">
         <div class="top">
            <div class="date">
               <div class="year">
                  <span>2</span>
                  <span>0</span>
                  <span>1</span>
                  <span>8</span>
               </div>
               <div class="days">{{itemData.date}}</div>
            </div>
            <div class="logo"><img :src="imgSrc + itemData.cover"/></div>
         </div>
         <div class="title" v-if="itemData.activity === ''">{{itemData.goods_name}}</div>
         <div class="title" v-else>{{itemData.goods_name}} | {{itemData.activity}}</div>
         <div class="time">{{itemData.hour_b}}-{{itemData.hour_e}}</div>
         <div class="address">{{itemData.address}}</div>
         <div class="imgs"><img :src="imgSrc + itemData.cover2"/></div>
      </div>
   </div>
</template>

<script>
    export default {
       name: "list-item",
       props:{
          fold: {
             type: Boolean,
             default: false
          },
          width: {
             type: Number,
             default: 330
          },
          itemData: {
             type: Object,
             default: () => {}
          }
       },
       computed: {
          imgSrc () {
             return this.$store.state.imgSrc
          }
       }
    }
</script>

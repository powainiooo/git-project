<style lang="stylus" type="text/stylus">
   .aside-frame
      width 24vw
      min-width 335px
      max-width 460px
      height 100vh
      /*position absolute*/
      /*top 0*/
      /*left 0*/
      /*bottom 0*/
      /*z-index 1000*/
      position relative
      float left
      .logo
         font-size 32px
         color #ffffff
         position absolute
         top 60px
         left 60px
         cursor pointer
         z-index 1500
   .aside-search
      width 335px
      position absolute
      top 360px
      right 25px
      h3
         font-size 20px
         font-family 'Helve'
         line-height 26px
         color #ffffff
         margin 0 0 20px 65px
      .search-frame
         background url("../assets/images/search-frame.png") no-repeat
         width 335px
         height 281px
         overflow hidden
         input
            width 200px
            height 38px
            font-size 16px
            line-height 38px
            border none
            background-color transparent
            outline none
         a
            box-sizing content-box
            width 38px
            height 38px
            padding-left 8px
         .keyword
            margin 35px 0 0 48px
            display flex
            align-items center
            input
               color #333333
               border-right 1px solid #e5e5e5
               &::-webkit-input-placeholder
                  color #b5b5b5
            a
               border-left 1px solid #f6f6f6
               background url("../assets/images/icon-search.png") no-repeat center center
         .date
            margin 32px 0 0 18px
            display flex
            align-items center
            input
               width 300px
               height 54px
               line-height 54px
               padding 4px 0 0 30px
               color #ffffff
               border-right 1px solid #002aa6
               &::-webkit-input-placeholder
                  color #ffffff
            a
               border-left 1px solid #0033b2
               cursor default
               background url("../assets/images/icon-calendar.png") no-repeat center center
               position absolute
               top 185px
               right 40px
               z-index 0
            .date-picker
               width 300px
               height 54px
               position absolute
               bottom 120px
               left 18px
               .ivu-date-picker-rel
                  opacity 0
   .to-xiaofu
      width 290px
      position absolute
      right 40px
      bottom 40px
      &::before
         content '在 小夫有票 发布票务？'
         font-size 14px
         color #ffffff
         position absolute
         top -25px
         left 70px
      .n-btn a
         font-size 22px
</style>

<template>
   <aside class="aside-frame">
      <div class="logo" @click="backIndex">
         <img src="@/assets/images/logo.png" />
      </div>
      <div class="aside-search" :style="searchStyle">
         <h3>直达你的活动现场<br>Go to your events</h3>
         <div class="search-frame">
            <div class="keyword">
               <input type="text" placeholder="输入活动、艺人或城市" v-model="keyword" @keydown.enter="doSearch"/>
               <a href="javascript:;" @click="doSearch"></a>
            </div>
            <div class="date">
               <input type="text" v-model='dateVal' placeholder="或选择日期" readonly/>
               <DatePicker v-model='date' format="yyyy/MM/dd" @on-change="dateChange" class="date-picker"></DatePicker>
               <a href="javascript:;"></a>
            </div>
         </div>
      </div>
      <div class="to-xiaofu">
         <t-button @dotap="toXiaofu">
            <i class="icon-logo"></i>
         </t-button>
      </div>

   </aside>
</template>

<script type='es6'>
   import TButton from './TButton.vue'
   export default {
      name: 'search',
      components: { TButton },
      data() {
         return {
            keyword: '',
            date: '',
            dateVal: '',
         }
      },
      computed: {
         searchStyle () {
            return {
               right: this.$store.state.leftDis + 'px'
            }
         },
         xiaofuStyle () {
            return {
               right: this.$store.state.leftDis + 15 + 'px'
            }
         },
      },
      methods: {
         doSearch (e) {
            this.date = ''
            this.dateVal = ''
            this.$emit('search', {
               keyword: this.keyword,
               date: this.date
            })
         },
         dateChange (e) {
            this.keyword = ''
            this.dateVal = e
            this.$emit('search', {
               keyword: this.keyword,
               date: e
            })
         },
         toXiaofu () {
            window.location = 'https://editor.leesticket.com'
         },
         reset () {
            this.keyword = ''
            this.date = ''
            this.dateVal = ''
         },
         backIndex () {
            this.$emit('taplogo')
         }
      }
   }
</script>

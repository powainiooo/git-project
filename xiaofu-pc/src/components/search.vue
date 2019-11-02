<style lang="stylus" type="text/stylus">
   .aside-frame
      width 460px
      position absolute
      top 0
      left 0
      bottom 0
      z-index 1000
   .aside-search
      width 335px
      position absolute
      top 360px
      right 20px
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
            margin 42px 0 0 48px
            display flex
            align-items center
            input
               color #ffffff
               border-right 1px solid #002aa6
               &::-webkit-input-placeholder
                  color #ffffff
            a
               border-left 1px solid #0033b2
               cursor default
               background url("../assets/images/icon-calendar.png") no-repeat center center
         .v2-date-wrap
            width 200px
            background-color transparent
            border none
            svg
               display none
            .v2-picker-trigger
               font-size 16px
               padding 0
               color #ffffff
   .to-xiaofu
      position absolute
      right 40px
      bottom 40px
</style>

<template>
   <aside class="aside-frame">
      <div class="aside-search">
         <h3>直达你的活动现场<br>Go to your events {{date}}</h3>
         <div class="search-frame">
            <div class="keyword">
               <input type="text" placeholder="输入活动、艺人或城市" v-model="keyword"/>
               <a href="javascript:;" @click="doSearch"></a>
            </div>
            <div class="date">
               <!--<input type="text" placeholder="或选择日期"/>-->
               <v2-datepicker v-model='date' placeholder="或选择日期" @change="dateChange" ref="picker"></v2-datepicker>
               <a href="javascript:;"></a>
            </div>
         </div>
      </div>
      <a href="https://editor.leesticket.com" class="to-xiaofu">
         <img src="../assets/images/btn.png">
      </a>
   </aside>
</template>

<script type='es6'>
   export default {
      name: 'search',
      data() {
         return {
            keyword: '',
            date: ''
         }
      },
      methods: {
         doSearch (e) {
            this.date = ''
            this.$refs.picker.displayDate = ''
            this.$emit('search', {
               keyword: this.keyword,
               date: this.date
            })
         },
         dateChange (e) {
            this.keyword = ''
            this.$emit('search', {
               keyword: this.keyword,
               date: this.date
            })
         }
      }
   }
</script>

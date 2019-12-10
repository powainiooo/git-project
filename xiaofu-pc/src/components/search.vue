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
      top 50%
      right 25px
      margin-top -170px
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
         a.icon
            box-sizing content-box
            width 38px
            height 38px
            padding-left 8px
         .icon-back
            width 18px
            height 17px
            background url("../assets/images/icon-back.png") no-repeat
            position absolute
         .keyword
            margin 35px 0 0 48px
            display flex
            align-items center
            input
               color #333333
               border-right 1px solid #e5e5e5
               padding-right 40px
               &::-webkit-input-placeholder
                  color #b5b5b5
            .icon-back
               background-image url("../assets/images/icon-back2.png")
               top 117px
               right 105px
            a.icon
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
               cursor pointer
               padding 4px 0 0 30px
               color #ffffff
               &::-webkit-input-placeholder
                  color #ffffff
            a.icon
               border-left 1px solid #0033b2
               cursor pointer
               background url("../assets/images/icon-calendar.png") no-repeat center center
               position absolute
               top 185px
               right 40px
               z-index 0
            .icon-back
               top 196px
               right 105px
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
               <a href="javascript:;" class="icon-back" v-if="isSearch && keyword !== ''" @click="backIndex" title="清空搜索"></a>
               <a href="javascript:;" @click="doSearch" class="icon"></a>
            </div>
            <div class="date">
               <input type="text" v-model='date' placeholder="或选择日期" readonly @click.stop="showCalandar = true" name="dateInput"/>
               <a href="javascript:;" name="dateInput" class="icon" @click.stop="showCalandar = true"></a>
               <a href="javascript:;" class="icon-back" v-if="isSearch && date !== ''" @click="backIndex" title="清空搜索"></a>
               <transition enter-active-class="dropIn" leave-active-class="dropOut">
                  <date-picker v-model="date" @change="dateChange" v-if="showCalandar" v-click-outside:pointerdown="calandarClickOutside"></date-picker>
               </transition>
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
   import datePicker from './datePicker.vue'
   import * as vClickOutside from 'v-click-outside-x'
   export default {
      name: 'search',
      components: { TButton, datePicker },
      directives: {
         clickOutside: vClickOutside.directive,
      },
      data() {
         return {
            keyword: '',
            date: '',
            showCalandar: false,
            isSearch: false
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
            this.isSearch = true
            this.date = ''
            this.$emit('search', {
               keyword: this.keyword,
               date: this.date
            })
         },
         dateChange (e) {
            this.isSearch = true
            this.showCalandar = false
            this.keyword = ''
            this.date = e
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
         },
         backIndex () {
            this.isSearch = false
            this.$emit('taplogo')
         },
         calandarClickOutside (e) {
            if (e.target.name !== 'dateInput') {
               this.showCalandar = false
            }
         }
      }
   }
</script>

<style lang="stylus" type="text/stylus" scoped>
@import "../assets/css/global.styl"
.c-ticket
  transition transform 0.15s ease-in-out
  cursor pointer
  &.operates-ticket
    -webkit-mask-image url('../assets/img/mask5.png')
    -webkit-mask-repeat no-repeat
    -webkit-mask-size 420px 340px
  &-touch
    transform scale(.96)
  &-operates
    height 60px
    between()
    background-color #ffffff
  &-status
    size(120px, 60px)
    background linear-gradient(165deg, #0027AF, #2154DA 54%,#003AC3)
    center()
    p
      color #ffffff
      margin-left 10px
  &-nums
    margin-left 15px
    font-size 34px
    color #C8C9CA
    font-family HelveThin
    span
      font-size 34px
      color #6D9BF5
      font-weight bold
  &-select
    margin-right 10px
  .operates0
    background linear-gradient(165deg, #5B85E6, #6D9AF4)
    .c-ticket-status
      background none
  .operates1
    background linear-gradient(165deg, #EC1A63, #E3007F)
    .c-ticket-status
      background none
  .operates3
    .c-ticket-status
      background linear-gradient(165deg, #717071,#B4B4B5)
  .operates4
    .c-ticket-status
      background linear-gradient(165deg, #E95513, #F29600)
  .operates5
    .c-ticket-status
      background linear-gradient(165deg, #3E3A39, #000000 54%, #3E3A39)
  &-btn
    size(90px, 30px)
    background-color #ffffff
    border-radius 10px
    border none
    box-shadow 0px 2px 5px 0px rgba(0, 0, 0, 0.15)
    center()
    color #6D9BF5
    margin-right 10px
  .operates-body
    -webkit-mask-image none
  &-body
    size(420px, 280px)
    background-color #ffffff
  .c-ticket-body-min
    size(340px, 267px)
    -webkit-mask-image url('../assets/img/mask2.png')
    -webkit-mask-repeat no-repeat
    -webkit-mask-size 340px 267px
  &-header
    height 60px
    between()
    padding 0 6px 0 12px
    .flex
      align-items center
    &-dates
      size(34px, 34px)
      border-radius 4px
      bgG()
      text-align center
      font-size 12px
      color #ffffff
      position relative
      &:after
        content ''
        height 1px
        background-color rgba(255, 255, 255, .6)
        position absolute
        top 16px
        left 7px
        right 7px
      p
        line-height 17px
      div
        line-height 17px
        font-weight bold
    .end-dates
      margin-left 12px;
      &:before
        content ''
        size(6px, 1px)
        background-color #C8C9CA
        position absolute
        top 16px
        left -9px
    &-titles
      margin-left 12px
      p
        height 18px
        font-size 16px
        line-height 18px
        color #000000
      div
        font-size 12px
        line-height 15px
        color #9E9E9F
    .logo
      size(48px, 48px)
  &-imgs
    size(100%, 220px)
    background-color #EEEEEF
    center()
    overflow hidden
    img
      width 100%
      display block
</style>

<template>
<div class="c-ticket" :class="{'operates-ticket': operates,}">
  <!-- 销售中:2 停止:3 已售罄:4 已结束:5  审核中:0  审核失败:1  -->
  <div class="c-ticket-operates" :class="['operates' + record.sub_state]" v-if="operates">
    <div class="flex">
      <div class="c-ticket-status">
        <a href="javascript:;" v-if="showOffline" @click="handleOff" @mousedown.stop="sm" @mouseup.stop="sm"><img src="@/assets/img/ico-close.png" /></a>
        <p>{{stateTxt[record.sub_state]}}</p>
      </div>
      <div class="c-ticket-nums" v-if="showNums">
        <span>{{soldNums}}</span>/{{totalNums}}
      </div>
    </div>
    <button class="c-ticket-btn" v-if="record.sub_state === 1" @click="toEditor">查看并修改</button>
    <c-select v-else
              class="c-ticket-select"
              :list="record.stocks"
              @change="tChange"/>
  </div>
  <div class="c-ticket-body flip-box-min"
       :class="{
        'operates-body': operates,
        'c-ticket-body-min': size === 'min'
      }">
    <div class="c-ticket-header">
      <div class="flex">
        <div class="c-ticket-header-dates">
          <p>{{dates.month}}</p>
          <div>{{dates.day}}</div>
        </div>
        <div class="c-ticket-header-dates end-dates" v-if="record.type === 2 || record.type === 3">
          <p>{{endDates.month}}</p>
          <div>{{endDates.day}}</div>
        </div>
        <div class="c-ticket-header-titles">
          <p>{{record.name === '' ? '活动名称' : record.name}}</p>
          <div>{{record.organizer_name}}</div>
        </div>
      </div>
      <img :src="record.logo" class="logo" />
    </div>
    <div class="c-ticket-imgs">
      <img :src="record.cover_image" v-if="record.cover_image !== ''" />
      <img src="@/assets/img/default.png" width="420" v-else />
    </div>
  </div>
</div>
</template>

<script type='es6'>
import cSelect from './cSelect'
export default {
  name: 'app',
  props: {
    record: Object,
    operates: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  components: {
    cSelect
  },
  computed: {
    dates () {
      if (this.record.start_date === '') {
        return {
          month: '',
          day: ''
        }
      } else {
        const split = this.record.start_date.split('-')
        return {
          month: split[1],
          day: split[2]
        }
      }
    },
    endDates () {
      if (this.record.end_date === '') {
        return {
          month: '',
          day: ''
        }
      } else {
        const split = this.record.end_date.split('-')
        return {
          month: split[1],
          day: split[2]
        }
      }
    },
    showNums () {
      const s = this.record.sub_state
      if (s === 0 || s === 1) {
        return false
      }
      return true
    },
    soldNums () {
      if (this.selectData.id === -1) {
        return this.record.total_sold_num
      } else {
        return this.selectData.sold_num
      }
    },
    totalNums () {
      if (this.selectData.id === -1) {
        return this.record.total_stock_num
      } else {
        return this.selectData.num
      }
    },
    showOffline () {
      if (this.record.sub_state === 2 || this.record.sub_state === 3) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      stateTxt: ['审核中', '审核失败', '销售中', '停止', '已售罄', '已结束'],
      selectData: {
        id: -1
      }
    }
  },
  methods: {
    tChange (data) {
      this.selectData = data
    },
    toEditor () {
      this.$router.push({
        name: 'Publish',
        query: {
          type: 'modify',
          id: this.record.id
        }
      })
    },
    handleOff () {
      this.$emit('offline', this.record)
    },
    sm () {}
  }
}
</script>

<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
@import "../../../assets/css/global.styl"
.hots-container
  size(38%, 640px)
  li
    between(); margin-bottom 15px; align-items flex-start;
    .index
      width 120px; font-size 48px; color mainColor; font-family DinL; text-align center; line-height 58px;
    .imgs
      size(60px, 60px); border-radius 12px; overflow hidden; margin-right 30px; margin-top 10px;
      img
        width 100%; display block;
    .name
      width 150px; color #9E9E9F; margin-top 17px; line-height 21px;
    .nums
      font-size 48px; font-family DinB; line-height 56px; margin-right 50px;
</style>

<template>
<div class="box2 hots-container">
  <div class="box2-title">今日热卖产品</div>
  <div class="box2-body scrollBar">
    <ul class="mt20">
      <li v-for="(item, index) in list" :key="index">
        <div class="flex">
          <div class="index">{{index + 1}}</div>
          <div class="imgs"><img :src="imgSrc + item.goods_cover" /></div>
          <div class="name">{{item.goods_name}}</div>
        </div>
        <p class="nums">{{item.buy_nums}}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script type='es6'>
import { getAction } from '@/utils'
import { formatDate } from '@/utils/tools'

export default {
  name: 'app',
  computed: {
    imgSrc () {
      return this.$store.state.imgSrc
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      const date = formatDate(new Date(), 'yyyy-MM-dd')
      getAction('/shopapi/count/sell/rank', {
        date,
        type: 1,
        limit: 10
      }).then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

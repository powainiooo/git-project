<style scoped>

</style>

<template>
<div class="c-goods-item"
     :class="{'c-goods-item-soldout': soldout}"
     hover-class="hscale"
     hover-stay-time="10"
     @click="openDetail">
  <div class="imgs"><img :src="imgSrc + record.cover" mode="aspectFill" /></div>
  <div class="infos">
    <h3 class="title">{{record.title}}</h3>
    <div class="intro">{{record.content}}</div>
    <div class="price"><span>{{record.price}}</span>元</div>
    <div class="tagC btn-add" v-if="!disabled && !soldOut">选规格<span v-if="nums > 0">{{nums}}</span></div>
    <div class="soldout" v-if="soldOut">已售罄</div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    record: Object,
    cartList: Array,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    nums () {
      let num = 0
      this.cartList.forEach(i => {
        if (i.goods_id === this.record.id) {
          num += i.buy_nums
        }
      })
      return num
    },
    soldOut () {
      return this.record.store_nums === 0
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {
    openDetail () {
      if (!this.disabled && !this.soldOut) {
        this.$emit('detail', {
          id: this.record.id,
          num: this.nums
        })
      }
    }
  }
}
</script>

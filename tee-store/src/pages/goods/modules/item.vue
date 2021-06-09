<style scoped>

</style>

<template>
<div class="c-goods-item" hover-class="hscale" hover-stay-time="10" @click="openDetail">
  <div class="imgs"><img :src="imgSrc + record.cover" mode="aspectFill" /></div>
  <div class="infos">
    <h3 class="title">{{record.title}}</h3>
    <div class="intro">{{record.content}}</div>
    <div class="price"><span>{{record.price}}</span>元</div>
    <div class="tagC btn-add" v-if="!disabled">选规格<span v-if="nums > 0">{{nums}}</span></div>
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
      const item = this.cartList.find(i => i.goods_id === this.record.id)
      return item === undefined ? 0 : item.buy_nums
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {
    openDetail () {
      if (!this.disabled) {
        this.$emit('detail', {
          id: this.record.id,
          num: this.nums
        })
      }
    }
  }
}
</script>

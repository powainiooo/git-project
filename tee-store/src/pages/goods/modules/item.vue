<style scoped>

</style>

<template>
<div class="c-goods-item" hover-class="hscale" hover-stay-time="10" @click="openDetail">
  <div class="imgs"><img :src="imgSrc + record.cover" mode="aspectFill" /></div>
  <div class="infos">
    <h3 class="title">{{record.title}}</h3>
    <div class="intro">{{record.content}}</div>
    <div class="price"><span>{{record.price}}</span>元</div>
    <div class="tagC btn-add" v-if="!disabled"><img src="/static/images/add.png" mode="widthFix" class="w22" /></div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    record: Object,
    disabled: {
      type: Boolean,
      default: false
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
        this.$emit('detail', this.record.id)
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
<div class="c-goods-item">
  <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
  <div class="infos">
    <h3 class="title">{{record.name}}</h3>
    <div class="intro">优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇，柠檬的清香与红茶的醇</div>
    <div class="price"><span>25</span>元</div>
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
    return {}
  },
  methods: {}
}
</script>

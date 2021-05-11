<style scoped>
.c-cates { width: 160px; position: fixed; top: 304px; left: 0; bottom: 0; padding-bottom: 160px; }
.c-cates-list { margin: 0 24px; }
.c-cates-list:before { background-color: #FFFFFF; }
.c-cates-list li { height: 100px; font-size: 24px; line-height: 26px; color: #B2A89E; text-align: center; }
.c-cates-list li.active { color: #41372D; }
.c-cates-list li:after { background-color: #FFFFFF; }
.c-cates-arrow { width: 25px; position: absolute; top: 0; right: -1px; transform: translateY(8px); transition: top 0.3s cubic-bezier(.23,.78,.33,.97); }
</style>

<template>
<div class="c-cates">
  <ul class="c-cates-list borderT">
    <li class="borderB center"
        :class="{'active': index === current}"
        v-for="i in list"
        :key="index">{{i}}</li>
  </ul>
  <img src="/static/images/arrow2.png"
       mode="widthFix"
       class="c-cates-arrow"
       :style="{top: index * 100 + 'rpx'}" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array,
    current: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

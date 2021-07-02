<style scoped>
.c-cates { width: 160px; position: fixed; top: 304px; left: 0; bottom: 0; z-index: 10; overflow: hidden; overflow-y: scroll; }
.c-cates-list { margin: 0 24px; padding-bottom: 160px; }
.c-cates-list:before { background-color: #FFFFFF; }
.c-cates-list li { height: 100px; font-size: 24px; line-height: 26px; color: #B2A89E; text-align: center; }
.c-cates-list li.active { color: #41372D; }
.c-cates-list li:after { background-color: #FFFFFF; }
.c-cates-arrow { width: 38px; position: absolute; top: 0; right: -1px; transform: translateY(8px); transition: top 0.3s cubic-bezier(.23,.78,.33,.97); }
</style>

<template>
<scroll-view scroll-y class="c-cates">
  <ul class="c-cates-list borderT">
    <li class="borderB center"
        :class="{'active': i.id === current}"
        v-for="i in list"
        :key="index"
        @click="$emit('toggle', i.id)">{{i.name}}</li>
  </ul>
  <img src="/static/images/arrow2.png"
       mode="widthFix"
       class="c-cates-arrow"
       :style="{top: top}" />
</scroll-view>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array,
    current: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    top () {
      let index = this.list.findIndex(i => i.id === this.current)
      if (index === -1) {
        index = 0
      }
      return `${index * 100}rpx`
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

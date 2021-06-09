<style scoped>

</style>

<template>
<div class="c-tabs">
  <ul class="c-tabs-btns">
    <li v-for="tab in tabs"
        :key="key"
        :class="{'active': currentKey === tab.key}"
        @click="tabChange(tab, index)">{{tab.title}}</li>
  </ul>
  <div class="c-tabs-frame">
    <div class="c-tabs-content"
         :style="{
          width: (tabs.length * 100) + '%',
          'margin-left': (index * -100) + '%'
        }">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  current: {
	    type: Number,
      default: 0
    }
  },
	data() {
		return {
		  tabs: [],
      currentKey: 0,
      index: 0
    }
	},
  mounted () {
    const tabs = []
    const nodes = this.$slots.default
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.componentOptions && node.componentOptions.tag === 'tab-pane') {
        tabs.push({
          title: node.componentInstance.$attrs.title,
          key: node.componentInstance.$attrs.name || i
        })
      }
    }
    this.currentKey = tabs[this.current].key
    // console.log('tabs', tabs)
    this.tabs = tabs
    this.index = this.current
  },
	methods: {
    tabChange (record, index) {
      this.currentKey = record.key
      this.index = index
      this.$emit('change', record.key)
    }
  }
}
</script>

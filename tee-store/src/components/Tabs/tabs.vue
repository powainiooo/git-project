<style scoped>
.c-tabs-btns { display: flex; justify-content: center; }
.c-tabs-btns li { width: 320px; height: 100px; display: flex; justify-content: center; align-items: center; font-size: 30px; color: #B9BABB; border-radius: 50px 50px 0 0; background-color: #EDECEB; margin-right: 20px; transition: all .3s cubic-bezier(.23,.78,.33,.97); }
.c-tabs-btns li.active { background-color: #FFFFFF; color: #F0916C; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
.c-tabs-btns li:last-child { margin-right: 0; }
.c-tabs-frame { width: 100%; overflow: hidden; position: relative; z-index: 5; }
.c-tabs-content { overflow: hidden; display: flex; transition: all .4s cubic-bezier(.23,.78,.33,.97); }
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
    this.currentKey = tabs[0].key
    // console.log('tabs', tabs)
    this.tabs = tabs
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

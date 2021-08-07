<style lang="stylus" type="text/stylus">
.c-tabs
  width 100%; height 40px; background-color #FFFFFF; display flex;
  &-item
    flex 1; display flex; justify-content center; align-items center; height 100%; position relative; font-weight bold;
    .filter
      width 10px; height 16px; margin-left 2px;
  &-active
    color #FE322B;
.c-tabs-border
  .c-tabs-active:after
    content ''; width 24px; height 2px; background-color #FE322B; position absolute; bottom 0; left 50%; transform translateX(-50%);
.c-tabs-fixed
  position fixed; top 0; left 0; z-index 1000;
</style>

<template>
<view class="c-tabs"
      :class="{
  'c-tabs-border': border,
  'c-tabs-fixed': fixed
}">
  <view class="c-tabs-item"
        :class="{'c-tabs-active': current === tab.key}"
        v-for="(tab, index) in tabs"
        :key="tab.key"
        @tap="change(index)">
    {{tab.label}}
    <image src="@/img/asc.png" class="filter" v-if="tab.type === 'filter' && tab.sort === 'asc'" />
    <image src="@/img/desc.png" class="filter" v-if="tab.type === 'filter' && tab.sort === 'desc'" />
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'Tabs',
  props: {
	  value: {
	    type: [String, Number],
      default: ''
    },
    list: {
	    type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    fixed: {
	    type: Boolean,
      default: false
    }
  },
  watch: {
	  list: {
	    handler (val) {
        const tabs = []
        for (const item of val) {
          const tab = { ...item }
          if (tab.type === 'filter') {
            tab.sort = 'asc'
          }
          tabs.push(tab)
        }
        this.tabs = tabs
        if (this.value === '') {
          this.current = tabs[0].key
        } else {
          this.current = this.value
        }
      },
      immediate: true
    },
    value (val) {
	    this.current = val
    }
  },
	data() {
		return {
		  current: '',
		  tabs: []
    }
	},
	methods: {
    change (index) {
      const tab = this.tabs[index]
      this.current = tab.key
      this.$emit('input', tab.key)
      if (tab.type === 'filter') {
        if (tab.sort === 'asc') {
          tab.sort = 'desc'
        } else {
          tab.sort = 'asc'
        }
        this.$emit('change', {
          key: tab.key,
          sort: tab.sort
        })
      } else {
        this.$emit('change', tab.key)
      }
    }
  }
}
</script>

<style>
.c-search { height: 36px; border-radius: 18px; position: relative; overflow: hidden; }
.c-search .icon { width: 16px; position: absolute; top: 10px; left: 8px; }
.c-search input { width: 100%; height: 100%; font-size: 14px; padding-left: 34px; }
</style>

<template>
<view class="c-search">
  <image src="@/img/ico-search.png" mode="widthFix" class="icon" />
  <input :placeholder="placeholder"
         :disabled="disabled"
         :style="{backgroundColor: backgroundColor}"
         v-model="value"
         @confirm="confirm" />
</view>
</template>

<script type='es6'>
export default {
	name: 'search',
  props: {
	  placeholder: {
	    type: String,
      default: ''
    },
	  backgroundColor: {
	    type: String,
      default: '#F5F5F5'
    },
	  disabled: {
	    type: Boolean,
      default: false
    }
  },
	data() {
		return {
		  value: ''
    }
	},
	methods: {
    confirm () {
      this.$emit('confirm', this.value)
    },
    setDefault (txt) {
      this.value = txt
    }
  }
}
</script>

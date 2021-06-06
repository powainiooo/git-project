<style scoped>

</style>

<template>
<div class="c-tab-pane">
<slot></slot>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  porps: {
	  title: {
	    type: String,
      default: ''
    },
	  name: {
	    type: [String, Number],
      default: ''
    }
  },
	data() {
		return {}
	},
	methods: {}
}
</script>

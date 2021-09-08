<style scoped>

</style>

<template>
<image :src="imgSrc" v-bind="$attrs" @error="loadErr" />
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  src: String
  },
  computed: {
	  imgSrc () {
	    return this.load ? this.src : require('@/img/default.png')
    }
  },
	data() {
		return {
		  load: true
    }
	},
	methods: {
    loadErr (err) {
      console.log('loadErr', err)
      this.load = false
    }
  }
}
</script>

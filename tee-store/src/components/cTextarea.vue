<style scoped>
.c-textarea { position: relative; }
.c-textarea textarea { width: 100%; border: 1px solid #E5E5E5; border-radius: 35px; padding: 28px 34px; box-sizing: border-box; background-color: #FFFFFF; }
.c-textarea div { position: absolute; bottom: 24px; right: 34px; color: #C9C9C9; font-size: 20px; }
</style>

<template>
<div class="c-textarea">
  <textarea @input="inputChange" placeholder="自带杯子，冰单独打包" :maxlength="maxlength" />
  <div>{{value.length}}/{{maxlength}}</div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
		  value: '',
      maxlength: 50
    }
	},
	methods: {
    inputChange (e) {
      this.value = e.mp.detail.value
    }
  }
}
</script>

<style scoped>
.c-search2 { width: 690px; margin-left: auto; margin-right: auto; position: relative; }
.c-search2-bg { width: 100%; }
.c-search2 input { width: 100%; height: 100%; font-size: 28px; color: #212121; padding-left: 28px; position: absolute; top: 0; left: 0; }
.c-search2-icon { width: 28px; position: absolute; top: 20px; right: 40px; z-index: 100; }
</style>

<template>
<div class="c-search2">
  <img src="/static/images/bg3.png" mode="widthFix" class="c-search2-bg" />
  <input type="text" :placeholder="placeholder" v-model="keyword" @confirm="confirm" />
  <img src="/static/images/sousuo4.png" mode="widthFix" class="c-search2-icon" @click="confirm" />
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
	data() {
		return {
      keyword: ''
    }
	},
	methods: {
    confirm () {
      this.$emit('search', this.keyword)
    }
  }
}
</script>

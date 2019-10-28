<style lang="stylus" type="text/stylus" scoped>
.content
   margin 50px
   font-size 16px
   color #717071
</style>

<template>
<m-block>
   <template slot="en">After<br/>Sales</template>
   <template slot="cn">售后声明</template>
   <div class="content">
      <p>123123123123123123</p>
   </div>
</m-block>
</template>

<script type='es6'>
import mBlock from './block'
export default {
	name: 'app',
   components: {mBlock},
	data() {
		return {}
	},
	methods: {}
}
</script>

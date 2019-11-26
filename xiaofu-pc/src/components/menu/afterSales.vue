<style lang="stylus" type="text/stylus" scoped>
.content
   margin 50px
   font-size 14px
   color #717071
</style>

<template>
<m-block>
   <template slot="en">After<br/>Sales</template>
   <template slot="cn">售后声明</template>
   <div class="content" v-html="content"></div>
</m-block>
</template>

<script type='es6'>
import mBlock from './block'
import {getMenuInfo} from '@/api.js'
export default {
	name: 'app',
   components: {mBlock},
	data() {
		return {
		   content: ''
      }
	},
   mounted () {
      this.getData()
   },
	methods: {
      getData () {
         getMenuInfo('aftersales').then(res => {
            this.content = res.data.aftersales.replace(/\n/g,"<br/>")
         })
      }
   }
}
</script>

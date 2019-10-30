<style lang="stylus" type="text/stylus" scoped>
.content
   margin 50px
   font-size 16px
   color #717071
</style>

<template>
<m-block>
   <template slot="en">Member of<br/>Ho</template>
   <template slot="cn">隶属于</template>
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
         getMenuInfo('member').then(res => {
            console.log(res)
            this.content = res.data.member.replace(/\n/g,"<br/>")
         })
      }
   }
}
</script>

<style>
page { background-color: rgb(248, 248, 248)}
.content { margin: 20px 0 50px 0; background-color: #ffffff; padding: 50px; font-size: 24px; color: #333333; line-height: 56px;}
.btns { width: 500px; margin: 50px auto;}
</style>

<template>
<div>
   <div class="content">
      <rich-text :nodes="contents"></rich-text>
   </div>
   <div class="btns">
      <a href="#" class="btn-round" @click="goBack">确 认</a>
   </div>
</div>
</template>

<script>
import store from '../../store'
export default {
   data () {
      return {
         page: ''
      }
   },
   computed: {
      contents () {
         return store.state[this.page]
      }
   },
   methods: {
      goBack () {
         mpvue.navigateBack({
            delta: -1
         })
      }
   },

   onLoad (options) {
      this.page = options.page
      // let app = getApp()
   }
}
</script>

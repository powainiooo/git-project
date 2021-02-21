<style>
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="container">
   <c-header :title="title" titleColor="#E8E6E4" />
   <div class="list-frame">
      <diy-item />
      <diy-item />
   </div>
   <c-footer btnName="保存|Save" :price="price" @btnFunc="changeStep" />

</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import diyItem from '../modules/diyItem'

export default {
   components: {
      cHeader,
      cFooter,
      diyItem
   },
   data () {
      return {
         hash: {
            food: {
               name: '更换主粮|Replacing staple food',
               id: 1
            },
            canned: {
               name: '更换罐头|Replacing Canned',
               id: 2
            },
            snacks: {
               name: '更换零食|Replacing Snacks',
               id: 3
            },
            toy: '更换玩具|Replacing Toy'
         },
         title: '',
         price: 0
      }
   },
   methods: {
      changeStep () {
         this.step += 1
      }
   },
   onLoad (options) {
      this.source = options.source
      this.title = this.hash[this.source]
   }
}
</script>

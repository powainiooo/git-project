<style>
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="container">
   <c-header title="主粮|Staple food" />
   <div class=""></div>
   <c-footer btnName="加入购物车|Add to cart" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'

export default {
   components: {
      cHeader,
      cFooter
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>

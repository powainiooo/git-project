<style>
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="">
   <button @click="draw">draw</button>
   <canvas canvas-id="myCanvas"
           style="width: 750px; height: 760px; transform-origin: 0 0; transform: scale(.5)"/>
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
   methods: {
      draw () {
         const ctx = wx.createCanvasContext('myCanvas')
         console.log('drawPost', ctx)
         // 背景色
         ctx.setFillStyle('#ff0000')
         ctx.fillRect(0, 0, 750, 760)
         ctx.draw()
      }
   },
   created () {
   }
}
</script>

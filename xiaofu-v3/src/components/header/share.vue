<style scoped>
.canvas-frame { width: 750px; height: 760px; position: fixed; top: 0px; left: 0px; z-index: 10000 }
</style>

<template>
<div>
  <div class="canvas-frame">
    <canvas
      canvas-id="myCanvas"
      style="width: 750px; height: 770px; transform-origin: 0 0; transform: scale(.5)"
    />
  </div>
</div>
</template>

<script type='es6'>
import { promisify } from '@/utils'
const getImageInfo = promisify(mpvue.getImageInfo)
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    initPoster (record) {
      console.log('initPoster')
      const ctx = wx.createCanvasContext('myCanvas')
      console.log('drawPost', ctx)
      // 背景色
      ctx.setFillStyle('#EEEEEF')
      ctx.fillRect(0, 0, 750, 760)
      ctx.draw()

      // 日期
      const date = record.start_date.split('-')
      ctx.font = '20px HelveL'
      ctx.fillStyle = '#ffffff'
      ctx.setTextAlign('center')
      ctx.fillText(date[1], 64, 90)
      ctx.draw(true)
      ctx.font = '20px HelveB'
      ctx.fillStyle = '#ffffff'
      ctx.setTextAlign('center')
      ctx.fillText(date[2], 64, 120)
      ctx.draw(true)
    }
  }
}
</script>

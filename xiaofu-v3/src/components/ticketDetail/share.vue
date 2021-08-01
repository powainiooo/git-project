<style scoped>
.canvas-frame { width: 750px; height: 760px; position: fixed; top: -10000px; left: -10000px; z-index: -1 }
</style>

<template>
<div class="canvas-frame">
  <canvas
    canvas-id="myCanvas"
    style="width: 1000px; height: 800px; transform-origin: 0 0; transform: scale(.5)"
  />
</div>
</template>

<script type='es6'>
import { baseUrl } from '@/utils/api'
import { promisify } from '@/utils'
const getImageInfo = promisify(mpvue.getImageInfo)
export default {
  name: 'app',
  data () {
    return {
      record: {}
    }
  },
  methods: {
    initPoster (record) {
      this.record = record
      const ctx = wx.createCanvasContext('myCanvas')
      console.log('drawPost', ctx)

      // 背景色
      ctx.setFillStyle('#f5f5f5')
      ctx.fillRect(0, 0, 1000, 800)
      ctx.draw()
      console.log('initPoster1')
      mpvue.getImageInfo({
        src: `https:${record.cover_image}`,
        success: (res) => {
          console.log('getImageInfo', res)
          const h = 1000 * res.height / res.width
          ctx.drawImage(res.path, 0, 0, res.width, h, 0, 0, 1000, 800)
          ctx.draw(true)
          this.drawPoster(ctx)
        },
        fail: err => {
          console.log('initPoster2', err)
        }
      })
    },
    async drawPoster (ctx) {
      console.log('drawPoster1')
      // 开始日期
      const dateRes = await getImageInfo({
        src: `${baseUrl}/assets/img/icon-share.png`
      })
      console.log('dateRes', dateRes)
      ctx.drawImage(dateRes.path, 32, 32, 96, 96)
      ctx.draw(true)
      // 分割线
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(50, 80, 58, 1)
      ctx.draw(true)
      // 开始日期月
      const sDate = this.record.start_date.split('-')
      // const sDate = ['', '12', '24']
      ctx.font = '35px HelveL'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.fillText(sDate[1], 78, 71)
      ctx.draw(true)
      // 开始日期日
      ctx.font = '35px HelveB'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(sDate[2], 78, 115)
      ctx.draw(true)

      console.log('drawPoster2')
      // 结束日期
      if (this.record.start_date !== this.record.end_date) {
        // 分割线
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(139, 80, 10, 1)
        ctx.draw(true)
        // 底图
        ctx.drawImage(dateRes.path, 158, 32, 96, 96)
        ctx.draw(true)
        // 分割线
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(176, 80, 58, 1)
        ctx.draw(true)
        // 开始日期月
        const eDate = this.record.end_date.split('-')
        // const eDate = ['', '11', '22']
        ctx.font = '35px HelveL'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.fillText(eDate[1], 204, 71)
        ctx.draw(true)
        // 开始日期日
        ctx.font = '35px HelveB'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(eDate[2], 204, 115)
        ctx.draw(true)
      }
      console.log('drawPoster3')
      // 折角
      const flipRes = await getImageInfo({
        src: `${baseUrl}/assets/img/icon-footer.png`
      })
      console.log('flipRes', flipRes)
      ctx.drawImage(flipRes.path, 1000 - 190, 800 - 190, 190, 190)
      console.log('drawPoster4')

      ctx.draw(true, () => {
        console.log('draw over')
        mpvue.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: res => {
            console.log('canvasToTempFilePath', res)
            this.$emit('done', res.tempFilePath)
          },
          fail (err) {
            console.log('canvasToTempFilePath', err)
          }
        })
      })
    }
  }
}
</script>

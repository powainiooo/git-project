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
const dateBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAeFBMVEUAAABdh+hfiulgi+pfielnmv9hjOxlke9mku9bhedql/NfiepfieltmvZmmf9diOhijextmvRmk+9tmfNtmvRtmfRmku9AgP9hjOphjetjj+1nk+9lke5gi+polPBkkO5fiulplvFeiOldh+hql/JchudrmPJsmfOmktfcAAAAGXRSTlMA+Pj4TQL3U9rXpKCEUwXt2PLy3NiKigTSSZWGqAAAA79JREFUaN6llul2olAQhDuJW9SYZTKTYZNoXN7/DQeQQ3nppgvuFMe/X7XVxeVKo93L+vP92ulSP61OdzqcDoH29RMo22eNPlbr5U46vfy6Brp09IuFh0Ff2b1WyxY//33t8a8WvtKph7fHh/7MG4OQfwH+Ekwf4Pccn9cOTT4B38wedGgwHTjkebYU2SF/e7UHnb4zPObPa6128gI8+GS1Y/itw1LWTnfAZ93R/FZr+VT8C+g6nHHhQyt5R/gqHj28iwcf+pDB6ji75dNDUk1/tafn6ewpv6wNzHTidqv4ZSmgk2z48F15MH9loLt5iKm+BW8kHR0a1x3Oh4HVHYjjzXBgoOCMz7tzJ6Gz8xdrePwyTQX4Md1UcIUvge8baI2ophtPWkkcelifbGw1QYeBVX3efMjil4EBoY/hKzoMDhHTw8DnpxL14uYMD4nVnMP/4HsSNb3C7/10ynt+SgwIne0WdEgA58vNTbw3f5JI9Pcc5wLgmp8I4bPlevykMfDu+RxP5u8MyPRku4BrfiJxxw7o9vhJJ9kr/LRvVgq8bRC3W2ggnNQ0yPgXkVcTcG0APvmoOHzgtUHUJ8umQ+LhY/jpsAFfLsdriXfsZAGd4E0VBQzc+06J8qTgu+HAYNSpkLPi2/PXBpruVtPSwPBJ9RQycbWlD4cqeCOZ0nzQCf82PAxAj2y+5ncSslzeTQcPAx7PwG5TqzmBg0SeC0O9T4APDSLOfG0BOiQkm4hqQt/F97fQcEpaHcBDfMW/GcSk4/HhUEkibjtu84FvDfKJb5YpGw6DiOsC2y0zSHV5ksH0kx6+sA2savJwjOxDCbsL8tVqOnQ8yqhjx47ern7IP0p08/kfODYGY5sflU9jQIrPDn1I4RsJGT+xt0voR0hYOhrudlMbRLy4BQ8fEnrP5/T2bAAd+vkRk8/vI+Ab3QS/NXD49NQsFB34m4FDp8eOXR7MP2hA+CQc4CuJs112aDq7hcT5npPpA/w4A9Dp+AULHwb8nm9XE/BeNaHzz/ksZLVjew9+4AADxBPJBx14GES+tyochW8Moo98MxwY3CTOizspnhAOSYVPDbiFD+MJ8cMGZHjwvXhU+MRgYjaqmoHBYuyhycPB/NCrvCk+NSDND/QsG+cmyw59FY7WRpYhX+P5kQ++1ky+kNHE6jjjI6EvkZl/zwe85aM8Tvj4A5W25LbDz/zzkLZSa74l1WTZDM6/nctNszdyHzmScOz8Z9JpPtv8fV0sFk+Lp06Pze9xQA+PD55enzez2/j/AA1rF2+cg9gcAAAAAElFTkSuQmCC'
const flip = 'data:image/png;base64,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'
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

      mpvue.getImageInfo({
        src: 'https://hair.designbyho.com/static/images/logo.png',
        // src: record.cover_image,
        success: (res) => {
          console.log('getImageInfo', res)
          ctx.drawImage(res.path, 0, 0, 1000, 800)
          ctx.draw(true)
          this.drawPoster(ctx)
        }
      })
    },
    drawPoster (ctx) {
      // 开始日期
      ctx.drawImage(dateBg, 32, 32, 96, 96)
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

      // 结束日期
      if (this.record.start_date !== this.record.end_date) {
        // 分割线
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(139, 80, 10, 1)
        ctx.draw(true)
        // 底图
        ctx.drawImage(dateBg, 158, 32, 96, 96)
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
      // 折角
      ctx.drawImage(flip, 1000 - 190, 800 - 190, 190, 190)
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

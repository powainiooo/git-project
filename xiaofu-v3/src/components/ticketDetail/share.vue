<style scoped>
.canvas-frame { width: 750px; height: 760px; position: fixed; top: -10000px; left: -10000px; z-index: -1 }
.cover { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; background-color: rgba(0, 0, 0, .4); z-index: 10; }
.share-box { position: fixed; left: 25px; right: 25px; bottom: -100%; z-index: 20; background-color: #ffffff; border-radius: 20px; box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.1); overflow: hidden; transition: bottom .4s ease-out; }
.share-box .title { height: 120px; line-height: 120px; padding-left: 40px; font-size: 26px; color: #ffffff; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15); background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%); }
.share-box button { height: 140px; font-size: 24px; margin-left: 25px; margin-right: 25px; padding-left: 14px; text-align: left; line-height: 140px; background-color: transparent; overflow: visible; }
.share-box button text { font-family: HelveL; margin-left: 14px; }
.share-box .bBorder { margin-left: 25px; margin-right: 25px; }
.share-box .close { width: 58px; position: absolute; top: 32px; right: 30px; }
.share-box-show { bottom: 70px; }
</style>

<template>
<div>
  <div class="canvas-frame">
    <canvas
      canvas-id="myCanvas"
      style="width: 1000px; height: 800px; transform-origin: 0 0; transform: scale(.5)"
    />
  </div>
  <div class="canvas-frame">
    <canvas
      canvas-id="myCanvas2"
      style="width: 1080px; height: 1152px; transform-origin: 0 0; transform: scale(.3)"
    />
  </div>
  <div class="cover" @touchmove.stop="tm" v-if="showShare"></div>
  <div class="share-box"
       :class="{'share-box-show': showShare}">
    <div class="title">选择分享方式</div>
    <img src="/static/images/common/close.png" mode="widthFix" class="close" @click="showShare = false" />
    <button open-type="share">转发给好友<text>Send to a friend</text></button>
    <div class="bBorder"></div>
    <button @tap="drawPoster2">保存海报<text>Save</text></button>
  </div>
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
      record: {},
      showShare: false
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
    },
    tm () {},
    async drawPoster2 () {
      mpvue.showLoading({
        title: '生成中'
      })
      const ctx = wx.createCanvasContext('myCanvas2')
      console.log('drawPost2', ctx)
      // 背景色
      ctx.setFillStyle('#f5f5f5')
      ctx.fillRect(0, 0, 1080, 1152)
      ctx.draw()
      // 封面图
      const imgRes = await getImageInfo({
        src: `https:${this.record.cover_image}`
      })
      ctx.drawImage(imgRes.path, 0, 0, 1080, 1152)
      ctx.draw(true)
      // 二维码背景图
      const qrbgRes = await getImageInfo({
        src: 'https://web.leesticket.com/assets/img/qrframe.png'
      })
      ctx.drawImage(qrbgRes.path, 40, 842, 194, 280)
      ctx.draw(true)

      // 二维码白色圆
      ctx.beginPath()
      ctx.setFillStyle('#FFFFFF')
      ctx.arc(47 + 90, 936 + 90, 90, 0, Math.PI * 2)
      ctx.fill()
      ctx.clip()
      ctx.draw(true)
      // 小程序码
      const qrRes = await getImageInfo({
        src: `https:${this.record.miniapp_code_image}`
      })
      ctx.drawImage(qrRes.path, 60, 950, 150, 150)
      ctx.draw(true, () => {
        console.log('draw over')
        mpvue.canvasToTempFilePath({
          canvasId: 'myCanvas2',
          success: res => {
            console.log('canvasToTempFilePath', res)
            mpvue.hideLoading()
            this.showShare = false
            mpvue.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success (res2) {
                mpvue.showToast({
                  title: '保存成功'
                })
                console.log('saveImageToPhotosAlbum success', res2)
              },
              fail (err) {
                mpvue.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
                console.log('saveImageToPhotosAlbum fail', err)
              }
            })
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

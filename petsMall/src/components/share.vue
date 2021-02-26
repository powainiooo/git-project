<style scoped>
.c-share-frame { width: 100%; border-radius: 15px 15px 0 0; overflow: hidden; background-color: #ffffff; position: fixed; bottom: -550px; left: 0; z-index: 1500; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); }
.c-share-frame-show { bottom: 0 }
.c-share-frame-title { background-color: var(--mainColor); height: 170px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; padding: 0 66px; }
.c-share-frame-title .title p { font-size: 36px; color: #ffffff; text-shadow: var(--textShadow); }
.c-share-frame-title .title p.en { font-size: 40px; font-family: HelveThin; margin-bottom: 8px; }
.c-share-frame-title img { width: 56px; height: 56px; }

.c-share-btns button { height: 185px; margin: 0 42px; padding-left: 25px; display: flex; align-items: center; color: var(--textColor); text-shadow: var(--textShadow); font-size: 34px; background-color: transparent; }
.c-share-btns .borderB { margin: 0 42px; }

.canvas-frame { width: 750px; height: 760px; position: fixed; top: -10000px; left: -10000px; }
</style>

<template>
<div class="c-share-frame c-share-frame-show" :class="{'c-share-frame-show': showShare}">
   <div class="c-share-frame-title">
      <div class="title">
         <p class="en">Share</p>
         <p>分享</p>
      </div>
      <img src="/static/images/header/close.png" @click="hideShare" />
   </div>
   <div class="c-share-btns">
      <button hover-class="hscale"
              hover-stay-time="10"
              @click="drawPost">保存海报 | Save</button>
      <div class="borderB"></div>
      <button hover-class="hscale"
              hover-stay-time="10"
              open-type="share">转发给好友 | Transmit</button>
   </div>
   <div class="canvas-frame">
      <canvas
         type="2d"
         id="canvas"
         style="width: 750px; height: 760px; background-color: #EEEBEA;"
      ></canvas>
   </div>

</div>
</template>

<script type='es6'>
import store from '@/store'
export default {
	name: 'app',
   props: {
	   itemData: Object
   },
	data() {
		return {
		   loadIndex: 0
      }
	},
   computed: {
      showShare () {
         return store.state.showShare
      }
   },
	methods: {
      hideShare () {
         console.log('hideShare')
         store.commit('SET_SHOWSHARE', false)
      },
      drawPost () {
         console.log('drawPost')
         mpvue.showLoading({
            title: '生成海报中'
         })
         const query = wx.createSelectorQuery()
         query.select('#canvas')
            .fields({ node: true, size: true })
            .exec((res) => {
               console.log('drawPost', res)
               this.initPoster(res)
            })
      },
      initPoster (res) {
         console.log('initPoster', res)
         const canvas = res[0].node
         const ctx = canvas.getContext('2d')
         console.log('initPoster', ctx)

         // const dpr = wx.getSystemInfoSync().pixelRatio
         // canvas.width = res[0].width * dpr
         // canvas.height = res[0].height * dpr
         // ctx.scale(dpr, dpr)

         // 背景色
         ctx.fillStyle = '#ffffff'
         ctx.fillRect(0, 0, 750, 760)
         // 顶部栏
         ctx.fillStyle = '#DDC9A8'
         ctx.fillRect(0, 0, 750, 182)

         // 产品图背景
         this.fillRoundRect(ctx, 58, 270, 278, 220, 28, '#E8E6E4')

         // 英文名
         ctx.font = '34px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.titleEn, 368, 270)

         // 中文名
         ctx.font = '30px'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.title, 368, 320)

         // 价格
         ctx.font = '66px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.price, 368, 480)
         const metrics = ctx.measureText(this.itemData.price)

         // 单位
         ctx.font = '20px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.unit, 370 + metrics.width, 480)

         // 分割线
         ctx.fillStyle = '#D1CECE'
         ctx.fillRect(42, 540, 666, 1)

         // 说明文字
         ctx.font = '24px'
         ctx.fillStyle = '#9B9A9A'
         ctx.fillText('扫码购买', 210, 620)
         ctx.fillText('掃引符号購入', 210, 650)
         ctx.fillText('Scan the code to buy', 210, 680)

         // logo
         const logo = canvas.createImage()
         logo.src = '/static/images/header/logo@2x.png'
         logo.onload = () => {
            ctx.drawImage(logo, 68, 42, 74, 100)
            this.loadOver()
         }
         // 产品图
         const img = canvas.createImage()
         img.src = this.itemData.img
         img.onload = () => {
            ctx.drawImage(img, 58, 210, 278, 278)
            this.loadOver()
         }
         // 二维码
         const qrcode = canvas.createImage()
         qrcode.src = this.itemData.qrcode
         qrcode.onload = () => {
            ctx.drawImage(qrcode, 58, 588, 130, 130)
            this.loadOver()
         }

      },
      fillRoundRect (cxt, x, y, width, height, radius, fillColor) {
         if (2 * radius > width || 2 * radius > height) { return false; }

         cxt.save();
         cxt.translate(x, y);
         //绘制圆角矩形的各个边
         this.drawRoundRectPath(cxt, width, height, radius);
         cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
         cxt.fill();
         cxt.restore();
      },
      drawRoundRectPath (cxt, width, height, radius) {
         cxt.beginPath(0);
         //从右下角顺时针绘制，弧度从0到1/2PI
         cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

         //矩形下边线
         cxt.lineTo(radius, height);

         //左下角圆弧，弧度从1/2PI到PI
         cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

         //矩形左边线
         cxt.lineTo(0, radius);

         //左上角圆弧，弧度从PI到3/2PI
         cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

         //上边线
         cxt.lineTo(width - radius, 0);

         //右上角圆弧
         cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

         //右边线
         cxt.lineTo(width, height - radius);
         cxt.closePath();
      },
      loadOver () {
         this.loadIndex += 1
         if (this.loadIndex === 3) {
            mpvue.canvasToTempFilePath({
               canvasId: 'canvas',
               success (res) {
                  console.log('canvasToTempFilePath', res)
                  mpvue.saveImageToPhotosAlbum({
                     filePath: res.tempFilePath,
                     success(res2) {
                        console.log('saveImageToPhotosAlbum', res2)
                        mpvue.hideLoading()
                     }
                  })
               }
            })
         }
      }
   }
}
</script>

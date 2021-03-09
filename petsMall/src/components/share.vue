<style scoped>
.c-share-frame { width: 100%; border-radius: 15px 15px 0 0; overflow: hidden; background-color: #ffffff; position: fixed; bottom: -550px; left: 0; z-index: 1500; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); }
.c-share-frame-show { bottom: 0 }
.c-share-frame-title { background-color: var(--mainColor); height: 170px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; padding: 0 66px; position: relative; z-index: 10; }
.c-share-frame-title .title p { font-size: 36px; color: #ffffff; text-shadow: var(--textShadow); }
.c-share-frame-title .title p.en { font-size: 40px; font-family: HelveThin; margin-bottom: 8px; }
.c-share-frame-title img { width: 56px; height: 56px; }

.c-share-btns { position: relative; z-index: 10; }
.c-share-btns button { height: 185px; margin: 0 42px; padding-left: 25px; display: flex; align-items: center; color: var(--textColor); text-shadow: var(--textShadow); font-size: 34px; background-color: transparent; }
.c-share-btns .borderB { margin: 0 42px; }

.canvas-frame { width: 750px; height: 760px; position: fixed; top: -10000px; left: -10000px; z-index: -1 }
</style>

<template>
<div class="c-share-frame" :class="{'c-share-frame-show': showShare}">
   <div class="mask-cover" @touchmove.stop="tmove" v-if="showShare" @click="hideShare"></div>
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
              @click="downLoad">保存海报 | Save</button>
      <div class="borderB"></div>
      <button hover-class="hscale"
              hover-stay-time="10"
              open-type="share">转发给好友 | Transmit</button>
   </div>
   <div class="canvas-frame">
      <canvas
         canvas-id="myCanvas"
         style="width: 750px; height: 770px; transform-origin: 0 0; transform: scale(.5)"
      />
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
		   loadIndex: 0,
         canvasPath: ''
      }
	},
   computed: {
      showShare () {
         return store.state.showShare
      }
   },
	methods: {
      tmove () {},
      hideShare () {
         console.log('hideShare')
         store.commit('SET_SHOWSHARE', false)
      },
      initPoster () {
         // mpvue.showLoading({
         //    title: '生成海报中'
         // })
         const ctx = wx.createCanvasContext('myCanvas')
         console.log('drawPost', ctx)
         // 背景色
         ctx.setFillStyle('#ffffff')
         ctx.fillRect(0, 0, 750, 760)
         ctx.draw()

         // 顶部栏
         ctx.fillStyle = '#DDC9A8'
         ctx.fillRect(0, 0, 750, 182)
         ctx.draw(true)

         // 产品图背景
         this.fillRoundRect(ctx, 58, 270, 278, 220, 28, '#E8E6E4')
         ctx.draw(true)

         // 英文名
         ctx.font = '34px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.titleEn, 368, 305)
         ctx.draw(true)

         // 中文名
         ctx.font = '30px'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.title, 368, 355)
         ctx.draw(true)

         // 价格
         ctx.font = '66px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.price, 368, 480)
         const metrics = ctx.measureText(this.itemData.price)
         ctx.draw(true)

         // 单位
         ctx.font = '20px HelveThin'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.unit, 370 + metrics.width, 480)
         ctx.draw(true)

         // 分割线
         ctx.fillStyle = '#D1CECE'
         ctx.fillRect(42, 540, 666, 1)
         ctx.draw(true)

         // 说明文字
         ctx.font = '24px'
         ctx.fillStyle = '#9B9A9A'
         ctx.fillText('扫码购买', 210, 640)
         ctx.fillText('掃引符号購入', 210, 670)
         ctx.fillText('Scan the code to buy', 210, 700)
         ctx.draw(true)
         console.log('drawPost2')

         // logo
         // ctx.drawImage(logoData, 68, 42, 74, 100)
         // ctx.draw(true)
         wx.getImageInfo({
            src: 'https://hair.designbyho.com/static/images/logo.png',
            success: (res) => {
               ctx.drawImage(res.path, 68, 42, 74, 100)
               console.log('drawImage logo')
               this.loadOver(ctx)
            }
         })
         // 产品图
         wx.getImageInfo({
            src: this.itemData.img,
            success: (res) => {
               ctx.drawImage(res.path, 58, 210, 278, 278)
               console.log('drawImage 产品图')
               this.loadOver(ctx)
            }
         })
         // 二维码
         wx.getImageInfo({
            src: this.itemData.qrcode,
            success: (res) => {
               ctx.drawImage(res.path, 58, 600, 130, 130)
               console.log('drawImage 二维码')
               this.loadOver(ctx)
            }
         })
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
      loadOver (ctx) {
         this.loadIndex += 1
         const self = this
         console.log('loadOver', this.loadIndex)
         if (this.loadIndex === 3) {
            ctx.draw(true, () => {
               console.log('draw over')
               mpvue.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success (res) {
                     console.log('canvasToTempFilePath', res)
                     self.canvasPath = res.tempFilePath
                     self.$emit('done', res.tempFilePath)
                  },
                  fail (err) {
                     console.log('canvasToTempFilePath', err)
                  }
               })
            })
         } else {
            ctx.draw(true)
         }
      },
      downLoad () {
         mpvue.showLoading({
            title: '生成海报中'
         })
         mpvue.saveImageToPhotosAlbum({
            filePath: this.canvasPath,
            success(res2) {
               console.log('saveImageToPhotosAlbum', res2)
               mpvue.hideLoading()
               mpvue.showToast({
                  title: '保存成功'
               })
            },
            fail (err) {
               console.log('saveImageToPhotosAlbum', err)
               mpvue.hideLoading()
               mpvue.showToast({
                  title: '保存失败',
                  icon: 'none'
               })
            }
         })
      }
   }
}
</script>

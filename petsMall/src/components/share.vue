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
              @click="initPoster">保存海报 | Save</button>
      <div class="borderB"></div>
      <button hover-class="hscale"
              hover-stay-time="10"
              open-type="share">转发给好友 | Transmit</button>
   </div>
   <div class="canvas-frame">
      <canvas
         canvas-id="myCanvas"
         style="width: 750px; height: 760px; transform-origin: 0 0; transform: scale(.5)"
      />
   </div>

</div>
</template>

<script type='es6'>
import store from '@/store'
const logoData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADOCAMAAADrAgtKAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMABhKS0Lex+/NcOgr369dAHQOtoUQhZduXbDaHdnFQDu9LMefj07y0qJyOgSvNw0fGfVhTJRkWr5GJVgAABe1JREFUeNrM2O1KGwEQheHZxmRbY9rYxmIjYmn9QkVE0b3/O5PBj6MbY2ZnOHDeK3h+zMAwNrzlFxtYszB621+3BrqaSfvNSEHVdXDFVF3Hc0EFV1TFc0EFV1TFc0EFV1RFdUEFV1wFF0sFV1wFF00FV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF1MFV1QFF18FF1Q8F1RRF1Q8F1RRF1Q8F1RRF1Q8F1RxF1Q8F1RxF1Q8F1RxF1Q81x5UUddZN7B2YYMbdfTGjQm6XKXncpWey1V6LlfpuVyl53KVnstVei5X6blcpedylZ7LVXouV+m5XKXncpWey1V6LlfpuZ5Uaq4XlZYLKiXXW5WO671KxdVXabhWVQouhir+gYz/MSVUKy4RVc8lo3rnElLBZVKqV5eY6tklp3KXospdiip3Karcpahyl6LKXYoqdymq3KWocpeiyl2KKncpqtylqHKXospdiip3Karcpahyl6IKLqpqPEq4+KrGMi6+yhKumyldlXKdNmRV0jXZtVC75ylV2jWyUPspVcH12wIdpFQVV/vDNnaYUtVcs7ltaNFmVFXX9Yax35tlVHXXpX3W9CSjCrhq4/Urqaq7jqe2tru0qu66sHXdz9Kquqtd2prGBVXdtbVmG29LqrrrjyF09L+kqrtmR/ZBF0VV3XVgq121RVXdtTO3lSZlVd21b/3+1VV1186D9TojqODKTtcyoSK4/vaW8WdCxXAd2tvmbULFcH3PHsrjqRnRtW2oeWznTpfThqEoAB+ctrax8RIwiwGD2SGEJZDc93+zznSmkx/ppEeLlf7o9wI2o+sj6UpDh5+5IujoCqmrNRsuM2hpfRdOPNMo+GABTdE34by8T9KxcPwK2u6BUB7xW5/fCOjiKyWOVJd/gwgE07K//S7HQDhnGHmbK83XqbCjbmjEjYlalgYZDOWJMDL88szWu7EXhQZO5AvDf4WxPOGLq+2msvgoelYoRElhhg/uuMXHSQJj9MMWfMVPYcVZCCEAcCF3hBWtgPzmPWF0YIzfyuwALFx9h3zSXwDcnJUWHUdLelVTwhwd3j6AiTBy2MIEvQeMnVU8v7i7A3uHYQpwz2uTuXuCNU/cRNd1lg/84c2ZfK2h29eq+ddymacVWfI75691EMIGdpA52QOu3ILRmgMXECNuk2TNjlsHhkKYw5oTl/KpMArYwrTSIiATRggruMcFAPKYu6tgyY2dgQdOP8UxG0dbIfgR7GCagnt2ShepYUVBr9Brl3uMKd1He+U7I+YufCdpJYwJLFiQ2c03IQbOWhBb/BI6a9m8xUK4AnxxyQnGDkq/fy1uMuIeK0XkVSjrFsw8CuPynnGcK4z0RPGT3wglvsOAtxLFTloonOfIwhDyQRQFwtlDW1/jwtTe+C6mtTuHbb4ZZn6iuAi0ztATIcUpNBRLIU00724FNZQdV0Ly39hVo/kfxbXnIpqHg7XwrjlUhLHQeuoLtHebV9CivbxT38mkoqBTgbRIRMENH2xExbYAwRv6oiDBR6Uoicce/iKadkRJ+EkvhRY8FPiEd+2ImiTHHxSxKPK3YYQ/atW7QFTVxEacFD+Ojh9+X7/bEXXfAeJCLG9+2k9u5/bxWPaq6XCzFC3+kVh8OMA3hTbyZVYe8Sen7p0B4J8bxiEA/HPDOIjwqawjX8BPiUW3exPm9MO5Hbehc2wdgTBLxKl5AUq2EofiNkjHjjjj16CVgbgSQkEvFjdGUHIOxAF/BEWlg/qKX6DsvpKGBSk0vK6lUcsFtMxO0qBBAU2toTRm60FfNZdG+FMYyS7SgEEJQ/nYF9t2M5jrDcSqTggrWtdArPGHHmzJdmLJaQGbUivZugphWR6ujV9qEqEBtVHqJ/0WGtL+IZouFZp0f9KIi+VDicaVh6UomO97OZzI0wey/gfdqgWXvOrw7MtnkmGY4SvM0v74cR1/CPJkexid3/DFsrJXhf3J09NkFN567SLHf//hJ84eLJWMFrS6AAAAAElFTkSuQmCC'
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
      initPoster () {
         mpvue.showLoading({
            title: '生成海报中'
         })
         console.log(this.itemData)
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
         ctx.fillText(this.itemData.titleEn, 368, 270)
         ctx.draw(true)

         // 中文名
         ctx.font = '30px'
         ctx.fillStyle = '#3E311F'
         ctx.fillText(this.itemData.title, 368, 320)
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
         ctx.fillText('扫码购买', 210, 620)
         ctx.fillText('掃引符号購入', 210, 650)
         ctx.fillText('Scan the code to buy', 210, 680)
         ctx.draw(true)

         // logo
         ctx.drawImage(logoData, 68, 42, 74, 100)
         ctx.draw(true)
         // 产品图
         wx.getImageInfo({
            src: this.itemData.img,
            success: (res) => {
               ctx.drawImage(res.path, 58, 210, 278, 278)
               this.loadOver(ctx)
            }
         })
         // 二维码
         wx.getImageInfo({
            src: this.itemData.qrcode,
            success: (res) => {
               ctx.drawImage(res.path, 58, 588, 130, 130)
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
         if (this.loadIndex === 2) {
            ctx.draw(true, () => {
               console.log('draw over')
               mpvue.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success (res) {
                     console.log('canvasToTempFilePath', res)
                     mpvue.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res2) {
                           console.log('saveImageToPhotosAlbum', res2)
                           mpvue.hideLoading()
                        }
                     })
                  },
                  fail (err) {
                     console.log('canvasToTempFilePath', err)
                  }
               })
            })
         } else {
            ctx.draw(true)
         }
      }
   }
}
</script>

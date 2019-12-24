<style scoped>
.z-page-share { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 12;}
.z-page-share .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page-share .fadeOut { animation: fadeOut 1s linear;}
.z-page-share .poster { width: 720px; height: 1174px; margin: 15px auto; background-color: rgba(0, 0, 0, 0)}
.z-page-share .poster canvas { width: 100%; height: 100%;}
.z-page-share .btns { display: flex; justify-content: space-between; margin: 0 36px;}
.z-page-share .btns a { width: 320px; height: 90px; display: flex; justify-content: center; align-items: center; background-color: #0475B5;  font-size: 36px; color: #ffffff; text-decoration: none;}
</style>

<template>
<div class="z-page-share" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="poster" v-if="showParts">
         <canvas width="720" height="1174" ref="poster"></canvas>
      </div>
   </transition>
   <div class="btns" v-if="showParts">
      <a href="javascript:;">分享</a>
      <a href="javascript:;">保存图片</a>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         outTime: 1000,
         max: 100,
         values: [90, 90, 90, 90, 90, 90],
         hasPoster: false
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p10'
      },
   },
   watch: {
      currentPage (page, lastPage) {
         if (page === 'share') {
            this.loadAll()
         }
      }
   },
   methods: {
      loadAll () {
         if (this.hasPoster) return
         let arr = []
         arr.push(this.loadImgs('/static/poster/bg.png'))
         arr.push(this.loadImgs('/static/poster/title.png'))
         arr.push(this.loadImgs('/static/poster/qrcode.png'))
         arr.push(this.loadImgs('/static/poster/rada.png'))
         arr.push(this.loadImgs('/static/poster/baozou.png'))
         Promise.all(arr).then(res=>{
            this.drawPoster(res)
         })
      },
      loadImgs(src){
         let self = this;
         return new Promise((resolve,reject)=>{
            let img = new Image();
            img.onload = function(){
               resolve(img);
            };
            img.onerror = function(){
               reject(new Error('Could not load image at ' + src));
            };
            img.src = src;
         })
      },
      drawPoster (res) {
         const canvas = this.$refs.poster
         const ctx = canvas.getContext('2d')
         ctx.strokeStyle = '#0475B5'
         ctx.lineWidth = 5
         ctx.strokeRect(22, 22, 676, 1130)
         // 顶部图片
         ctx.drawImage(res[0], 24, 24, 672, 200)
         // 标题图片
         ctx.drawImage(res[1], 65, 260)
         // 二维码
         ctx.drawImage(res[2], 71, 964)
         // 内容图
         ctx.drawImage(res[4], 23, 452)
         // 雷达底图
         const x = 416
         const y = 275
         const cx = x + 123
         const cy = y + 113
         ctx.drawImage(res[3], x, y)
         //雷达中心点
         ctx.fillStyle = '#f00'
         ctx.fillRect(cx, cy, 2, 2)
         //雷达区域
         const list = this.getCords(this.values)
         ctx.beginPath()
         ctx.moveTo(list[0][0], list[0][1])
         for (let i = 1; i < 6; i++) {
            ctx.lineTo(list[i][0], list[i][1])
         }
         ctx.closePath()
         ctx.lineWidth = 1
         // 线的渐变
         const grdBorder = ctx.createLinearGradient(list[0][0], list[0][1], list[3][0], list[3][1])
         grdBorder.addColorStop(0, '#0AADDB')
         grdBorder.addColorStop(1, '#B259FD')
         ctx.strokeStyle = grdBorder
         ctx.stroke()
         // 填充的渐变
         const grdFill = ctx.createLinearGradient(list[0][0], list[0][1], list[3][0], list[3][1])
         grdFill.addColorStop(0, 'rgba(0, 247, 255, 0.32)')
         grdFill.addColorStop(1, 'rgba(68, 0, 255, 0.1)')
         ctx.fillStyle = grdFill
         ctx.fill()
      },
      getCords (vals) {
         const x = 416
         const y = 275
         const cx = x + 124
         const cy = y + 113
         const border = 84
         let arr = []
         for (let i = 0; i < 6; i++) {
            let bian = vals[i] / this.max * border
            let lin = Math.cos(30 * Math.PI / 180) * bian
            let dui = Math.sin(30 * Math.PI / 180) * bian
            if (i === 0) {
               arr.push([cx, cy - bian])
            } else if (i === 1) {
               arr.push([cx + lin, cy - dui])
            } else if (i === 2) {
               arr.push([cx + lin, cy + dui])
            } else if (i === 3) {
               arr.push([cx, cy + bian])
            } else if (i === 4) {
               arr.push([cx - lin, cy + dui])
            } else if (i === 5) {
               arr.push([cx - lin, cy - dui])
            }
         }
         console.log(arr)
         return arr
      }
   }
}
</script>

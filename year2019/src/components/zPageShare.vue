<style scoped>
.z-page-share { width: 100%; height: 100vh; overflow-x: hidden; overflow-y: scroll; position: fixed; top: 0; left: 0; z-index: 15; background: url("../assets/img/bg.jpg") repeat;}
.z-page-share-fadeIn { animation: p10In 0.5s ease-out both;}
@keyframes p10In {
   0% { transform: translateX(100vw)}
   100% { transform: translateX(0vw)}
}
.z-page-share-fadeOut { animation: fadeOut 0s linear;}
.z-page-share .poster { width: 720px; height: 1174px; margin: 15px auto; background-color: rgba(0, 0, 0, 0); position: relative;}
.z-page-share .poster img { width: 100%; height: 100%;}
.z-page-share .poster .btn-back { width: 174px; height: auto; position: absolute; bottom: 40px; left: 40px;}
.z-page-share canvas { width: 720px; height: 1174px; position: absolute; top: -10000px; left: 0;}
.z-page-share .btns { display: flex; justify-content: space-between; margin: 0 36px 50px 36px;}
.z-page-share .btns a { width: 320px; height: 90px; display: flex; justify-content: center; align-items: center; background-color: #0475B5;  font-size: 36px; color: #ffffff; text-decoration: none;}
</style>

<template>
<transition enter-active-class="z-page-share-fadeIn" leave-active-class="z-page-share-fadeOut">
<div class="z-page-share" v-show="showParts" @touchmove="tmove">
      <div class="poster">
         <img :src="posterSrc"/>
         <img src="@/assets/img/btn-back.png" class="btn-back" @click="doReview">
      </div>
   <div class="btns" v-if="source === 'app'">
      <a href="javascript:;" @click="doShare">分享</a>
      <a :href="posterSrc" download="比亚迪年报评分图" @click="download">保存图片</a>
   </div>
   <canvas width="720" height="1174" ref="poster"></canvas>
</div>
</transition>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         outTime: 1000,
         max: 100,
         // values: [90, 90, 90, 90, 90, 90],
         tagList: ['山顶洞人', '科技宅', '节能家', '暴走家', '环保家', '语音控', '潮人范儿'],
         hasPoster: false,
         posterSrc: ''
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p10'
      },
      pageData () {
         return this.$store.state.pageData.P10
      },
      source () {
         return this.$store.state.params.source
      },
      values () {
         let arr = []
         if (this.pageData !== undefined) {
            arr.push(this.pageData.score.techno || 0)
            arr.push(this.pageData.score.routine || 0)
            arr.push(this.pageData.score.intell || 0)
            arr.push(this.pageData.score.entert || 0)
            arr.push(this.pageData.score.envir || 0)
            arr.push(this.pageData.score.energy || 0)
         }
         return arr
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (page === 'p10') {
            this.$store.commit('setCanChangePage', false)
         }
      },
      pageData (data) {
         if (data !== undefined) {
            this.loadAll()
         }
      }
   },
   methods: {
      loadAll () {
         if (this.hasPoster) return
         let arr = []
         arr.push(this.loadImgs('static/poster/bg.png'))
         arr.push(this.loadImgs('static/poster/title.png'))
         arr.push(this.loadImgs('static/poster/qrcode.png'))
         arr.push(this.loadImgs('static/poster/rada.png'))
         arr.push(this.loadImgs(`static/poster/${this.pageData.tag}.png`))
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
         // 背景色
         ctx.fillStyle = '#DCF4FE'
         ctx.fillRect(0, 0, 750, 1174)
         // 边框
         ctx.strokeStyle = '#0475B5'
         ctx.lineWidth = 5
         ctx.strokeRect(22, 22, 676, 1130)
         // 顶部图片
         ctx.drawImage(res[0], 24, 24, 672, 200)
         // 标题图片
         ctx.drawImage(res[1], 65, 260)
         // 二维码
         ctx.drawImage(res[2], 71, 940)
         // 内容图
         ctx.drawImage(res[4], 23, 452)
         // 雷达底图
         const x = 416
         const y = 275
         const cx = x + 123
         const cy = y + 113
         ctx.drawImage(res[3], x, y)
         //雷达中心点
         // ctx.fillStyle = '#f00'
         // ctx.fillRect(cx, cy, 2, 2)
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

         this.posterSrc = canvas.toDataURL('image/png')
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
         return arr
      },
      doShare () {
         console.log(window.footPrinter)
         doShare(this.tagList[this.pageData.tag])
      },
      doReview () {
         this.$parent.review()
      },
      download () {
         console.log('download')
         window.footPrinter.savePicTimes += 1
      },
      tmove (e) {
         e.stopPropagation()
      }
   }
}
</script>

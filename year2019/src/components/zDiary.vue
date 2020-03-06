<style scoped>
.z-piece { width: 584px; height: 840px; background-color: #ffffff; position: absolute; top: 204px; left: 2px;}
.z-piece:after { content: ''; width: 100%; height: 40px; background: url("../assets/img/paper-up.png") no-repeat; position: absolute; top: -38px; left: 0; background-size: 100%;}
.z-piece .frame { width: 540px; height: 810px; border: 2px solid #333333; margin: 16px 0 0 24px; position: relative;}
.z-piece .content { line-height: 1.5; color: #333333; font-size: 30px;}
.z-piece .content span { color: #F84F1C;}
.z-piece .line { position: relative;}
.z-piece .line:before { content: ''; width: 60px; height: 2px; background-color: #333333; position: absolute; top: -25px; left: 0;}
.z-piece .diary-table { width: 100%; display: flex; flex-wrap: wrap;}
.z-piece .diary-table .pics { width: 73%; display: flex; align-items: center; justify-content: center; border-right: 2px solid #333333;}
.z-piece .diary-table .pics img { width: 100%; padding: 10px;}
.z-piece .diary-table .date { width: 27%; text-align: center;}
.z-piece .diary-table .date .day { font-size: 80px; font-weight: bold;}
.z-piece .diary-table .date .month { font-size: 80px; font-weight: lighter;}
.z-piece .diary-table .date .year { font-size: 20px;}
.z-piece .diary-table .info { width: 100%; border-top: 2px solid #333333;}
.z-piece .diary-table .info .content { margin: 60px 10px 0 10px;}
.z-piece .diary-table .info .content span { color: #F84F1C;}
</style>

<template>
<div class="z-piece">
   <div class="frame">
      <div class="diary-table">
         <div class="pics">
            <img :src="imgSrc+'static/diary/diary-2.png'" v-if="keys === keyList[0]"/>
            <img :src="imgSrc+'static/diary/diary-3.png'" v-else-if="keys === keyList[1]"/>
            <img :src="imgSrc+'static/diary/diary-4.png'" v-else-if="keys === keyList[2]"/>
            <img :src="imgSrc+'static/diary/diary-5.png'" v-else-if="keys === keyList[3]"/>
            <img :src="imgSrc+'static/diary/diary-6.png'" v-else-if="keys === keyList[4]"/>
            <img :src="imgSrc+'static/diary/diary-7.png'" v-else-if="keys === keyList[5]"/>
            <img :src="imgSrc+'static/diary/diary-8.png'" v-else-if="keys === keyList[6]"/>
            <img :src="imgSrc+'static/diary/diary-9.png'" v-else-if="keys === keyList[7]"/>
            <img :src="imgSrc+'static/diary/diary-10.png'" v-else-if="keys === keyList[8]"/>
            <img :src="imgSrc+'static/diary/diary-11.png'" v-else-if="keys === keyList[9]"/>
            <img :src="imgSrc+'static/diary/diary-12.png'" v-else-if="keys === keyList[10]"/>
            <img :src="imgSrc+'static/diary/diary-13.png'" v-else-if="keys === keyList[11]"/>
         </div>
         <div class="date">
            <p class="day">{{dates.day}}</p>
            <p class="month">{{dates.month}}</p>
            <p class="year">{{dates.year}}</p>
            <p class="year">{{dates.week}}</p>
         </div>
         <div class="info">
            <div class="content line" v-html="tagContent"></div>
         </div>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import {formatDate} from '@/util.js'
export default {
	name: 'app',
   props: ['keys'],
	data() {
		return {
		   week: ['日', '一', '二', '三', '四', '五', '六']
      }
	},
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      pageData () {
         return this.$store.state.pageData.P9[this.keys]
         // return undefined
      },
      keyList () {
         return this.$store.state.keyList
      },
	   dates () {
         if (this.pageData !== undefined) {
            const date = new Date()
            date.setFullYear('2019')
            date.setMonth(this.pageData.month-1)
            date.setDate(this.pageData.day)
            return {
               day: formatDate(date, 'dd'),
               month: formatDate(date, 'MM'),
               year: formatDate(date, 'yyyy.MM.dd'),
               week: `星期${this.week[date.getDay()]}`
            }
         }else {
            return {
               day: '',
               month: '',
               year: '',
               week: ''
            }
         }
      },
      tagContent () {
         if (this.pageData !== undefined) {
            if (this.keys === this.keyList[0]) {
               return `你到了离家最远的<span style="color:#F84F1C">${this.pageData.name}</span>，还记得那天为什么开车远行吗？`
            } else if (this.keys === this.keyList[1]) {
               return `这天你行驶路程最长，达到<span style="color:#F84F1C">${this.pageData.mileage}公里</span>，远行在外行车安全第一位。`
            } else if (this.keys === this.keyList[2]) {
               return `深夜<span style="color:#F84F1C">${this.pageData.time}点</span>，你还在开车，如果太累了，就和生活请个假吧。`
            } else if (this.keys === this.keyList[3]) {
               return `你到达了<span style="color:#F84F1C">${this.pageData.city}</span>，最高海拔<span style="color:#F84F1C">${this.pageData.altitude}米</span>，那里的风景一定很美吧。`
            } else if (this.keys === this.keyList[4]) {
               return `你使用了<span style="color:#F84F1C">${this.pageData.times}次</span>远程开空调，冷暖由我决定！`
            } else if (this.keys === this.keyList[5]) {
               return `你查看了<span style="color:#F84F1C">${this.pageData.times}次</span>车辆状态，像关心家人一样时刻查看爱车情况，你一定是个很温暖的人。`
            } else if (this.keys === this.keyList[6]) {
               return `你查看了<span style="color:#F84F1C">${this.pageData.times}次</span>能耗排名，关注节能降耗，从你我做起。`
            } else if (this.keys === this.keyList[7]) {
               return `你使用了<span style="color:#F84F1C">${this.pageData.times}次</span>远程车门解锁，已经习惯手机就是车钥匙了。`
            } else if (this.keys === this.keyList[8]) {
               return `你使用了<span style="color:#F84F1C">${this.pageData.times}次</span>闪灯鸣笛功能，与爱车时时“感应”，找车不难。`
            } else if (this.keys === this.keyList[9]) {
               return `你在车上听了<span style="color:#F84F1C">${this.pageData.minutes}分钟</span>的歌，热爱音乐的你，一定有一颗热爱生活的心。`
            } else if (this.keys === this.keyList[10]) {
               const min = this.pageData.minutes
               if (min > 60) {
                  return `你在车上玩了<span style="color:#F84F1C">${min}分钟</span>的游戏，大屏玩游戏虽然过瘾，但不要沉迷哦！`
               } else {
                  return `你在车上玩了<span style="color:#F84F1C">${min}分钟</span>的游戏，大屏玩游戏，过瘾又自在！`
               }
            } else if (this.keys === this.keyList[11]) {
               return `你使用App学习了<span style="color:#F84F1C">${this.pageData.minutes}分钟</span>，看来利用碎片时间学习已经成为了你的习惯。 `
            }
         } else {
            return ''
         }
      }
   },
	methods: {}
}
</script>

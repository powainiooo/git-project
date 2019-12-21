<style scoped>
.z-piece { width: 584px; height: 880px; background-color: #ffffff; position: absolute; top: 164px; left: 2px;}
.z-piece .frame { width: 540px; height: 810px; border: 2px solid #333333; margin: 56px 0 0 24px; position: relative;}
.z-piece .content { line-height: 1.5; color: #333333; font-size: 30px;}
.z-piece .content span { color: #F84F1C;}
.z-piece .line { position: relative;}
.z-piece .line:before { content: ''; width: 60px; height: 2px; background-color: #333333; position: absolute; top: -25px; left: 0;}
.z-piece .diary-table { display: flex; flex-wrap: wrap;}
.z-piece .diary-table .pics { width: 396px; display: flex; align-items: center; justify-content: center; border-right: 2px solid #333333;}
.z-piece .diary-table .pics img { width: 100%; padding: 10px;}
.z-piece .diary-table .date { width: 140px; text-align: center;}
.z-piece .diary-table .date .day { font-size: 80px; font-weight: bold;}
.z-piece .diary-table .date .month { font-size: 80px; font-weight: lighter;}
.z-piece .diary-table .date .year { font-size: 20px;}
.z-piece .diary-table .info { width: 100%; border-top: 2px solid #333333;}
.z-piece .diary-table .info .content { margin: 60px 10px 0 10px;}
</style>

<template>
<div class="z-piece">
   <div class="frame">
      <div class="diary-table">
         <div class="pics">
            <img src="/static/diary/2.png" v-if="keys === 'date_city'"/>
            <img src="/static/diary/3.png" v-else-if="keys === 'date_mile'"/>
            <img src="/static/diary/4.png" v-else-if="keys === 'date_night'"/>
            <img src="/static/diary/5.png" v-else-if="keys === 'date_city_hight'"/>
            <img src="/static/diary/6.png" v-else-if="keys === 'date_air_open'"/>
            <img src="/static/diary/7.png" v-else-if="keys === 'date_vehicle_status'"/>
            <img src="/static/diary/8.png" v-else-if="keys === 'date_energy'"/>
            <img src="/static/diary/9.png" v-else-if="keys === 'date_door_unlock'"/>
            <img src="/static/diary/10.png" v-else-if="keys === 'date_whistle'"/>
            <img src="/static/diary/11.png" v-else-if="keys === 'date_music'"/>
            <img src="/static/diary/12.png" v-else-if="keys === 'date_game'"/>
            <img src="/static/diary/13.png" v-else-if="keys === 'date_learn'"/>
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
		return {}
	},
   computed: {
	   dates () {
	      const date = new Date()
	      return {
	         day: formatDate(date, 'dd'),
            month: formatDate(date, 'MM'),
            year: formatDate(date, 'yyyy.MM.dd'),
            week: '星期一'
         }
      },
      tagContent () {
         const data = 0
         const data2 = 0
         if (this.keys === 'date_city') {
	         return `你到了离家最远的<span>${data}</span>，还记得那天为什么开车远行吗？`
         } else if (this.keys === 'date_mile') {
            return `这天你行驶路程最长，达到<span>${data}</span>公里，远行在外行车安全第一位。`
         } else if (this.keys === 'date_night') {
            return `深夜xx点，你还在开车，如果太累了，就和生活请个假吧。`
         } else if (this.keys === 'date_city_hight') {
            return `你到达了<span>${data}</span>，海拔高达<span>${data2}</span>米，那里的风景一定很美吧。`
         } else if (this.keys === 'date_air_open') {
            return `你使用了多达<span>${data}</span>次远程开空调，冷暖由我决定！`
         } else if (this.keys === 'date_vehicle_status') {
            return `你查看了多达<span>${data}</span>次车辆状态，像关心家人一样时刻查看爱车情况，你一定是个很温暖的人。`
         } else if (this.keys === 'date_energy') {
            return `你查看了多达<span>${data}</span>次能耗排名，关注节能降耗，从你我做起。`
         } else if (this.keys === 'date_door_unlock') {
            return `你使用了多达<span>${data}</span>次远程车门解锁，已经习惯手机就是车钥匙了。`
         } else if (this.keys === 'date_whistle') {
            return `你使用了多达<span>${data}</span>次闪灯鸣笛功能，与爱车时时“感应”，找车不难。`
         } else if (this.keys === 'date_music') {
            return `你在车上听了<span>${data}</span>分钟的歌，热爱音乐的你，一定有一颗热爱生活的心。`
         } else if (this.keys === 'date_game') {
            return `你在车上玩了<span>${data}</span>分钟的游戏，大屏玩游戏虽然过瘾，但不要沉迷哦！`
         } else if (this.keys === 'date_learn') {
            return `你使用App学习了<span>${data}</span>分钟，看来利用碎片时间学习已经成为了你的习惯。 `
         }
      }
   },
	methods: {}
}
</script>

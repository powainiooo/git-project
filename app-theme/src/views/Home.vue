<style>
   .tag { width: 188px; display: flex; margin: 20px auto;}
   .tag li { width: 94px; height: 36px; border: 1px solid #DBDBDB; display: flex; justify-content: center; align-items: center; font-size: 16px; color: #666666;}
   .tag li:first-child { border-right: none;}
   .tag li:last-child { border-left: none;}
   .tag li.active { background-color: #2B5FD5; color: #ffffff; border-color: #2B5FD5; transition: all 0.2s linear;}
   .list-container { width: 100vw; overflow: hidden;}
   .list-frame { width: 200vw; display: flex; transition: transform 0.3s ease-out;}
   .list-frame.move { transform: translate(-100vw, 0);}
   .list { width: 100vw; margin: 20px 0; padding: 0 20px;}
</style>
<template>
   <div class="home">
      <ul class="tag">
         <li :class="tag === 'theme' ? 'active' : ''" @click="tag = 'theme'">主题</li>
         <li :class="tag === 'wallpaper' ? 'active' : ''" @click="tag = 'wallpaper'">壁纸</li>
      </ul>
      <div class="list-container">
         <div class="list-frame" :class="tag === 'wallpaper' ? 'move' : ''">
            <div class="list">
               <list-item v-for="i in themeList" :key="i.id" :itemData="i" :userId="themeId" @doset="setRemote"></list-item>
            </div>
            <div class="list">
               <list-item v-for="i in wallpaperList" :key="i.id" :itemData="i" :userId="wallpaperId" @doset="setRemote"></list-item>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { matchTopicId, remotePeelOrder } from '@/api.js'
import { showAlert } from '@/util.js'
import listItem from '@/components/listItem.vue'
import data from '@/data.json'
export default {
   name: 'home',
   components: { listItem },
   data () {
      return {
         tag: 'theme',
         themeList: data.theme,
         wallpaperList: data.wallpaper,
         themeId: null,
         wallpaperId: null
      }
   },
   mounted () {
      this.matchTopicId()
   },
   methods: {
      matchTopicId () {
         matchTopicId().then(res => {
            const { themeId, wallpaperId } = res.resultData
            this.themeId = themeId
            this.wallpaperId = wallpaperId
         })
      },
      setRemote (data) {
         const { id, uiType } = data
         remotePeelOrder({
            themeId: id,
            uiType
         }).then(res => {
            this.matchTopicId()
         })
      }
   },
   computed: {

   }
}
</script>

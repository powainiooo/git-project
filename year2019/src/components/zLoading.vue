<style scoped>
.z-loading { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10}
.z-loading .title { width: 300px; position: absolute; left: 225px; top: 50%; margin-top: -160px; z-index: 10}
.z-loading .star1 { width: 80px; position: absolute; left: 100px; top: 150px}
.z-loading .star2 { width: 120px; position: absolute; right: 80px; top: 400px}
.fadeOut { animation: fadeOut 2s linear;}
@keyframes fadeOut {
   0% { opacity: 1;}
   100% { opacity: 0;}
}
</style>

<template>
<transition leave-active-class="fadeOut">
   <div class="z-loading" v-if="!imgLoadOver && !dataLoadOver">
      <img src="@/assets/img/title.png" class="title">
      <img src="@/assets/img/star.png" class="star1">
      <img src="@/assets/img/star.png" class="star2">
   </div>
</transition>
</template>

<script type='es6'>
import axios from 'axios'

export default {
	name: 'app',
	data() {
		return {
         imgsList: [],
         precent:0,
         steps:0,
         isOver:false,
         imgLoadOver:false,
         dataLoadOver:false,
         outTime: 2000
      }
	},
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      pageList () {
         return this.$store.state.pageList
      },
      keyList () {
         return this.$store.state.keyList
      },
      params () {
         return this.$store.state.params
      }
   },
   mounted () {
      // this.loadAll();
      this.getData();
   },
	methods: {
      loadImgs(src){
         let self = this;
         return new Promise((resolve,reject)=>{
            let img = new Image();
            img.onload = function(){
               console.log('img onload')
               self.steps += 1;
               self.precent = Math.floor(self.steps / self.imgsList.length * 100);
               self.$store.commit('setLoadingPecent', self.precent)
               resolve(img);
            };
            img.onerror = function(){
               reject(new Error('Could not load image at ' + src));
            };
            img.src = src;
         })
      },
      loadAll(){
         console.log('loadAll start1')
         let arr = [];
         for(let item of this.imgsList){
            arr.push(this.loadImgs(item))
         }
         Promise.all(arr).then(res=>{
            this.imgLoadOver = true;
            this.isAllLoad();
         }).catch(err => {
            console.log(err)
         })
      },
      getData(){
         try{
            this.dataLoadOver = true;
            // this.steps += 1;
            // this.precent = Math.floor(this.steps / (this.imgsList.length+1) * 100);
            // this.$store.commit('setLoadingPecent', this.precent)
            // this.isAllLoad();
            console.log('this is params')
            console.log(this.params)
            axios.post('/mobileserve/Vehicle/getAnnuallyData',{
               data: this.params.data,
               source: this.params.source
            }).then(res=>{
               let data = res.data;
               console.log('下面是年报数据')
               console.log(data)
               if(data.result === '0'){
                  this.dataLoadOver = true
                  // this.isAllLoad()
                  // data.data.P7 = {
                  //    avgFlow: 1,
                  //    avgFlowAll: 2,
                  // }
                  this.$store.commit('setPageData', data.data)
                  this.initLoadList(data.data)
                  console.log('loadAll start0')
                  this.loadAll()
               }else{
                  getErrorData(JSON.stringify(data))
                  // window.errorData = data;
                  // window.location = '/error';
               }
            })
         }catch(err){
            console.log(err)
            getErrorData(JSON.stringify({result: "1",rebackDesc: "2"}))
         }
      },
      initLoadList (data) {
         let pageList = []
         let imgsList = []
         for (let i = 0; i <= 10; i++) {
            if (data[`P${i}`] !== undefined) {
               if (i === 9) {
                  if (this.params.source !== 'web') {
                     pageList.push(`p${i}`)
                  }
               } else {
                  pageList.push(`p${i}`)
               }

               if (i === 0) {
                  imgsList.push('static/bg0.png')
                  imgsList.push('static/bg0-top.png')
                  imgsList.push('static/ticket.png')
               } else if (i === 1) {
                  imgsList.push('static/earth.png')
               } else if (i === 2) {
                  imgsList.push('static/bg2.png')
                  imgsList.push('static/recharge.png')
               } else if (i === 3) {
                  imgsList.push('static/bg3-up.png')
                  imgsList.push('static/bg3-bottom.png')
               } else if (i === 4) {
                  imgsList.push('static/bg4.png')
               } else if (i === 5) {
                  if (data[`P${i}`].tag === 2) { //夜猫子
                     imgsList.push('static/p5-dark.png')
                  } else {
                     imgsList.push('static/bg5-back.png')
                  }
               } else if (i === 6) {
                  imgsList.push('static/bg6-back.png')
                  imgsList.push('static/bg6-front.png')
               } else if (i === 7) {
                  imgsList.push('static/bg7-back.png')
                  imgsList.push('static/bg7-front.png')
               } else if (i === 8) {
                  imgsList.push('static/bg8.png')
               } else if (i === 9) {
                  if (this.params.source !== 'web') {
                     const keyList = this.keyList
                     let arr = []
                     for (let j = 0; j < keyList.length; j++) {
                        if (data[`P${i}`][keyList[j]] !== undefined) {
                           imgsList.push(`static/diary/diary-${j+2}.png`)
                           arr.push(keyList[j])
                        }
                     }
                     this.$store.commit('setUseKeyList', arr)
                  }
               }
            }
         }
         for (let i = 0; i < imgsList.length; i++) {
            imgsList[i] = this.imgSrc + imgsList[i]
         }
         console.log(imgsList)
         this.$store.commit('setPageList', pageList)
         this.imgsList = imgsList
      },
      isAllLoad(){
         if(this.imgLoadOver && this.dataLoadOver){
            setTimeout(() => {
               this.$store.commit('changePage', 'loading-over')
               setTimeout(() => {
                  this.$store.commit('changePage', this.pageList[0])
               }, this.outTime)
            }, 200)
         }
      },
   }
}
</script>

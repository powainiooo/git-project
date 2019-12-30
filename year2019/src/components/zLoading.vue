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
//{"result":"0","data":{"P0":{"powerMode":"混动","dLink":"No","enrollDays":1499},"P1":{"mileage":4600,"evMileage":2350,"tag":4},"P2":{"chargeTimes":19,"cPlacing":19,"avgChargeTime":1.1,"timeZone":"07:00-07:59","tag":3},"P3":{"maxSpeed":125,"avgSpeed":40.4,"tag":2},"P4":{"driveTime":161.3},"P5":{"tag":3},"P6":{"tag":2,"mostControl":2,"controlTimes":25},"P9":{"city":{"month":5,"day":1,"name":"惠州市"},"travel":{"month":2,"day":7,"mileage":132},"high":{"month":5,"day":1,"city":"惠州市","altitude":1336},"air":{"month":6,"day":20,"times":3},"status":{"month":1,"day":4,"times":36},"energy":{"month":4,"day":19,"times":26},"unlock":{"month":4,"day":25,"times":4}},"P10":{"tag":2,"recommend":"远程控制、充电","total":85.2,"score":{"routine":74.8,"techno":82.2,"energy":96,"envir":87.9}}}}
const tempData = {
   "p0": {
      "dLink": "No",
      "enrollDays": 1287,
      "powerMode": "混动"
   },
   "p1": {
      "eConsumption": 915.5,
      "evMileage": 3704,
      "fConsumption": 590.3,
      "mileage": 9833,
      "tag": 2
   },
   "p10": {
      "recommend": "节能、充电",
      "score": "{\"routine\":85.7,\"envir\":77.9,\"techno\":99.8,\"energy\":71.3}",
      "tag": 1,
      "total": 83
   },
   "p2": {
      "avgChargeTime": 2.1,
      "cPlacing": 50,
      "chargeTimes": 0,
      "tag": 1,
      "timeZone": "08:00-08:59"
   },
   "p3": {
      "avgSpeed": 43,
      "maxSpeed": 136,
      "tag": 1
   },
   "p4": {
      "driveTime": 497.3
   },
   "p5": {
      "tag": 3
   },
   "p6": {
      "controlTimes": 473,
      "leastControl": 3,
      "mostControl": 2,
      "tag": 2
   },
   "p7": {},
   "p8": {
      "topApp": ""
   },
   "p9": {
      "air": "{\"times\":5,\"month\":10,\"day\":10}",
      "city": "{\"month\":6,\"name\":\"广州市\",\"day\":16}",
      "energy": "{\"times\":3,\"month\":10,\"day\":18}",
      "game": "",
      "high": "{\"altitude\":1336,\"month\":10,\"city\":\"惠州市\",\"day\":4}",
      "late": "{\"month\":2,\"time\":2,\"day\":4}",
      "music": "",
      "status": "{\"times\":111,\"month\":9,\"day\":2}",
      "study": "",
      "travel": "{\"month\":2,\"day\":6,\"mileage\":901}",
      "unlock": "{\"times\":14,\"month\":7,\"day\":19}",
      "whistle": "{\"times\":5,\"month\":8,\"day\":6}"
   }
}
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
         let arr = [];
         for(let item of this.imgsList){
            arr.push(this.loadImgs(item))
         }
         Promise.all(arr).then(res=>{
            this.imgLoadOver = true;
            this.isAllLoad();
         })
      },
      getData(){
         try{
            this.dataLoadOver = true;
            // this.steps += 1;
            // this.precent = Math.floor(this.steps / (this.imgsList.length+1) * 100);
            // this.$store.commit('setLoadingPecent', this.precent)
            // this.isAllLoad();
            axios.post('/mobileserve/Vehicle/getAnnuallyData',{data: this.params.data}).then(res=>{
               let data = res.data;
               console.log('下面是年报数据')
               console.log(data)
               if(data.result === '0'){
                  this.dataLoadOver = true
                  // this.isAllLoad()
                  this.$store.commit('setPageData', data.data)
                  this.initLoadList(data.data)
                  this.loadAll()
               }else{
                  getErrorData(JSON.stringify(data))
                  // window.errorData = data;
                  // window.location = '/error';
               }
            })
         }catch(err){
            console.log(err)
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
                           imgsList.push(`static/diary/${j+2}.png`)
                           arr.push(keyList[j])
                        }
                     }
                     this.$store.commit('setUseKeyList', arr)
                  }
               }
            }
         }
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

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
         imgsList: [
		      'static/bg2.png'
         ],
         precent:0,
         steps:0,
         isOver:false,
         imgLoadOver:false,
         dataLoadOver:false,
         outTime: 2500
      }
	},
   mounted () {
      this.loadAll();
      this.getData();
   },
	methods: {
      loadImgs(src){
         let self = this;
         return new Promise((resolve,reject)=>{
            let img = new Image();
            img.onload = function(){
               self.steps += 1;
               self.precent = Math.floor(self.steps / (self.imgsList.length+1) * 100);
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
         let data = 'F/WTJVAVEPkjP0+wvIeowcWeC+G57LU4QEw7zUHLEY8upe0QV9AOxLSJbftzI7wxLOQ4NIFwSTdt+cqj+hbxXIOxlTswCdUIxTCRaa0o5SggQVaq7i/Zrcib8sMuQ/mjBtNDVs4DTe2vWk3Z+LYLp+IvGZUI+F12S9RHEkyBiEletjiXGLxsPfdriVc15bflPnVav9qjfzwBkMVL0mtUEYDTeu2vvRIlalfc9m46mTMcmOS7Uux9WBUtICRYIf8KjxMdETVKecC8TqkesYmEUqRNwT9sCq6fYcv2eqke/8XaNaJejNk07UV7ZkjqyfyPpW4yKlolbx2abUxHqkKNCVIjh4ulypZb19hmtnNeIFw95kcujran/KAkckqf4Z1MR';
         try{
            this.dataLoadOver = true;
            this.steps += 1;
            this.precent = Math.floor(this.steps / (this.imgsList.length+1) * 100);
            this.$store.commit('setLoadingPecent', this.precent)
            this.isAllLoad();
            this.$store.commit('setPageData', {});
            axios.post('/mobileserve/Vehicle/getAnnuallyData',{data:data}).then(res=>{
               let data = res.data;
               if(data.result == 0){
                  this.dataLoadOver = true;
                  this.steps += 1;
                  this.precent = Math.floor(this.steps / (this.imgsList.length+1) * 100);
                  this.isAllLoad();
                  this.$store.commit('setPageData',data.data);
               }else{
                  // window.errorData = data;
                  // window.location = '/error';
               }
            })
         }catch(err){
            console.log(err)
         }
      },
      isAllLoad(){
         if(this.imgLoadOver && this.dataLoadOver){
            setTimeout(() => {
               this.$store.commit('changePage', 'loading-over')
               setTimeout(() => {
                  this.$store.commit('changePage', 'p1')
               }, this.outTime)
            }, 200)

         }
      },
   }
}
</script>

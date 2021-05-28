<style scoped>
.n-clock{ width: 400px; height: 108px; display: flex; justify-content: space-between;}
.n-clock .clock-list{ width: 80px; height: 100%; position: relative;}
.n-clock .clock-list .clock-item{ width: 100%; height: 100%; border: 1px solid #ECECEC; border-radius: 15px; font-size: 100px; line-height: 105px; font-family: DinL; position: absolute; top: 0; left: 0; z-index: 1;}
.n-clock .clock-mid{ width: 36px; height: 100%; position: relative;}
.n-clock .clock-mid::before,.n-clock .clock-mid::after{ content: ''; width: 10px; height: 10px; position: absolute; left: 50%; margin-left: -5px; border-radius: 50%; background-color: #362B1D;}
.n-clock .clock-mid::before{ top: 60px;}
.n-clock .clock-mid::after{ bottom: 60px;}
.n-clock .clock-list .clock-item .up{ height: 50%; overflow: hidden; background: linear-gradient(0deg, rgba(35, 23, 20, 0.1), #FFFFFF); display: flex; align-items: flex-start; justify-content: center; transform-origin: 50% 100%; transform: rotateX(0deg); border-radius: 15px 15px 0 0; box-sizing: border-box;}
.n-clock .clock-list .clock-item .down{ height: 50%; overflow: hidden; background-color: #ffffff; display: flex; align-items: flex-end; justify-content: center; transform-origin: 50% 0%; border-radius: 0 0 15px 15px; box-sizing: border-box;}

/*.n-clock .clock-list .clock-item-new{ z-index: 2;}*/
.n-clock .clock-list .clock-item-active{ z-index: 4; animation:zindex 0.2s 0.2s linear both;}
@keyframes zindex {
  0%{ z-index: 4;}
  1%,100%{ z-index: 2;}
}
.n-clock .clock-list .clock-item-new{ z-index: 3;}

.n-clock .clock-list .clock-item-active .up{ animation:turn 0.2s linear both;}
@keyframes turn {
  0%{transform: rotateX(0deg); }
  100%{transform: rotateX(90deg); }
}
.n-clock .clock-list .clock-item-new .down{ animation:turn2 0.2s 0.2s linear both;transform: rotateX(-90deg);}
@keyframes turn2 {
  0%{transform: rotateX(-90deg); }
  100%{transform: rotateX(0deg); }
}
</style>

<template>
<div class="n-clock">
  <div class="clock-list">
    <div class="clock-item" :class="{'clock-item-new': !difArr[0]}">
      <div class="up">{{timerArr[0]}}</div>
      <div class="down">{{timerArr[0]}}</div>
    </div>
    <div class="clock-item" :class="{'clock-item-active': !difArr[0]}">
      <div class="up">{{lasetTimerArr[0]}}</div>
      <div class="down">{{lasetTimerArr[0]}}</div>
    </div>
  </div>
  <div class="clock-list">
    <div class="clock-item" :class="{'clock-item-new': !difArr[1]}">
      <div class="up">{{timerArr[1]}}</div>
      <div class="down">{{timerArr[1]}}</div>
    </div>
    <div class="clock-item" :class="{'clock-item-active': !difArr[1]}">
      <div class="up">{{lasetTimerArr[1]}}</div>
      <div class="down">{{lasetTimerArr[1]}}</div>
    </div>
  </div>
  <div class="clock-list clock-mid"></div>
  <div class="clock-list">
    <div class="clock-item" :class="{'clock-item-new': !difArr[2]}">
      <div class="up">{{timerArr[2]}}</div>
      <div class="down">{{timerArr[2]}}</div>
    </div>
    <div class="clock-item" :class="{'clock-item-active': !difArr[2]}">
      <div class="up">{{lasetTimerArr[2]}}</div>
      <div class="down">{{lasetTimerArr[2]}}</div>
    </div>
  </div>
  <div class="clock-list">
    <div class="clock-item" :class="{'clock-item-new': !difArr[3]}">
      <div class="up">{{timerArr[3]}}</div>
      <div class="down">{{timerArr[3]}}</div>
    </div>
    <div class="clock-item" :class="{'clock-item-active': !difArr[3]}">
      <div class="up">{{lasetTimerArr[3]}}</div>
      <div class="down">{{lasetTimerArr[3]}}</div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
    timer: {
      type: String,
      default: ''
    }
  },
  watch: {
	  timer (newval, oldval) {
      if(oldval === ''){
        this.init(newval)
      }else{
        this.timeToStr(newval)
        setTimeout(()=>{
          this.reset();
        },900)
      }
    }
  },
	data() {
		return {
      timerArr:[],
      lasetTimerArr:[],
      difArr:[true,true,true,true]
    }
	},
	methods: {
    timeToStr(val){
      let arr = [],difArr = [];
      arr[0] = Math.floor(Math.floor(val/60)/10);
      arr[1] = Math.floor(Math.floor(val/60)%10);
      arr[2] = Math.floor(Math.floor(val%60)/10);
      arr[3] = Math.floor(Math.floor(val%60)%10);

      for(let i=0;i<arr.length;i++){
        difArr[i] = arr[i] == this.lasetTimerArr[i]
      }
      this.timerArr = arr
      this.difArr = difArr
    },
    init(val){
      let arr = [],arr2 = [];
      arr[0] = Math.floor(Math.floor(val/60)/10);
      arr[1] = Math.floor(Math.floor(val/60)%10);
      arr[2] = Math.floor(Math.floor(val%60)/10);
      arr[3] = Math.floor(Math.floor(val%60)%10);
      arr2[0] = arr[0] - 1 < 0 ? 5 : arr[0] - 1;
      arr2[1] = arr[1] - 1 < 0 ? 9 : arr[1] - 1;
      arr2[2] = arr[2] - 1 < 0 ? 5 : arr[2] - 1;
      arr2[3] = arr[3] - 1 < 0 ? 9 : arr[3] - 1;

      this.timerArr = arr2
      this.lasetTimerArr = arr
      console.log(this.timerArr, this.lasetTimerArr)
    },
    reset(){
      this.lasetTimerArr = [...this.timerArr]
      this.difArr = [true,true,true,true]
    }
  }
}
</script>

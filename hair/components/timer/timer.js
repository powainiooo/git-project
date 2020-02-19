// components/timer/timer.js
Component({
  properties:{
    timer:{
      type:String,
      observer(newval,oldval,changedPath){
        //console.log(this);
        if(oldval == ''){
          this.init(newval)
        }else{
          this.timeToStr(newval)
          setTimeout(()=>{
            this.reset();
          },900)
        }
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    timerArr:[],
    lasetTimerArr:[],
    difArr:[true,true,true,true]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    timeToStr(val){
      let arr = [],difArr = [];
      arr[0] = Math.floor(Math.floor(val/60)/10);
      arr[1] = Math.floor(Math.floor(val/60)%10);
      arr[2] = Math.floor(Math.floor(val%60)/10);
      arr[3] = Math.floor(Math.floor(val%60)%10);

      for(let i=0;i<arr.length;i++){
        difArr[i] = arr[i] == this.data.lasetTimerArr[i]
      }
      this.setData({
        timerArr:arr,
        difArr:difArr
      });
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
      this.setData({
        timerArr:arr2,
        lasetTimerArr:arr
      });
    },
    reset(){
      this.setData({
        lasetTimerArr:this.data.timerArr,
        difArr:[true,true,true,true]
      });
    }
  }
});
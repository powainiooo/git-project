// times.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      time: { // 属性名 时间单位为s
         type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
         value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
         observer: function(newVal, oldVal, changedPath) {
            if (newVal.trim() != '') {
               this.setData({
                  endtime: Number(newVal) + Number(this.properties.timeWait)*3600,
               })
            }
         },
      },
      orderId: String,
      timeWait: { // 属性名 时间单位为s
         type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
         value: '1', // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
   },

   /**
    * 组件的初始数据
    */
   data: {
      sh:'',
      minutes: '',
      seconds: ''
   },
   ready() {
      this.setInFunc()
      this.timeFunc()
   },
   /**
    * 组件的方法列表
    */
   methods: {
      timeFunc() {
         var sh;
         sh = setInterval(rs => {
            this.setInFunc()
         }, 1000)
         this.setData({
            sh: sh
         })
      },
      setInFunc() {
         var nowtime, lefttime, m, s;
         nowtime = Number(new Date()) / 1000; //获得当前时间
         //结束时间-当前时间得到毫秒数，再除以1000得到两个时间相差的秒数
         lefttime = parseInt(this.data.endtime - nowtime);
         if (this.data.endtime <= nowtime) {
            m = s = "0";
         } else {
            m = parseInt((lefttime / 60));
            s = parseInt(lefttime % 60);
         }
         // 三目运算符
         m = m < 10 ? "0" + m : m;
         s = s < 10 ? "0" + s : s;
         this.setData({
            minutes: m,
            seconds: s,
         })
         if (lefttime <= 0) {
            m = s = "00";
            clearInterval(this.data.sh);
            this.triggerEvent('myevent', { id: this.properties.orderId })
         }
      }
   }
})
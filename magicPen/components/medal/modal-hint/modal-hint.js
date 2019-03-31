// components/medal/modal-hint/modal-hint.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      type: {
         type: Number,
         value: 0
      },
      step: {
         type: Number,
         value: 1
      },
   },

   /**
    * 组件的初始数据
    */
   data: {
      medalData: [
         {
            src: '../../../res/medal/level1.png',
            srcDone: '../../../res/medal/level1-done.png',
            name: '一级小画家勋章',
            hint: '收集3张图片作品获得',
            steps: 3
         }
      ]
   },

   /**
    * 组件的方法列表
    */
   methods: {

   }
})

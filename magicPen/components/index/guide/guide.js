// components/index/guide/guide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    useGuide: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    step: 1,
    showScan: false,
    showCamera: false,
    opacity: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeStep(e) {
      const step = e.currentTarget.dataset.next
      this.setData({
        step
      })
      this.triggerEvent('changeStep',step)
    },
    openScanModal() {
      this.setData({
        showScan: true
      })
      wx.nextTick(() => {
        this.setData({
          opacity: 1
        })
      })
    },
    showScanChange() {
      console.log('end')
    },
    openScan() {
      console.log('scan')
      // this.setData({
      //   showCamera: true
      // })
      wx.scanCode({
        success(e){
          console.log(e)
        },
        fail(e){
          console.log(e)
        }
      })
    },
    scanEnd(e) {
      console.log(e)
    }
  }
})

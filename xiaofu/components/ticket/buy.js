// pages/ticket-buy/buy.js
const app = getApp()
Component({
   properties: {
      itemData: {
         type: Object,
         value: {},
         observer (newVal, oldVal, change) {
            if (newVal === null) return
            if (newVal.anew) {
               let list = newVal.anew
               let obj = {}
               let min = 100000
               for (let item of list) {
                  if (parseFloat(item.price) < min && item.is_over === 0) {
                     min = parseFloat(item.price)
                     obj = item
                  }
               }
               this.setNums(obj)
               this.setData({
                  typeList: newVal.anew,
                  selectTicket: obj
               })
            }
            const nameVal = wx.getStorageSync('nameVal')
            const phoneVal = wx.getStorageSync('phoneVal')
            const addressVal = wx.getStorageSync('addressVal')
            const emailVal = wx.getStorageSync('emailVal')
            const idnum = wx.getStorageSync('idnum')
            this.setData({nameVal, phoneVal, addressVal, idnum, emailVal})
            this.checkValues()
         }
      }
   },
   /**
    * 页面的初始数据
    */
   data: {
      numbersArr: app.globalData.ticketNumsArr,
      numberIndex: 0,
      idTypeArr: ['身份证 ID card', '护照 passport'],
      idTypeIndex: -1,
	   ticketPrice: 0,
      nameVal: '',
      phoneVal: '',
      addressVal: '',
      emailVal: '',
      idnum: '',
      btnDisabled: false,
      typeList: [],
      selectTicket: {},
      showTypeList: false,
      ajaxSrc: app.globalData.ajaxSrc,
      imgSrc: app.globalData.imgSrc,
      uploadImg: '',
      showExample: false
   },
	attached() {
		app.$watch('ticketNumsArr', (val, old) => { // 监听选择票数范围
			this.setData({
				numbersArr: val
			})
		})
		app.$watch('ticketNumsSelected', (val, old) => { // 监听选择票数
			this.setData({
				numberIndex: val
			})
		})
	},
   observers: {
      'selectTicket.price, numberIndex' (price, index) {
         app.globalData.ticketPrice = price * this.data.numbersArr[index]
      }
   },
   methods: {
      idTypeChange: function (e) { // 证件类型切换
         this.setData({
            idTypeIndex: e.detail.value
         })
         this.checkValues()
      },
      toggleTypeList (event) { // 票种切换
         let over = event.target.dataset.over
         if (over === 1) return
         let val = event.target.dataset.val === undefined ? -1 : event.target.dataset.val
         let obj = val === -1 ? this.data.selectTicket : this.data.typeList[val]
         // let isShow = event.target.dataset.show;
         this.setNums(obj)
         let params = {}
         if (obj.is_over === 1) return
         params.selectTicket = obj
         this.setData(params)
      },
      checkValues (event) { // 检测信息是否全部输入
         let data = this.data.itemData
         if (event) {
            let key = event.target.dataset.key
            this.data[key] = event.detail.value
         }

         let btn = true
         if (this.data.nameVal === '') {
            btn = false
         }
         let myreg = /^[1][0-9]{10}$/
         if (!myreg.test(this.data.phoneVal)) {
            btn = false
         }
         if (data.info.is_post === '1') {
            if (this.data.addressVal === '') {
               btn = false
            }
         }
         if (data.info.is_idnum === '1') {
            if (this.data.idTypeIndex === -1) {
               btn = false
            } else if (this.data.idTypeIndex === 0) {
               let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
               if (!reg.test(this.data.idnum)) {
                  btn = false
               }
            } else if (this.data.idTypeIndex === 1) {
               if (this.data.idnum === '') {
                  btn = false
               }
            }
         }
         if (data.info.is_email === '1') {
            let reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
            if (!reg.test(this.data.emailVal)) {
               btn = false
            }
         }
         this.setData({
            btnDisabled: btn
         })
	      app.globalData.buyBtnDisabled = btn
      },
	   getParams () {
      	return {
		      tid: this.data.itemData.info.id,
		      name: this.data.nameVal,
		      mobile: this.data.phoneVal,
		      address: this.data.addressVal,
		      email: this.data.emailVal,
		      idnum: this.data.idnum,
		      passport: this.data.uploadImg,
		      idnum_type: parseInt(this.data.idTypeIndex) + 1,
		      sele: this.data.selectTicket.select,
		      nums: this.data.numbersArr[this.data.numberIndex],
	      }
	   },
      setNums (obj) { // 设置可选票的数量列表
         let arr = []
         let nums = parseInt(obj.nums)
         if (obj.max !== '') {
            let max = parseInt(obj.max)
            let val = max > nums ? nums : max
            for (let i = 0; i < val; i++) {
               arr.push(i + 1)
            }
         } else {
            if (nums < 10) {
               for (let i = 0; i < nums; i++) {
                  arr.push(i + 1)
               }
            } else {
               arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
         }
         app.globalData.ticketNumsArr = arr
      },
      doShowExample () { // 显示证件照示例
         this.setData({
            showExample: true
         })
         app.globalData.showPassport = true
      },
      doHideExample () { // 关闭证件照示例
         this.setData({
            showExample: false
         })
         app.globalData.showPassport = false
      },
      doUpload () { // 上传证件照
         const self = this
         wx.chooseImage({
            sourceType: ['album'],
            success (res) {
               const tempFilePaths = res.tempFilePaths
               self.doHideExample()
               wx.uploadFile({
                  url: self.data.ajaxSrc + '/image_upload', // 仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  name: 'file',
                  success (res) {
                     const data = JSON.parse(res.data)
                     self.setData({
                        uploadImg: data.url
                     })
                  }
               })
            }
         })
      },
      tmove () {}
   }
})

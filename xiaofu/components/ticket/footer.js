// components/ticket/footer.js
const {formatTime} = require('../../utils/util.js')
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		itemData: {
			type: Object,
			value: null,
			observer (data) {
				let min = 100000
				let date = 0
				if (data !== null) {
					const anew = data.anew
					if (data.info.is_end === 'over') {
						min = parseFloat(anew[0].price)
					} else {
						for (let item of anew) {
							if (parseFloat(item.price) < min && item.is_over === 0) min = parseFloat(item.price)
						}
					}
					date = formatTime(new Date(parseInt(data.info.sale_start) * 1000))
				}
				this.setData({
					showFrame: data !== null,
					showItem: 'detail',
					minprice: min,
					saleStart: date
				})
			}
		}
   },
	attached() {
		app.$watch('buyBtnDisabled', (val, old) => { // 监听选择票数范围
			this.setData({
				btnDisabled: val
			})
		})
		app.$watch('ticketPrice', (val, old) => { // 监听票价
			this.setData({
            ticketPrice: val
			})
		})
		app.$watch('drinkPrice', (val, old) => { // 监听票价
			this.setData({
            drinkPrice: val
			})
		})
		app.$watch('ticketNumsArr', (val, old) => { // 监听可选票数
			this.setData({
            numbersArr: val
			})
		})
	},
   /**
    * 组件的初始数据
    */
   data: {
	   showFrame: false,
	   showItem: '',
	   btnDisabled: true,
	   minprice: 0,
	   saleStart: 0,
	   numbersArr: app.globalData.ticketNumsArr,
	   numberIndex: 0,
      ticketPrice: 0,
      drinkPrice: 0,
	   totalPrice: 0
   },
   observers: {
      'ticketPrice, drinkPrice' (ticketPrice, drinkPrice) {
         let price = ticketPrice + drinkPrice
         if (price.toString().split('.').length > 1) { // 是小数
            price = price.toFixed(2)
         }
         this.setData({
            totalPrice: price
         })
      }
   },
   /**
    * 组件的方法列表
    */
   methods: {
	   gotoBuy () {
			this.togglePage('buy')
		   this.triggerEvent('btns', 'intoBuy')
	   },
	   togglePage (name) {
		   this.setData({
			   showItem: name
		   })
	   },
	   numberChange: function (e) {
		   this.setData({
			   numberIndex: e.detail.value
		   })
		   app.globalData.ticketNumsSelected = e.detail.value
	   },
	   doPay () {
	   	if (this.data.itemData.drink_list.length === 0) { // 确认付款
			   this.triggerEvent('btns', 'doPay')
		   } else { // 进入特饮页
			   this.togglePage('drink')
			   this.triggerEvent('btns', 'intoDrink')
            app.globalData.drinkPrice  = 0
            app.globalData.drinkParams  = []
		   }
	   },
      doPayDrink () {
         this.triggerEvent('btns', 'doPay')
      }
   }
})

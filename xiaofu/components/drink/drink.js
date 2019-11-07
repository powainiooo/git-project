// components/drink/drink.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
	   listData: {
			type: Array,
			value: [],
         observer (list) {
			   let obj = {}
			   for (let i of list) {
			      obj[`id${i.id}`] = {
			         drink_name: i.drink_name,
                  price: i.price,
                  nums: 0,
                  drink_id: i.id
               }
            }
            this.data.params = obj
         }
		}
   },

   /**
    * 组件的初始数据
    */
   data: {
      params: {}
   },

   /**
    * 组件的方法列表
    */
   methods: {
      numsChange (e) {
         const id = e.currentTarget.dataset.id
         this.data.params[`id${id}`].nums = e.detail
         this.setDrinkPrice()
      },
      setDrinkPrice () {
         let price = 0
         const data = this.data.params
         let arr = []
         for (let i in data) {
            if (data[i].nums !== 0) {
               price += Number(data[i].price) * data[i].nums
               arr.push(data[i])
            }
         }
         app.globalData.drinkPrice = price
         app.globalData.drinkParams = arr
      }
   }
})

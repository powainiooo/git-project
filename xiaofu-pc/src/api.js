import axios from 'axios'
const ajax = 'https://wechat.leesticket.com/mobile/applet'

// 获取票务列表
export const getProList = (params) => {
   return new Promise((resolve, reject) => {
      axios.post(`${ajax}/pro_list`, params).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取票务详情
export const getProDetail = (params) => {
   return new Promise((resolve, reject) => {
      axios.post(`${ajax}/product_info`, params).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取菜单信息
export const getMenuInfo = (src) => {
   return new Promise((resolve, reject) => {
      axios.post(`${ajax}/${src}`).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

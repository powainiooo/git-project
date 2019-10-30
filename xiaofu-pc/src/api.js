import axios from 'axios'
// const ajax = 'https://wechat.leesticket.com/mobile/applet'
const ajax = ''

// 获取票务列表 ${ajax}/pro_list
export const getProList = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`/mock/list.json`, {
         params
      }).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取票务详情 ${ajax}/product_info
export const getProDetail = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`/mock/detail.json`, {
         params
      }).then(res => {
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
      axios.get(`/mock/${src}.json`).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

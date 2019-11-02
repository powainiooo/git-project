import axios from 'axios'
// const ajax = 'https://wechat.leesticket.com/mobile/applet'
const ajax = ''

// 获取票务列表 ${ajax}/pro_list /mock/list.json
export const getProList = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/pro_list`, {
         params
      }).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取票务详情 ${ajax}/product_info /mock/detail.json
export const getProDetail = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/product_info`, {
         params
      }).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取菜单信息 ${ajax}/${src} /mock/${src}.json
export const getMenuInfo = (src) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/${src}`).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

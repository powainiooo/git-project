import axios from 'axios'
// const ajax = 'https://wechat.leesticket.com/mobile/applet'
const ajax = 'https://wechat.leesticket.com/mobile/applet_v2'
// const ajax = 'http://ticket.pc-online.cc/mobile/applet'
// const ajax = ''

// 获取票务列表 ${ajax}/pro_list /mock/list.json
export const getProList = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/pro_list`, {
      // axios.get(`/mock/list.json`, {
         params
      }).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

// 获取城市 ${ajax}/city_banner /mock/banner.json
export const getCityBanner = (params) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/city_banner`, {
      // axios.get(`/mock/banner.json`, {
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
      // axios.get(`/mock/detail.json`, {
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

// 获取日期是否有活动
export const getActivityDays = (data) => {
   return new Promise((resolve, reject) => {
      axios.get(`${ajax}/activity_days`).then(res => {
         resolve(res.data)
      }).catch(err => {
         console.log(err)
         reject(err)
      })
   })
}

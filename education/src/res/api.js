const baseUrl = 'https://bbart.waiting8.com'
let token = ''
const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      if (token === '') {
         const app = getApp()
         const userInfo = app.$wepy.$options.globalData.userInfo
         if (userInfo) {
            token = userInfo.token
         }
      }
      const extras = {
         header: {
            token,
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         success(res) {
            console.log('token', token)
            console.log('请求参数', opts)
            console.log('返回数据', res)
            if (res.data.status === 0) {
               resolve(res.data)
            } else {
               resolve(res.data)
            }
            wx.hideNavigationBarLoading()
         },
         fail(err) {
            console.log(err)
            wx.navigateTo({
               url: '/pages/error/error'
            })
            wx.hideNavigationBarLoading()
            reject(err)
         }
      }
      wx.request({...opts, ...extras})
   })
}

// 用户登陆
export const doLogin = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/wxapp/login`,
      data
   })
}
// 门店查询
export const getStoreList = () => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/store/lists`
   })
}
// 课程密码设置
export const setPassword = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/user/set_course_password`,
      data
   })
}
// 课程密码验证
export const checkPassword = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/user/check_course_password`,
      data
   })
}
// 课程列表查询
export const getCourseList = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/course/lists`,
      data
   })
}
// 学生已购买课程列表
export const getCourseListByStudent = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/student_course/lists`,
      data
   })
}
// 已购课程详情
export const getCourseDetailByStudent = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/student_course/detail`,
      data
   })
}
// 新建学生档案
export const newStudentFile = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/student/create`,
      data
   })
}
// 学生档案查询
export const getStudentList = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/student/lists`,
      data
   })
}
// 课程详情查询
export const getCourseDetail = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/course/detail`,
      data
   })
}
// 订单创建
export const createOrder = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/order/create`,
      data
   })
}
// 订单支付
export const payOrder = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/order/pay`,
      data
   })
}
// 订单列表/购买记录
export const getOrderList = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/order/lists`,
      data
   })
}
// 订单列表/购买记录
export const upload = url => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/common/upload`,
      filePath: url,
      name: 'file'
   })
}
// 订单列表/购买记录
export const getCommentData = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/review/detail`,
      data
   })
}
// 上报已选择的门店信息
export const updateStore = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/user/update_last_store`,
      data
   })
}
// 近期活动列表
export const getActivityList = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/activity/lists`,
      data
   })
}

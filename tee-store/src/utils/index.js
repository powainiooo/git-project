function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const promisify = api => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      const extras = {
        success: resolve,
        fail (err) {
          console.log(err)
          reject(err)
        }
      }
      api({...options, ...extras}, ...params)
    })
  }
}

export const checkAddr = obj => {
  if (obj.name === '') {
    mpvue.showToast({
      icon: 'none',
      title: '请输入收件姓名'
    })
    return false
  }
  if (obj.phone === '') {
    mpvue.showToast({
      icon: 'none',
      title: '请输入联系电话'
    })
    return false
  }
  if (obj.province === '') {
    mpvue.showToast({
      icon: 'none',
      title: '请选择省市区'
    })
    return false
  }
  if (obj.address === '') {
    mpvue.showToast({
      icon: 'none',
      title: '请输入详细地址'
    })
    return false
  }
  return true
}

export default {
  formatNumber,
  formatTime,
  checkAddr
}

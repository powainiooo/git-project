export const getParams = url => {
   if (url === '') return {}
   const keyValueArr = url.split('?')[1].split('&')
   let paramObj = {}
   keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
   })
   return paramObj
}
export const showAlert = msg => {
   console.log(msg)
   const u = navigator.userAgent; const app = navigator.appVersion
   const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
   const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
   if (isAndroid) {
      action.showDialog(msg)
   }
   if (isIOS) {
      window.webkit.messageHandlers.showAlert.postMessage(msg)
   }
}

export function formatDate (date, fmt) {
   if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
   }
   let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
   }
   for (let k in o) {
      let str = o[k] + ''
      if (new RegExp(`(${k})`).test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
   }
   return fmt
}
function padLeftZero (str) {
   return ('00' + str).substr(str.length)
}

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

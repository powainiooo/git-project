import axios from 'axios'
import md5 from 'js-md5'
import CryptoJs from 'crypto-js'
import { getParams } from './util'

const userName = 'theme_user'
const key = 'BCA7264DA3DA67F286CF4D7882FC276E'
const params = getParams(window.location.search)
const vin = params.vin || 'LC0CD4C40J1010942'
const autoStyle = params.autoStyle || 'HAD'

function S4 () {
   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function guid () {
   return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4())
}
function encryParams (params) {
   const encKey = CryptoJs.SHA256(key)
   const iv = CryptoJs.enc.Utf8.parse('')
   const encVin = CryptoJs.enc.Utf8.parse(JSON.stringify(params))
   const enc = CryptoJs.AES.encrypt(encVin, encKey, {
      iv: iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
   })
   return {
      userName,
      uuid: guid(),
      sign: md5(JSON.stringify(params)).toUpperCase(),
      enCodeData: enc.ciphertext.toString()
   }
}

function afterAjax (data, func) {
   if (data.resultCode === '0') {
      func()
   } else {
      showAlert(data.resultDesc)
   }
}
// 主题/壁纸当前应用状态查询
export const matchTopicId = () => {
   const params = encryParams({ vin })
   return new Promise((resolve, reject) => {
      axios.post('/apiService/apiService/thememana/themeManager/matchTopicId', params).then(res => {
         afterAjax(res.data, () => {
            resolve(res.data)
         })
      }).catch(err => {
         reject(err)
      })
   })
}
// 远程换肤指令下发
export const remotePeelOrder = (data) => {
   const params = encryParams(Object.assign({ vin, autoStyle }, data))
   return new Promise((resolve, reject) => {
      axios.post('/apiService/apiService/thememana/themeManager/remotePeelOrder', params).then(res => {
         afterAjax(res.data, () => {
            showAlert(res.data.resultDesc)
            resolve(res.data)
         })
      }).catch(err => {
         reject(err)
      })
   })
}

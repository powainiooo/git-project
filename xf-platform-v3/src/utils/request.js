import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { Message } from 'view-design'
import { ACCESS_TOKEN } from '@/config'
/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
const apiBaseUrl = '/'
// console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  // baseURL: '/jeecg-boot',
  baseURL: apiBaseUrl, // api base_url
  timeout: 9000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response)
    switch (error.response.status) {
      case 403:
        Message.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
        break
      case 500:
        break
      case 404:
        Message.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
        break
      case 504:
        Message.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        Message.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        Message.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  console.log(response)
  if (response.data.code !== 1) {
    if (response.config.config.autoWarn) {
      Message.warning(response.data.msg)
    }
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}

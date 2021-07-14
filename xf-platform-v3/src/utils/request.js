import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { VueAxios } from './axios'
import { Message } from 'view-design'
import { ACCESS_TOKEN } from '@/config'
/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
// console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  // baseURL: '/jeecg-boot',
  baseURL: window.baseUrl, // api base_url
  timeout: 20000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (data.code === 401) {
      Vue.ls.remove(ACCESS_TOKEN)
      router.push('/login')
    }
    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response)
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

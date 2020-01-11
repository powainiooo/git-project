import Vue from 'vue'
import Vuex from 'vuex'
import { getQueryString } from './util.js'
const data1 = 'F/WTJVAVEPkjP0+wvIeowcWeC+G57LU4QEw7zUHLEY8upe0QV9AOxLSJbftzI7wxLOQ4NIFwSTdt+cqj+hbxXIOxlTswCdUIxTCRaa0o5SggQVaq7i/Zrcib8sMuQ/mjBtNDVs4DTe2vWk3Z+LYLp+IvGZUI+F12S9RHEkyBiEletjiXGLxsPfdriVc15bflPnVav9qjfzwBkMVL0mtUEYDTeu2vvRIlalfc9m46mTMcmOS7Uux9WBUtICRYIf8KjxMdETVKecC8TqkesYmEUqTwX3mC1AuuxI8dRftruQ7tDsnHnDy5i88EyUZwUwICa+00QERjOSxVpmjTD77le+XXHjQvAalhCaqWvlR6WCttGBqKXjf9F0EEPHtzz4XAm' //  杨锦伦
const data2 = 'F/WTJVAVEPkjP0+wvIeowcbgr+uaOODKjFLtuBYjOOt7fmS8aopECWTxyJWJ6vThqxUbQQ0OxPnjR71NC037H7ibskTpAtz4R6ta9kDNTuEMWRnktjJJJ/WqUMhN23c7vTOSvsJVCx66jZL7kQe+CX/vM13BqyTb14Ul4dwU6aELAKWwSFPQZ76I7VONHrL4mOZVGCBPk6WAX+cYcNzTT84Jn5TEi1oIJA4vCtraqLWi8TQmXcij0HrE5hnndVBkpp0ck1+4JDFTC1g+gOCPvDioVqaOC5979BuH3CXl10dvjR/wxOXaVOj24o96801JE8XpKzcazfawN1PKm293rZrU3vIeziKicIY714FK5OV1XREaBgsB8zQ/KgCzTL5ff' //  张绍裕
const data3 = 'FpWNCq1mnJfjh6U6vVh8VCA%2F%20DXiEOvl15MfUemzASmPx8SK64EZy%2Fu53ArfocJ6DbElSG6kcC1HdW92ErJlBsi0rBeNF9SOQf%2FD5BupJOh1tj3JZSEQ3suI3exaXQxbD%2F3xB3EA%20TwxG5sjiJ49dZMW8NQwTYVdj1uaINYNhrA7SXNG3M%2FsgXDmFrYLfKTrrqSeydhQajt07z83it5kvQ2UONNO7hAUNoYBjrdF4P1aj4Yl2jx1LfjsBos9OEsXAQC5f8%2F%2F7R0AUOWgr8tWR%20Oz%2Fm56NGaA9%20ZODT6%20NvVa%2F1TR74dKvORTmsOLthieePv%2FvqTdEAB3UqO%2FPF1R1eRo7Wq4B5mdNFOiEdsU337TDBiyJOendnl8XsXkp0FMKAKK3WwAVNmZO98Zi7Smpngve%208AAA3ZJEAw98OLN4bk%3D'
const data4 = 'FpWNCq1mnJfjh6U6vVh8VCA/+DXiEOvl15MfUemzASmPx8SK64EZy/u53ArfocJ6DbElSG6kcC1HdW92ErJlBsi0rBeNF9SOQf/D5BupJOh1tj3JZSEQ3suI3exaXQxbD/3xB3EA+TwxG5sjiJ49dZMW8NQwTYVdj1uaINYNhrA7SXNG3M/sgXDmFrYLfKTrrqSeydhQajt07z83it5kvQ2UONNO7hAUNoYBjrdF4P1aj4Yl2jx1LfjsBos9OEsXAQC5f8//7R0AUOWgr8tWR+Oz/m56NGaA9+ZODT6+NvVa/1TR74dKvORTmsOLthieePv/vqTdEAB3UqO/PF1R1eRo7Wq4B5mdNFOiEdsU337TDBiyJOendnl8XsXkp0FMKAKK3WwAVNmZO98Zi7Smpngve+8AAA3ZJEAw98OLN4bk='

const params = {
   data: getQueryString('data') || data1,
   userName: decodeURI(getQueryString('userName') || '%E6%B5%8B%E8%AF%95%E6%B5%8B%E8%AF%95'),
   source: getQueryString('source') || 'app'
}
console.log('网页传参')
console.log(params)
if (params.source === 'web') {
   params.data = decodeURIComponent(params.data).replace(/\s/g, '+')
}

// 初始化年报停留时间结构
for (let i = 1; i < 25; i++) {
   window.footPrinter[`stayTimeP${i}`] = -1
}
console.log(window.footPrinter)

const call = params.source === 'app' ? '你' : 'TA'
// https://icloudproductlive.byd.com:17280/nianbao/
// https://cache.bydauto.com.cn/cloudservice/
const imgSrc = process.env.NODE_ENV === 'production'
   ? 'https://cache.bydauto.com.cn/cloudservice/'
   : '/'
console.log(imgSrc)
Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      keyList: ['city', 'travel', 'late', 'high', 'air', 'status', 'energy', 'unlock', 'whistle', 'music', 'game', 'learn'],
      useKeyList: [],
      loadingPecent: 0,
      currentPage: 'loading',
      tagName: '',
      powerMode: '',
      pageData: {},
      pageList: [],
      isDiLink: true,
      params,
      canChangePage: false,
      call,
      imgSrc
   },
   mutations: {
      changePage (state, data) {
         state.currentPage = data
      },
      changeTagName (state, data) {
         state.tagName = data
      },
      setLoadingPecent (state, data) {
         state.loadingPecent = data
      },
      setPageData (state, data) {
         state.pageData = data
         const powerMode = data.P0.powerMode
         if (powerMode === '纯电') {
            state.powerMode = 'EV'
         } else if (powerMode === '燃油') {
            state.powerMode = 'gasoline'
         } else if (powerMode === '混动') {
            state.powerMode = 'DM'
         } else if (powerMode === '双模') {
            state.powerMode = 'DM'
         }
         state.isDiLink = data.P0.dLink === 'Yes'
      },
      setPageList (state, data) {
         state.pageList = data
      },
      setUseKeyList (state, data) {
         state.useKeyList = data
      },
      setCanChangePage (state, data) {
         state.canChangePage = data
      }
   },
   actions: {

   }
})

<style scoped>
.bg { width: 100%; height: 560px; display: block; }
.line1 { position: absolute; top: 40px; left: 40px; font-size: 30px; line-height: 48px; color: #FFFFFF; }
.line2 { width: 100%; position: absolute; top: 224px; left: 0; }
.line2 img { width: 320px; margin-right: 32px; }
.line2 h3 { font-size: 130px; line-height: 130px; margin-bottom: 16px; color: #FFFFFF; }
.line2 p { font-size: 28px; line-height: 22px; color: #FFFFFF; margin-left: 20px; }
.wet-list { margin: 40px 30px; }
.wet-list li { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.wet-list li div { display: flex; align-items: center; font-size: 30px; color: #999999; }
.wet-list li div span { color: #333333; margin-right: 26px; }
.wet-list li div img { width: 44px; margin-right: 10px; }
</style>

<template>
  <div class="container3">
    <img :src="imgSrc + record.bg" class="bg" mode="aspectFill" />
    <img :src="imgSrc + record.gg_image" class="w100" mode="widthFix" v-if="record.gg_image !== ''" />
    <div class="line1" @click="toCity"><text>{{city}}\n{{date}}，{{week}}</text></div>
    <div class="line2 center">
      <img :src="imgSrc + record.wid_img" mode="widthFix" />
      <div>
        <h3>{{record.temperature}}°</h3>
        <p>{{record.low}}° - {{record.height}}°</p>
      </div>
    </div>
    <ul class="wet-list">
      <li v-for="item in list" :key="index">
        <div>
          <span v-if="index === 0">今天</span>
          <span v-else-if="index === 1">明天</span>
          <span v-else>{{weeks[item.day]}}</span>
          {{item.date}}</div>
        <div><img :src="imgSrc + item.img" mode="widthFix" />{{item.weather}}</div>
        <div><span>{{item.high}}℃</span>{{item.low}}℃</div>
      </li>
    </ul>
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../../utils/api'
import {formatDate} from '../../../utils'
import config from '@/config'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
const { mapKey } = config
const qMap = new QQMapWX({
  key: mapKey
})
const citySelector = requirePlugin('citySelector')

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      imgSrc: mpvue.imgSrc,
      city: '',
      date: '',
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      week: '',
      record: {},
      list: []
    }
  },
  methods: {
    getData () {
      postAction('weather', {
        city: this.city
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          const arr = []
          for (const i of res.data.future) {
            const date = formatDate(new Date(i.date), 'MM/dd')
            const day = new Date(i.date).getDay()
            const temp = i.temperature.replace('℃', '').split('/')
            arr.push({
              date,
              day,
              low: temp[0],
              high: temp[1],
              weather: i.weather,
              img: i.wid_img
            })
          }
          this.list = arr
        }
      })
    },
    toCity () {
      const referer = '工具大区'
      wx.navigateTo({
        url: `plugin://citySelector/index?key=${mapKey}&referer=${referer}`
      })
    },
    initCity () {
      const city = mpvue.getStorageSync('toolCity')
      if (city) {
        this.city = city
      } else {
        const _this = this
        mpvue.getLocation({
          success (res) {
            console.log(res)
            qMap.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success (res2) {
                console.log(res2)
                _this.city = res2.result.ad_info.city.replace('市', '')
                mpvue.setStorageSync('toolCity', _this.city)
                _this.getData()
              }
            })
          }
        })
      }
    }
  },
  onShow () {
    const selectedCity = citySelector.getCity()
    console.log('selectedCity', selectedCity)
    if (selectedCity) {
      this.city = selectedCity.name
      mpvue.setStorageSync('toolCity', this.city)
    }
    if (this.city !== '') {
      this.getData()
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '天气预报',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    const now = new Date()
    this.date = formatDate(now, 'MM月dd日')
    this.week = this.weeks[now.getDay()]
    this.initCity()
  }
}
</script>

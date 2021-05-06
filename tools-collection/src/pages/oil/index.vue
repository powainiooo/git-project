<style scoped>
.o-title { font-size: 36px; color: #080808; margin-bottom: 30px; }
.o-title img { width: 16px; margin-left: 34px; }

.oil-list { margin: 0 -25px; display: flex; flex-wrap: wrap;  }
.oil-list li { width: 305px; height: 166px; background: #FFFFFF; border: 1px solid #E1E1E1; box-shadow: 0px 0px 6px 0px rgba(172, 172, 172, 0.29); border-radius: 10px; margin: 0 25px 40px 25px; display: flex; align-items: center;}
.oil-list li img { width: 84px; height: 84px; margin-left: 30px; margin-right: 60px; }
.oil-list li h3 { font-size: 36px; color: #070707; margin-bottom: 30px; }
.oil-list li p { font-size: 36px; color: #2490FD; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml40 mr40">
      <template v-for="item in list">
      <div class="o-title acenter mt30">{{item.city}}<img src="/static/images/arrow7.png" mode="widthFix" /></div>
      <ul class="oil-list">
        <li>
          <img src="/static/images/gas.png" />
          <div>
            <h3>{{item['95h']}}元</h3>
            <p>95#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>{{item['92h']}}元</h3>
            <p>92#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>{{item['98h']}}元</h3>
            <p>98#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>{{item['0h']}}元</h3>
            <p>0#</p>
          </div>
        </li>
      </ul>
      </template>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'
import config from '@/config'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
const { mapKey } = config
const qMap = new QQMapWX({
  key: mapKey
})

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      province: '',
      list: []
    }
  },
  methods: {
    getData () {
      postAction('oil').then(res => {
        if (res.ret === 0) {
          // this.list = res.data
          const list1 = []
          const list2 = []
          for (let i of res.data) {
            if (new RegExp(i.city).test(this.province)) {
              list1.push(i)
            } else {
              list2.push(i)
            }
          }
          this.list = [...list1, ...list2]
        }
      })
    },
    getCity () {
      const _this = this
      mpvue.getLocation({
        success (res) {
          qMap.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success (res2) {
              _this.province = res2.result.address_component.province
              _this.getData()
            }
          })
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '今日油价',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getCity()
  }
}
</script>

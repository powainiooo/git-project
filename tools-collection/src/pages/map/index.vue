<style scoped>
.mapC { width: 100%; height: 100vh; }
</style>

<template>
  <div class="container">
    <map v-if="showMap"
         class="mapC"
         :markers="markers"
         :longitude="longitude"
         :latitude="latitude"
         @markertap="markertap"
    ></map>
  </div>
</template>

<script>
import store from '../../store'

export default {
  data () {
    return {
      id: '',
      showMap: false,
      markers: [],
      longitude: '',
      latitude: ''
    }
  },
  methods: {
    markertap (e) {
      console.log('markertap', e)
      const id = e.mp.detail.markerId
      console.log('id', id)
      const record = this.markers.find(i => i.id === id)
      console.log('record', record)
      mpvue.showModal({
        title: record.title,
        content: `${record.address}（电话：${record.tel}，分类：${record.category}，与您距离：${record._distance}米）`,
        confirmText: '导航',
        success (res) {
          if (res.confirm) {
            mpvue.openLocation({
              latitude: record.latitude,
              longitude: record.longitude,
              success (res2) {
                console.log('openLocation success', res2)
              }
            })
          }
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    const markers = store.state.mapData
    const arr = []
    for (let m of markers) {
      arr.push({
        id: Number(m.id),
        title: m.title,
        address: m.address,
        category: m.category,
        tel: m.tel,
        _distance: m._distance,
        latitude: m.location.lat,
        longitude: m.location.lng,
        iconPath: '/static/images/dot.png',
        width: 24,
        height: 32
      })
    }
    this.markers = arr
    mpvue.getLocation({
      success: (res) => {
        this.latitude = res.latitude
        this.longitude = res.longitude
        this.showMap = true
      }
    })
  }
}
</script>

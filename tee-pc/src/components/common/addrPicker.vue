<style scoped>
.c-map { width: 100%; height: 70vh; background-color: #F5F5F5; }
.c-map-inp { position: absolute; top: 60px; left: 100px; z-index: 1000; }
.c-map-inp input { width: 300px; height: 30px; border-radius: 8px; background-color: #ffffff; padding: 0 10px; }
</style>

<template>
<Modal v-model="visible"
       :loading="loading"
       :width="70"
       :closable="false"
       @on-ok="confirm">
  <div class="c-map-inp"><input type="text" id="place" placeholder="请输入查询地点" /></div>
  <p class="mb10">地址：{{addr}}</p>
  <div class="c-map" ref="map"></div>
</Modal>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      visible: false,
      loading: true,
      addr: '--',
      map: null,
      dotData: {},
      latlng: {},
      isClick: false
    }
  },
  mounted () {
    // this.show()
  },
  methods: {
    show () {
      const _this = this
      _this.visible = true
      this.$nextTick(() => {
        const center = new qq.maps.LatLng(39.984120, 116.307484)
        if (!_this.map) {
          _this.map = new qq.maps.Map(this.$refs.map, {
            center: center,
            zoom: 6
          })
          const geocoder = new qq.maps.Geocoder({
            complete (res) {
              console.log('Geocoder', res)
              if (_this.isClick) {
                _this.addr = res.detail.address
                _this.dotData = {
                  address: res.detail.address,
                  addressComponents: res.detail.addressComponents,
                  location: _this.latlng
                }
                marker.position = res.detail.location
                marker.setMap(_this.map)
              }
              _this.map.setCenter(res.detail.location)
              _this.map.zoomTo(16)
            }
          })
          const marker = new qq.maps.Marker({
            map: _this.map
            // position: e.latLng
          })
          const listener = qq.maps.event.addListener(_this.map, 'click', function (e) {
            console.log(e)
            _this.isClick = true
            _this.latlng = e.latLng
            geocoder.getAddress(e.latLng)
          })
          const ap = new qq.maps.place.Autocomplete(document.getElementById('place'), {
            zIndex: 10000
          })
          qq.maps.event.addListener(ap, 'confirm', function (res) {
            console.log('ap0', ap, res)
            _this.isClick = false
            geocoder.getLocation(`${ap.place.address}-${ap.place.name}`)
          })
        }
      })
    },
    confirm () {
      if (this.latlng.lat) {
        this.$emit('confirm', this.dotData)
        this.visible = false
      } else {
        this.$Message.warning('请在地图上点击具体位置后再确认保存。')
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }
    }
  }
}
</script>

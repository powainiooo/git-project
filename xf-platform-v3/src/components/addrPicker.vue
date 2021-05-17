<style scoped>
.c-map { width: 100%; height: 70vh; background-color: #F5F5F5; }
</style>

<template>
<Modal v-model="visible"
       :width="70"
       :closable="false"
       @on-ok="confirm">
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
      addr: '--',
      map: null,
      dotData: {}
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
              _this.addr = res.detail.address
              _this.dotData = {
                address: res.detail.address,
                addressComponents: res.detail.addressComponents,
                location: res.detail.location
              }
            }
          })
          const marker = new qq.maps.Marker({
            map: _this.map
            // position: e.latLng
          })
          const listener = qq.maps.event.addListener(
            _this.map,
            'click',
            function (e) {
              console.log(e)
              marker.position = e.latLng
              marker.setMap(_this.map)
              geocoder.getAddress(e.latLng)
            }
          )
        }
      })
    },
    confirm () {
      this.$emit('confirm', this.dotData)
    }
  }
}
</script>

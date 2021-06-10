<style scoped>
.c-ticket {
  width: 340px;
  height: 267px;
  border-radius: 20px;
  position: relative;
}
.c-ticket-large {
  width: 700px;
  height: 467px;
}
.c-ticket-bar {
  width: 100%;
  height: 80px;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  position: relative;
  z-index: 5;
}
.organ-ticket .c-ticket-bar {
  background-color: #EEEEEF;
}
.c-ticket-large .c-ticket-bar {
  height: 100px;
  padding-left: 22px;
}
.c-ticket-bar .logo {
  width: 80px;
  height: 80px;
}
.c-ticket-imgs {
  width: 100%;
  height: 187px;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAC7CAMAAAANKZZkAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAF3RSTlMA4yP5lsgSA+tZORrd07SzrJKHeEoIvbkwglIAAAJGSURBVHja7NbZiVABFAXBp6Pjjit2/pmaxAU5UB1CffWTzoNaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQF4JaUBeCWlAXglpQB3qBet8bqPe9h3rfO6j3fYJ63ssr1PO+P1DP+wP1vPcP1PM+Qz3v5wP1ur8foF739fWBetybtw/Ue1Oo96ZQ702h3ptCvTeFem8K9d4U6r0p1HtTqPemUO9Nod6bQr03hXpvCvXeFOq9KdR7U6j3plDvTaHem0K9N4V6bwr13hTqvSnUe1Oo96ZQ702h3ptCvTeFem8K9d4U6r0p1P9k+ryka9PnY7o2fb6la9PnR7o2fX6na9Pnc7o2fT68Scemz/MrXZs+X5zquenzvEvXps+r/z83fZ5P6V879pICIAwDAXS0P9v61+L9b+rGhUjBRbIQnHeEIQxJ3jJlAXwhU4TxIOVMgcJUq/oWAoENUOEyZCJ3gKelQMpbXgF3LkFDXvkHuJhph5aQtnno/j2xpnE2ekicwfSkow2I0qwAAAAASUVORK5CYII=);
  -webkit-mask-size: 100% 100%;
  position: relative;
  z-index: 5;
}
.c-ticket-imgs .sold-out {
  width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.4); display: flex; flex-direction: column; justify-content: flex-end; font-size: 26px; color: #ffffff; padding-left: 12px;
}
.c-ticket-imgs .sold-out p { font-family: HelveB; }
.c-ticket-imgs .sold-out div { margin-bottom: 30px; }
.c-ticket-large .c-ticket-imgs .sold-out {
  padding-left: 22px; font-size: 38px;
}
.c-ticket-large .c-ticket-imgs .sold-out div { margin-bottom: 40px; }
.c-ticket-large .c-ticket-imgs {
  height: 367px;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAFvCAMAAACfJuhtAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6T+iNAAAAH3RSTlMA7eXiIyUhKNwISLqngfeJFw786c/KmHJqVAXTm3RayHjY0wAABMlJREFUeNrs0gENAAAMw6A7uX+X09EENHAPUfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9Z8pIlL1nykiUvWfKSJS9ZY5cOSAAAAAAE/X/djkA3KC9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1vysiUvW/KyJS9b8rIlL1uxSwckAAAAAIL+v25HoBuUly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXLXnZkpctedmSly152ZKXrdill5Q4oACKgi9qQneExA8qTnT/u/SuwYkcqFpDyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS9Uveam6yEvVvbxU/ZeXqnd5iXp6lJeo+yMvUR/yEvV8lZeotyMvTZervET9PfLS9HrkpenlKi9Nl4cjL0m3f468JO2uvCTtrrwk7a68JO2uvCTtrrwk7a68JO2uvCTtrrwk7a68JO2uvCTtrrwk3d4deUnaXXlJ2l15SdpdeUnaXXlJ2l15SdpdeUnaXXlJ2l15SdpdeUnaXXlJ2l15SdpdeUnaXXlJ2l15SdpdeUnaXXlJurk78pK0u/KStLvyknTz+8hL0u7KS9LuykvS7spL0u7KS9LuykvS7spL0u7KS9LuykvS7spL0u7KS9LuykvSd+6ef5/w477as5ckBIEgCKIlaPBXUFREjb7/LT2CAzEMvch3hlx0dK1qVzcDFnLSrkYDlvHSrloDFnHTrp4GLOGnXRUG7CkrtFppQDBX7aozIJSvdtXz6UUoZ+1KFwOCuGtXQ2ZAAH/tSrUB/3lsl8MBIXy2y8yGHZQnRTFTLxIbe8XSXQ1I51Mpnjo3IJGyVlRVdzAggWyqFNvwfRuwrXPzmrWJ4/RoyuwAbCC/t11dKZofZkb8nXDIq74AAAAASUVORK5CYII=);
}
.c-ticket-imgs img {
  width: 100%;
  height: 100%;
}
.c-ticket-flip {
  width: 67px;
  height: 67px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 5;
}
.c-ticket-large .c-ticket-flip {
  width: 80px;
  height: 80px;
}
.c-ticket-star {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 34px;
  bottom: 36px;
  z-index: 5;
}
.c-ticket-large .c-ticket-star {
  width: 24px;
  height: 24px;
  right: 40px;
  bottom: 42px;
}
.ticket-shadow-small {
  width: 400px;
  height: 327px;
  position: absolute;
  top: -20px;
  left: -30px;
}
.ticket-shadow-large {
  width: 760px;
  height: 528px;
  position: absolute;
  top: -20px;
  left: -30px;
}
</style>

<template>
<div v-if="record"
  @click="toDetail"
   class="c-ticket"
   :class="tClass"
   hover-class="hscale"
   hover-stay-time="10">
  <img src="/static/images/common/ticket-shadow-small.png" class="ticket-shadow-small" v-if="size === 'small'" />
  <img src="/static/images/common/ticket-shadow-large.png" class="ticket-shadow-large" v-if="size === 'large'" />
  <div class="c-ticket-bar">
    <tk-info :record="infoData" />
    <img :src="record.logo" class="logo" mode="aspectFill" v-if="size === 'large'" />
  </div>
  <div class="c-ticket-imgs">
    <img :src="record.cover_image" mode="aspectFill" />
    <div class="sold-out" v-if="record.sub_state === 4">
      <p>Sold Out</p>
      <div>已售罄</div>
    </div>
  </div>
  <img src="/static/images/common/flip.png" class="c-ticket-flip" />
  <img src="/static/images/common/star.png" class="c-ticket-star" v-if="record.star_flag === 1" />
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
export default {
  name: 'app',
  components: {
    tkInfo
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: 'small'
    },
    extraClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    tClass () {
      return [`c-ticket-${this.size}`, this.extraClass]
    },
    infoData () {
      let date = ['', '']
      let name = ''
      let host = ''
      if (this.record) {
        date = this.record.start_date.split('-')
        name = this.record.name
        host = this.record.organizer_name
      }
      return {
        month: date[1],
        day: date[2],
        name,
        host
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    toDetail () {
      mpvue.navigateTo({
        url: '/pages/details/main?id=' + this.record.id
      })
    }
  }
}
</script>

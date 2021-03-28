<style scoped>
.c-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;
}
.c-ticket-item {
  width: 506px;
  height: 134px;
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfsAAACGCAMAAADtntNLAAAAQlBMVEX///////////////////////////////////////////////////////////////////////////////////////8Alm/HAAAAFXRSTlPycAITDK4XEFUz4Ox/v6MhQcqRimKwFqm4AAAC9ElEQVR42uzYUZKbMBAA0TGEigwYDGTuf9W4Upvatdf8LeKj+12hS9JoonnSlvXW96EfV5pdUcHQL9Pl2jx5al9uqYNcmj1tVtOP7fv2pU8dZm323LOi2Nrv7WfP/KGWZs+YVQ3ltX2J1KHmZseSlW3P7f+kDrbtpL9mdd3X9iV1tNg5+Lesr/tsf08db2reKXmG7X/71gG/isu7Gz/yFOWj/ZSqojSv5j7PMbSP9t74FY2vX/shz7L+a+/Hvp7btfnUrnmemB/tr6mKutJ+vPRb5JnGR/s1VdfSTd0y5Mn6R3uHfKhrzCmmMVzpUXUxppiWcLFDNdgeK6JLQdmey/ZctueyPZftuWzPZXsu23PZnsv2XLbnsj2X7blsz2V7Lttz2Z7L9ly257I9l+25bM9ley7bc9mey/ZctueyPZftuWzPZXsu23PZnsv2XLbnsj2X7blsz2V7Lttz2Z7L9ly257I9l+25bM9ley7bc9mey/ZctueyPZftuWzPZXsu23PZnsv2XLbnsj2X7blsz2V7Lttz2Z7L9ly257I9l+25bM9ley7bc9mey/ZctueyPZftuWzPZXsu23PZnsv2XLbnsj2X7blsz2V7Lttz2Z7L9ly257I9l+25YkoxDbGmmPq4pJhucU8xrfE7UkglfjnoQ/1tx85yIwZhAAxPZI8NISxV4/tftdkI0Uh9K6YP/k6A+MVKL3RiNMXF+ezLlIIM9cYXwixGTfJU5WVofbe1x0WMkrnQU37LMJH39mQLX0nM9GGRUcrRnu3E1xGJ6L/ET4x7e2T729MwezrAiU5JRpiptocopjv3CN/65yD6gufanulLTGexlX8YsuuHAq09kP3w9OYImoYoiLLZAzCe7ZEBwF56fQWCXyTRFff0rf0ev9i+39MbLnyD0yqawgQbxtoeGXbO6vez3OHxUut70ROWDBt+tmc4+G/L38l0pcdLq0+iZE71zsF4t2/xici7dTJ/zn+Wb/M+aVhLvh8a1zh+AN7BNlrzzlSHAAAAAElFTkSuQmCC);
  -webkit-mask-size: 100% 100%;
  display: flex;
  position: relative;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .1);
}
.c-ticket-item .imgs {
  width: 374px;
  height: 100%;
}
.c-ticket-item .imgs img {
  width: 100%;
  height: 100%;
}
.c-ticket-item .nums {
  width: 134px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  font-family: HelveT;
  color: #ffffff;
}
.c-ticket-item .cover {
  width: 374px;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  position: absolute;
  top: 0;
  left: 0;
}
.c-ticket-item-title {
  width: 374px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 28px;
  font-size: 20px;
  color: #ffffff;
  font-family: HelveL;
  line-height: 26px;
}
.c-ticket-item-title p.en {
  font-size: 26px;
  line-height: 32px;
  color: #ffffff;
  font-family: HelveB;
}
.c-ticket-item-onums {
  position: absolute;
  right: 160px;
  bottom: 8px;
  font-size: 14px;
  color: #ffffff;
}
.c-ticket-item-use {
  background: #ffffff;
  box-shadow: none;
}
.c-ticket-item-use .c-ticket-item-title {
  color: #9E9E9F;
}
.c-ticket-item-use .c-ticket-item-title p.en {
  color: #000000;
}
.c-ticket-item-use .c-ticket-item-onums {
  color: #9E9E9F;
}
.c-ticket-item .status {
  width: 134px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  color: #9E9E9F;
  background-color: #EEEEEF;
}
.c-ticket-item .status p.en {
  font-family: HelveB;
}
</style>

<template>
<div class="c-list-item">
  <tk-info :showTitle="false" size="large" :record="infos"/>
  <div class="c-ticket-item"
       v-if="record.state == 1"
       hover-class="hscale"
       hover-stay-time="10"
       @click="toDetail">
    <div class="imgs">
      <img src="/static/images/img.jpg" />
    </div>
    <div class="nums">{{record.num}}</div>
    <div class="cover"></div>
    <div class="c-ticket-item-title">
      <p class="en">{{record.ticket_name}}</p>
      <p>{{record.organizer_name}}</p>
    </div>
    <div class="c-ticket-item-onums">{{record.order_no}}</div>
  </div>
  <div class="c-ticket-item c-ticket-item-use"
       hover-class="hscale"
       hover-stay-time="10"
       v-else
       @click="toDetail">
    <div class="imgs"></div>
    <div class="status" v-if="item.state == 1">
      <p class="en">Checked</p>
      <p>已使用</p>
    </div>
    <div class="status" v-else-if="item.state == 0">
      <p class="en">Waiting</p>
      <p>未出票</p>
    </div>
    <div class="status" v-else-if="item.state == 2">
      <p class="en"> </p>
      <p>已过期</p>
    </div>
    <div class="status" v-else-if="item.state == 3">
      <p class="en"> </p>
      <p>已失效</p>
    </div>
    <div class="c-ticket-item-title">
      <p class="en">{{record.ticket_name}}</p>
      <p>{{record.organizer_name}}</p>
    </div>
    <div class="c-ticket-item-onums">{{record.order_no}}</div>
  </div>
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
    }
  },
  computed: {
    infos () {
      if (this.record.start_date) {
        const dates = this.record.start_date.split('-')
        return {
          month: dates[1],
          day: dates[2]
        }
      } else {
        return {
          month: '',
          day: ''
        }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/order/detail/main?id=${this.record.id}`
      })
    }
  }
}
</script>

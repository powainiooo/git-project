<style scoped>
.artist-frame {
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) .6s both;
}
.artist-item {
  width: 300px;
  height: 236px;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAEMCAMAAACskb4dAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAAiTk4/mW69ETWRsH/LSsiHk3mcTftu1MSz08amAEqAAAA2FJREFUeNrs10tqw0AQBuEWWJJlGeuxrvufM5vgYJJAiHvzQ31HKGame+rFcB7bdR7Rn43zdTvOoX6z7hf0L5d9rZ8skyf0DeO01De3Gb1lvtWrYUJvm16e1vsDNXjc62mwaZPH11n17reZnjMKtfmcVotzv9G8ePmfeh+A1Z2/1bhW1Y5a7VWD//1ml6FO1OysAzU7akPNtrqiZtdy8283l1tqu7FQO6OCURMYFYyawKhg1ARGBaMmMCoYNYFRwagJjApGTWBUMGoCo4JRExgVjJrAqGDUBEYFoyYwKhg1gVHBqAmMCkZNYFQwagKjglETGBWMmsCoYNQERgWjJjAqGDWBUcGoCYwKRk1gVDBqAqOCURMYFYyawKhg1ARGBaMmMCoYNYFRwagJjApGTWBUMGoCo4JRExgVjJrAqB/s0AENAAAAwqAi9M9pDrcTAUp9UCqlPiiVUh+USqkPSqXUB6VS6oNSKfVBqZT6oFRKfVAqpT4olVIflEqpD0ql1AelUuqDUin1QamU+qBUSn1QKqU+KJVSH5RKqQ9KpdQHpVLqg1Ip9UGplPqgVEp9UCqlPiiVUh+USqkPSqXUB6VS6oNSKfVBqZT6oFRKfVAqpT4olVIflEqpD0ql1AelUuqDUin1QamU+qBUSn1QKqU+KJVSH5RKqQ9KpdQHa79echqGgiiIduLE2I6df/je/a8TiRFCMEpJ6ClVSziD1m1RE1FbSNRE1BYSNRG1hURNRG0hURNRW0jURNQWEjURtYVETURtIVETUVtI1ETUFhI1EbWBtqLydaLyXUXl60Xlm0TFW0ZR8fYlKt6bqHhDiUq3fIiK15eodNdZVLrbWKLCbdYlKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKly3LlF5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1H/ybS2Mdq0nmK0aQ0x2rQOMdq0TjHatM4x2rRWmxhsWnWM0aa1c6niplV9jDat0f2Pm1ZNMdq06hKjTWt+jv1pqirbbV13NHsBfmnY1X1NboAfLf1c9zZe/AK+N7wX0e7Yxb5a9q9FtTqfDsPLkkdu6a6XaSy81SMH+H0C6kvlsQpyAwsAAAAASUVORK5CYII=);
  -webkit-mask-size: 100% 100%;
  position: relative;
}
.artist-item .pic {
  width: 100%;
  height: 100%;
}
.artist-item div {
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  padding-left: 13px;
  box-sizing: border-box;
  font-size: 26px;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
}
.artist-item .flip {
  width: 58px;
  height: 58px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.artist-bBorder {
  height: 1px;
  margin: 66px 25px 0 25px;
}
</style>

<template>
<div class="artist-frame">
  <div class="c-ticket-title"><span>Artist</span>表演者</div>
  <swiper previous-margin="25rpx" next-margin="416rpx" duration="100">
    <swiper-item v-for="(item, index) in list" :key="index">
      <div class="artist-item">
        <img :src="item.image_full_url" class="pic" />
        <div>{{item.content}}</div>
        <img src="/static/images/common/flip.png" class="flip" />
      </div>
    </swiper-item>
  </swiper>
  <div class="artist-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

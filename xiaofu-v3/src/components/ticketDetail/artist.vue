<style scoped>
.artist-frame {
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) .6s both;
}
.scroll-frame { width: 100%; }
.scroll-list { display: flex; margin-left: 25px; }
.artist-item {
  width: 300px;
  height: 236px;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAEMCAMAAACskb4dAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAAiTk4/mW69ETWRsH/LSsiHk3mcTftu1MSz08amAEqAAAA2FJREFUeNrs10tqw0AQBuEWWJJlGeuxrvufM5vgYJJAiHvzQ31HKGame+rFcB7bdR7Rn43zdTvOoX6z7hf0L5d9rZ8skyf0DeO01De3Gb1lvtWrYUJvm16e1vsDNXjc62mwaZPH11n17reZnjMKtfmcVotzv9G8ePmfeh+A1Z2/1bhW1Y5a7VWD//1ml6FO1OysAzU7akPNtrqiZtdy8283l1tqu7FQO6OCURMYFYyawKhg1ARGBaMmMCoYNYFRwagJjApGTWBUMGoCo4JRExgVjJrAqGDUBEYFoyYwKhg1gVHBqAmMCkZNYFQwagKjglETGBWMmsCoYNQERgWjJjAqGDWBUcGoCYwKRk1gVDBqAqOCURMYFYyawKhg1ARGBaMmMCoYNYFRwagJjApGTWBUMGoCo4JRExgVjJrAqB/s0AENAAAAwqAi9M9pDrcTAUp9UCqlPiiVUh+USqkPSqXUB6VS6oNSKfVBqZT6oFRKfVAqpT4olVIflEqpD0ql1AelUuqDUin1QamU+qBUSn1QKqU+KJVSH5RKqQ9KpdQHpVLqg1Ip9UGplPqgVEp9UCqlPiiVUh+USqkPSqXUB6VS6oNSKfVBqZT6oFRKfVAqpT4olVIflEqpD0ql1AelUuqDUin1QamU+qBUSn1QKqU+KJVSH5RKqQ9KpdQHa79echqGgiiIduLE2I6df/je/a8TiRFCMEpJ6ClVSziD1m1RE1FbSNRE1BYSNRG1hURNRG0hURNRW0jURNQWEjURtYVETURtIVETUVtI1ETUFhI1EbWBtqLydaLyXUXl60Xlm0TFW0ZR8fYlKt6bqHhDiUq3fIiK15eodNdZVLrbWKLCbdYlKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKm8qKly3LlF5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1F5U1H/ybS2Mdq0nmK0aQ0x2rQOMdq0TjHatM4x2rRWmxhsWnWM0aa1c6niplV9jDat0f2Pm1ZNMdq06hKjTWt+jv1pqirbbV13NHsBfmnY1X1NboAfLf1c9zZe/AK+N7wX0e7Yxb5a9q9FtTqfDsPLkkdu6a6XaSy81SMH+H0C6kvlsQpyAwsAAAAASUVORK5CYII=);
  -webkit-mask-size: 100% 100%;
  position: relative;
  margin-right: 25px;
}
.artist-item .pic {
  width: 100%;
  height: 100%;
}
.artist-item .content {
  width: 100%;
  max-height: 90px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  padding: 14px 12px;
  box-sizing: border-box;
  font-size: 26px;
  line-height: 30px;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
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
.artist-item .blur-img {
  width: 100%;
  height: 236px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(5px);
}
.artist-item .blur-img img { width: 100%; height: 236px; }
</style>

<template>
<div class="artist-frame">
  <div class="c-ticket-title"><span>Artist</span>表演者</div>
<!--  <scroll-view scroll-x class="scroll-frame">-->
<!--    <div class="scroll-list" :style="{width: (325 * list.length + 25) + 'rpx'}">-->
<!--      <div class="artist-item" v-for="(item, index) in list" :key="index">-->
<!--        <img :src="item.image_full_url" class="pic" mode="aspectFill" />-->
<!--        <div class="content" style="background-color: transparent;">-->
<!--          <div class="blur-img">-->
<!--            <img :src="item.image_full_url" mode="aspectFill" />-->
<!--          </div>-->
<!--          <div>{{item.content}}</div>-->
<!--        </div>-->
<!--        <div class="content">-->
<!--          <div>{{item.content}}</div>-->
<!--        </div>-->
<!--        <img src="/static/images/common/flip.png" class="flip" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </scroll-view>-->
    <swiper previous-margin="25rpx" next-margin="405rpx" duration="100">
      <swiper-item v-for="item in list" :key="id">
        <div class="artist-item">
          <img :src="item.image_full_url" class="pic" mode="aspectFill" />
          <div class="content" style="background-color: transparent;">
            <div class="blur-img">
              <img :src="item.image_full_url" mode="aspectFill" />
            </div>
            <div>{{item.content}}</div>
          </div>
          <div class="content">
            <div>{{item.content}}</div>
          </div>
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

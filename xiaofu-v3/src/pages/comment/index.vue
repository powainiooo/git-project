<style scoped>
.comment-container {
  margin: 100px 25px;
  overflow: hidden;
}
.comment-container .title {
  height: 92px;
  margin-top: 30px;
  margin-bottom: 32px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  font-size: 24px;
}
.comment-container .title span {
  margin-right: 18px;
  font-family: HelveB;
  font-size: 26px;
}
.comment-item {
  margin-bottom: 32px;
  padding-bottom: 32px;
}
.comment-item .line1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.comment-item .line1 .infos {
  display: flex;
  align-items: center;
}
.comment-item .line1 .infos img {
  width: 80px;
  height: 80px;
  background: #D8D8D8;
  border-radius: 20px;
  margin-right: 20px;
}
.comment-item .line1 .infos p {
  font-size: 26px;
  font-family: HelveB;
}
.comment-item .line1 .stars {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.comment-item .line1 .stars li {
  width: 28px;
  margin-left: 5px;
}
.comment-item .line1 .stars li img {
  width: 100%;
}
.comment-item .content {
  padding: 12px 20px;
  border-radius: 16px;
  background-color: #ffffff;
  font-size: 24px;
  line-height: 36px;
  color: #9E9E9F;
  position: relative;
}
.comment-item .content:before {
  content: '';
  width: 10px;
  height: 10px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASBAMAAACp/uMjAAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAAgsZLUdjZICcuNLm9P3ge6r5AAAAc0lEQVQI12NgAALWAAYYkN4IZ9Z/h7GYzv9RgDI5/v9vgDJt//+/DGXO////J4TF8v7//38OYCbXfyBYAGbGg5hfQSzG/SDmbwEgk+0/GCQAmToQ5iEgsx/C/MHAwHwfwvxrwMD5HwomMPjBmE8Y1sOYvwAsGlnJj4dpBgAAAABJRU5ErkJggg==) no-repeat;
  background-size: 100%;
  background-position: center bottom;
  position: absolute;
  top: -10px;
  left: 35px;
}
</style>

<template>
<div>
  <c-header onlyLogo />
  <div class="comment-container">
    <div class="title bBorder"><span>User evaluation</span>用户评价</div>
    <div class="comment-item bBorder">
      <div class="line1">
        <div class="infos">
          <img src="/static/images/img.jpg" />
          <p>Andrew</p>
        </div>
        <ul class="stars">
          <li v-for="i in 5" :key="i">
            <img src="/static/images/common/star-gray.png" mode="widthFix">
          </li>
        </ul>
      </div>
      <div class="content">非常让人难忘的经历，舞池氛围好到爆！非常让人难忘的经历，舞池氛围好到爆！非常让人难忘的经历，舞池氛围好到爆！非常让人难忘的经历，舞池氛围好到爆！</div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader
  },

  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

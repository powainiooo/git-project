<style scoped>
.organ-container {
  height: 550px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) inset;
  overflow: hidden;
}
.organ-container .line1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 60px 38px 60px;
}
.organ-container .line1 div {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #9E9E9F;
  font-family: HelveL;
}
.organ-container .line1 div img {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}
.organ-container .line1 .btn {
  width: 174px;
}
.organ-container .line2 {
  margin: 0 45px;
  display: flex;
  justify-content: space-between;
}
.organ-container .line2>div {
  width: 340px;
  transform: scale(.95);
  transform-origin: 0 0;
}
.organ-container .line3 {
  margin-top: 20px;
  margin-right: 60px;
  display: flex;
  justify-content: flex-end;
}
.organ-container .line3 .btn {
  width: 108px;
  background: #EEEEEF;
  color: #9E9E9F;
}
</style>

<template>
<div>
  <div class="c-ticket-title organ-title"><span>Organizers</span>主办方</div>
  <div class="organ-container">
    <div class="line1">
      <div>
        <img src="/static/images/logo.png" />
        <span>MAOLivehouse</span>
      </div>
      <button class="btn">138-8888-8888</button>
    </div>
    <div class="line2">
      <div>
        <c-ticket extraClass="organ-ticket" />
      </div>
      <div>
        <c-ticket extraClass="organ-ticket" />
      </div>
    </div>
    <div class="line3">
      <button class="btn">全部</button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import cTicket from '@/pages/index/modules/ticket'
export default {
  name: 'app',
  components: {
    cTicket
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

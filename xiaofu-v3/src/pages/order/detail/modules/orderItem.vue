<style scoped>
.c-order-item {
  margin: 0 25px;
  position: relative;
}
.c-order-item-top {
  height: 320px;
  background-color: #ffffff;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr0AAAFCCAMAAADL1pW7AAAAllBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AJcWoAAAAMXRSTlMAAgMECAkLDBETGx8gKSo2N1d1dnh7fH1+hoeVlperrLG0tsHE0NLT1OLn6+zu8vf42gGQ9AAAA1pJREFUeNrt2ltyUkEYhdFNLkRIFKN4ASLmiiHHJDj/yfmgKUkEXu3fWmsIu77q4nSTrOuNxvNFt/oBjVl1i/l41MtWw8nSSrRsORlubncwc+bS/hk8G2yI97SzDBV0py/b3T+zClWc7T+L9/DCJNRxcbh+8oqXWvmunb5fzEGxHw9/PtiMQTVPn24Dtw2U0/2+OJuZgnpmv17YPFJQ0GqYJFNDUNEkSc9/Gyhp2UvemoGaRsnYCtQ0Tr5agZrmyTcrUNMi8VRBUV3itpeiVokRqEq9qBfUC+pFvaBeUC+oF/WCekG9qBfUC+oF9aJeUC+oF/WCekG9oF7UC+oF9YJ6US+oF9SLekG9oF5QL+oF9YJ6US+oF9QL6kW9oF5QL6gX9YJ6Qb2oF9QL6gX1ol5QL6gX9YJ6Qb2gXtQL6gX1ol5QL6gX1It6Qb2gXlAv6gX1gnpRL6gX1AvqRb2gXlAv6gX1gnpBvagX1AvqBfWiXlAvqBf1gnpBvaBe1AvqBfWiXlAvqBfUi3pBvaBe1AvqBfWCelEvqBfUC+pFvaBeUC/qBfWCekG9qBfUC+pFvaBeUC+oF/WCekG9oF7UC+oF9aJeUC+oF9SLekG9oF7UC+oF9YJ6US+oF9SLekG9oF5QL+oF9YJ6Qb2oF9QL6kW9oF5QL6gX9YJ6Qb2oF9QL6gX1ol5QL6gX1It6Qb2gXtQL6gX1gnpRL6gX1It6Qb2gXlAv6gX1gnpRL6gX1AvqRb2gXlAvqBf1gnpBvagX1AvqBfWiXlAvqBf1gnpBvaBe1AvqBfWCelEvqBfUi3pBvaBeUC/qBfWCelEvqBfUC+pFvaBeUC/qBfWCekG9qBfUC+oF9aJeUC+oF/WCekG9oF7UC+oF9aJeUC+oF9SLekG9oF5QL+oF9YJ6US+oF9QL6kW9oF5QL+oF9YJ6Qb2oF9QL6kW9oF5QL6gX9YJ6Qb2gXtQL/67eq9tHM1DP4+1VkuyNpnfGoJK76WgvT/qfHyxCFQ+f+nnmZGEUalic5KWjS7NQweVR/ta/MQztu+lnk+N709C6++Ns9t42tO7dlnhzsDQObVsebKs3H61D2z5sjTdvrEPbXm+vN9/NQ8u6HfHm2j607HpXvef2oWXnu+rtv4KG9QP/iZ9mW0Py3HiF3AAAAABJRU5ErkJggg==);
  -webkit-mask-size: 100% 100%;
  overflow: hidden;
  position: relative;
  z-index: 5;
}
.c-order-item-top-use {
  background-color: transparent;
}
.c-order-item-top .line1 {
  width: 234px;
  height: 234px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 42px auto 6px auto;
}
.c-order-item-top .line1 img {
  width: 100%;
  height: 100%;
}
.c-order-item-top .line1 p {
  font-size: 24px;
  color: #9E9E9F;
}
.c-order-item-top .line1 p.en {
  font-size: 32px;
  font-family: HelveB;
}
.c-order-item-top .line2 {
  font-size: 24px;
  text-align: center;
}
.c-order-item-top-use .line2 {
  color: #9E9E9F;
}

.c-order-item-bottom {
  height: 460px;
  background-color: #ffffff;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAHMCAMAAAAArostAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA7ratnQP75bwXCNjPsWNZJyDr4dOWPhD1pI2Bem838qllIZWkAAAF90lEQVR42uzYO2pCUQBF0ZugqPhDLMTC4s5/kkkVkPj6t2GtMezmnPHm+QUr9hzL9hNWbD+W7Sas2G4suk1YtdtY8pqwaq+xYHucsGrH7fjsMmHlLuOjh7nG6u0e44Otn4yA/fZDu5sJAZt/9T6+JyR8P8ab631CxP06/hwupwkhp8th/NqcvbsEHc+bMSFKvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iVLvGSJlyzxkiVessRLlnjJEi9Z4iXrh106IAEAAAAQ9P91OwLdoLxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzJy5a8bMnLlrxsycuWvGzFLh2QAAAAAAj6/7odgW5QXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetuRlS1625GVLXrbkZUtetmKXDmgAAEAABhUwgLN/UHN8gwzIS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvGTJS5a8ZMlLlrxkyUuWvFStvFSNvFSdvFQ9u/RyIgUARVHwojLi4GDjD0XQ/LM0gLfuxYGqGOqvvER9nrxEfZGXqLfJS9O3T/LS9PUxeUn6/pi8FL38eJ28BP378NjkJejn6yYvSZu8RMlLlrxkyctTvXuWt99/5OX59hzycsgL8pK3Q14idshLxA55idghLxE75CVih7xE7JCXiB3yErFDXiJ2yEvEDnmJ2CEvETvkJWKHvETskJeIHfLS8LJDXhp+7ZCXho875KXh/Q55aZCXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHnJkpcsecmSlyx5yZKXLHn/t2svKAhCQRiFx1JLe/hIJUyif/+bbAdBeBsbON8aDpdh7iAs4kVYxIuwiBdhES/C8oi3FCCFjLcXIIWMdxAghYx3L0AKGe8iQAoZ71OAFDLe4iAgvZc5mAWkl5uDjk0vfmAxD7mA5CbzUGUCEssKc9EISGe0zxgc8K/KzjzVRwEhH17qRTrn2pzVTA5Iom/N35WdA9a7tbaFKue3AitdKttIN3OZjhWGxjZUTI/d6S7gW+UwTubsDbIwpyMKN6TJAAAAAElFTkSuQmCC);
  -webkit-mask-size: 100% 100%;
  overflow: hidden;
  position: relative;
  z-index: 5;
}
.c-order-item-bottom .line1 {
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0 25px;
}
.c-order-item-bottom .line1 div {
  width: 215px;
  font-size: 24px;
  padding-left: 16px;
  box-sizing: border-box;
}
.c-order-item-bottom .line1:before {
  content: '';
  width: 2px;
  height: 52px;
  transform: scaleX(.5);
  background-color: #DBDCDC;
  position: absolute;
  top: 14px;
  left: 198px;
}
.c-order-item-bottom .line1 p {
  font-size: 26px;
  margin-left: 20px;
  box-sizing: border-box;
  font-family: HelveB;
}
.c-order-item-bottom .ticket {
  min-width: 100px;
  height: 100px;
  padding: 0 16px;
  background: linear-gradient(159deg, #0027AF 0%, #2154DA 53%, #003AC3 100%);
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  font-size: 24px;
  line-height: 100px;
  color: #ffffff;
  margin: 46px 0 0 30px;
}

.c-order-item-flip {
  width: 118px;
  height: 118px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 6;
}
.c-order-item-shadow {
  width: 760px;
  position: absolute;
  left: -30px;
  top: 290px;
}
</style>

<template>
<div class="c-order-item">
  <div class="c-order-item-top">
    <div class="line1">
      <img :src="record.qrcode_url" v-if="record.state === 0" />
      <template v-else-if="record.state === 1">
      <p class="en">Checked</p>
      <p>已使用</p>
      </template>
      <template v-else-if="record.state === 2">
      <p class="en">Expired</p>
      <p>已过期</p>
      </template>
    </div>
    <div class="line2">{{record.code}}</div>
  </div>
  <div class="c-order-item-bottom">
    <infos :record="infoData" nameKey="ticketName" :showBanner="false" />
    <div class="line1 bBorder">
      <div>{{record.name}}</div>
      <p>{{record.phone}}</p>
    </div>
    <div class="ticket">{{record.price_name}}</div>
  </div>
  <img src="/static/images/common/flip.png" class="c-order-item-flip" />
  <img src="/static/images/common/ticket-shadow-large.png" class="c-order-item-shadow" mode="widthFix" />
</div>
</template>

<script type='es6'>
import infos from '@/components/ticketDetail/infos'
export default {
  name: 'app',
  props: {
    record: Object,
    ticketName: String,
  },
  components: {
    infos
  },
  computed: {
    infoData () {
      return {
        ticketName: this.ticketName,
        ...this.record
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

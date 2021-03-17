<style>
.c-ticket-detail {
  width: 100%;
  height: calc(100vh - 100px);
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 800;
  background-color: #EEEEEF;
  overflow-y: auto;
}
.c-ticket-detail .c-ticket-title {
  margin: 48px 0 28px 38px;
  font-size: 24px;
  line-height: 36px;
}
.c-ticket-detail .c-ticket-title span {
  font-size: 26px;
  font-family: HelveB;
  margin-right: 16px;
}

.c-ticket-operates {
  width: 700px;
  height: 100px;
  display: flex;
  position: fixed;
  top: 130px;
  left: 25px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all .5s cubic-bezier(.3,.79,.41,.91);
}
.c-ticket-operates-bottom {
  top: calc(100vh - 130px);
  background-color: #ffffff;
}
.c-ticket-operates div {
  width: 565px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 52px;
  color: #ffffff;
  font-size: 48px;
  font-family: HelveB;
}
.c-ticket-operates-bottom div {
  color: #000000;
}
.c-ticket-operates div span {
  font-size: 20px;
  font-family: HelveL;
  margin: 18px 0 0 5px;
}
.c-ticket-operates button {
  width: 135px;
  height: 100px;
  background: linear-gradient(159deg, #0027AF 0%, #2154DA 53%, #003AC3 100%);
  border-radius: 0px 20px 20px 0px;
  font-size: 26px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-list li {
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-bottom: 20px;
}
.form-list li .rank {
  width: 80px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
}
.form-list li .rank img {
  width: auto;
  height: 54px;
}
.form-list li .content {
  width: 625px;
  height: 100px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  position: relative;
}
.form-list li .active {
  background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%);
}
.form-list li .content input {
  flex: 1;
  height: 100%;
  line-height: 100px;
  font-size: 24px;
  padding-left: 20px;
  box-sizing: border-box;
}
.form-list li .active input {
  color: #ffffff;
}
.form-list li .content button {
  width: 100px;
  height: 100px;
  border-radius: 0;
}
.form-list li .content button img {
  width: 100%;
  height: 100%;
}
.form-list li .content .nums {
  position: absolute;
  top: 10px;
  right: 69px;
  font-size: 16px;
  color: #ffffff;
}
.form-list li .content .nums span {
  font-size: 32px;
  font-family: HelveL;
  margin-right: 4px;
}
</style>

<template>
<div class="c-ticket-detail">
  <infos ref="infos" :page="page" :record="record"/>
  <template v-if="page === 'detail'">
  <artist ref="artist" :list="record.artist_list || []" />
  <notice ref="notice" :list="record.notice_list || []" />
  <particulars ref="particulars" :list="record.intro_list || []" />
  <organizers ref="organizers" :record="record.organizer" />
  <recommend ref="recommend" :list="record.recommend_tickets" />
  </template>
  <template v-else-if="page === 'buy'">
  <information />
  <c-select :list="record.price || []" />
  </template>

  <div class="c-ticket-operates" :class="{'c-ticket-operates-bottom': page === 'buy'}">
    <div>260<span>RMB</span></div>
    <button @click="handleBuy">购买</button>
  </div>
</div>
</template>

<script type='es6'>
import infos from './infos'
import artist from './artist'
import notice from './notice'
import particulars from './particulars'
import organizers from './organizers'
import recommend from './recommend'
import information from './information'
import cSelect from './select'
export default {
  name: 'app',
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    infos,
    artist,
    notice,
    particulars,
    organizers,
    recommend,
    information,
    cSelect
  },
  data () {
    return {
      page: 'buy'
    }
  },
  methods: {
    handleBuy () {
      this.page = 'buy'
      this.$emit('toggle', this.page)
    },
    backDetail () {
      this.page = 'detail'
    }
  }
}
</script>

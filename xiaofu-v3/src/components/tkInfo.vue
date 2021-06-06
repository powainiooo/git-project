<style scoped>
.c-tk-info { width: 100%; display: flex; align-items: center; }
.c-tk-date {
  width: 56px;
  height: 56px;
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
  border-radius: 7px;
  position: relative;
  font-size: 20px;
  font-family: HelveL;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  margin-right: 20px;
}
.c-tk-date p { padding-top: 2px; }
.c-tk-date-large {
  width: 66px;
  height: 66px;
  font-size: 24px;
  line-height: 33px;
}
.c-tk-date:after { content: ''; height: 2px; background-color: #ffffff; transform: scaleY(.5); position: absolute; left: 11px; right: 11px; top: 50%; }
.c-tk-date div { font-family: HelveB; }
.c-end-date:before {  content: ''; width: 10px; height: 2px; background-color: #C8C9CA; transform: scaleY(.5); position: absolute; left: -15px; top: 50%; }
.c-tk-title { flex: 1; overflow: hidden; }
.c-tk-title p { font-size: 26px; font-family: HelveB; line-height: 30px; }
.c-tk-title p.ellipsis { text-overflow: ellipsis; overflow: hidden; white-space: nowrap; word-break: break-all; }
.c-tk-title div { font-size: 20px; font-family: HelveL; color: #9E9E9F; line-height: 25px; }
</style>

<template>
<div class="c-tk-info" v-if="record">
  <div class="c-tk-date" :class="['c-tk-date-' + size]">
    <p>{{record.month}}</p>
    <div>{{record.day}}</div>
  </div>
  <div class="c-tk-date c-end-date" :class="['c-tk-date-' + size]" v-if="showEndDate">
    <p>{{endDate.month}}</p>
    <div>{{endDate.day}}</div>
  </div>
  <div class="c-tk-title" v-if="showTitle">
    <p :class="{'ellipsis': ellipsis}">{{record.name}}</p>
    <div>{{record.host}}</div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: 'normal'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showEndDate: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    endDate: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

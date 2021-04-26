<style scoped>
.unit-list li { height: 100px; }
.unit-list li a { display: flex; height: 100%; align-items: center; padding-left: 32px; font-size: 30px; position: relative; }
.unit-list li a img { width: 12px; position: absolute; top: 39px; right: 30px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <ul class="unit-list">
      <li class="borderB" v-for="item in list" :key="index">
        <a :href="'/pages/etiquetteDetail/main?id=' + item.id + '&id2=' + id">{{item.name}} <img src="/static/images/arrow6.png" mode="widthFix" /></a>
      </li>
    </ul>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      list: []
    }
  },
  methods: {
    getData () {
      postAction('rite').then(res => {
        if (res.ret === 0) {
          this.list = res.data
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

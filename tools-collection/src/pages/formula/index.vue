<style scoped>
.formula-tabs { padding-top: 28px; padding-bottom: 12px; box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15); display: flex; }
.formula-tabs li { flex: 1; font-size: 30px; color: #333333; text-align: center; position: relative; padding-bottom: 32px; }
.formula-tabs li.active { color: #436CB3; }
.formula-tabs li.active:after { content: ''; width: 56px; height: 4px; background-color: #436CB3; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); }

.formula-content { margin: 60px 46px; }
.formula-content h3 { font-size: 28px; color: #000000; margin-bottom: 50px; text-align: center; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
<!--    <ul class="formula-tabs">-->
<!--      <li v-for="item in list"-->
<!--          :key="index"-->
<!--          :class="{'active': current.id === item.id}"-->
<!--          @click="toggle(item)">{{item.name}}</li>-->
<!--    </ul>-->
    <div class="formula-content">
      <h3>{{current.name}}</h3>
      <rich-text :nodes="current.desc"></rich-text>
    </div>
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
      current: {},
      list: []
    }
  },
  methods: {
    getData () {
      postAction('formula', {
        id: this.id
      }).then(res => {
        if (res.ret === 0) {
          this.current = res.data
        }
      })
    },
    toggle (data) {
      this.current = data
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

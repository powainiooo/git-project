<style scoped>
.idiom-list li { height: 100px; display: flex; align-items: center; padding: 0 14px 0 32px;  }
.idiom-list li div { width: 100%; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAqUlEQVQY023OsQqCUBjF8U8E3yMMCozynnP3IhqbfbEeoDICs1lbcmmxvQfJwRu0tZhdqzv++H+HK1gxQxR4Yj9mrHnFXFwL1ULtUbNUU5td+tzSsNSzTk0fMc3PCPqI/9bc0HxvC32scecFy873xj0e+OTNNkePkPPBwibFjBUSwiLkNDxy2FIY6lNDTkvoUuA1h6kevCtBxAI108+WiGDHCueJaisReQHoeT0ANoIA7QAAAABJRU5ErkJggg==") no-repeat; background-size: 10px auto; background-position: 96% center; }
.idiom-list li h3 { font-size: 26px; color: #3D7FC7; }

.radio-line { height: 100px; }
</style>

<template>
  <div class="container">
    <div class="hr20" style="background-color: #436CB3"></div>
    <div class="mt30 mb30">
      <c-search placeholder="请输入您想要查询的字" @search="getList" />
    </div>
    <div class="hr10"></div>
    <div class="radio-line acenter">
      <div class="acenter">
        <div class="radio ml75 mr140" :class="{'radio-active': type === 1}" @click="type = 1">近义词</div>
        <div class="radio" :class="{'radio-active': type === 2}" @click="type = 2">反义词</div>
      </div>
    </div>
    <ul class="idiom-list">
      <li v-for="item in list" :key="index" class="borderB" @click="getDetail(item)">
        <div>
          <h3>{{item}}</h3>
        </div>
      </li>
    </ul>

    <div class="cover" v-if="showDetail" @click="showDetail = false"></div>
    <div class="float-box" :class="{'float-box-show': showDetail}">
      <h3 v-if="showDetail">【{{keyword}}】</h3>
      <ul v-if="showDetail">
        <li v-for="item in list" :key="index">{{item}}</li>
      </ul>

      <div class="tc mt60">
        <button class="btn btn-min" @click="showDetail = false">我知道了</button>
      </div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search2'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {
      id: '',
      showDetail: false,
      keyword: '',
      type: 1,
      list: [],
      record: {}
    }
  },
  methods: {
    getList (e) {
      if (e === '') {
        mpvue.showToast({
          title: '请输入查询的字',
          icon: 'none'
        })
        return false
      }
      postAction('resemble', {
        word: e,
        type: this.type
      }).then(res => {
        if (res.ret === 0) {
          this.keyword = e
          this.list = res.data.words
        }
      })
    },
    getDetail (e) {
      this.showDetail = true
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

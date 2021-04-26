<style scoped>
.idiom-list li { height: 200px; display: flex; align-items: center; padding: 0 14px 0 32px;  }
.idiom-list li div { width: 100%; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAqUlEQVQY023OsQqCUBjF8U8E3yMMCozynnP3IhqbfbEeoDICs1lbcmmxvQfJwRu0tZhdqzv++H+HK1gxQxR4Yj9mrHnFXFwL1ULtUbNUU5td+tzSsNSzTk0fMc3PCPqI/9bc0HxvC32scecFy873xj0e+OTNNkePkPPBwibFjBUSwiLkNDxy2FIY6lNDTkvoUuA1h6kevCtBxAI108+WiGDHCueJaisReQHoeT0ANoIA7QAAAABJRU5ErkJggg==") no-repeat; background-size: 10px auto; background-position: 96% center; }
.idiom-list li h3 { font-size: 26px; color: #3D7FC7; }
.idiom-list li p { font-size: 20px; margin-top: 20px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
</style>

<template>
  <div class="container">
    <div class="hr20" style="background-color: #436CB3"></div>
    <div class="mt30 mb30">
      <c-search placeholder="请输入您想要查询的成语" @search="getDetail" />
    </div>
    <div class="hr10"></div>

    <ul class="idiom-list">
      <li class="borderB" @click="getDetail('亡羊补牢')">
        <div>
          <h3>【喷云吐雾】 pēn yún tǔ wù</h3>
          <p>【成语解释】：喷吐出云雾来</p>
          <p>【成语出自】：安正福《敌后插刀》：“炕上还斜躺着几个，正在喷云吐雾抽正在喷云吐雾抽。”</p>
        </div>
      </li>
    </ul>

    <div class="cover" v-if="showDetail" @click="showDetail = false"></div>
    <div class="float-box" :class="{'float-box-show': showDetail}">
      <h3 class="tc" v-if="showDetail">【{{record.chengyu}}】 {{record.pinyin}}</h3>
      <ul v-if="showDetail">
        <li>
          <div>【成语解释】：</div>
          <p>{{record.chengyujs}}</p>
        </li>
        <li>
          <div>【成语出自】：</div>
          <p>{{record.from_}}</p>
        </li>
        <li>
          <div>【成语字数】：</div>
          <p>{{record.chengyu.length}}个字</p>
        </li>
        <li>
          <div>【成语语法】：</div>
          <p>{{record.yufa}}</p>
        </li>
      </ul>

      <div class="tc mt60">
        <button class="btn btn-min" @click="copy(record.chengyu)">复 制</button>
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
      record: {}
    }
  },
  methods: {
    getDetail (e) {
      console.log('getDetail')
      if (e === '') {
        mpvue.showToast({
          title: '请输入成语',
          icon: 'none'
        })
        return false
      }
      postAction('chengyu', {
        word: e
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
          this.record.chengyu = e
          this.showDetail = true
        }
      })
    },
    copy (txt) {
      wx.setClipboardData({
        data: txt,
        success (res) {
          mpvue.showToast({
            title: '复制成功'
          })
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

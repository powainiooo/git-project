<style scoped>
.idiom-list li { height: 200px; display: flex; align-items: center; padding: 0 14px 0 32px;  }
.idiom-list li div { width: 100%; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAqUlEQVQY023OsQqCUBjF8U8E3yMMCozynnP3IhqbfbEeoDICs1lbcmmxvQfJwRu0tZhdqzv++H+HK1gxQxR4Yj9mrHnFXFwL1ULtUbNUU5td+tzSsNSzTk0fMc3PCPqI/9bc0HxvC32scecFy873xj0e+OTNNkePkPPBwibFjBUSwiLkNDxy2FIY6lNDTkvoUuA1h6kevCtBxAI108+WiGDHCueJaisReQHoeT0ANoIA7QAAAABJRU5ErkJggg==") no-repeat; background-size: 10px auto; background-position: 96% center; }
.idiom-list li h3 { font-size: 26px; color: #3D7FC7; }
.idiom-list li p { font-size: 20px; margin-top: 20px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
</style>

<template>
  <div class="container1">
    <div class="hr20" style="background-color: #436CB3"></div>
    <div class="mt30 mb30">
      <c-search placeholder="请输入您想要查询的成语" />
    </div>
    <div class="hr10"></div>

    <ul class="idiom-list">
      <li class="borderB">
        <div>
          <h3>【喷云吐雾】 pēn yún tǔ wù</h3>
          <p>【成语解释】：喷吐出云雾来</p>
          <p>【成语出自】：安正福《敌后插刀》：“炕上还斜躺着几个，正在喷云吐雾抽正在喷云吐雾抽。”</p>
        </div>
      </li>
      <li class="borderB">
        <div>
          <h3>【喷云吐雾】 pēn yún tǔ wù</h3>
          <p>【成语解释】：喷吐出云雾来</p>
          <p>【成语出自】：安正福《敌后插刀》：“炕上还斜躺着几个，正在喷云吐雾抽正在喷云吐雾抽。”</p>
        </div>
      </li>
      <li class="borderB">
        <div>
          <h3>【喷云吐雾】 pēn yún tǔ wù</h3>
          <p>【成语解释】：喷吐出云雾来</p>
          <p>【成语出自】：安正福《敌后插刀》：“炕上还斜躺着几个，正在喷云吐雾抽正在喷云吐雾抽。”</p>
        </div>
      </li>
    </ul>

    <div class="cover"></div>
    <div class="float-box">
      <h3 class="tc">【喷云吐雾】 pēn yún tǔ wù</h3>

      <ul>
        <li>
          <div>【成语解释】：</div>
          <p>比喻情况万分危急。</p>
        </li>
        <li>
          <div>【成语出自】：</div>
          <p>宋·程珌《程端明公洛水集·丙子轮对札子》第11卷：“肆我祖宗得请于上帝，假手鞑靼，连岁屏除，岌岌之千钧一发矣。”</p>
        </li>
        <li>
          <div>【成语简拼】：</div>
          <p>qjyf 读音查询</p>
        </li>
        <li>
          <div>【成语字数】：</div>
          <p>4个字</p>
        </li>
        <li>
          <div>【成语语法】：</div>
          <p>主谓式；作谓语、定语；用于人或事十分危急</p>
        </li>
      </ul>

      <div class="tc mt60">
        <button class="btn btn-min">复 制</button>
      </div>
    </div>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search2'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>

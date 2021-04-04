<style scoped>
.ts-list li { padding: 28px 0 44px 0; display: flex; }
.ts-list li .r { margin-left: 50px; }
.ts-list li .r h3 { font-size: 28px; color: #3D7FC7; margin-bottom: 12px; }
.ts-list li .r h3 span { font-size: 22px; color: #666666; margin-left: 50px; }
.ts-list li .r p { font-size: 26px; line-height: 45px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search />
    </div>

    <ul class="ts-list borderT">
      <li class="borderB">
        <div class="r">
          <h3>《出塞》<span>马致远 〔元代〕</span></h3>
          <p><text>秦时明月汉时关，万里长征人未还。\n
            但使龙城飞将在，不教胡马度阴山。</text></p>
        </div>
      </li>
      <li class="borderB">
        <div class="r">
          <h3>《出塞》<span>马致远 〔元代〕</span></h3>
          <p><text>秦时明月汉时关，万里长征人未还。\n
            但使龙城飞将在，不教胡马度阴山。</text></p>
        </div>
      </li>
      <li class="borderB">
        <div class="r">
          <h3>《出塞》<span>马致远 〔元代〕</span></h3>
          <p><text>秦时明月汉时关，万里长征人未还。\n
            但使龙城飞将在，不教胡马度阴山。</text></p>
        </div>
      </li>
    </ul>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'

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

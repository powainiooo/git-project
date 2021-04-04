<style scoped>
.why-list li { padding: 40px 30px;  }
.why-list li h3 { font-size: 26px; color: #3D7FC7; margin-bottom: 30px; }
.why-list li div { font-size: 20px; color: #282828; line-height: 44px; }
.why-list li div span { color: #FF3600; }
</style>

<template>
  <div class="container1">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search />
    </div>

    <ul class="why-list borderT">
      <li class="borderB">
        <h3>【为什么植物的果子甘甜多汁?】</h3>
        <div><span>【解答】</span>植物的果子甜美、多汁，是为了吸引了动物为它传播种子。果子里面有一个或多个种子。当动物把果子吃下去的时候，种子也跟着进了它们的肚子。种子在动物肚子里很难消化，它们随着动物的粪便排出体外。动物的龚便里面有很多养分，所以种子会很快长出新的植株。</div>
      </li>
      <li class="borderB">
        <h3>【为什么植物的果子甘甜多汁?】</h3>
        <div><span>【解答】</span>植物的果子甜美、多汁，是为了吸引了动物为它传播种子。果子里面有一个或多个种子。当动物把果子吃下去的时候，种子也跟着进了它们的肚子。种子在动物肚子里很难消化，它们随着动物的粪便排出体外。动物的龚便里面有很多养分，所以种子会很快长出新的植株。</div>
      </li>
      <li class="borderB">
        <h3>【为什么植物的果子甘甜多汁?】</h3>
        <div><span>【解答】</span>植物的果子甜美、多汁，是为了吸引了动物为它传播种子。果子里面有一个或多个种子。当动物把果子吃下去的时候，种子也跟着进了它们的肚子。种子在动物肚子里很难消化，它们随着动物的粪便排出体外。动物的龚便里面有很多养分，所以种子会很快长出新的植株。</div>
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

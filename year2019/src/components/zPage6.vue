<style scoped>
.z-page6 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 200px; left: 120px; z-index: 12;}
.z-page6 .data-content { position: static; margin-bottom: 30px;}
.z-page6 .tag-content { position: static; margin-bottom: 30px;}
.z-page6 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page6 .fadeOut { animation: fadeOut 1s linear;}
.z-page6 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
.z-page6 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 0.9s both}
.z-page6 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.1s both}
</style>

<template>
<div class="z-page6" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
      <div class="data-content" v-if="showParts">
         <p v-if="tagName !== '火星人'">今年你使用最多的远程控制是</p>
         <div v-if="tagName === '冷暖自由'">
            <p><span class="value">开/关空调 {{times}}次</span></p>
            <p>都说你是享福命，这就是证明</p>
         </div>
         <div v-if="tagName === '钥匙自由'">
            <p><span class="value">解锁/上锁 {{times}}次</span></p>
            <p>别问没钥匙开锁哪家强，比亚迪云服务帮你忙</p>
         </div>
         <div v-if="tagName === '闪灯鸣笛'">
            <p><span class="value">解锁/上锁 {{times}}次</span></p>
            <p>资深路痴有救啦，几千平方的停车场，一口气找车不费劲</p>
         </div>
         <div v-if="tagName === '健忘症患者'">
            <p><span class="value">远程升窗 {{times}}次</span></p>
            <p>再也不用半夜穿着秋裤下楼，忘关窗快用云服务，成功人士都爱用！</p>
         </div>
         <div v-if="tagName === '火星人'">
            <p>全年没有使用过任何远程操作</p>
            <p>小拳拳捶你胸口，这么高科技你竟然都不用，快去解锁远程控制，坐躺人生赢家</p>
         </div>

      </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
      <div class="data-content" v-if="showParts">
         <p>你最不常使用的是<span>{{unUseFunction}}</span></p>
         <p v-if="unUseFunction === '开/关空调'">夏天不热冬天不冷</p>
         <p v-else-if="unUseFunction === '解锁/上锁'">你有健忘症吗？出门忘带钥匙</p>
         <p v-else-if="unUseFunction === '闪灯鸣笛'">闪灯鸣笛也很炫酷</p>
         <p v-else-if="unUseFunction === '远程升窗'">试着用用，我保证</p>
      </div>
   </transition>
   <transition enter-active-class="slideUpIn3" leave-active-class="fadeOut">
      <div class="tag-content" v-if="showParts">
         <p v-if="unUseFunction === '开/关空调'">从此冷暖自己掌控，<span>用TA</span>！</p>
         <p v-else-if="unUseFunction === '解锁/上锁'"><span>用TA</span>就够了！</p>
         <p v-else-if="unUseFunction === '闪灯鸣笛'">轻松帮你找车，<span>用TA</span>！</p>
         <p v-else-if="unUseFunction === '远程升窗'">强迫症不会再犯，<span>用TA</span>！</p>
      </div>
   </transition>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         outTime: 1000,
         times: 333,
         unUseFunction: '解锁/上锁'
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p6'
      },
      tagName () {
         return '冷暖自由'
      },
   },
   methods: {}
}
</script>

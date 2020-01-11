<style scoped>
.z-page0 { width: 100%; position: fixed; top: 0; left: 0; bottom: 0; z-index: 13; overflow: hidden; background-color: #A9E4F5;}
.z-page0-fadeIn { animation: fadeIn 0.5s linear;}
.z-page0-fadeOut { animation: fadeOut 0.5s linear;}
.z-page0 .bg { width: 100%; display: block; transform: translateY(-30px)}
.z-page0 .bg-top { width: 100%; display: block; position: absolute; top: 0; left: 0; z-index: 130; transform: translateY(-30px)}
.z-page0 .ticket { width: 528px; position: absolute; top: 120px; left: 138px; animation: ticket 1s ease-out 0.5s both;z-index: 120;}
@keyframes ticket {
   0% { transform: translateY(-850px)}
   100% { transform: translateY(0)}
}
.z-page0 .ticket>img { width: 100%;}
.z-page0 .ticket .badge { width: 208px; position: absolute; top: 136px; left: 138px;}
.z-page0 .ticket .content { width: 400px; position: absolute; top: 440px; left: 40px;}
.z-page0 .ticket .content p { font-size: 30px; color: #397B97; text-align: center; margin-bottom: 20px;}
.z-page0 .ticket .content p span.name { font-size: 36px; color: #0475B5}
.z-page0 .ticket .content div { font-size: 26px; line-height: 44px; color: #397B97; text-align: justify;}
.z-page0 .ticket .content div .title { color: #F84F1C}
.z-page0 .ticket .content div span { color: #0475B5}
.z-page0:after { content: '';  width: 100%; height: 130px; background-color: #A9E4F5; position: absolute; bottom: 0; left: 0;}
.z-page0 .arrow { position: absolute; top: 50%; right: 24px; margin-top: -16px; z-index: 120;}
.z-page0 .arrow img { width: 40px;}
.z-page0 .hand { width: 40px; position: absolute; top: 53%; right: 24px; z-index: 120; animation: hand 1s linear infinite;}
@keyframes hand {
   0% { transform: translatex(0)}
   70% { transform: translatex(-30px); opacity: 1}
   100% { transform: translatex(-30px); opacity: 1}
}
</style>

<template>
<transition enter-active-class="z-page0-fadeIn" leave-active-class="z-page0-fadeOut" @after-enter="enter">
   <div class="z-page0" v-if="showParts">
      <img :src="imgSrc+'static/bg0.png'" class="bg">
      <img :src="imgSrc+'static/bg0-top.png'" class="bg-top">
      <div class="ticket">
         <img :src="imgSrc+'static/ticket.png'">
         <img :src="imgSrc+'static/badge/badge-'+pageData.tag+'.png'" class="badge" v-if="pageData !== undefined">
         <img :src="imgSrc+'static/badge/0.png'" class="badge" v-else>
         <!--<div class="content">-->
            <!--<p>Hi～ <span class="name">{{userName}}</span> 同学</p>-->
            <!--<div>-->
               <!--综合你在2019年的用车表现<br/>-->
               <!--特授予你<span class="title">{{tagName}}</span>称号-->
            <!--</div>-->
            <!--<div v-html="content"></div>-->
         <!--</div>-->
         <div class="content">
            <p>Hi， <span class="name">{{userName}}</span></p>
            <div v-html="content"></div>
         </div>
      </div>
      <div class="arrow" @click="gotoNext"><img src="@/assets/img/arrow2.png"></div>
      <img src="@/assets/img/hand2.png" class="hand" @click="gotoNext"/>
      <z-car status="stop" v-if="showParts"></z-car>
   </div>
</transition>
</template>

<script type='es6'>
import zCar from '@/components/zCar.vue'
export default {
	name: 'app',
   components: { zCar },
	data() {
		return {
		   outTime: 300,
         tagList: ['山顶洞人', '科技控, 远程控制使用', '节能家, 年均能耗', '暴走族, 行驶里程', '环保家, 节能减排', '语音控, 智能语音使用', '潮人范儿, 玩应用'],
         recommend: ['远程控制使用', '年均能耗', '行驶里程', '节能减排', '智能语音使用', '玩应用']
      }
	},
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p0'
      },
      pageData () {
         return this.$store.state.pageData.P10
      },
      isDiLink () {
         return this.$store.state.isDiLink
      },
      type () {
         return this.$store.state.powerMode
      },
      content () {
         if (this.pageData === undefined) {
            return ''
         } else {
            if (this.pageData.tag === 0) {
               // return `在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有待提升，我很好得，一得就能得到哦`
               return `你的2019年度关键词为<span style="color: #F84F1C">山顶洞人，智能语音、流量、应用使用</span>均低于全国<span style="color: #F84F1C">85%</span>的车主，浪费这么高科技的智能大屏，试着去探索一下吧！`
            } else {
               const rank1 = this.pageData.tagPercent
               const funcName2 = this.recommend[this.pageData.recommend - 1]
               const rank2 = this.pageData.rePercent
               const nameArr = this.tagName.split(',')
               let str
               if (rank1 > 60 && rank2 > 60) {
                  str = `你的2019年度关键词为<span style="color: #F84F1C">${nameArr[0]}</span><br/><span style="color: #F84F1C">${nameArr[1]}</span>超过全国<span style="color: #F84F1C">${rank1}%</span>车主，而<span style="color: #F84F1C">${funcName2}</span>超过全国<span style="color: #F84F1C">${rank2}%</span>车主，综合实力优秀，是资深达人车主！`
               } else {
                  str = `你的2019年度关键词为<span style="color: #F84F1C">${nameArr[0]}</span><br/><span style="color: #F84F1C">${nameArr[1]}</span>超过全国<span style="color: #F84F1C">${rank1}%</span>车主，但<span style="color: #F84F1C">${funcName2}</span>仅超过全国<span style="color: #F84F1C">${rank2}%</span>车主`
                  switch (this.pageData.recommend) {
                     case 1:
                        str += '，期待你解锁更多精彩！'
                        break;
                     case 2:
                        str += '，建设美丽中国，需要你的参与！'
                        break;
                     case 3:
                        str += '，大千世界，带上家人多出去走走吧。'
                        break;
                     case 4:
                        str += '，建设美丽中国，需要你的参与！'
                        break;
                     case 5:
                        str += '，期待你解锁更多精彩！'
                        break;
                     case 6:
                        str += '，期待你解锁更多精彩！'
                        break;
                  }
               }
               return str
            }
         }
      },
      tagName () {
         if (this.pageData === undefined) {
            return this.tagList[0]
         } else {
            return this.tagList[this.pageData.tag]
         }
      },
      params () {
         return this.$store.state.params
      },
      userName () {
         let name = this.params.userName
         if(name.length > 4){
            return '*' + name.substr(1,3) + '...';
         }else{
            return '*' + name.substr(1,3);
         }
      }
   },
	methods: {
      enter () {
         this.$store.commit('setCanChangePage', true)
      },
      gotoNext () {
         // console.log(this)
         this.$parent.changePage('next')
      }
   }
}
</script>

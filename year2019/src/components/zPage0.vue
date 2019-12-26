<style scoped>
.z-page0 { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; z-index: 12; overflow: hidden; background-color: #A9E4F5;}
.z-page0-fadeIn { animation: fadeIn 0.5s linear;}
.z-page0-fadeOut { animation: fadeOut 0.5s linear;}
.z-page0 .bg { width: 100%; display: block;}
.z-page0 .bg-top { width: 100%; display: block; position: absolute; top: 0; left: 0; z-index: 10;}
.z-page0 .ticket { width: 528px; position: absolute; top: 200px; left: 138px; animation: ticket 1s ease-out 0.5s both;}
@keyframes ticket {
   0% { transform: translateY(-850px)}
   100% { transform: translateY(0)}
}
.z-page0 .ticket>img { width: 100%;}
.z-page0 .ticket .badge { width: 208px; position: absolute; top: 136px; left: 138px;}
.z-page0 .ticket .content { width: 400px; position: absolute; top: 440px; left: 40px;}
.z-page0 .ticket .content p { font-size: 30px; color: #397B97; text-align: center; margin-bottom: 20px;}
.z-page0 .ticket .content p span.name { font-size: 36px; color: #0475B5}
.z-page0 .ticket .content div { font-size: 26px; line-height: 44px; color: #397B97; text-align: center;}
.z-page0 .ticket .content div .title { color: #F84F1C}
.z-page0 .ticket .content div span { color: #0475B5}
.z-page0:after { content: '';  width: 100%; height: 130px; background-color: #A9E4F5; position: absolute; bottom: 0; left: 0;}
.z-page0 .arrow { width: 100%; font-size: 24px; color: #ffffff; justify-content: center; align-items: center; display: flex; position: absolute; top: 1050px; left: 0;}
.z-page0 .arrow img { width: 40px; margin-left: 20px;}
</style>

<template>
<transition enter-active-class="z-page0-fadeIn" leave-active-class="z-page0-fadeOut" @after-enter="enter">
   <div class="z-page0" v-if="showParts">
      <img src="static/bg0.png" class="bg">
      <img src="static/bg0-top.png" class="bg-top">
      <div class="ticket">
         <img src="static/ticket.png">
         <img :src="'static/badge/'+pageData.tag+'.png'" class="badge">
         <div class="content">
            <p>Hi～ <span class="name">{{params.userName}}</span> 同学</p>
            <div>
               综合您在2019年的用车表现<br/>
               特授予您<span class="title">{{tagName}}</span>科技宅称号
            </div>
            <div v-html="content"></div>
         </div>
      </div>
      <div class="arrow">左滑查看年报<img src="@/assets/img/arrow2.png"></div>
   </div>
</transition>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
		   outTime: 300,
         tagList: ['山顶洞人', '科技宅', '节能家', '暴走家', '环保家', '语音控', '潮人范儿']
      }
	},
   computed: {
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
            if (this.isDiLink) {
               if (this.type === 'gasoline') {
                  if (this.pageData.tag === 0) {
                     return `在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有待提升，我很好得，一得就能得到哦`
                  } else {
                     return `但在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有欠缺，2020年看你表现喽`
                  }
               } else {
                  if (this.pageData.tag === 0) {
                     return `在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有待提升，我很好得，一得就能得到哦`
                  } else {
                     return `但在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有欠缺，2020年看你表现喽`
                  }
               }
            } else {
               if (this.type === 'gasoline') {
                  return `但在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有欠缺，2020年看你表现喽`
               } else {
                  return `但在<span style="color: #0475B5">${this.pageData.recommend}</span>方面还有欠缺，2020年看你表现喽`
               }
            }
         }
      },
      tagName () {
         if (this.pageData === undefined) {
            return ''
         } else {
            return this.tagList[this.pageData.tag]
         }
      },
      params () {
         return this.$store.state.params
      }
   },
	methods: {
      enter () {
         this.$store.commit('setCanChangePage', true)
      }
   }
}
</script>

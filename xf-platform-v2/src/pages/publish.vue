<style>
    .publish{ height: 100vh; min-height: 900px;   position: relative; -webkit-overflow-scrolling: touch;}
    body::-webkit-scrollbar-track{ -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;background-color: #003db9;}
    body::-webkit-scrollbar{width: 6px;background-color: #003db9;}
    body::-webkit-scrollbar-corner{width: 6px;background-color: #003db9;}
    body::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #fff;}
    .publish .top-line{ width: 1400px; position: absolute; left:60px; top: 90px; display: flex; justify-content: space-between; align-items: center; z-index: 500;}
    .publish .top-line .name{ font-size: 157px; color: #fff; font-family: 'Helve';}
    .publish .top-line .n-btn{ width: 270px;}
    .publish .anim05{ animation-duration: 1s; animation-timing-function: cubic-bezier(.25,.76,.36,.97);}
</style>

<template>
    <div class="publish">
        <div class="top-line">
            <div class="name">Step{{step}}</div>
            <t-button extraClass="white" v-if="step === '1'" @dotap="nextStep" :isDisabled="!step1Reg">下一步</t-button>
            <t-button v-if="step === '2'" @dotap="step = '1'">上一步</t-button>
            <t-button extraClass="white" v-if="step === '2'" @dotap="step='3'" :isDisabled="!step2Reg">下一步</t-button>
            <t-button v-if="step === '3'" @dotap="step='2'">上一步</t-button>
            <t-button extraClass="white" v-if="step === '3'" @dotap="doSubmit" :isDisabled="!step3Reg">完成并提交审核</t-button>
        </div>
        <transition enter-active-class="animated anim05 slideInUp">
        <step1 v-show="step === '1'" ref="step1" v-model="step1Reg" :errorData="errorData"></step1>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step2 v-show="step === '2'" ref="step2" v-model="step2Reg" :errorData="errorData"></step2>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step3 v-show="step === '3'" ref="step3" v-model="step3Reg" :errorData="errorData"></step3>
        </transition>

    </div>
</template>

<script type='es6'>
import Cookies from 'js-cookie'
import qs from 'qs'
import TButton from '@/components/common/TButton.vue'
import Step1 from '@/components/publish/Step1.vue'
import Step2 from '@/components/publish/Step2.vue'
import Step3 from '@/components/publish/Step3.vue'
export default {
   name: 'app',
   components: { TButton, Step1, Step2, Step3 },
   data () {
      return {
         step: '1',
         step1Reg: false,
         step2Reg: false,
         step3Reg: false,
         errorData: {
            goods_id: -1,
            address: '',
            cover: '',
            cover2: '',
            goods_name: '',
            goods_desc: [],
            notify: [],
            person_desc: []
         },
         isSubmit: false
      }
   },
   computed: {
      userData () {
         return this.$store.state.userData
      }
   },
   mounted () {
      this.$ajax.defaults.headers.common['mid'] = Cookies.get('xfmid')
      this.$ajax.defaults.headers.common['tokey'] = Cookies.get('xftokey')
      // this.$ajax.defaults.baseURL = 'http://wechat.leesticket.com';
      this.$ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      // if(editorData.id != -1){
      //    this.getError(editorData.id);
      // }
   },
   methods: {
      nextStep () {
         this.step = '2'
         let data = this.$refs.step1.formData
         this.$store.commit('setStartDate', data.begin + ' ' + data.hour_b)
         if (data.type === 1) {
            this.$store.commit('setEndDate', data.begin + ' ' + data.hour_e)
         } else {
            this.$store.commit('setEndDate', data.end + ' ' + data.hour_e)
         }
      },
      getError (id) {
         let self = this
         this.$ajax.get('/client/api/activity_checked', {
            params: {
               id: id
            }
         }).then(res => {
            let data = res.data
            if (data.status === 1) {
               self.errorData = data.data
            } else {
               self.$Message.warning(data.msg)
            }
         })
      },
      doSubmit () {
         let self = this
         if (self.isSubmit) return
         let obj = {}; let step1 = self.$refs.step1; let step2 = self.$refs.step2; let step3 = self.$refs.step3
         self.$tModal.confirm({
            title: '是否确认信息无误并提交？',
            content: '请仔细核查所填写的信息，确认提交之后信息无法修改。<br>若是您填写有误所造成的损失，小夫有票一概不负责任。<br><span style="color:#002aac;">注：当多人抢票时，平台会存在爆库存导致多卖票的情况。如本场活动热门，建议减少首发票量，后续可手动增加票量。</span>',
            onOk () {
               obj.city = step1.formData.city
               obj.activity = self.userData.activity
               obj.goods_name = step1.formData.goods_name
               obj.type = step1.formData.type
               obj.begin = step1.formData.begin
               if (obj.type !== 1) {
                  obj.end = step1.formData.end
               }
               obj.hour_b = step1.formData.hour_b
               obj.hour_e = step1.formData.hour_e
               obj.address = step1.formData.address
               obj.mobile = step1.formData.mobile
               obj.cover = step1.formData.cover
               obj.cover2 = step1.formData.cover2
               obj.classes = []
               for (let item of step2.typeListData) {
                  if (item.checked) {
                     obj.classes.push({
                        select: item.name,
                        price: item.price,
                        nums: item.sale_nums,
                        max: item.sale_limit
                     })
                  }
               }
               obj.cate = step2.ticketType
               obj.is_idnum = step2.ids
               obj.sale_start = new Date(step2.saleStart).getTime() / 1000
               obj.sale_end = new Date(step2.saleEnd).getTime() / 1000
               obj.show_time = new Date(step2.showTime).getTime() / 1000
               obj.notify = []
               for (let item of step2.noticeListData) {
                  obj.notify.push(item.value)
               }
               obj.goods_desc = []
               for (let item of step3.activityListData) {
                  if (item.imgUrl !== '' || item.desc !== '') {
                     obj.goods_desc.push({
                        img: item.imgUrl,
                        desc: item.desc
                     })
                  }
               }
               obj.person_desc = []
               for (let item of step3.actListData) {
                  if (item.logoUrl !== '' || item.imgUrl !== '') {
                     obj.person_desc.push({
                        img: '',
                        username: item.logoUrl,
                        picture: item.imgUrl
                     })
                  }
               }
               let editorData = self.$store.state.editorData; let ajaxSrc = '/client/api/activity_add'
               if (editorData.id !== -1) {
                  obj.id = editorData.id
                  ajaxSrc = '/client/api/act_update'
               }
               // console.log(obj);
               // return;
               self.isSubmit = true
               self.$ajax.post(ajaxSrc, qs.stringify(obj)).then(res => {
                  let data = res.data
                  self.isSubmit = false
                  if (data.status === 1) {
                     self.$tModal.warn({
                        title: '提交成功！',
                        content: '后台将在3个工作日内完成活动审核，<br>活动票务是否通过审核，请自行登录查询结果。',
                        btn1Name: '返回首页',
                        onOk () {
                           self.$router.push('list')
                        }
                     })
                  } else {
                     self.$tModal.warn({
                        title: data.msg
                     })
                  }
               }).catch(function (error) {
                  console.log(`err:${error}`)
                  self.$tModal.warn({
                     title: '提交失败！',
                     content: '由于网络错误、流量拥挤提交失败，<br>请尝试重新提交。',
                     btn1Name: '重新提交',
                     onOk () {
                        self.doSubmit()
                     }
                  })
               })
            }
         })
      }
   }
}

</script>

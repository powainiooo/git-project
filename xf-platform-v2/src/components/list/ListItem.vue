<style>
    .list-item{ width: 330px; position: relative;}
    .list-item .shadow{ width: 374px; height: 565px; margin-left: -21px; position: relative; overflow: hidden;}
    .list-item .shadow img{position: absolute; bottom: 0; left: 0;}
    .list-item .shadow-short{ height: 370px; top: 50px;}
    .list-item .ticket{ width: 330px; position: absolute; top: 40px; left: 0;}
    .list-item .ticket:after{ content: ''; width: 90px; height: 90px; background: url('../../assets/img/ticket-logo.png') no-repeat; position: absolute; right: -2px; bottom: 0;}
    .list-item .ticket .status{ width: 330px; height: 160px; background-repeat: no-repeat; overflow: hidden;}
    .list-item .ticket .status1{ background-image: url('../../assets/img/ticket-top1.png');}
    .list-item .ticket .status2{ background-image: url('../../assets/img/ticket-top2.png');}
    .list-item .ticket .status3{ height: 162px; background-image: url('../../assets/img/ticket-top3.png');}
    .list-item .ticket .status4{ height: 162px; background-image: url('../../assets/img/ticket-top4.png');}
    .list-item .ticket .status5{ background-image: url('../../assets/img/ticket-top5.png');}
    .list-item .ticket .status6{ height: 162px; background-image: url('../../assets/img/ticket-top6.png');}
    .list-item .ticket .status .top{ width: 100%; height: 60px; margin-top: 2px; display: flex; padding: 0 10px; box-sizing: border-box; justify-content: space-between; align-items: center; font-size: 18px;}
    .list-item .ticket .status3 .top{ height: 160px; align-items: baseline; margin-top: 20px;}
    .list-item .ticket .status4 .top{ height: 160px; align-items: baseline; margin-top: 20px;}
    .list-item .ticket .status6 .top{ height: 160px; align-items: baseline; margin-top: 20px;}
    .list-item .ticket .status .top p{ color: #ffffff;}
    .list-item .ticket .status .top>a{ width: 28px; height: 28px; background-color: #e83727; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: #ffffff; font-size: 20px;}
    .list-item .ticket .status .top .n-btn a{color: #000000;}
    .list-item .ticket .status .type{ height: 40px; padding: 0 10px; display: flex; justify-content: space-between; align-items: center; background-color: #ffffff;}
    .list-item .ticket .status .type p{ font-size: 14px; color: #000000;}
    .list-item .ticket .status .type .ivu-select{ width: 75px;}
    .list-item .ticket .status .type .ivu-select .ivu-select-selection{ height: 28px; border-radius: 15px; border:none; background-color: #0239b8;}
    .list-item .ticket .status .type .ivu-select .ivu-select-placeholder{ height: 28px; color: #ffffff;}
    .list-item .ticket .status .type .ivu-select .ivu-select-arrow{color: #ffffff;}
    .list-item .ticket .status .type .ivu-select .ivu-select-selected-value{color: #ffffff;}
    .list-item .ticket .status .nums{ padding:0 10px; height: 60px; display: flex; justify-content: space-between; align-items: center; background-color: #ffffff;}
    .list-item .ticket .status .nums p{ color: #000000; font-size: 14px; font-family: 'Helve';}
    .list-item .ticket .status .nums p span{ font-size: 40px; margin-right: 10px;}
    .list-item .ticket .status .nums div{ color: #c0c0c0; font-size: 18px; align-self: flex-end; margin-bottom: 8px;}
    .list-item .ticket .line-mid{ width: 330px; overflow: hidden; display: flex; align-items: flex-end;}
    .list-item .ticket .line-mid img{ width: 100%;}
    .list-item .ticket .info-frame{ width: 330px; height: 272px; mask-image: url('../../assets/img/cover.png'); -webkit-mask-image: url('../../assets/img/cover.png'); background-color: #ffffff;}
    .list-item .ticket .info-frame .line1{ height: 85px; overflow: hidden; border-bottom: 1px solid #c1c1c1; box-sizing: border-box;}
    .list-item .ticket .info-frame .line1 .date{ width: 140px; box-sizing: border-box; border-right: 1px solid #c1c1c1;  float: left;}
    .list-item .ticket .info-frame .line1 .date2{ width: 190px;}
    .list-item .ticket .info-frame .line1 .date3{ width: 190px;}
    .list-item .ticket .info-frame .line1 .date .year{ height: 25px; box-sizing: border-box; font-size: 12px; display: flex; justify-content: space-between; align-items: center; color: #000000; border-bottom: 1px solid #c1c1c1; padding: 0 10px;}
    .list-item .ticket .info-frame .line1 .date .day{ height: 58px; font-size: 44px; display: flex; justify-content: center; align-items: center; color: #000000; font-family: 'Helve';}
    .list-item .ticket .info-frame .line1 .date3 .day{ font-size: 32px;}
    .list-item .ticket .info-frame .line1 .logo{ height: 85px; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 10px 0; box-sizing: border-box;}
    .list-item .ticket .info-frame .line1 .logo img{ height: 100%;}
    .list-item .ticket .info-frame .title{ padding:0 10px; height: 45px; font-size: 18px; font-family: 'Helve'; color: #000000; display: flex; align-items: center; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
    .list-item .ticket .info-frame .img{ height: 142px; display: flex; align-items: center; overflow: hidden;}
    .list-item .ticket .info-frame .img img{ width: 100%;}
</style>

<template>
    <div class="list-item">
        <div class="shadow" :class="itemdata.status == '' ? 'shadow-short' : ''">
            <img src="@/assets/img/list-shadow.png">
        </div>
        <div class="ticket">
            <!-- 1:销售中 2：已下架 0：审核中 3：审核未通过 4：已售罄 5：已结束-->
            <div class="status status1" v-if="itemdata.status === 1">
                <div class="top">
                    <p>销售中</p>
                    <a href="javascript:;"
                       @mousedown.stop="stopFunc"
                       @mouseup.stop="doOff('2')"><Icon type="ios-power" /></a>
                </div>
                <div class="type"
                     @mousedown.stop="stopFunc"
                     @mouseup.stop="doSelectType">
                    <p>已销售</p>
                    <Select v-model="selectType">
                        <Option value="0">全部</Option>
                        <Option v-for="(item,index) in itemdata.classes" :key="index" :value="index+1">{{item.select}}</Option>
                    </Select>
                </div>
                <div class="nums">
                    <p><span>{{getSalenums(selectType)}}</span>张</p>
                    <div>/{{getAllnums(selectType)}}</div>
                </div>
            </div>
            <div class="status status2" v-if="itemdata.status === 2">
                <div class="top">
                    <p>已下架</p>
                    <a href="javascript:;"
                       @mousedown.stop="stopFunc"
                       @mouseup.stop="doOff('1')"><Icon type="ios-power" /></a>
                </div>
                <div class="type"
                     @mousedown.stop="stopFunc"
                     @mouseup.stop="doSelectType">
                    <p>已销售</p>
                    <Select v-model="selectType">
                        <Option value="0">全部</Option>
                        <Option v-for="(item,index) in itemdata.classes" :key="index" :value="index+1">{{item.select}}</Option>
                    </Select>
                </div>
                <div class="nums">
                    <p><span>{{getSalenums(selectType)}}</span>张</p>
                    <div>/{{getAllnums(selectType)}}</div>
                </div>
            </div>
            <div class="status status3" v-if="itemdata.status === '0'">
                <div class="top">
                    <p>审核中<br>Under review<br>审查中</p>
                </div>
            </div>
            <div class="status status4" v-if="itemdata.status === 3">
                <div class="top">
                    <p>审核未通过<br>Unapprove</p>
                    <div style="width: 110px; align-self: flex-end; margin-bottom: 40px;" @mousedown.stop="stopFunc" @mouseup.stop="stopFunc">
                        <t-button extraClass="white" size="min" @dotap="doEditor">查看并修改</t-button>
                    </div>
                </div>
            </div>
            <div class="status status5" v-if="itemdata.status === 4">
                <div class="top">
                    <p>已售罄</p>
                    <a href="javascript:;"
                       @mousedown.stop="stopFunc"
                       @mouseup.stop="doOff('2')"><Icon type="ios-power" /></a>
                </div>
                <div class="type"
                     @mousedown.stop="stopFunc"
                     @mouseup.stop="doSelectType">
                    <p>已销售</p>
                    <Select v-model="selectType">
                        <Option value="0">全部</Option>
                        <Option v-for="(item,index) in itemdata.classes" :key="index" :value="index+1">{{item.select}}</Option>
                    </Select>
                </div>
                <div class="nums">
                    <p><span>{{getSalenums(selectType)}}</span>张</p>
                    <div>/{{getAllnums(selectType)}}</div>
                </div>
            </div>
            <div class="status status6" v-if="itemdata.status === 5">
                <div class="top">
                    <p>已结束<br>Ended</p>
                </div>
            </div>
            <div class="line-mid" v-if="itemdata.status !== ''">
                <img src="@/assets/img/ticket-middle.png" style="display: block;" v-if="itemdata.status === '1' || itemdata.status === '2' || itemdata.status === '4'">
                <img src="@/assets/img/ticket-middle2.png" style="display: block;" v-if="itemdata.status === '3' || itemdata.status === '0' || itemdata.status === '5'">
            </div>
            <div class="line-mid" v-if="itemdata.status === ''"><img src="@/assets/img/ticket-top.png" style="display: block;"></div>
            <div class="info-frame">
                <div class="line1">
                    <div class="date" :class="'date'+itemdata.type">
                        <div class="year">
                            <span v-for="item in 4" :key="item">{{getYears(item)}}</span>
                        </div>
                        <div class="day">{{getDays()}}</div>
                    </div>
                    <div class="logo"><img :src="fileurl+itemdata.cover"> </div>
                </div>
                <div class="title" v-if="itemdata.activity === ''">{{itemdata.goods_name}}</div>
                <div class="title" v-if="itemdata.activity !== ''">{{itemdata.goods_name}} | {{itemdata.activity}}</div>
                <div class="img"><img :src="fileurl+itemdata.cover2"></div>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
import TButton from '@/components/common/TButton.vue'
import qs from 'qs'
export default {
   name: 'app',
   components: { TButton },
   props: ['itemdata', 'fileurl'],
   data () {
      return {
         selectType: '0'
      }
   },
   methods: {
      getYears (item) {
         let begin = this.itemdata.begin
         if (begin !== '') {
            return begin.substr(item - 1, 1)
         }
         return ''
      },
      getDays () {
         let begin = this.itemdata.begin; let end = this.itemdata.end; let type = this.itemdata.type
         if (type !== '') {
            if (type === '1') {
               return begin.substr(5, 5)
            } else if (type === '2') {
               return begin.substr(5, 5) + '-' + end.substr(8, 2)
            } else if (type === '3') {
               return begin.substr(5, 5) + '-' + end.substr(5, 5)
            }
         }
         return ''
      },
      doEditor () {
         let self = this
         this.$ajax.get('/client/api/activity_checked', {
            params: {
               id: this.itemdata.id
            }
         }).then(res => {
            let data = res.data
            if (data.status === 1) {
               this.$store.commit('setEditorData', self.itemdata)
               this.$store.commit('setErrorData', data.data)
               this.$router.push('publish')
            } else {
               self.$Message.warning(data.msg)
            }
         })
      },
      doOff (type) {
         let self = this; let title = ''; let content = ''
         if (type === '1') { // 上架
            title = '是否确认上架该票务？'
            content = '确认上架后，在小夫有票售票平台将显示该票务，用户可获取该票务信息并进行购买操作。'
         } else if (type === '2') { // 下架
            title = '是否确认下架该票务？'
            content = '确认下架后，在小夫有票售票平台将隐藏该票务，用户无法获取该票务信息。'
         }
         this.$tModal.confirm({
            title: title,
            content: content,
            onOk () {
               self.$ajax.post('/client/api/change_act', qs.stringify({
                  aid: self.itemdata.id,
                  status: type
               })).then(res => {
                  if (res.data.status === 1) {
                     self.$Message.success(res.data.msg)
                     self.$emit('dooff', self.itemdata.id)
                  } else {
                     self.$Message.warning(res.data.msg)
                  }
               })
            }
         })
      },
      doSelectType () {
      // console.log('select')
      },
      stopFunc () {
      // console.log('select')
      },
      getSalenums (val) {
         let nums = 0; let arr = this.itemdata.classes
         if (val === 0) {
            for (let item of arr) {
               nums += parseInt(item.salenums)
            }
         } else {
            nums = arr[val - 1].salenums
         }
         return nums
      },
      getAllnums (val) {
         let nums = 0; let arr = this.itemdata.classes
         if (val === 0) {
            for (let item of arr) {
               nums += parseInt(item.nums)
            }
         } else {
            nums = arr[val - 1].nums
         }
         return nums
      }
   }
}

</script>

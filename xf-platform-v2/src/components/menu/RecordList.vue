<style>
    .record-list{ margin-top: -60px;}
    .record-list .table-opera{ display: flex; justify-content: flex-end; margin: 0 20px;}
    .record-list .table-opera>div{ display: flex; align-items: center;}
    .record-list .table-opera>div .ivu-select-selection{ border-color: #878787;}
    .record-list .table-opera>div .ivu-input{ border-color: #878787;}

    .record-list .table-list{ width: 100%; margin-bottom: 20px;}
    .record-list .table-list th{ height: 50px; font-size: 16px; color: #000000;border-top: 1px solid #dcdcdc;border-bottom: 1px solid #dcdcdc; vertical-align: middle; text-align: left; padding:0 15px;}
    .record-list .table-list td{ font-size: 14px; color: #888888;border-bottom: 1px solid #dcdcdc; padding: 15px;}
    .record-list .table-list td .sign1{ font-size: 16px; color: #000000; font-weight: bold;}
    .record-list .table-list td.check{ background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); color: #ffffff;}
    .record-list .table-list td.refund{ background-color: #e73828; color: #ffffff;}
    .record-list .table-list tbody tr:nth-child(2n+1){ background-color: #eeeef0;}
</style>

<template>
    <div class="record-list">
        <div class="table-opera">
            <div>
                <Select style="width:130px; margin-right: 20px;" v-model="selectType" placeholder="状态" @on-change="getListData">
                    <Option value="1">未可提现</Option>
                    <Option value="2">申请提现</Option>
                    <Option value="3">审核中</Option>
                    <Option value="4">已提现</Option>
                    <Option value="5">重新申请</Option>
                </Select>
                <Input v-model="keyword" placeholder="请输入活动名称" style="width: 270px; margin-right: 20px;" />
                <t-button size="min" style="width: 90px;" @dotap="getListData">查询</t-button>
            </div>
        </div>
        <div style="margin: 20px;">
            <table class="table-list">
                <thead>
                <tr>
                    <th>活动名称</th>
                    <th>活动结束时间</th>
                    <th>总销售票数(张)</th>
                    <th>票种</th>
                    <th>张数</th>
                    <th>单价(元)</th>
                    <th>总额(元)</th>
                    <th>可提金额</th>
                    <th>状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in listData" :key="index">
                    <td v-if="item.activity === ''">{{item.goods_name}}</td>
                    <td v-if="item.activity !== ''">{{item.goods_name+' | '+item.activity}}</td>
                    <td>{{item.date}}</td>
                    <td><span class="sign1">{{item.nums}}</span></td>
                    <td>
                        <span v-for="(listitem, j) in item.classes" :key="j" style="display: block;">{{listitem.select}}</span>
                    </td>
                    <td>
                        <span v-for="(listitem, j) in item.classes" :key="j" style="display: block;">{{listitem.salenums}}</span>
                    </td>
                    <td>
                        <span v-for="(listitem, j) in item.classes" :key="j" style="display: block;">{{listitem.price}}</span>
                    </td>
                    <td><span class="sign1">{{item.total}}</span></td>
                    <td><span class="sign1">{{item.cash}}</span></td>
                    <td v-if="item.status === 1">未可提现</td>
                    <td v-if="item.status === 2"><t-button size="min"  @dotap="openOut(item,site)">申请提现</t-button></td>
                    <td v-if="item.status === 3">审核中</td>
                    <td v-if="item.status === 4">已提现</td>
                    <td v-if="item.status === 5">
                        <t-button size="min" @dotap="openOut(item,site)" red>重新提现</t-button>
                        <t-ques position="left" width="290" style="margin: 10px 0 0 10px;" redbg>
                            <ul class="list1">
                                <li>{{item.errorMsg}}</li>
                            </ul>
                        </t-ques>
                    </td>
                   <td v-if="item.status === 6">未提现</td>
                </tr>
                </tbody>
            </table>
            <Page :total="allnums" @on-change="changePage" />
        </div>
        <crash-out v-if="showCrashOut" @toggle="hideOut" :data="cashobj"></crash-out>
    </div>
</template>

<script type='es6'>
import TButton from '@/components/common/TButton.vue'
import TQues from '@/components/common/TQues.vue'
import CrashOut from '@/components/menu/CrashOut.vue'
export default {
   name: 'app',
   components: { TButton, TQues, CrashOut },
   data () {
      return {
         keyword: '',
         selectType: '0',
         listData: [],
         site: 0,
         showCrashOut: false,
         cashobj: {},
         allnums: 0,
         page: 1
      }
   },
   mounted () {
      this.getListData()
   },
   methods: {
      getListData () {
         let self = this
         this.$ajax.get('/client/api/bills', {
            params: {
               keyword: this.keyword,
               cate: this.selectType,
               page: this.page
            }
         }).then(res => {
            self.listData = res.data.data
            self.site = res.data.site
            self.allnums = parseInt(res.data.nums)
         })
      },
      changePage (val) {
         this.page = val
         this.getListData()
      },
      hideOut () {
         this.showCrashOut = false
         this.getListData()
      },
      openOut (item, site) {
         this.cashobj = item
         this.cashobj.site = site
         this.showCrashOut = true
      }
   }
}

</script>

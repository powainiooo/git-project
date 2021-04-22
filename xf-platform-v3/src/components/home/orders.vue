<style scoped>
.orders .btns { margin: 20px 40px 20px 56px; }
.orders .btns button { width: 90px; }
.orders-search { width: 250px; height: 30px; border-radius: 10px; background-color: #EEEEEF; display: flex; align-items: center; }
.orders-search input { width: 160px; height: 30px; line-height: 30px; border: none; background-color: transparent; padding: 0 10px; font-size: 14px; }
.c-tables-orders th:nth-last-child(2) { text-align: center; }
.c-tables-orders th:nth-last-child(3) { text-align: center; }
.c-tables-orders td:nth-last-child(2)>div { text-align: center; padding-right: 0; margin: 0 auto; }
.c-tables-orders td:nth-last-child(3)>div { text-align: center; padding-right: 0; }

.refund-hint { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(11, 11, 13, 0.9); display: flex; align-items: center; }
.refund-hint>div { margin-left: 250px; }
.refund-hint>div h3 { color: #ffffff; margin-bottom: 20px; font-size: 18px; }
.refund-hint>div p { color: #ffffff; margin-bottom: 50px; font-size: 16px; line-height: 24px; }
.refund-hint>div button { width: 90px; margin-right: 20px; }
</style>

<template>
<div class="orders">
  <div class="between btns">
    <div>
      <Button size="small" class="mr10" @click="doExport">导出表格</Button>
      <Button size="small" class="mr10" @click="doNotify">一次性通知</Button>
      <Button size="small" @click="showRefundHint = true">退款申请</Button>
    </div>
    <div class="flex">
      <c-select class="mr10"/>
      <div class="orders-search">
        <input placeholder="输入电话、姓名、单号" v-model="keyword" />
        <Button size="small" @click="getData">查询</Button>
      </div>
    </div>
  </div>

  <div class="c-tables c-tables-orders">
    <table>
      <thead>
      <tr>
        <th v-for="(item, index) in columns"
            :key="index"
            :style="{
              width: item.width + 'px' || 'auto'
            }">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div>普通票</div></td>
        <td class="helveB"><div>2019-05-10</div></td>
        <td><div>冯</div></td>
        <td class="helveB"><div>13760418980</div></td>
        <td><div>深圳市宝安区新安六路众里创业社区309</div></td>
        <td class="helveB"><div>44030199028391029</div></td>
        <td class="helveB"><div>190510221059331637</div></td>
        <td class="helveB"><div>130</div></td>
        <td><div class="style1">1</div></td>
        <td><div class="status">未验票</div></td>
        <td><div></div></td>
      </tr>
      <tr>
        <td><div>普通票</div></td>
        <td class="helveB"><div>2019-05-10</div></td>
        <td><div>冯</div></td>
        <td class="helveB"><div>13760418980</div></td>
        <td><div>深圳市宝安区新安六路众里创业社区309</div></td>
        <td class="helveB"><div>44030199028391029</div></td>
        <td class="helveB"><div>190510221059331637</div></td>
        <td class="helveB"><div>130</div></td>
        <td><div class="style1">1</div></td>
        <td><div class="status style2">未验票</div></td>
        <td><div></div></td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="ml20 mt15">
    <Page :total="total" class-name="xf-page" />
  </div>

  <div class="refund-hint" v-if="showRefundHint">
    <div>
      <h3>是否确认申请退款？</h3>
      <p>为保障购票者的权益，小夫有票 将开启对活动方的信用记录，<br/>
        若因活动方原因导致多次活动退款，将影响到活动方的信用记录。<br/>
        请认真填写退款信息，此举措将影响到您的信用记录。</p>
      <div>
        <Button size="small" @click="gotoRefund">确认申请</Button>
        <Button type="normal" size="small" @click="showRefundHint = false">取消申请</Button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import cSelect from '../cSelect'
export default {
  name: 'app',
  components: {
    cSelect
  },
  data () {
    return {
      showRefundHint: false,
      columns: [ // 1260
        { name: '票种', width: 100 },
        { name: '下单时间', width: 130 },
        { name: '买家', width: 70 },
        { name: '电话', width: 130 },
        { name: '邮寄地址', width: 190 },
        { name: '身份证', width: 170 },
        { name: '单号', width: 170 },
        { name: '单价', width: 60 },
        { name: '票数', width: 60 },
        { name: '状态', width: 100 },
        { name: '操作', width: 80 }
      ],
      total: 0,
      keyword: ''
    }
  },
  methods: {
    getData () {},
    doExport () {},
    doNotify () {},
    gotoRefund () {
      this.showRefundHint = false
      this.$emit('toggle', 'refunds')
    }
  }
}
</script>

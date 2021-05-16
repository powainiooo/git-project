<style lang="stylus" type="text/stylus">
.orders-container
  min-height 640px; overflow hidden;
</style>

<template>
<div class="box2 orders-container">
  <div class="pr">
    <Tabs type="card" class="tee-tabs" style="margin-top: 13px;">
      <TabPane label="今日收益">
        <div class="tee-tables mt30 ml50 mr50">
          <table>
            <col v-for="(item, index) in columns"
                 :key="index"
                 :width="item.width" />
            <thead>
            <tr>
              <th v-for="(item, index) in columns"
                  :key="index">{{item.name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" :key="item.id">
              <td><div>2021/03/04<br/>13:01:12</div></td>
              <td><div>4010</div></td>
              <td><div>0016659884321</div></td>
              <td><div>柠檬茶</div></td>
              <td><div>冰、去冰、正常糖</div></td>
              <td><div>2杯</div></td>
              <td><div>20元</div></td>
              <td><div>40元</div></td>
              <td><div>自带杯子，冰块分装</div></td>
              <td><div>13729391920</div></td>
              <td><div>已下单</div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </TabPane>
      <TabPane label="今日杯数">标签二的内容</TabPane>
    </Tabs>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      columns: [ // 1260
        { name: '下单时间', width: 130 },
        { name: '取茶号', width: 70 },
        { name: '订单号', width: 124 },
        { name: '产品名称', width: 86 },
        { name: '规格', width: 128 },
        { name: '下单杯数', width: 86 },
        { name: '单价', width: 74 },
        { name: '总价', width: 60 },
        { name: '备注', width: 150 },
        { name: '联系电话', width: 110 },
        { name: '状态', width: 70 }
      ],
      list: [{}, {}, {}, {}, {}, {}]
    }
  },
  methods: {}
}
</script>

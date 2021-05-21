<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="下单日期" style="width: 130px;">
        <Option>123</Option>
      </Select>
      <Select class="c-select mr20" placeholder="状态" style="width: 130px;">
        <Option>123</Option>
      </Select>
      <div class="c-input">
        <img src="@/assets/img/search.png" class="c-input-search" width="23" />
        <input type="text" placeholder="输入搜索内容" />
      </div>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="130" />
        <col width="70" />
        <col width="125" />
        <col width="85" />
        <col width="130" />
        <col width="80" />
        <col width="80" />
        <col width="80" />
        <col width="150" />
        <col width="110" />
        <col />
        <col width="150" />
      </colgroup>
      <thead>
      <tr>
        <th>下单时间</th>
        <th>取茶号</th>
        <th>订单号</th>
        <th>产品名称</th>
        <th>规格</th>
        <th>下单杯数</th>
        <th>单价</th>
        <th>总价</th>
        <th>备注</th>
        <th>联系电话</th>
        <th>状态</th>
        <th style="text-align: center;"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div>2021/03/04<br/>13:01:12</div></td>
        <td><div>4010</div></td>
        <td>
          <div>
            0016659884321
          </div>
        </td>
        <td>
          <div>
            <p>柠檬茶</p>
            <p>柠檬茶</p>
          </div>
        </td>
        <td>
          <div>
            <p>冰、去冰、正常糖</p>
            <p>冰、去冰、正常糖</p>
          </div>
        </td>
        <td>
          <div>2杯</div>
        </td>
        <td>
          <div>20元</div>
        </td>
        <td>
          <div>40元</div>
        </td>
        <td>
          <div>自带杯子，冰块分装</div>
        </td>
        <td>
          <div>13729391920</div>
        </td>
        <td>
          <div>已下单</div>
        </td>
        <td>
          <div class="">
            <Button size="min">退款</Button>
            <Button size="min" class="bg-main ml10">开始制作</Button>
          </div>
        </td>
      </tr>
      <tr>
        <td><div>2021/03/04<br/>13:01:12</div></td>
        <td><div>4010</div></td>
        <td>
          <div>
            0016659884321
          </div>
        </td>
        <td>
          <div>
            <p>柠檬茶</p>
            <p>柠檬茶</p>
          </div>
        </td>
        <td>
          <div>
            <p>冰、去冰、正常糖</p>
            <p>冰、去冰、正常糖</p>
          </div>
        </td>
        <td>
          <div>2杯</div>
        </td>
        <td>
          <div>20元</div>
        </td>
        <td>
          <div>40元</div>
        </td>
        <td>
          <div>自带杯子，冰块分装</div>
        </td>
        <td>
          <div>13729391920</div>
        </td>
        <td>
          <div>已下单</div>
        </td>
        <td>
          <div class="">
            <Button size="min">退款</Button>
            <Button size="min" class="bg-main ml10">开始制作</Button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      list: [{}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
  }
}
</script>

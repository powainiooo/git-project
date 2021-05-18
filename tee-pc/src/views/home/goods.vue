<style lang="stylus" type="text/stylus">

</style>

<template>
<div class="pa60">
  <div class="between operates-line">
    <div class="flex">
      <Select class="c-select mr20" placeholder="产品分类" style="width: 130px;">
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
    <div class="flex">
      <Button style="width: 140px;" icon="md-add" class="mr20">添加产品分类</Button>
      <Button style="width: 140px;" icon="md-add">添加产品</Button>
    </div>
  </div>

  <div class="tee-tables mt30 ml50 mr50">
    <table>
      <colgroup>
        <col width="115" />
        <col width="95" />
        <col width="110" />
        <col width="240" />
        <col width="138" />
        <col width="70" />
        <col width="70" />
        <col width="96" />
        <col />
        <col width="180" />
      </colgroup>
      <thead>
      <tr>
        <th>产品分类</th>
        <th>产品名称</th>
        <th>产品图</th>
        <th>产品介绍</th>
        <th>售卖时间段</th>
        <th>价格</th>
        <th>库存</th>
        <th>制作时间</th>
        <th>状态</th>
        <th style="text-align: center;"><div class="pr20">操作</div></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><div>新品推荐</div></td>
        <td><div>乌龙茶</div></td>
        <td><div class="img-box"><img src="@/assets/img/img2.png" /></div></td>
        <td><div>优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇..</div></td>
        <td><div>2021/03 - 04/01</div></td>
        <td><div>20</div></td>
        <td><div>1000</div></td>
        <td><div>3分钟</div></td>
        <td><div>在售</div></td>
        <td>
          <div class="">
            <Button size="min">下架</Button>
            <Button size="min" class="ml10">编辑</Button>
            <Button size="min" class="ml10">删除</Button>
          </div>
        </td>
      </tr>
      <tr>
        <td><div>新品推荐</div></td>
        <td><div>乌龙茶</div></td>
        <td><div class="img-box"><img src="@/assets/img/img2.png" /></div></td>
        <td><div>优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇..</div></td>
        <td><div>2021/03 - 04/01</div></td>
        <td><div>20</div></td>
        <td><div>1000</div></td>
        <td><div>3分钟</div></td>
        <td><div>在售</div></td>
        <td>
          <div class=""><div class="c-tag">审核不过,重新修改后提交</div></div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <modal-form />
</div>
</template>

<script type='es6'>
import modalForm from './goods/modalForm'
export default {
  name: 'app',
  components: {
    modalForm
  },
  data () {
    return {
      list: [{}, {}, {}, {}, {}, {}]
    }
  },
  methods: {}
}
</script>

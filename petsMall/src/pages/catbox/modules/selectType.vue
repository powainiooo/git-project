<style>
.c-select-type { width: 100%; height: 80vh; overflow-y: auto; background-color: #ffffff; border-radius: 15px 15px 0 0; position: fixed; left: 0; bottom: 0; z-index: 1000; padding-bottom: 200px; box-sizing: border-box; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); }
.c-select-type-title { height: 170px; background-color: var(--mainColor); display: flex; flex-direction: column; justify-content: center; padding-left: 66px; border-radius: 15px 15px 0 0; position: relative; }
.c-select-type-title p { font-size: 36px; line-height: 50px; color: #ffffff; text-shadow: var(--textShadow); }
.c-select-type-title p.en { font-size: 40px; margin-bottom: 8px; font-family: HelveThin; }
.c-select-type-title .close { width: 55px; height: 55px; position: absolute; top: 54px; right: 66px; }
</style>

<template>
<div class="c-select-type" :style="{bottom: show ? 0 : '-100vh'}">
   <div class="c-order-type-modal-title">
      <p class="en">Selection type</p>
      <p>选择类型</p>
      <img src="/static/images/header/close.png" class="close" @click="close" />
   </div>
   <div class="goods-details">
      <div class="catalog borderB">
         <h3>· 选择种类</h3>
         <ul>
            <li
               v-for="item in catalogList"
               :key="id"
               :class="{
                     'active': catalogId === item.id
                  }"
               @click="selectCatalog(item)"
               hover-class="hscale"
               hover-stay-time="10">{{item.name}}</li>
         </ul>
         <h3>· 选择规格</h3>
         <ul>
            <li
               v-for="item in specsList"
               :key="id"
               :class="{
                     'active': specsId === item.specs_id,
                     'diabled': item.nums == 0
                  }"
               @click="selectSpec(item)"
               :hover-class="item.nums == 0 ? '' : 'hscale'"
               hover-stay-time="10">{{item.specs}}</li>
         </ul>
      </div>
      <div class="intros">
         <h3>适用对象:</h3>
         <p><text>{{detailData.apply}}</text></p>
         <h3>营养成分:</h3>
         <p><text>{{detailData.nutritional}}</text></p>
         <h3>主要成分:</h3>
         <p><text>{{detailData.mainly}}</text></p>
      </div>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {
         show: false,
         detailData: {},
         catalogId: '',
         catalogList: [],
         specsId: '',
         specsList: [],
         specsRecord: {}
      }
   },
   computed: {
      specItem () {
         return this.specsList.find(i => i.specs_id === this.specsId)
      }
   },
   methods: {
      select (record, catalogIndex, specsIndex) {
         this.detailData = record
         this.catalogList = record.attrs_list
         this.catalogId = record.attrs_list[catalogIndex].id
         this.specsList = record.attrs_list[catalogIndex].child
         this.specsId = record.attrs_list[catalogIndex].child[specsIndex].specs_id
         this.specsRecord = record.attrs_list[catalogIndex].child[specsIndex]
         this.$emit('price', this.specsRecord.price)
         this.$nextTick(() => {
            this.show = true
         })
      },
      selectCatalog (data) {
         this.catalogId = data.id
         this.specsList = data.child
         const specs = data.child[0]
         this.specsId = specs.specs_id
         this.specsRecord = specs
         this.$emit('price', this.specsRecord.price)
      },
      selectSpec (data) {
         this.specsId = data.specs_id
         this.specsRecord = data
         this.$emit('price', this.specsRecord.price)
      },
      confirm () {
         this.$emit('selected', {
            str: `${this.detailData.type_id}-${this.detailData.id}-${this.catalogId}-${this.specsRecord.specs}`,
            price: this.specsRecord.price,
            id: this.detailData.id
         })
         this.close()
      },
      close () {
         this.show = false
         this.$emit('close')
      }
   }
}
</script>

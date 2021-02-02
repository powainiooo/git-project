<style>
.c-order-type-modal { width: 100%; height: 80vh; overflow-y: auto; background-color: #ffffff; border-radius: 15px 15px 0 0; position: fixed; left: 0; bottom: 0; z-index: 1000; padding-bottom: 200px; box-sizing: border-box; }
.c-order-type-modal-title { height: 170px; background-color: var(--mainColor); display: flex; flex-direction: column; justify-content: center; padding-left: 66px; border-radius: 15px 15px 0 0; position: relative; }
.c-order-type-modal-title p { font-size: 36px; line-height: 50px; color: #ffffff; text-shadow: var(--textShadow); }
.c-order-type-modal-title p.en { font-size: 40px; margin-bottom: 8px; font-family: HelveThin; }
.c-order-type-modal-title .close { width: 55px; height: 55px; position: absolute; top: 54px; right: 66px; }

.c-order-type-modal-list { margin: 0 42px; }
.c-order-type-modal-list li { height: 185px; display: flex; justify-content: space-between; align-items: center; }
.c-order-type-modal-list li>div { width: 530px; display: flex; justify-content: space-between; align-items: center; }
.c-order-type-modal-list li>div>div { margin-left: 40px; }
.c-order-type-modal-list li>div>div p { font-size: 30px; line-height: 1; color: var(--textColor); text-shadow: var(--textShadow); }
.c-order-type-modal-list li>div>div div { font-size: 20px; color: #9C9A9B; text-shadow: var(--textShadow); font-family: HelveThin; position: relative; padding-left: 12px; }
.c-order-type-modal-list li>div>div div:after { content: ''; width: 160px; height: 1px; background-color: var(--mainColor); position: absolute; top: 50%; left: 0; }
.c-order-type-modal-list li>div>div div span { font-size: 66px;  }
.c-order-type-modal-list li>div p { font-size: 20px; color: var(--textColor); text-shadow: var(--textShadow); font-family: HelveThin; }
.c-order-type-modal-list li>div p span { font-size: 66px; }
.c-order-type-modal-list li .radio { width: 71px; height: 71px; margin-right: 28px; }
.c-order-type-modal-list li .radio-select { width: 74px; height: 71px; margin-right: 25px; }

.c-order-type-modal-recommend { padding: 45px 40px 10px 45px; background-color: #F3F2F1; }
.c-order-type-modal-recommend>h3 { color: #CBBB9B; font-size: 40px; line-height: 40px; }
.c-order-type-modal-recommend>h3.en { font-size: 34px; font-family: Helve; line-height: 40px; margin-top: 8px; margin-bottom: 20px; }
.c-order-type-modal-recommend>p { color: #9B9A9A; font-size: 30px; line-height: 45px; margin-bottom: 20px; }

.c-recommend-list>li { display: flex; height: 278px; align-items: flex-end; margin-bottom: 62px; }
.c-recommend-list li .imgs { width: 278px; height: 220px; border-radius: 28px; background-color: #ffffff; position: relative; margin-right: 32px; }
.c-recommend-list li .imgs img { width: 278px; height: 278px; position: absolute; left: 0; bottom: 0; }
.c-recommend-list li .infos h3 { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow2); }
.c-recommend-list .infos ul { display: flex; margin-bottom: 4px; }
.c-recommend-list .infos ul li { display: flex; font-size: 20px; line-height: 1; padding: 5px 8px; color: #A6A5A5; position: relative; margin-right: 8px; }
.c-recommend-list .infos ul li:after { content: ''; width: 200%; height: 200%; border: 1px solid var(--mainColor); border-radius: 4px; position: absolute; top: 0; left: 0; transform: scale(.5); transform-origin: 0 0; }
.c-recommend-list .infos div { font-size: 20px; color: var(--textColor2); text-shadow: var(--textShadow2); line-height: 1; font-family: HelveThin; }
.c-recommend-list .infos div span { font-size: 66px; }
.c-recommend-list .infos div.overline { color: #9C9A9B; position: relative; }
.c-recommend-list .infos div.overline:after { content: ''; width: 130px; height: 1px; background-color: var(--mainColor); position: absolute; top: 50%; left: 0; }
</style>

<template>
<div class="c-order-type-modal">
   <div class="c-order-type-modal-title">
      <p class="en">Selection Order type</p>
      <p>选择订购类型</p>
      <img src="/static/images/header/close.png" class="close" />
   </div>
   <ul class="c-order-type-modal-list">
      <li class="borderB">
         <div>
            <div>
               <p>订购一个月</p>
               <div><span>320</span>元</div>
            </div>
            <p><span>280</span>元</p>
         </div>
         <img src="/static/images/catbox/radio.png" class="radio" />
      </li>
   </ul>
   <div class="c-order-type-modal-recommend">
      <h3>推荐选购</h3>
      <h3 class="en">Recommend buy</h3>
      <p><text>推荐选购产品将加入每月订购猫盒中，固定\n订购量为当前选中猫盒订购月数。</text></p>

      <ul class="c-recommend-list">
         <li>
            <div class="imgs"><img src="/static/images/img3.png" /></div>
            <div class="infos">
               <h3>鸡胸肉馅饺子 + 高汤</h3>
               <ul>
                  <li>鸡肉味</li>
                  <li>鸡肉味</li>
               </ul>
               <div class="overline"><span>30</span>元 / 月</div>
               <div><span>30</span>元 / 月</div>
            </div>
         </li>
      </ul>
   </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

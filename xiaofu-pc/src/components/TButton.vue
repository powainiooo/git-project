<style>
    .n-btn{ width: 100%; height: 40px; position: relative; box-shadow: 0 2px 3px rgba(0,0,0,0.2);border-radius: 20px;}
    .n-btn-min{ height: 34px;}
    .n-btn:before{ content: ''; width: 100%; height: 100%; background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); position: absolute; top: 0; left: 0;border-radius: 20px; transform: scale(0.94); }
    .n-btn.white:before{ background: #ffffff;}
    .n-btn.n-btn-red:before{ background: linear-gradient(244deg,rgb(227,0,127),rgb(229,0,18));}
    .n-btn-touch:before{transition: all 0.3s cubic-bezier(.2,.75,.28,.95); transform: scale(1.1); opacity: 0;}
    .n-btn a{ box-sizing: border-box; height: 100%; font-size: 16px; background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); color: #ffffff; border-radius: 20px; position: relative; z-index: 10; display: flex; justify-content: center; align-items: center;}
    .n-btn a:hover { color: #ffffff;}
    .n-btn-min a{ font-size: 12px;}
    .n-btn.white a{ background: #ffffff; color: #000000; }
    .n-btn a[disabled],.n-btn.gray a{ background: #dcdcdc; color: #ffffff;}
    .n-btn.n-btn-red a{ background: linear-gradient(244deg,rgb(227,0,127),rgb(229,0,18));}
</style>
<template>
    <div class="n-btn"
         :class="[!isDisabled && isTouch ? 'n-btn-touch' : '',extraClass,size == 'min' ? 'n-btn-min' : '',red ? 'n-btn-red' : '']"
         @click="doclick"
         @mousedown="doTouch">
        <a href="javascript:;"
           :disabled="isDisabled">
            <slot></slot>
        </a>
    </div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      isDisabled: {
         type: Boolean,
         default: false
      },
      extraClass: {
         type: String,
         default: ''
      },
      size: {
         type: String,
         default: 'normal'
      },
      red: {
         type: Boolean,
         default: false
      }
   },
   data () {
      return {
         isTouch: false
      }
   },
   methods: {
      doTouch () {
         this.isTouch = true
         setTimeout(() => {
            this.isTouch = false
         }, 350)
      },
      doclick () {
         if (this.isDisabled) return
         setTimeout(() => {
            this.$emit('dotap')
         }, 300)
      }
   }
}

</script>

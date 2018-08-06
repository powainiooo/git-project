<template>
    <div class="n-btn"
         :class="!isDisabled && isTouch ? 'n-btn-touch' : ''"
         @mousedown="doTouch">
        <a href="javascript:;"
           :disabled="isDisabled"
           :class="extraClass">
            <slot></slot>
        </a>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        props:{
            isDisabled:{
                type:Boolean,
                default:false
            },
            extraClass:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                isTouch:false
            }
        },
        methods:{
            doTouch(){
                this.isTouch = true;
                setTimeout(()=>{
                    this.isTouch = false;
                },350)
            }
        }
    }

</script>


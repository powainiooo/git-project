<style>
    .n-ques{ width: 20px; height: 20px; display: inline-block;}
    .n-ques .icon{ width: 20px; height: 20px;  background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); display: flex; justify-content: center; align-items: center; border-radius: 50%; overflow: hidden; font-size: 16px; color: #ffffff;}
    .n-ques .hint-frame{ width: 450px; box-sizing: border-box; padding: 40px 30px; background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9); border-radius: 10px; box-shadow: 0 2px 3px rgba(0,0,0,0.2); position: relative; left: -10px; margin-top: -3px;}
    .n-ques .hint-frame-left{ left: auto; right: 15px;}
    .n-ques:hover .hint-frame{ display: block;}
    /*.n-ques .hint-frame:before{ content: ''; width: 0; height: 0; border: 6px solid rgba(0,0,0,0); border-right-color: #1a41c0; position: absolute; top: 50%; left: -12px; margin-top: -3px;}*/
    .n-ques .hint-frame-left:before{ left: auto; right: -12px; border-right-color: rgba(0,0,0,0); border-left-color: #1a41c0;}
    .n-ques .hint-frame .list1 li{ font-size: 14px; color: #ffffff; margin-bottom: 10px;}
    .n-ques .hint-frame .list1 li:last-child{ margin-bottom: 0;}
    .n-ques .hint-frame .list1 li span{ font-size: 16px; font-weight: bold; margin-right: 6px; font-family: 'Helve';}
    .n-ques .hint-frame .list2 li{ font-size: 14px; color: #ffffff; margin-bottom: 10px;}
    .n-ques .hint-frame .list2 li:last-child{ margin-bottom: 0;}
    .n-ques .hint-frame .list2 li span{ font-size: 50px; font-weight: bold; margin-right: 6px; font-family: 'Helve';}
    .n-ques .ivu-tooltip-inner{ background-color: rgba(70,76,91,0); box-shadow: none;}
    .n-ques .ivu-tooltip-popper[x-placement^=left] .ivu-tooltip-arrow{ right: 0px; border-width: 6px 0 6px 6px; border-left-color: #1a41c0;}
    .n-ques .ivu-tooltip-popper[x-placement^=right] .ivu-tooltip-arrow{ left: 4px; border-width: 6px 6px 6px 0; border-right-color: #1a41c0;}
</style>

<template>
    <div class="n-ques">
        <!--<a href="javascript:;" class="icon"><Icon type="md-help" /></a>-->
        <!--<div class="hint-frame"-->
             <!--:class="position == 'left' ? 'hint-frame-left' : ''"-->
             <!--:style="{width:width+'px',top:top+'px'}">-->
            <!--<slot></slot>-->
        <!--</div>-->
        <Tooltip placement="right" :max-width="width">
            <a href="javascript:;" class="icon"><Icon type="md-help" /></a>
            <div slot="content">
                <div class="hint-frame"
                     :class="position == 'left' ? 'hint-frame-left' : ''"
                     :style="{width:width+'px',top:top+'px'}">
                    <slot></slot>
                </div>
            </div>
        </Tooltip>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        props:{
            width:{
                type:String,
                default: '450'
            },
            top:{
                type:String,
                default: '0'
            },
            position:{
                type:String,
                default: 'right'
            }
        },
        data(){
            return{

            }
        },
        methods:{

        }
    }

</script>


<style>
    .n-switch{ width: 90px; height: 34px; border-radius: 20px;background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); position: relative; box-sizing: border-box; padding: 0 15px; display: flex; align-items: center;}
    .n-switch:after{ content: ''; width: 26px; height: 26px; border-radius: 50%; background-color: #ffffff; position: absolute; top: 4px; left: 60px; transition: left 0.2s ease-in-out;}
    .n-switch-checked{ background: #e73828; justify-content: flex-end;}
    .n-switch-checked:after{ left: 4px;}
    .n-switch-disabled{ background: #a0a0a0; justify-content: flex-end;}
    .n-switch .n-switch-text{ font-size: 12px; color: #ffffff;}
</style>

<template>
    <div :class="wrapClasses" @click="toggle">
        <span class="n-switch-text">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </div>
</template>

<script type='es6'>
    const prefixCls = 'n-switch';
    export default {
        name: 'app',
        props:{
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                currentValue: this.value
            }
        },
        computed:{
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ];
            }
        },
        methods:{
            toggle (event) {
                event.preventDefault();
                if (this.disabled) return false;

                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('on-change', checked);
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.';
                }
                this.currentValue = val;
            }
        }
    }

</script>


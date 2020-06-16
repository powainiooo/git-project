<template>
    <div class="s-cont">
        <!-- <p>
      <span class="tip">香港總部：</span>
      <span>地址: 香港上環永樂街5號永安祥大廈6樓</span>
      <span>電話: (+852)3618 8460</span>
      <span>電郵: info@intelligentjoy.com</span>
    </p> -->
        <p>
            <span class="tip">深圳辦公室：</span>
            <span>地址: 深圳市南山區高新南七道國信投資大廈2樓210室</span>
            <span>電話: (+86)0755 26718880</span>
            <span>電郵: it@intelligentjoy.com</span>
        </p>
        <p>
            <span class="tip">联系客服：</span>
            <span>whatsapp： (+852) 9409 0782</span>
            <span>香港电话： (+852) 9409 0782 / (+852) 3618 8460</span>
            <span>内地电话： (+86) 0755 26718880</span>
            <span>電郵: it@intelligentjoy.com</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style lang="less" scoped>
.s-right .s-cont {
    padding: 19px 46px 20px 39px;
    p {
        margin-bottom: 20px;
        line-height: 23px;
        color: #333;
        span {
            display: block;
            padding: 3px 0;
            &.tip {
                font-weight: bold;
            }
        }
    }
}
</style>

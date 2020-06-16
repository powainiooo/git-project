<template>
    <div id="app">
        <!-- 头部 -->
        <myHeader v-show="headerCtr"></myHeader>
        <!-- 路由 -->
        <router-view class="m-cont" style="min-height: calc(100vh - 250px);"></router-view>
        <!-- 底部 -->
        <myFooter v-show="footerCtr"></myFooter>
        <!-- 登录 -->
        <login @watchPageCtr="loginDataChange"></login>
        <download-app></download-app>
    </div>
</template>

<script>
import myHeader from "./components/header/header.vue";
import myFooter from "./components/footer/footer.vue";
import login from "./components/login/login.vue";
import downloadApp from "./components/downloadApp/downloadApp.vue";
import { mapState } from "vuex";
import store from "./store/index";

export default {
    name: "App",
    data() {
        return {
            headerCtr: false,
            footerCtr: false
        };
    },
    created() {
        // console.log(this.$route)
    },
    computed: {
        ...mapState(["alertError"])
    },
    mounted() {
        this.$root.$emit("updateTx", localStorage["userface"]);
    },
    components: {
        myHeader,
        myFooter,
        login,
        downloadApp
    },
    methods: {
        loginDataChange(data) {
            this.headerCtr = data.headerCtr;
            this.footerCtr = data.footerCtr;
        }
    },
    watch: {
        alertError: function(val) {
            //接口错误信息展示
            if (val != "") {
                if (val == "认证失败！") {
                    this.$message.error(
                        "你的账号在其他装置进行登录，如不是本人操作，请重新登录后尽快修改密码，确保账号安全。"
                    );
                } else {
                    this.$message.error(val);
                }

                store.commit("errorCtr", "");
            }
        }
    }
};
</script>

<style lang="less">
#app {
    background-color: #f2f2f2;
    min-width: 1200px;
    .overDot {
        //一行超出用省略号代替
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .el-pagination {
        display: flex;
        justify-content: center;
        margin: 95px 0 105px 0;
        .number {
            height: 36px;
            width: 36px;
            text-align: center;
            line-height: 36px;
            border-radius: 4px;
            border: 1px solid #ccc;
            margin: 0 10px;
        }
        .active {
            border: none;
            background-color: #63acff;
        }
    }
}
</style>

<template>
<div id="app-cont">
  <el-dialog
  :title="showQr.title"
  :visible="showQr.show"
  @close="hideQr"
  width="600px">
  <div class="myRate">
    <span>抱歉！目前{{showQr.title}}{{ $t("popTitle.5") }}</span>
    <div class="qrcode-cont">
      <div class="">
        <div class="">
          <img src="../header/images/qrcode.png" />
        </div>
        <span>{{ $t("popTitle.7") }}</span>
      </div>
      <!-- <div class="">
        <div class="">

        </div>
        <span>Android</span>
      </div> -->
    </div>
  <button type="button" name="button" @click="hideQr">{{ $t("popTitle.4") }}</button>
  </div>
  </el-dialog>
</div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/index";
export default {
  data() {
    return {

    }
  },
  computed: {
      ...mapState([
          'showQr'
      ])
  },
  methods: {
    hideQr() {
      store.commit("qrCtr", false);
    }
  }
}
</script>

<style lang="less"  >
#app-cont{
  .el-dialog {
    .el-dialog__header {
      padding: 0;
      height: 60px;
      padding-left: 20px;
      font-size: 20px;
      line-height: 60px;
      color: #666;
      border-bottom: 1px solid #F2F2F2;
      .el-dialog__headerbtn {
        top: 15px;
        right: 20px;
      }
    }
    .el-dialog__body {
      padding: 5px 20px!important;
      .myRate {
        display: flex;
        flex-direction: column;
        padding: 18px 20px 43px 28px;
        .el-rate {
          height: 28px;
          .el-rate__item {
            .el-rate__icon {
              margin-right: 20px;
              &::before {
                font-size: 28px;
              }
            }
            .el-icon-star-on {
              color: #ee8e4f!important;
            }
            .el-icon-star-off {
              color: 909499!important;
            }
          }
          .el-rate__text {
            margin-left: 67px;
            font-size: 18px;
            color: #666!important;
          }
        }
        >textarea {
          height: 184px;
          border-radius: 2px;
          background-color: RGBA(99, 172, 255, .1);
          margin-top: 26px;
          padding: 30px 15px;
          font-size: 14px;
          border: none;
          outline: none;
          resize: none;
        }
        >button {
          height: 40px;
          width: 240px;
          background-color: #63ACFF;
          border: none;
          color: #fff;
          font-size: 14px;
          margin: 20px auto 0;
          outline: none;
          border-radius: 2px;
        }
        .qrcode-cont{
          display: flex;
          justify-content: space-between;
          &>div{
            flex: 1;
            text-align: center;
            &>div{
              width: 150px;
              height: 150px;
              margin: 20px auto 10px;
              padding: 3px;
              border: 1px dashed #ececec;
              img{
                width: 100%;
              }
            }
          }
        }
      }
    }

  }
}
</style>

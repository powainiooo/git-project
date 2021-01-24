<template>
  <div class="wrapper">
    <div class="box">
      <img :src="wheelImg" width="100%" />
      <LuckyWheel class="luck-draw" ref="LuckyWheel" :prizes="prizes" :default-style="defaultStyle"
        :default-config="defaultConfig" :buttons="buttons" @start="startCallBack" @end="endCallBack" />
    </div>

    <div class="tips-wrapper">
      <p class="tips-text">{{ yourResult }}</p>
    </div>

    <img class="pointer" src="./assets/img/pointer.png" />

    <div class="user-wrapper" v-show="isShowUser">
      <img class="user-avatar" :src="userInfo.avatar" />
      <span class="user-text user-name">{{ userInfo.nick_name }}</span>
      <span class="user-text">转动了转盘</span>
    </div>

    <!-- <div class="right-wrapper">
      <img @click="testAnimation" class="title-img" :src="require('./assets/img/title.png')" />
      <p class="rule-title">规则说明</p>
      <div class="rule-content">
        <p>1.指定一个人接受本次转盘的惩罚；</p>
        <p>2.使用手机摇一摇，可以转动大转盘;</p>
        <p>3.当转盘停止转动后，指定的人接受对应惩罚；</p>
        <p>4.再次摇一摇手机，可以再次转动转盘。</p>
      </div>
    </div> -->

    <div class="right-wrapper">
      <img @click="testAnimation" :src="require('./assets/img/tips.png')" width="100%" />
      <div class="qr-part">
        <p class="qr-title">扫码加入游戏</p>
        <div class="qr-qrcode" ref="qrCodeUrl"></div>
        <p class="qr-num">{{linkCode}}</p>
      </div>
    </div>



    <audio :src="audioUrl1" ref="startAudio"></audio>
    <audio :src="audioUrl2" ref="runAudio"></audio>
    <audio :src="audioUrl3" ref="endAudio"></audio>

    <div class="text-test">{{ textcontent }}</div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import ccApp from "@swaiot/jssdk";
  const channel = ccApp.requireModule("channel");
  const device = ccApp.requireModule("device");

  export default {
    name: "App",
    // components: {
    //   HelloWorld,
    // },
    data() {
      return {
        linkCode: '',
        nameData: [{
            name: "喝半杯"
          },
          {
            name: "真心话"
          },
          {
            name: "上家喝光"
          },
          {
            name: "下家喝光"
          },
          {
            name: "大家干杯"
          },
          {
            name: "男士喝光"
          },
          {
            name: "PASS"
          },
          {
            name: "女士干杯"
          },
          {
            name: "跟异性交杯"
          },
          {
            name: "找人干杯"
          },
          {
            name: "自己唱首歌"
          },
          {
            name: "干一杯"
          },
        ],
        userInfo: {},
        wheelImg: require("./assets/img/wheel.png"),
        audioUrl1: require("./assets/media/start.ogg"),
        audioUrl2: require("./assets/media/run.ogg"),
        audioUrl3: require("./assets/media/result.ogg"),
        prizes: [],
        defaultStyle: {
          fontColor: "#ffffff",
          fontSize: "24px",
          fontWeight: "600",
          lengthLimit: "24px",
        },
        defaultConfig: {
          // offsetDegree: 15,
          speed: 10,
          decelerationTime: 4000,
        },
        buttons: [{
          radius: "35px",
          background: "#60279E",
          // imgs: [
          //   {
          //     src: require("./assets/img/button.png"),
          //     width: "130%",
          //     top: "-270%",
          //   },
          // ],
        }, ],
        textcontent: "",
        yourResult: "请开始",
        isShowUser: false,
      };
    },
    mounted() {
      this.getMsg();
      this.getPrizesList();
      this.creatQrCode();
      this.sendState();
      this.sendMsg(); // 告诉智屏dongle页面已经加载完毕，可以摇一摇了
    },
    methods: {
      creatQrCode() {
        device.enableDeviceQrcode({
          success(res) {
            console.log('设置成功')
          },
          enable: "false"
        })
        device.getDeviceQrcodeString({
          url: 'https://beta-webapp.skysrt.com/dongleapi/webtest/index.html', // 移动端测试地址
          success: (res) => {
            console.log('获取绑定二维码信息');
            // res.data可能需要JSON.parse
            this.linkCode = res.data.bindCode;
            let qrcode = new QRCode(this.$refs.qrCodeUrl, {
              // text: 'https://www.baidu.com/',
              text: res.data.qrCode,
              width: 160,
              height: 160,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.H
            })
          }
        })

      },
      getPrizesList() {
        this.prizes = [];
        let data = this.nameData;
        data.forEach((item, index) => {
          this.prizes.push({
            index,
            name: item.name,
            background: index % 2 ? "#520164" : "#410053",
            fonts: [{
              text: item.name,
              top: "10%",
              fontColor: index % 2 ? "#93ffff" : "#fffebc",
            }, ],
            // imgs:[{ src: require(`./img/${index}.png`), width: '30%', top: '35%' }],
          });
        });
      },
      startCallBack() {
        this.yourResult = "转动中…";
        this.getPrizesList(); // 需要清除中间的背景颜色
        this.$refs.LuckyWheel.play();
        console.log(this.$refs.LuckyWheel);
        setTimeout(() => {
          this.$refs.LuckyWheel.stop((Math.random() * 12) >> 0);
        }, 3000);
      },
      endCallBack(prize) {
        // alert(`恭喜你获得${prize.name}`);
        this.yourResult = prize.name;
        console.log(prize);
        this.endAnimation();
        this.lightPrizeArea(prize.index);

      },
      lightPrizeArea(index) {
        this.prizes[index].background = "#d13bdc";
      },
      sendMsg() {
        console.log("start send msg to phone");
        let paramObj = {
          name: "dongle发送信息",
          state: "转动完成",
          flag: true
        };
        let paramStr = JSON.stringify(paramObj);
        console.log("发送参数", paramStr);
        channel.sendBroadcast({
          target: "ss-clientID-runtime-h5-channel",
          content: paramStr,
          success(res) {
            // 消息发送成功
            console.log("send msg to phone success");
          },
        });
      },
      getMsg() {
        channel.addMsgReceiveListener({
          onReceive: (res) => {
            // dongle收到启动web页面也算收到消息，即后加入游戏者点开始游戏转盘也会转动，需要区别这两个消息
            console.log("receive the messege === " + JSON.stringify(res));

            // 处理接收的信息
            // let result = JSON.parse(res);  // res不是string json,但是里面的content是
            let receiveMsg = JSON.parse(res.content);
            if (receiveMsg.isShakeMsg && !this.isShowUser) {
              this.userInfo = receiveMsg
              this.startWheel()
              return
            }
            if (receiveMsg.nameData && receiveMsg.nameData.length > 0) {
              // 接收修改的惩罚信息
              this.nameData = receiveMsg.nameData
              if (!this.isShowUser) {
                // 处于静止状态
                // this.textcontent = '收到了列表消息'
                this.getPrizesList();
              }
            }
          },
        });
      },
      startWheel() {
        this.isShowUser = true;
        // 开始转动转盘
        this.startAnimation();
        // 开始转动
        setTimeout(() => {
          this.startCallBack();
          this.runAnimation();
        }, 1500);
      },
      sendState() {
        console.log("sendState()");

        let action = {
          success: function (res) {
            console.log('sendRandomMsg success', res);
          },
          fail: function (res) {
            console.log('sendRandomMsg fail', res);
          },
          complete: function () {
            console.log('finish');
          },
          title: '大转盘摇一摇游戏',
          type: 'wheel'
        }
        channel.updateStatus(action);
      },
      startAnimation() {
        this.$refs.endAudio.pause();
        this.$refs.startAudio.play();

        let flag = true;
        let img1 = require("./assets/img/wheel_dark.png");
        let img2 = require("./assets/img/wheel.png");
        let timer1 = setInterval(() => {
          if (flag === true) {
            flag = false;
            this.wheelImg = img1;
          } else {
            flag = true;
            this.wheelImg = img2;
          }
        }, 300);
        setTimeout(() => {
          clearInterval(timer1);
        }, 1500);
      },
      runAnimation() {
        this.$refs.runAudio.play();

        let flag = true;
        let img1 = require("./assets/img/wheel1.png");
        let img2 = require("./assets/img/wheel2.png");
        let timer2 = setInterval(() => {
          if (flag === true) {
            flag = false;
            this.wheelImg = img1;
          } else {
            flag = true;
            this.wheelImg = img2;
          }
        }, 500);
        setTimeout(() => {
          clearInterval(timer2);
        }, 6000);
      },
      endAnimation() {
        this.$refs.endAudio.play();

        let flag = true;
        let img1 = require("./assets/img/wheel_dark.png");
        let img2 = require("./assets/img/wheel.png");
        let timer3 = setInterval(() => {
          if (flag === true) {
            flag = false;
            this.wheelImg = img1;
          } else {
            flag = true;
            this.wheelImg = img2;
          }
        }, 150);
        setTimeout(() => {
          clearInterval(timer3);
          this.isShowUser = false;
          this.sendMsg();
        }, 1500);
      },

      testAnimation() {
        this.isShowUser = true;
        this.startAnimation();
        // 开始转动
        setTimeout(() => {
          this.startCallBack();
          this.runAnimation();
        }, 1500);
      },
    },
  };
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 1280px;
    height: 720px;
    background: #000000;
    background-image: url("./assets/img/bg.png");
    background-size: 100% 100%;
  }

  .box {
    position: relative;
    width: 637.48px;
    height: 637.48px;
    left: 237px;
    top: 88.33px;
    z-index: 1;
  }

  .luck-draw {
    width: 450px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .tips-wrapper {
    position: absolute;
    width: 348px;
    height: 157px;
    top: 32px;
    left: 381.33px;
    background-image: url("./assets/img/show.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tips-text {
    padding-top: 10px;
    text-align: center;
    font-size: 43px;
    font-family: NotoSansHans-Medium, NotoSansHans;
    font-weight: 500;
    color: #ffffff;
    line-height: 64px;
  }

  .pointer {
    position: absolute;
    width: 67px;
    height: 67px;
    top: 141px;
    left: 523px;
    z-index: 2;
  }

  .user-wrapper {
    position: absolute;
    /* width: 245px; */
    padding-right: 20px;
    height: 43px;
    top: 53px;
    left: 40px;
    border-radius: 25px;
    background: #6a145c;
  }

  .user-avatar {
    width: 43px;
    height: 43px;
    border-radius: 50%;
  }

  .user-text {
    /* line-height: 43px; */
    color: #ffffff;
    font-size: 22px;
    vertical-align: middle;
    margin-left: 10px;
  }

  .user-name {
    display: inline-block;
    color: #fdf407;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .right-wrapper {
    position: absolute;
    width: 234px;
    height: 720px;
    top: 0;
    right: 0;
    background-image: url("./assets/img/slide.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .qr-part {
    position: absolute;
    width: 180px;
    height: 236px;
    bottom: 27px;
    right: 17px;
    background: #FFFFFF;
    border-radius: 11px;
  }

  .qr-title {
    margin-top: 6px;
    margin-bottom: 6px;
    font-family: NotoSansHans-Medium, NotoSansHans;
    font-size: 21px;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
    text-align: center;
  }

  .qr-qrcode {
    padding-left: 10px;
  }

  .qr-num {
    /* margin-top: 6px; */
    text-align: center;
    font-size: 21px;
    font-family: NotoSansHans-Medium, NotoSansHans;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
    letter-spacing: 7px;
  }

  .title-img {
    position: absolute;
    top: 33px;
    left: 44px;
    width: 158px;
    height: 55.76px;
  }

  .rule-title {
    position: absolute;
    top: 113px;
    left: 44px;
    font-size: 16px;
    font-family: NotoSansHans-Regular, NotoSansHans;
    font-weight: 400;
    color: #fdf407;
    line-height: 24px;
  }

  .rule-content {
    width: 158px;
    position: absolute;
    top: 140px;
    left: 44px;
    font-size: 15px;
    font-family: NotoSansHans-Regular, NotoSansHans;
    font-weight: 400;
    color: #ffffff;
    line-height: 17px;
  }

  .rule-content p {
    margin-top: 6px;
  }

  .text-test {
    text-align: left;
    font-size: 18px;
    color: #ffffff;
  }
</style>

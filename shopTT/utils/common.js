export default {
    toastTF (message, state, tiem = 2000) {
        tt.showToast({
            title: message,
            image: state ? '../../static/img/public/true.png' : '../../static/img/public/networkError.png',
            duration: tiem
        })
    },
    getUserInfo (isId) {
        let storage = tt.getStorageSync('personageToken')
        if (storage) {
            return isId ? storage.info.id : storage.info
        } else
            return isId ? 0 : {}
    },
    showToast(message){
      tt.showToast({
        title: message,
        icon: 'none'
      })
    },

    /**
     * 格式化时间
     */
    // getFormat(msec){
    //     let ss = parseInt(msec / 1000);
    //     let ms = parseInt(msec % 1000);
    //     let mm = 0;
    //     let hh = 0;
    //     if (ss > 60) {
    //         mm = parseInt(ss / 60);
    //         ss = parseInt(ss % 60);
    //         if (mm > 60) {
    //             hh = parseInt(mm / 60);
    //             mm = parseInt(mm % 60);
    //         }
    //     }
    //     ss = ss > 9 ? ss : `0${ss}`;
    //     mm = mm > 9 ? mm : `0${mm}`;
    //     hh = hh > 9 ? hh : `0${hh}`;
    //     return { ms, ss, mm, hh };
    // },
    getFormat: function (leftTime) {
        var leftSecond = parseInt(leftTime);
        var Day = Math.floor(leftSecond / (60 * 60 * 24)); //天数
        var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600); //小时
        var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60); //分钟
        var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60); //秒数
        if (Hour >= 0 && Minute >= 0 && Second >= 0) {
          // console.log(Hour, Minute, Second)
          var dd = Day < 10 ? '0' + Day : Day
          var hh = Hour < 10 ? '0' + Hour : Hour
          var mm = Minute < 10 ? '0' + Minute : Minute
          var ss = Second < 10 ? '0' + Second : Second
          return {
            dd,
            ss,
            mm,
            hh
          };
          // that.setData({
          //   h: Hour < 10 ? '0' + Hour : Hour,
          //   m: Minute < 10 ? '0' + Minute : Minute,
          //   s: Second < 10 ? '0' + Second : Second,
          // })
        }
      },
      // 年月日
      timestampToTime: function (timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = this.change(date.getDate()) + ' ';
        var h = this.change(date.getHours()) + ':';
        var m = this.change(date.getMinutes()) + ':';
        var s = this.change(date.getSeconds());
        // return Y + M + D + h + m + s;
        return Y + M + D
      },
      change: function(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      },
}

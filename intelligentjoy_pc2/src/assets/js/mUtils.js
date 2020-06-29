import Cookie from 'js-cookie'

//截取字符串
export const cutStr = (str, len) => {
    if (str.length * 2 <= len) {
        return str;
    }
    let strlen = 0;
    let s = "";
    for (let i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;
};

//获取cookie
export const getCookie = cname => {
    // let name = cname + "=";
    // let ca = document.cookie.split(";");
    // for (let i = 0; i < ca.length; i++) {
    //     let c = ca[i].trim();
    //     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    // }
    // return "";
    return Cookie.get(cname)
};

//设置cookie
export const setCookie = (cname, content, exdays) => {
    // let d = new Date();
    // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    // let expires = "expires=" + d.toUTCString();
    // document.cookie =
    //     cname +
    //     "=" +
    //     encodeURI(content) +
    //     ";" +
    //     expires +
    //     ";domain=.intelligentjoy.com;path=/";
    Cookie.set(cname, content)
};

//清除所有cookie
export const delAllCookie = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--; ) {
            // document.cookie =
            //     keys[i] +
            //     "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.intelligentjoy.com;path=/";
            document.cookie=keys[i]+"=; expire="+new Date().toGMTString()+"; path=/";
        }
    }
};

export const timeStringStyle = time => {
    time = parseInt(time);

    time = time > 1e12 ? time : time * 1000;
    // console.log(time.length);
    // console.log(time);

    time = new Date(time);
    let timeNow = new Date();
    let day = time.getDate();
    let distance = parseInt((timeNow - time) / 1000);

    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() - AddDayCount); //获取AddDayCount天后的日期
        return dd.getDate();
    }

    function getYearWeek(a, b, c) {
        //date1是当前日期
        //date2是当年第一天
        //d是当前日期是今年第多少天
        //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
        var date1 = new Date(a, parseInt(b) - 1, c),
            date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
    }

    function numberToTwo(num) {
        let str = num < 10 ? "0" : "";
        return str + num;
    }
    if (distance < 60) {
        return "刚刚";
    } else if (distance < 60 * 30) {
        return parseInt(distance / 60) + "分鐘前";
    } else if (distance < 24 * 60 * 60 && GetDateStr(0) - day == 0) {
        return (
            "今天  " +
            numberToTwo(time.getHours()) +
            ":" +
            numberToTwo(time.getMinutes())
        );
    } else if (distance < 48 * 60 * 60 && GetDateStr(1) - day == 0) {
        return (
            "昨天  " +
            numberToTwo(time.getHours()) +
            ":" +
            numberToTwo(time.getMinutes())
        );
    } else if (distance < 72 * 60 * 60 && GetDateStr(2) - day == 0) {
        return (
            "前天  " +
            numberToTwo(time.getHours()) +
            ":" +
            numberToTwo(time.getMinutes())
        );
    } else if (
        time.getFullYear() == timeNow.getFullYear() &&
        getYearWeek(time.getFullYear(), time.getMonth() + 1, time.getDate()) ==
            getYearWeek(
                timeNow.getFullYear(),
                timeNow.getMonth() + 1,
                timeNow.getDate()
            )
    ) {
        return (
            "星期" +
            "日一二三四五六".charAt(time.getDay()) +
            "   " +
            numberToTwo(time.getHours()) +
            ":" +
            numberToTwo(time.getMinutes())
        );
    } else if (time.getFullYear() == timeNow.getFullYear()) {
        return time.getMonth() + 1 + "-" + time.getDate();
    } else {
        return (
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1) +
            "-" +
            time.getDate()
        );
    }
};

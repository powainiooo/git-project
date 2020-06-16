export const showTime = (time) => {
  let date = new Date( time*1000 ),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hh = date.getHours(),
    mm = date.getMinutes();
		month = (month < 10) ? "0" + month : month;
		hh = (hh < 10) ? "0" + hh : hh;
		mm = (mm < 10) ? "0" + mm : mm;

    return year + "-" + month + "-" + day + " "+ hh + ":" + mm;
}

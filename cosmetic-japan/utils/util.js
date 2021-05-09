const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 2018.08.29
const fTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return year + '.' + month + '.' + day;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getParams = str => {
	const list = str.split('&')
	const obj = {}
	for (let i of list) {
		const q = i.split('=')
		obj[q[0]] = q[1]
	}
	return obj
}

module.exports = {
  formatTime: formatTime,
  fTime: fTime,
	getParams
}

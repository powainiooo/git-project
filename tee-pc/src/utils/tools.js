export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    const str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function getParams () {
  const search = window.location.search
  if (search !== '') {
    const str = search.replace('?', '')
    const arr = str.split('&')
    const obj = {}
    for (const i of arr) {
      const p = i.split('=')
      obj[p[0]] = p[1]
    }
    return obj
  }
  return {}
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

import colorList from './color.js'

export function _isType (t) {
  return Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
}

export function _saveLocalStorage (key, value) {
  if (_isType(value) === 'string') {
    localStorage.setItem(key, value)
  } else {
    let Info = JSON.stringify(value)
    localStorage.setItem(key, Info)
  }
}

export function _getLocalStorage (item) {
  return localStorage.getItem(item)
}

export function _clearStorage () {
  localStorage.clear()
}

export function _getCookie (cName) {
  let cStart, cEnd
  if (document.cookie.length > 0) {
    cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return document.cookie.slice(cStart, cEnd)
    }
  }
  return ''
}

export function _keyMirror (obj) {
  if (obj instanceof Object) {
    var _obj = Object.assign({}, obj)
    var _keyArray = Object.keys(obj)
    _keyArray.forEach((key) => {
      _obj[key] = key
      return true
    })
    return _obj
  }
}

export function _isArrayFn (value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

export function _pagination (pageNo, pageSize, array) {
  let offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}
// 获取颜色，可以传颜色序号，也可传具体颜色名字
export function getColor (value) {
  const color = colorList.find(item => item.number === value || item.text === value)
  if (color) {
    return color.value
  }
  return '#FFFFFF'
}

export function deepClone (obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}
export function getLevel (id) {
  const action = new Map([
    [1, '学院'],
    [2, '学生工作处'],
    [3, '系']
  ])
  return action.get(id)
}
// 不同触发对应时间
export function getTimeScope (id) {
  const action = new Map([
    [0, '无期限'],
    [1, '6个月'],
    [2, '8个月'],
    [3, '10个月'],
    [4, '12个月'],
    [5, '永久'],
    [6, '0个月']
  ])
  return action.get(id)
}
// 中文正则
export function mustBeChinese (str) {
  return /[\u4e00-\u9fa5]/.test(str)
}
// 获取当前时间的前后多少天时间
export function getDate (type, number) {
  var nowdate = new Date()
  let y = ''
  let m = ''
  let d = ''
  let retrundate = ''
  switch (type) {
    case 'day': // 取number天前、后的时间
      nowdate.setTime(nowdate.getTime() + 24 * 3600 * 1000 * number)
      y = nowdate.getFullYear()
      m = nowdate.getMonth() + 1
      d = nowdate.getDate()
      retrundate = y + '/' + m + '/' + d
      break
    case 'week': // 取number周前、后的时间
      var weekdate = new Date(nowdate + 7 * 24 * 3600 * 1000 * number)
      y = weekdate.getFullYear()
      m = weekdate.getMonth() + 1
      d = weekdate.getDate()
      retrundate = y + '/' + m + '/' + d
      break
    case 'month': // 取number月前、后的时间
      nowdate.setMonth(nowdate.getMonth() + number)
      y = nowdate.getFullYear()
      m = nowdate.getMonth() + 1
      d = nowdate.getDate()
      retrundate = y + '/' + m + '/' + d
      break
    case 'year': // 取number年前、后的时间
      nowdate.setFullYear(nowdate.getFullYear() + number)
      y = nowdate.getFullYear()
      m = nowdate.getMonth() + 1
      d = nowdate.getDate()
      retrundate = y + '/' + m + '/' + d
      break
    default:
      // 取当前时间
      y = nowdate.getFullYear()
      m = nowdate.getMonth() + 1
      d = nowdate.getDate()
      retrundate = y + '/' + m + '/' + d
  }
  return retrundate
}

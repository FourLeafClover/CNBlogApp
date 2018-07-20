export function getItem (key) {
  var data = window.localStorage.getItem(key)
  if (data) {
    var dataObj = JSON.parse(data)
    if (dataObj.type === 'string') {
      return dataObj.data
    } else if (dataObj.type === 'number') {
      return Number(dataObj.data)
    } else if (dataObj.type === 'object') {
      return JSON.parse(dataObj.data)
    } else {
      return null
    }
  } else {
    return null
  }
}

export function setItem (key, value) {
  let data = {
    type: '',
    data: null
  }
  if (typeof (key) === 'string') {
    data.type = 'string'
    data.data = value
  } else if (typeof (value) === 'number') {
    data.type = 'number'
    data.data = value
  } else if (typeof (value) === 'object') {
    data.type = 'object'
    data.data = JSON.stringify(value)
  } else {
    console.error('暂时只支持string,number,object对象')
  }
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function clearItem (key) {
  window.localStorage.setItem(key, '')
}

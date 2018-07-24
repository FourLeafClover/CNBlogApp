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
    } else if (dataObj.type === 'boolean') {
      return Boolean(dataObj.data)
    } else {
      return dataObj.data
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
  if (typeof (value) === 'string') {
    data.type = 'string'
    data.data = value
  } else if (typeof (value) === 'number') {
    data.type = 'number'
    data.data = value
  } else if (typeof (value) === 'object') {
    data.type = 'object'
    data.data = JSON.stringify(value)
  } else if (typeof (value) === 'boolean') {
    data.type = 'boolean'
    data.data = value ? 1 : 0
  } else {
    data.type = 'unknow'
    data.data = value
  }
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function clearItem (key) {
  window.localStorage.removeItem(key)
}

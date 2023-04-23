/**
 * 请求参数签名
 */

import crypto from 'crypto'

const getParams = (params) => {
  var keys = Object.keys(params).sort()
  var list = []
  for (var i = 0; i < keys.length; i++) {
    var value = params[keys[i]]
    if (!value && value !== 0) {
        continue;
    }
    let p = keys[i] + '=' + encodeURIComponent(value)
    p = p.replace(/\(/g, '%28')
    p = p.replace(/\)/g, '%29')
    p = p.replace(/\+/g, '%20')
    p = p.replace(/\\!/g, '%21')
    p = p.replace(/\\~/g, '%7E')
    p = p.replace(/\*/g, '%2A')
    list.push(p)
  }
  return list.join('&')
}

const sign = (params, server, key) => {
  var baseString = encodeURIComponent(server) + encodeURIComponent(getParams(params));
  var sign = crypto.createHmac('sha1', key).update(baseString).digest().toString('base64')
  // console.log('sign ==> ' + sign)
  return sign
}

export default sign

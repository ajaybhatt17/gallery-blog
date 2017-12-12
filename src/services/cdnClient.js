let DbCDN = require('DbCDN/dist/index').default

let client
let authorized

export function initClient (spaceId, accessToken) {
  client = new DbCDN(accessToken)
  authorized = true
}

export function getClient () {
  return authorized && client
}

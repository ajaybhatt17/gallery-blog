let DbCDN = require('db-cdn').default

let client
let authorized

export function initClient (spaceId, accessToken) {
  client = new DbCDN(accessToken)
  authorized = true
}

export function getClient () {
  return authorized && client
}

const mp = require('../../../MP/src/index')
const mvvcInterface = require('../store/mvvcInterface')

const mvvc = {
  init() {
    mp.init(mvvcInterface)
  }
}
module.exports = mvvc
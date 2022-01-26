import common from './common'

require.ensure(['./shared'], function (require) {
  console.log(common)
  const shared = require('./shared')
  shared.default('This is page B')
})

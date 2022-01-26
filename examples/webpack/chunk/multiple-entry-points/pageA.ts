import common from './common'

require(['./shared'], function (shared) {
  console.log(common)
  shared.default('This is page A')
})

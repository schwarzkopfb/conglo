'use strict'

const { 
          assertNumber,
          assertInteger,
          assertNonNegative
      } = require('../assert'),
      toAsyncIterableFactory = require('../chainFactory')

step.aliases = [ 'stepBy' ]
module.exports = toAsyncIterableFactory(step)

async function* step(n) {
    assertNumber(n, 'n must be a number')
    assertInteger(n, 'n must be an integer')
    assertNonNegative(n, 'n cannot be negative')

    let i

    for await (const item of this) {
        if (--i) continue

        i = n
        yield item
    }
}
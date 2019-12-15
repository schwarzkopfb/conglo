'use strict'

const { 
          assertNumber,
          assertInteger,
          assertNonNegative
      } = require('../assert')

step.chainable = true
step.aliases = [ 'stepBy' ]
module.exports = step

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
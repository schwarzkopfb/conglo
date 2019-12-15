'use strict'

const { 
          assertNumber,
          assertInteger,
          assertNonNegative,
          assertFiniteNumber 
      } = require('../assert'),
      { toPipelineFactory } = require('../utils')

step.aliases = [ 'stepBy' ]
module.exports = toPipelineFactory(step)

async function* step(n) {
    assertNumber(n, 'n must be a number')
    assertInteger(n, 'n must be an integer')
    assertNonNegative(n, 'n cannot be negative')
    assertFiniteNumber(n, 'n must be a finite number')

    let i

    for await (const item of this) {
        if (--i) continue

        i = n
        yield item
    }
}
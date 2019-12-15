'use strict'

const { 
          assertNumber,
          assertInteger,
          assertNonNegative
      } = require('../assert')

nth.aliases = [ 'elementAt' ]
module.exports = nth

async function nth(n) {
    assertNumber(n, 'n must be a number')
    assertInteger(n, 'n must be an integer')
    assertNonNegative(n, 'n cannot be negative')

    for await (const item of this)
        if (n-- === 0)
            return item
}
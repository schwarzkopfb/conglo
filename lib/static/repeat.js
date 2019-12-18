'use strict'

const { 
          assertNumber, 
          assertInteger, 
          assertNonNegative 
      } = require('../assert')

repeat.chainable = true
module.exports = repeat

function* repeat(val, n) {
    if (arguments.length < 2)
        while (true)
            yield val
    else {
        assertNumber(n, 'when provided, `n` must be a number')
        assertInteger(n, 'when provided, `n` must be an integer')
        assertNonNegative(n, 'when provided, `n` must be greater than or equal to zero')

        for (let i = 0; i < n; i++)
            yield val
    }
}
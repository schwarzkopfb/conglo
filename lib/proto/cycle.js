'use strict'

const toArray = require('./toArray'),
      { 
          assertNumber,
          assertInteger
      } = require('../assert')

cycle.chainable = true
module.exports = cycle

async function* cycle(n) {
    if (arguments.length > 0) {
        assertNumber(n, 'when provided, `n` must be a number')
        assertInteger(n, 'when provided, `n` must be an integer')
    }
    else
        n = Infinity

    const arr = await toArray.call(this)

    if (arr.length > 0)
        while (n-- > 0)
            yield* arr
}
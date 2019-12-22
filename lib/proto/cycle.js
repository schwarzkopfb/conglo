'use strict'

const { 
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

    const arr = []

    for await (const item of this) {
        yield item
        arr.push(item)
    }

    if (arr.length > 0)
        while (--n > 0)
            yield* arr
}
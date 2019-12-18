'use strict'

const {
          assertInteger,
          assertIntegerOrInfinity,
          assertNonNegative
      } = require('../assert')

slice.chainable = true
slice.aliases = [ 'skip', 'drop' ]
module.exports = slice

async function* slice(from, to, step) {
    if (step === undefined)
        step = 1

    if (from === undefined)
        from = 0

    if (to === undefined)
        to = Infinity

    if (arguments.length === 0)
        return yield* this

    assertInteger(from, '`from` must be an integer')
    assertNonNegative(from, '`from` must be greater than or equal to zero')
    assertIntegerOrInfinity(to, '`to` must be an integer or Infinity')
    assertNonNegative(to, '`to` must be greater than or equal to zero')
    assertInteger(step, '`step` must be an integer')
    assertNonNegative(step, '`step` must be greater than or equal to zero')

    let i = 0
    
    for await (const item of this) {
        if (i >= from && i < to && (i - from) % step === 0)
            yield item

        i++
    }
}
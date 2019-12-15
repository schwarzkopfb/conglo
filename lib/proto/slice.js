'use strict'

const assert = require('assert')

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

    assert(Number.isInteger(from), '`from` must be an integer')
    assert(from >= 0, '`from` must be greater than or equal to zero')
    assert(Number.isInteger(to) || to === Infinity, '`to` must be an integer')
    assert(to >= 0, '`to` must be greater than or equal to zero')
    assert(Number.isInteger(step), '`step` must be an integer')
    assert(step >= 0, '`step` must be greater than or equal to zero')

    let i = 0
    
    for await (const item of this) {
        if (i >= from && i < to && (i - from) % step === 0)
            yield item

        i++
    }
}
'use strict'

const { assertFunction } = require('../assert')

module.exports = count

async function count(fn, self) {
    let i = 0,
        c = 0

    if (arguments.length > 0) {
        assertFunction(fn, 'when provided, predicate must be a function')

        for await (const item of this)
            // it works because `+true === 1` and `+false === 0`
            c += Boolean(await fn.call(self, item, i++))
    }
    else
        for await (const item of this)
            c += 1

    return c
}
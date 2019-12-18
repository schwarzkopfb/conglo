'use strict'

const { assertFunction } = require('../assert')

filter.chainable = true
module.exports = filter

async function* filter(fn, self) {
    assertFunction(fn, 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if (await fn.call(self, item, i++))
            yield item
}
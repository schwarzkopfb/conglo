'use strict'

const { assertFunction } = require('../assert')

map.chainable = true
module.exports = map

async function* map(fn, self) {
    assertFunction(fn, 'selector passed to map() must be a function')

    let i = 0

    for await (const item of this)
        yield await fn.call(self, item, i++)
}
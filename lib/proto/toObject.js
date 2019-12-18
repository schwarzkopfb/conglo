'use strict'

const { assertFunction } = require('../assert')

module.exports = toObject

async function toObject(fn, self) {
    assertFunction(fn, 'key selector must be a function')

    const o = Object.create(null)
    let i = 0

    for await (const item of this)
        o[ await fn.call(self, item, i++) ] = item

    return o
}

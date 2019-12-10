'use strict'

const { equal } = require('assert')

module.exports = toMap

async function toMap(fn, self) {
    equal(typeof fn, 'function', 'key selector must be a function')

    const m = new Map
    let i = 0

    for await (const item of this)
        m.set(await fn.call(self, item, i++), item)

    return m
}

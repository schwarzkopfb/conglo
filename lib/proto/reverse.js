'use strict'

const { toAsyncIterableFactory } = require('../utils')

module.exports = toAsyncIterableFactory(reverse)

async function* reverse() {
    const a = []

    for await (const item of this)
        a.unshift(item)

    yield* a
}

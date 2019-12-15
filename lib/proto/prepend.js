'use strict'

const { toAsyncIterableFactory } = require('../utils')

module.exports = toAsyncIterableFactory(prepend)

async function* prepend(v1, v2, v3, vn) {
    yield* arguments
    yield* this
}
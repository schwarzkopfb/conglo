'use strict'

const toAsyncIterableFactory = require('../chainFactory')

module.exports = toAsyncIterableFactory(append)

async function* append(v1, v2, v3, vn) {
    yield* this
    yield* arguments
}
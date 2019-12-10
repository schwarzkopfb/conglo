'use strict'

const { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(append)

async function* append(v1, v2, v3, vn) {
    yield* this
    yield* arguments
}
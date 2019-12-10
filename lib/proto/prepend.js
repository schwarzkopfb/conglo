'use strict'

const { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(prepend)

async function* prepend(v1, v2, v3, vn) {
    yield* arguments
    yield* this
}
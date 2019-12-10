'use strict'

const { toPipelineFactory } = require('../utils')

module.exports = toPipelineFactory(reverse)

async function* reverse() {
    const a = []

    for await (const item of this)
        a.unshift(item)

    yield* a
}

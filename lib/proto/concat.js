'use strict'

const { toPipelineFactory, toAsyncIterator } = require('../utils')

module.exports = toPipelineFactory(concat)

async function* concat(it1, it2, it3, itn) {
    yield* this

    for (const it of arguments)
        yield* toAsyncIterator(it)()
}
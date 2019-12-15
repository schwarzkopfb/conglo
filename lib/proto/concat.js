'use strict'

const toAsyncIterableFactory = require('../chainFactory'),
      { toAsyncIterator } = require('../utils')

module.exports = toAsyncIterableFactory(concat)

async function* concat(it1, it2, it3, itn) {
    yield* this

    for (const it of arguments)
        yield* toAsyncIterator(it)()
}
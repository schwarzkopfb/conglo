'use strict'

const { toAsyncIterator } = require('../utils')

concat.chainable = true
module.exports = concat

async function* concat(it1, it2, it3, itn) {
    yield* this

    for (const it of arguments)
        yield* toAsyncIterator(it)()
}
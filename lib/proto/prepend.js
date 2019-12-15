'use strict'

prepend.chainable = true
module.exports = prepend

async function* prepend(v1, v2, v3, vn) {
    yield* arguments
    yield* this
}
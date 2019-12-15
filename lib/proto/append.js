'use strict'

append.chainable = true
module.exports = append

async function* append(v1, v2, v3, vn) {
    yield* this
    yield* arguments
}
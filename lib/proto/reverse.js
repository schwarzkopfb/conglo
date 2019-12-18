'use strict'

reverse.chainable = true
module.exports = reverse

async function* reverse() {
    const arr = []

    for await (const item of this)
        arr.unshift(item)

    yield* arr
}

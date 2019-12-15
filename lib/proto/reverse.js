'use strict'

reverse.chainable = true
module.exports = reverse

async function* reverse() {
    const a = []

    for await (const item of this)
        a.unshift(item)

    yield* a
}

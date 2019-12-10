'use strict'

module.exports = toArray

async function toArray() {
    const a = []

    for await (const item of this)
        a.push(item)

    return a
}

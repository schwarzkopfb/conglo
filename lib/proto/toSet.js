'use strict'

module.exports = toSet

async function toSet() {
    const s = new Set

    for await (const item of this)
        s.add(item)

    return s
}

'use strict'

module.exports = next

async function next() {
    for await (const item of this)
        return item
}
'use strict'

const { assertFunction } = require('../assert')

some.aliases = [ 'any' ]
module.exports = some

async function some(fn, self) {
    assertFunction(fn, 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if(await fn.call(self, item, i++))
            return true

    return false
}
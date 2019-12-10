'use strict'

const { equal } = require('assert')

some.aliases = [ 'any' ]
module.exports = some

async function some(fn, self) {
    equal(typeof fn, 'function', 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if(await fn.call(self, item, i++))
            return true

    return false
}
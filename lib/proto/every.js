'use strict'

const { assertFunction } = require('../assert')

every.aliases = [ 'all' ]
module.exports = every

async function every(fn, self) {
    assertFunction(fn, 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if(!await fn.call(self, item, i++))
            return false

    return true
}
'use strict'

const { equal } = require('assert')

every.aliases = [ 'all' ]
module.exports = every

async function every(fn, self) {
    equal(typeof fn, 'function', 'predicate must be a function')

    let i = 0

    for await (const item of this)
        if(!await fn.call(self, item, i++))
            return false

    return true
}
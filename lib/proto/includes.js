'use strict'

const assert = require('assert'),
      { equal, fail } = assert,
      { sameValueZero } = require('../utils')

includes.aliases = [ 'contains' ]
module.exports = includes

async function includes(val, from, fn, self) {
    if (arguments.length > 1)
        switch(typeof from) {
            case 'number': 
                assert(from >= 0, 'start index must be greater than or equal to zero')
                break

            case 'function':
                [ fn, self, from ] = [ from, fn, 0 ]
                break

            default:
                fail('second argument must be start index or an equality comparer')
        }
    else
        from = 0

    if (fn !== undefined)
        equal(typeof fn, 'function', 'when provided, equality comparer must be a function')
    else
        fn = sameValueZero

    let i = 0

    for await (const item of this)
        if (i++ >= from && await fn.call(self, val, item))
            return true

    return false
}
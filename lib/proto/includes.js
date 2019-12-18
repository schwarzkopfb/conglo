'use strict'

const { 
          assertFunction, 
          assertInteger,
          assertNonNegative,
          fail 
      } = require('../assert')

includes.aliases = [ 'contains' ]
module.exports = includes

async function includes(val, from, fn, self) {
    if (arguments.length > 1)
        switch(typeof from) {
            case 'number': 
                assertInteger(from, 'start index must be an integer')
                assertNonNegative(from, 'start index must be greater than or equal to zero')
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
        assertFunction(fn, 'when provided, equality comparer must be a function')
    else
        fn = sameValueZero

    let i = 0

    for await (const item of this)
        if (i++ >= from && await fn.call(self, val, item))
            return true

    return false
}

function sameValueZero(v1, v2) {
    // NaN is the only JavaScript value that is treated as unequal to itself
    return v1 === v2 || (v1 !== v1 && v2 !== v2)
}
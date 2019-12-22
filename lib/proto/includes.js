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
                fail(TypeError, 'second argument must be start index or an equality comparer')
        }
    else
        from = 0

    if (fn !== undefined)
        assertFunction(fn, 'when provided, equality comparer must be a function')
    else
        // use two different comparers for better performance
        fn = typeof val === 'string'
            ? stringEquals
            : sameValueZero

    let i = 0

    for await (const item of this)
        if (i++ >= from && await fn.call(self, val, item))
            return true

    return false
}

function sameValueZero(a, b) {
    // NaN is the only JavaScript value that is treated as unequal to itself
    return a === b || (a !== a && b !== b)
}

// when comparing strings and characters, Array#includes() is case-sensitive, keep the same behaviour
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
function stringEquals(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent', usage: 'search' }) === 0
        : a === b
}
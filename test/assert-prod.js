'use strict'

process.env.NODE_ENV = 'production'

const test = require('tap'),
      { 
          assertType,
          assertObject,
          assertNumber,
          assertInteger,
          assertFunction,
          assertUndefined,
          assertNonNegative,
          assertStringOrSymbol,
          assertInstanceOf 
      } = require('../lib/assert')

function testSuccess(fn, ...args) {
    test.doesNotThrow(() => fn(...args), `does not throw: ${fn.name}`)
}

testSuccess(assertType, 1, 'string', 'test', null, TypeError)
testSuccess(assertType, 1, 'string', 'test', 'invalid', RangeError)
testSuccess(assertType, 1, 'string', 'test', 'sort_non_int_neg', TypeError)
testSuccess(assertType, 1, 'number')

testSuccess(assertObject, 1, 'test', null, undefined, TypeError)
testSuccess(assertObject, 1, 'test', 'invalid', undefined, RangeError)
testSuccess(assertObject, 1, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertObject, {})

testSuccess(assertNumber, 'str', 'test', null, undefined, TypeError)
testSuccess(assertNumber, 'str', 'test', 'invalid', undefined, RangeError)
testSuccess(assertNumber, 'str', 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertNumber, 1)

testSuccess(assertInteger, 4.2, 'test', null, undefined, RangeError)
testSuccess(assertInteger, 4.2, 'test', 'invalid', undefined, RangeError)
testSuccess(assertInteger, 4.2, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertInteger, 1)

testSuccess(assertNonNegative, -1, 'test', null, undefined, RangeError)
testSuccess(assertNonNegative, -1, 'test', 'invalid', undefined, RangeError)
testSuccess(assertNonNegative, -1, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertNonNegative, 0)

testSuccess(assertFunction, true, 'test', null, undefined, TypeError)
testSuccess(assertFunction, true, 'test', 'invalid', undefined, RangeError)
testSuccess(assertFunction, true, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertFunction, () => {})

testSuccess(assertUndefined, true, 'test', null, undefined, RangeError)
testSuccess(assertUndefined, true, 'test', 'invalid', undefined, RangeError)
testSuccess(assertUndefined, true, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertUndefined, undefined)

testSuccess(assertStringOrSymbol, 1, 'test', null, undefined, TypeError)
testSuccess(assertStringOrSymbol, 1, 'test', 'invalid', undefined, RangeError)
testSuccess(assertStringOrSymbol, 1, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertStringOrSymbol, 'key')
testSuccess(assertStringOrSymbol, Symbol('key'))

testSuccess(assertInstanceOf, 1, Map, 'test', null, TypeError)
testSuccess(assertInstanceOf, 1, Map, 'test', 'invalid', RangeError)
testSuccess(assertInstanceOf, 1, Map, 'test', 'sort_non_int_neg', TypeError)
testSuccess(assertInstanceOf, new Map, Map)
'use strict'

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

function testFailure(fn, v1, v2, v3, v4, errCtor) {
    test.throws(() => fn(v1, v2, v3, v4), errCtor, `throws: ${fn.name}`)
}

function testSuccess(fn, ...args) {
    test.doesNotThrow(() => fn(...args), `does not throw: ${fn.name}`)
}

testFailure(assertType, 1, 'string', 'test', null, TypeError)
testFailure(assertType, 1, 'string', 'test', 'invalid', RangeError)
testFailure(assertType, 1, 'string', 'test', 'sort_non_int_neg', TypeError)
testSuccess(assertType, 1, 'number')

testFailure(assertObject, 1, 'test', null, undefined, TypeError)
testFailure(assertObject, 1, 'test', 'invalid', undefined, RangeError)
testFailure(assertObject, 1, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertObject, {})

testFailure(assertNumber, 'str', 'test', null, undefined, TypeError)
testFailure(assertNumber, 'str', 'test', 'invalid', undefined, RangeError)
testFailure(assertNumber, 'str', 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertNumber, 1)

testFailure(assertInteger, 4.2, 'test', null, undefined, RangeError)
testFailure(assertInteger, 4.2, 'test', 'invalid', undefined, RangeError)
testFailure(assertInteger, 4.2, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertInteger, 1)

testFailure(assertNonNegative, -1, 'test', null, undefined, RangeError)
testFailure(assertNonNegative, -1, 'test', 'invalid', undefined, RangeError)
testFailure(assertNonNegative, -1, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertNonNegative, 0)

testFailure(assertFunction, true, 'test', null, undefined, TypeError)
testFailure(assertFunction, true, 'test', 'invalid', undefined, RangeError)
testFailure(assertFunction, true, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertFunction, () => {})

testFailure(assertUndefined, true, 'test', null, undefined, RangeError)
testFailure(assertUndefined, true, 'test', 'invalid', undefined, RangeError)
testFailure(assertUndefined, true, 'test', 'sort_non_int_neg', undefined, RangeError)
testSuccess(assertUndefined, undefined)

testFailure(assertStringOrSymbol, 1, 'test', null, undefined, TypeError)
testFailure(assertStringOrSymbol, 1, 'test', 'invalid', undefined, RangeError)
testFailure(assertStringOrSymbol, 1, 'test', 'sort_non_int_neg', undefined, TypeError)
testSuccess(assertStringOrSymbol, 'key')
testSuccess(assertStringOrSymbol, Symbol('key'))

testFailure(assertInstanceOf, 1, Map, 'test', null, TypeError)
testFailure(assertInstanceOf, 1, Map, 'test', 'invalid', RangeError)
testFailure(assertInstanceOf, 1, Map, 'test', 'sort_non_int_neg', TypeError)
testSuccess(assertInstanceOf, new Map, Map)
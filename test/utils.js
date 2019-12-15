'use strict'

const test = require('tap'),
      { asyncIterator } = Symbol,
      {
          isIterable,
          toAsyncIterator,
      } = require('../lib/utils')

test.test('isIterable', test => {
    test.ok(isIterable([ 1, 2, 3 ]), 'array is terable')
    test.ok(isIterable(new Set), 'set is iterable')
    test.ok(isIterable(new Map), 'Map is iterable')
    test.ok(isIterable('str'), 'string is iterable')
    test.ok(isIterable(function*(){}()), 'iterator is iterable')
    test.ok(isIterable(async function*(){}()), 'async iterator is iterable')
    test.notOk(isIterable({}), 'object is not iterable')
    test.notOk(isIterable(undefined), 'undefined is not iterable')
    test.notOk(isIterable(null), 'null is not iterable')
    test.notOk(isIterable(1), 'number is not iterable')
    test.notOk(isIterable(false), 'boolean is not iterable')

    test.end()
})

test.test('toAsyncIterator', test => {
    async function exhaust(it) {
        const arr = []

        for await (const item of { [ asyncIterator ]: it })
            arr.push(item)

        return arr
    }

    test.resolveMatch(exhaust(toAsyncIterator([ 1, 2, 3 ])), [ 1, 2, 3 ], 'asyncIterator from array')
    test.resolveMatch(exhaust(toAsyncIterator(new Set([ 1, 2, 3 ]))), [ 1, 2, 3 ], 'asyncIterator from Set')
    test.resolveMatch(exhaust(toAsyncIterator('abc')), [ 'a', 'b', 'c' ], 'asyncIterator from string')
    test.resolveMatch(exhaust(toAsyncIterator(42)), [ 42 ], 'asyncIterator from number')
    test.resolveMatch(exhaust(toAsyncIterator(true)), [ true ], 'asyncIterator from boolean')

    test.resolveMatch(exhaust(toAsyncIterator(Promise.resolve([ 3, 2, 1 ]))), [ 3, 2, 1 ], 'asyncIterator from array via Promise')
    test.resolveMatch(exhaust(toAsyncIterator(Promise.resolve(true))), [ true ], 'asyncIterator from boolean via Promise')

    test.end()
})
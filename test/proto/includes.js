'use strict'

const test = require('tap')

require('../..')

test.plan(9)

test.same(
    [].toAsyncIterable().includes,
    [].toAsyncIterable().contains,
    'alias'
)

test.test('given value', test => {
    test.plan(7)

    test.resolveMatch([].toAsyncIterable().includes(42), false, 'item should not be found in empty array')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().includes(42), false, 'item should not be found')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().includes(2), true, 'item should be found')
    test.resolveMatch([ 1, 2, 3, NaN ].toAsyncIterable().includes(NaN), true, '`NaN` should be found')
    test.resolveMatch([ 1, 2, 3, -0 ].toAsyncIterable().includes(+0), true, 'zero should be considered to be equal regardless of sign')
    test.resolveMatch([ 1, 2, 3, 0 ].toAsyncIterable().includes(-0), true, 'zero should be considered to be equal regardless of sign')
    test.resolveMatch([ 1, 'Apple', 3, 0 ].toAsyncIterable().includes('apple'), true, 'string search should be case-insensitive')
})

test.test('from given index', test => {
    test.plan(2)

    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().includes(2, 2), false, 'item should not be found')
    test.resolveMatch([ 1, 2, 3, 2 ].toAsyncIterable().includes(2, 2), true, 'item should be found')
})

const list = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
]

function comparer(a, b) {
    return a.id === b.id
}

test.test('custom comparer', test => {
    test.plan(2)

    test.resolveMatch(list.toAsyncIterable().includes({ id: 4 }, comparer), false, 'item should not be found')
    test.resolveMatch(list.toAsyncIterable().includes({ id: 2 }, comparer), true, 'item should be found')
})

test.test('custom comparer from given index', test => {
    test.plan(2)

    test.resolveMatch(list.toAsyncIterable().includes({ id: 2 }, 2, comparer), false, 'item should not be found')
    test.resolveMatch(list.toAsyncIterable().includes({ id: 2 }, 1, comparer), true, 'item should be found')
})

test.test('custom comparer with overwritten `this`', test => {
    test.plan(3)

    ;[ 1, 2, 3 ].toAsyncIterable().includes(2, function() { test.same(this, 42) }, 42)
})

test.test('custom comparer with overwritten `this` from given index', test => {
    test.plan(1)

    ;[ 1, 2, 3 ].toAsyncIterable().includes(2, 2, function() { test.same(this, 42) }, 42)
})

test.test('async custom comparer', test => {
    test.plan(2)
        
    function comparer(a, b) {
        return new Promise(resolve => resolve(a === b))
    }

    test.resolveMatch([ 'apple', 'Apple', 'APPLE' ].toAsyncIterable().includes('aPPle', comparer), false, 'should not be found')
    test.resolveMatch([ 'apple', 'Apple', 'APPLE' ].toAsyncIterable().includes('Apple', comparer), true, 'should be found')
})

test.test('assertions', test => {
    test.plan(4)

    test.rejects([].toAsyncIterable().includes(42, 'not a number'), TypeError, 'index should be asserted (number)')
    test.rejects([].toAsyncIterable().includes(42, 1.1), RangeError, 'index should be asserted (integer)')
    test.rejects([].toAsyncIterable().includes(42, -1), RangeError, 'index should be asserted (non-negative)')
    test.rejects([].toAsyncIterable().includes(42, 1, 'not a function'), TypeError, 'comparer should be asserted')
})
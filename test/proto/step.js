'use strict'

const test = require('tap'),
      AsyncIterable = require('../..')

const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

test.resolveMatch(
    new AsyncIterable(nums)
        .step(1)
        .toArray(),
    nums, 
    'step is 1, same array should be returned'
)

test.resolveMatch(
    new AsyncIterable(nums)
        .step(2)
        .toArray(),
    [ 1, 3, 5, 7, 9 ], 
    'step is 2, every second element should be returned'
)

test.resolveMatch(
    new AsyncIterable(nums)
        .stepBy(3)
        .toArray(),
    [ 1, 4, 7 ], 
    'step is 3, every third element should be returned'
)

test.test('argument assertions', test => {
    function testRejection(n, msg, errCtor) {
        test.rejects(new AsyncIterable().step(n).toArray(), errCtor, msg)
    }

    testRejection(true, 'non-number', TypeError)
    testRejection(0.42, 'non-integer', RangeError)
    testRejection(-1, 'negative', RangeError)
    testRejection(Infinity, 'infinite', RangeError)

    test.end()
})
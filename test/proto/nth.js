'use strict'

const test = require('tap'),
      AsyncIterable = require('../..')

const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

test.resolveMatch(
    new AsyncIterable(nums).nth(0),
    1, 'n is 0, first item should be returned'
)

test.resolveMatch(
    new AsyncIterable(nums).elementAt(5),
    6, 'n is 5, sixth element should be returned'
)

test.resolveMatch(
    new AsyncIterable(nums).nth(69),
    undefined, 'n is out of range, `undefined` should be returned'
)

test.test('argument assertions', test => {
    function testRejection(n, msg, errCtor) {
        test.rejects(new AsyncIterable().nth(n), errCtor, msg)
    }

    testRejection(true, 'non-number', TypeError)
    testRejection(0.42, 'non-integer', RangeError)
    testRejection(-1, 'negative', RangeError)
    testRejection(Infinity, 'infinite', RangeError)

    test.end()
})
'use strict'

const test = require('tap'),
      Pipeline = require('../..')

const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

test.resolveMatch(
    new Pipeline(nums).nth(0),
    1, 'n is 0, first item should be returned'
)

test.resolveMatch(
    new Pipeline(nums).elementAt(5),
    6, 'n is 5, sixth element should be returned'
)

test.resolveMatch(
    new Pipeline(nums).nth(69),
    undefined, 'n is out of range, `undefined` should be returned'
)

test.test('argument assertions', test => {
    function testRejection(n, msg, errCtor) {
        test.rejects(new Pipeline().nth(n), errCtor, msg)
    }

    testRejection(true, 'non-number', TypeError)
    testRejection(0.42, 'non-integer', RangeError)
    testRejection(-1, 'negative', RangeError)
    testRejection(Infinity, 'infinite', RangeError)

    test.end()
})
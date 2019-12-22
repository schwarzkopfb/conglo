'use strict'

const test = require('tap')

require('../..')

test.plan(7)

test.resolveMatch([].toAsyncIterable().cycle().toArray(), [], 'empty array')

test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().cycle(0).toArray(), [], 'repeat zero times')
test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().cycle(1).toArray(), [ 1, 2, 3 ], 'repeat once')
test.resolveMatch([ 1 ].toAsyncIterable().cycle(2).toArray(), [ 1, 1 ], 'repeat twice')

test.resolveMatch(
    [ 1, 2, 3 ]
        .toAsyncIterable()
        .cycle(4)
        .toArray(),
    [ 
        1, 2, 3, 1, 2, 3,
        1, 2, 3, 1, 2, 3
    ],
    'repeat 4 times'
)

test.resolveMatch(
    [ 1, 2, 3 ]
        .toAsyncIterable()
        .cycle()
        .take(12)
        .toArray(),
    [ 
        1, 2, 3, 1, 2, 3,
        1, 2, 3, 1, 2, 3
    ],
    'repeat infinitely'
)

test.test('assertions', test => {
    test.plan(2)

    test.rejects([ 1, 2, 3 ].toAsyncIterable().cycle('not a number').next(), '`n` should be asserted (number)')
    test.rejects([ 1, 2, 3 ].toAsyncIterable().cycle(1.1).next(), '`n` should be asserted (integer)')
})
'use strict'

const test = require('tap')

require('../..')

test.plan(4)

test.resolveMatch(
    AsyncIterable
        .repeat(1, 42)
        .count(),
    42,
    'without predicate'
)


test.test('with predicate', test => {
    test.plan(10)

    function checkArgSeries(index, from, msg) {
        return function() {
            test.same(arguments[ index ], from++, msg)
        }
    }

    test.resolveMatch(AsyncIterable.range(42).count(n => n % 2), 21, 'predicate should be used');
    [ 1, 2, 3 ].toAsyncIterable().count(checkArgSeries(0, 1, 'first argument passed to predicate should be the item itself'));
    [ 1, 2, 3 ].toAsyncIterable().count(checkArgSeries(1, 0, 'second argument passed to predicate should be the iteration index (starting from zero)'));
    [ 1, 2, 3 ].toAsyncIterable().count(function () { test.same(this, 42, '`this` of predicate should be overwritten') }, 42)
})

test.resolveMatch(
    AsyncIterable
        .range(42)
        .count(async n => n / 2),
    41,
    'with async predicate'
)

test.rejects([].toAsyncIterable().count('not a function'), 'assertion')

'use strict'

const test = require('tap')

require('../..')

test.plan(3)

test.test('without selector', test => {
    test.plan(2)

    test.resolveMatch([].toAsyncIterable().last(), undefined, 'empty array')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().last(), 3, 'last item should be returned')
})

test.test('with selector', test => {
    test.plan(13)

    test.resolveMatch([].toAsyncIterable().last(n => n), undefined, 'empty array')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().last(n => n % 2), 3, 'last matching item should be returned')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().last(n => n < 1), undefined, 'no matching item, undefined should be returned')
    test.resolveMatch([ 1, 2, 3 ].toAsyncIterable().last(async n => n < 2), 1, 'async selector')

    function checkArgSeries(index, from, msg) {
        return function() {
            test.same(arguments[ index ], from++, msg)
        }
    }

    [ 1, 2, 3 ].toAsyncIterable().last(checkArgSeries(0, 1, 'first argument passed to selector should be the item itself'));
    [ 1, 2, 3 ].toAsyncIterable().last(checkArgSeries(1, 0, 'second argument passed to selector should be the iteration index (starting from zero)'));
    [ 1, 2, 3 ].toAsyncIterable().last(function () { test.same(this, 42, '`this` of selector should be overwritten') }, 42)
})

test.rejects([].toAsyncIterable().last('not a function'), 'selector should be asserted')

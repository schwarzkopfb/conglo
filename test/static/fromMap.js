'use strict'

const test = require('tap'),
      AsyncIterable = require('../..'),
      source = new Map([ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ])

test.test('without key selector', test => {
    test.plan(1)

    test.resolveMatch(
        AsyncIterable
            .fromMap(source)
            .toArray(),
        [
            [ 1, 'a' ], 
            [ 2, 'b' ], 
            [ 3, 'c' ]
        ],
        'AsyncIterable instance should be created from Map'
    )
})

test.test('with key selector', test => {
    test.plan(4)

    test.resolveMatch(
        AsyncIterable
            .fromMap(source, k => k)
            .toArray(),
        [ 1, 2, 3 ],
        'keys should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromMap(source, (k, v) => v)
            .toArray(),
        [ 'a', 'b', 'c' ],
        'values should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromMap(source, (k, v, i) => i)
            .toArray(),
        [ 0, 1, 2 ],
        'indices should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromMap(source, function() { return this }, 42)
            .toArray(),
        [ 42, 42, 42 ],
        '`this` should be overwritten'
    )
})

test.test('assertions', test => {
    test.plan(2)

    test.rejects(AsyncIterable.fromMap().next(), TypeError, 'fromMap() should require a Map instance')
    test.rejects(AsyncIterable.fromMap('invalid').next(), TypeError, 'fromMap() should only accept Map instances')
})
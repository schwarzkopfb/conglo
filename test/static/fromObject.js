'use strict'

const test = require('tap'),
      AsyncIterable = require('../..'),
      source = { 1: 'a', 2: 'b', 3: 'c' }

test.test('without key selector', test => {
    test.plan(1)

    test.resolveMatch(
        AsyncIterable
            .fromObject(source)
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
            .fromObject(source, k => k)
            .toArray(),
        [ 1, 2, 3 ],
        'keys should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromObject(source, (k, v) => v)
            .toArray(),
        [ 'a', 'b', 'c' ],
        'values should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromObject(source, (k, v, i) => i)
            .toArray(),
        [ 0, 1, 2 ],
        'indices should be collected'
    )

    test.resolveMatch(
        AsyncIterable
            .fromObject(source, function() { return this }, 42)
            .toArray(),
        [ 42, 42, 42 ],
        '`this` should be overwritten'
    )
})

test.test('assertions', test => {
    test.plan(2)

    test.rejects(AsyncIterable.fromObject().next(), TypeError, 'fromObject() should require an object')
    test.rejects(AsyncIterable.fromObject('invalid').next(), TypeError, 'fromfromObject() should only accept objects')
})
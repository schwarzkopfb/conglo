'use strict'

const test = require('tap'),
      { inspect } = require('util'),
      AsyncIterable = require('../lib/AsyncIterable')

test.resolveMatch(new AsyncIterable().toArray(), [] , 'should be instantiated without args')
test.resolveMatch(new AsyncIterable(42).toArray(), [ 42 ] , 'constructor should respect args')
test.resolveMatch(new AsyncIterable([ 6, 9 ]).toArray(), [ 6, 9 ] , 'constructor should respect args #2')
test.throws(() => AsyncIterable('something'), Error, '`new` keyword is required to instantiate an `AsyncIterable`')
test.same(inspect(new AsyncIterable()), 'AsyncIterable {}', 'inspection should not cause errors')
test.throws(() => { for (const item of new AsyncIterable); }, Error, 'sync iteration of an AsyncIterable is not possible')
test.resolveMatch(
    async () => {
        const arr = []

        for await (const item of new AsyncIterable([ 3, 1, 2 ]))
            arr.push(item)

        return arr
    }, 
    [ 3, 1, 2 ], 'async iteration of an AsyncIterable should work'
)
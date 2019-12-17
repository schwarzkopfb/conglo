'use strict'

const AsyncIterable = require('../../lib/without-globals'),
      test = require('tap'),
      value = new Map([ [ 'a', 1 ], [ 'b', 2, ], [ 'c', 3 ] ])

require('../../lib/global/map')

test.type(value.toAsyncIterable, 'function', 'constructor should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')

test.resolveMatch(
    value.toAsyncIterable(k => k).toArray(),
    [ 'a', 'b', 'c' ], 'array should contain keys'
)

test.resolveMatch(
    value.toAsyncIterable((k, v) => v).toArray(),
    [ 1, 2, 3 ], 'array should contain values'
)

test.resolveMatch(
    value.toAsyncIterable((k, v, i) => i).toArray(),
    [ 0, 1, 2 ], 'array should contain iteration indices'
)
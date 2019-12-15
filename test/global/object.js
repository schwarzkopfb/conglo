'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = { a: 1, b: 2, c: 3 }

require('../../global/object')

test.type(Object.toPipeline, 'function', 'constructor should be extended')
test.type(Object.toPipeline({}), AsyncIterable, 'iterable instance shoud be returned')

test.resolveMatch(
    Object.toPipeline(value, k => k).toArray(),
    [ 'a', 'b', 'c' ], 'array should contain property names'
)

test.resolveMatch(
    Object.toPipeline(value, (k, v) => v).toArray(),
    [ 1, 2, 3 ], 'array should contain property values'
)

test.resolveMatch(
    Object.toPipeline(value, (k, v, i) => i).toArray(),
    [ 0, 1, 2 ], 'array should contain iteration indices'
)
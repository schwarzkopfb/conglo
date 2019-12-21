'use strict'

const test = require('tap'),
      AsyncIterable = require('../..')

test.type(AsyncIterable.from(), AsyncIterable, 'from() should return an AsyncIterable instance')
test.resolveMatch(AsyncIterable.from([ 1, 2, 3 ]).toArray(), [ 1, 2, 3 ], 'iterable should be created from given value')
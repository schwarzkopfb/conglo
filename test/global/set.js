'use strict'

const AsyncIterable = require('../../lib/without-globals'),
      test = require('tap'),
      value = new Set([ 's' ])

require('../../lib/global/set')

test.type(value.toAsyncIterable, 'function', 'prototype should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toAsyncIterable().toArray(), [ 's' ], 'iterable should be created from given value')
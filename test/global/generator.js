'use strict'

const AsyncIterable = require('../../lib/without-globals'),
      test = require('tap'),
      value = function*() { yield 'g' }()

require('../../lib/global/generator')

test.type(value.toAsyncIterable, 'function', 'prototype should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toAsyncIterable().toArray(), [ 'g' ], 'iterable should be created from given value')
'use strict'

const AsyncIterable = require('../../lib/without-globals'),
      test = require('tap'),
      value = Promise.resolve('p')

require('../../lib/global/promise')

test.type(value.toAsyncIterable, 'function', 'prototype should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toAsyncIterable().toArray(), [ 'p' ], 'iterable should be created from given value')
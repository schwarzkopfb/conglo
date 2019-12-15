'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = [ 'a' ]

require('../../global/array')

test.type(value.toAsyncIterable, 'function', 'prototype should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toAsyncIterable().toArray(), value, 'iterable should be created from given value')
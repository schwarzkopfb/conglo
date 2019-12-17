'use strict'

const AsyncIterable = require('../../lib/without-globals'),
      test = require('tap'),
      value = async function*() { yield 'ag' }()

require('../../lib/global/asyncGenerator')

test.type(value.toAsyncIterable, 'function', 'prototype should be extended')
test.type(value.toAsyncIterable(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toAsyncIterable().toArray(), [ 'ag' ], 'iterable should be created from given value')
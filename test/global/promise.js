'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = Promise.resolve('p')

require('../../global/promise')

test.type(value.toPipeline, 'function', 'prototype should be extended')
test.type(value.toPipeline(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toPipeline().toArray(), [ 'p' ], 'iterable should be created from given value')
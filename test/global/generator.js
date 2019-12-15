'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = function*() { yield 'g' }()

require('../../global/generator')

test.type(value.toPipeline, 'function', 'prototype should be extended')
test.type(value.toPipeline(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toPipeline().toArray(), [ 'g' ], 'iterable should be created from given value')
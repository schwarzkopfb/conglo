'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = [ 'a' ]

require('../../global/array')

test.type(value.toPipeline, 'function', 'prototype should be extended')
test.type(value.toPipeline(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toPipeline().toArray(), value, 'iterable should be created from given value')